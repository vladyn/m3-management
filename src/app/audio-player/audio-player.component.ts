import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectorRef, signal, ViewChild, ElementRef } from '@angular/core';
import type { OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import { VgCoreModule, VgApiService } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { AuthDmsService } from '../services/auth-dms.service/auth-dms.service';
import { HighlightDirective } from '../directives/highlight.directive';
import { catchError, debounceTime, fromEvent, map, distinctUntilChanged } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import {
  DEFAULT_TRANSCRIPT_STATE_CSS_CLASS,
  DEFAULT_AUDIO_TYPE,
  DEFAULT_SEARCH_TERM,
  DEFAULT_PRELOAD,
  SCROLL_SETTINGS,
  SCROLL_TOLERANCE
} from '../../enums';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  standalone: true,
  imports: [
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    CommonModule,
    FormsModule,
    HighlightDirective,
  ],
  providers: [VgApiService, AuthDmsService],
})

export class AudioPlayerComponent implements OnInit, AfterViewInit {
  preload = DEFAULT_PRELOAD;
  api: VgApiService = new VgApiService();
  track: TextTrack | any = [];
  activeCuePoints: ITextTrackCue[] = [];
  showCuePointManager = true;
  json: JSON = JSON;
  loaded = false;
  cabinets = signal<Cabinet[]>([]);
  cabinetContents: Cabinet[] = [];
  src = signal<string>('');
  transcript_src = signal<string>('');
  type = signal<string>(DEFAULT_AUDIO_TYPE);
  audio = signal<HTMLAudioElement>(document.createElement('audio'));
  errors: {message: string}[] = [];
  model = signal<Array<any>> ([] as any);
  playerStateCssClass = signal<string>('');
  searchTerm = signal<string>('Да.');
  searchTermPlaceholder = signal<string>(DEFAULT_SEARCH_TERM);
  patchedCues: VTTCue[] = [];
  currentRow: HTMLTableRowElement | null | unknown = null;
  isScrolling = true;
  scrollTopMemoized = 0;

  @Input() audio_id = 0;
  @ViewChild('cues', { static: false }) cuesTable!: ElementRef;
  @ViewChild('cuePoints', { static: false }) cuePoints!: ElementRef;
  @ViewChild('input', { static: true }) inputSearch!: ElementRef;

  constructor(private readonly cd: ChangeDetectorRef, private dmsService: AuthDmsService) {}

  onPlayerReady(source: VgApiService) {
    this.api = source;

    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(() => {
      this.track = this.api.getDefaultMedia().textTracks[0];
      this.patchedCues = (Array.from(this.track.cues) as VTTCue[]).map((cue: VTTCue) => {
        cue.id = uuidv4();
        return cue;
      });
      this.loaded = true;

      fromEvent(this.cuePoints.nativeElement, 'scroll').pipe(
        debounceTime(1000),
      ).subscribe(() => {
        const scrollTop = this.cuePoints.nativeElement.scrollTop;
        const sum = scrollTop - this.scrollTopMemoized;
        this.#handleScroll(sum, scrollTop);
      });
    });

    this.api.getDefaultMedia().subscriptions.playing.subscribe(() => {
      this.playerStateCssClass.set('playing');
    });

    this.api.getDefaultMedia().subscriptions.pause.subscribe(() => {
      this.playerStateCssClass.set('paused');
    });

    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      this.api.getDefaultMedia().currentTime = 0;
      this.playerStateCssClass.set('ended');
    });
  }

  #handleScroll(sum: number, scrollTop: number) {
    if (sum < SCROLL_TOLERANCE && sum > 0) {
      this.isScrolling = true;
    } else if (sum >= SCROLL_TOLERANCE) {
      this.isScrolling = false;
    } else if (sum < 0) {
      this.isScrolling = false;
    }
    this.scrollTopMemoized = scrollTop;
  }

  onEnterCuePoint($event: ITextTrackCue) {
    this.activeCuePoints.push({ id: uuidv4(), text: $event.text });
    this.showCuePointManager = true;
    this.currentRow = Array.from(this.cuesTable.nativeElement.querySelectorAll('tr')).find((tr: any) => tr.id === $event.id);
    if (this.currentRow instanceof HTMLTableRowElement) {
      this.isScrolling && this.currentRow.scrollIntoView({ behavior: SCROLL_SETTINGS.scrollBehavior as ScrollBehavior });
      this.currentRow.classList.add(DEFAULT_TRANSCRIPT_STATE_CSS_CLASS);
    }
  }

  onExitCuePoint($event: TextTrackCue) {
    this.activeCuePoints = this.activeCuePoints.filter(
      (c) => c.id !== $event.id
    );
    this.clearHighlights();
  }

  onClickGo(cue: TextTrackCue) {
    this.api.getDefaultMedia().currentTime = cue?.startTime;
    this.clearHighlights();
    this.api.play();
  }

  clearHighlights() {
    Array.from(this.cuesTable.nativeElement.querySelectorAll('tr')).forEach((tr: any) => {
      tr.classList.remove(DEFAULT_TRANSCRIPT_STATE_CSS_CLASS);
    });
  }

  search() {
    this.api.seekTime(this.track.cues[0].startTime);
  }

  onScroll($event: any) {
    if (false) {
      console.log('scrolling');
      console.log($event);
    }
  }

  ngOnInit() {
    const audio = document.querySelector('audio') ?? this.audio();
    this.audio.set(audio);
  }

  ngAfterViewInit(): void {
    fromEvent(this.inputSearch.nativeElement, 'input').pipe(
      map((event: any) => event.target.value),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm) => {
      this.searchTerm.set(searchTerm);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    const simpleChange = changes['audio_id'];

    if (simpleChange.currentValue !== simpleChange.previousValue) {
      this.dmsService.getFileMetadata(this.audio_id)
      .pipe(
        catchError((error) => {
          this.errors.push(error);
          this.cd.detectChanges();
          throw error;
        }),
        map((data: any) => {
          this.model.set(data.metadata);
          return data;
        })
      )
      .subscribe((data: any) => {
        this.dmsService.getFileBlob(data.name, data.path)
        .pipe(
          catchError((error) => {
            this.errors.push(error);
            this.cd.detectChanges();
            throw error;
          })
        )
        .subscribe((response) => {
          const url = URL.createObjectURL(response);
          this.type.set(response.type);
          this.src.set(url);
          this.audio().load();
          this.errors.length = 0;
          this.cd.detectChanges();
        });

        this.dmsService.getFileTranscript(this.audio_id)
        .pipe(
          catchError((error) => {
            this.errors.push(error);
            this.cd.detectChanges();
            throw error;
          })
        )
        .subscribe((response) => {
          const url = URL.createObjectURL(response);
          this.transcript_src.set(url);
          this.cd.detectChanges();
        });
      });
    }
  }
}

interface ITextTrackCue {
  id: string;
  text: string;
  href?: string;
  title?: string;
  description?: string;
  src?: string;
}

interface Cabinet {
  id: string;
  name: string;
  type: string;
  iconName: string;
  iconColor: string;
}
