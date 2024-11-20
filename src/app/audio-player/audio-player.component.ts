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
  type = signal<string>('audio/wav');
  audio = signal<HTMLAudioElement>(document.createElement('audio'));
  errors: {message: string}[] = [];

  @Input() audio_id = 0;

  constructor(private readonly cd: ChangeDetectorRef, private dmsService: AuthDmsService) {}

  onPlayerReady(source: VgApiService) {
    this.api = source;
   
    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(() => {
      this.track = this.api.getDefaultMedia().textTracks[0];
      this.loaded = true;
    });

    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      // Set the audio to the beginning
      this.api.getDefaultMedia().currentTime = 0;
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

  ngOnInit() { 
    // Select the audio element
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
        })
      )
      .subscribe((data: any) => {
        this.dmsService.getFileBlob(data.uniformName, data.metadata.find((item: any) => item.internalName === 'Path')?.value)
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

interface ResponseAsBlob extends Blob {
  ok: boolean;
  message: string;
}

