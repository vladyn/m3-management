import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectorRef, signal } from '@angular/core';
import type { OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import { VgCoreModule, VgApiService } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { AuthDmsService } from '../services/auth-dms.service/auth-dms.service';
import { Subscription, catchError, map } from 'rxjs';

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
  ],
  providers: [VgApiService, AuthDmsService],
})

export class AudioPlayerComponent implements OnInit, AfterViewInit {
  preload = 'auto';
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
  type = signal<string>('audio/wav');
  audio = signal<HTMLAudioElement>(document.createElement('audio'));
  errors: {message: string}[] = [];
  model = signal<Array<any>> ([] as any);
  playerStateCssClass = signal<string>('');
  searchTerm = signal<string>('type here to search');

  @Input() audio_id = 0;

  constructor(private readonly cd: ChangeDetectorRef, private dmsService: AuthDmsService) {}

  onPlayerReady(source: VgApiService) {
    this.api = source;

    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(() => {
      this.track = this.api.getDefaultMedia().textTracks[0];
      this.loaded = true;
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

  onEnterCuePoint($event: ITextTrackCue) {
    this.activeCuePoints.push({ id: $event.id, text: $event.text });
    this.showCuePointManager = true;
  }

  onExitCuePoint($event: TextTrackCue) {
    this.activeCuePoints = this.activeCuePoints.filter(
      (c) => c.id !== $event.id
    );
  }

  onClickGo(cue: TextTrackCue) {
    this.api.getDefaultMedia().currentTime = cue?.startTime;
    this.api.play();
  }

  search() {
    this.api.seekTime(this.track.cues[0].startTime);
  }

  ngOnInit() {
    const audio = document.querySelector('audio') ?? this.audio();
    this.audio.set(audio);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cd.detectChanges();
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

