import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { VgCoreModule, VgApiService } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

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
  providers: [VgApiService],
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {
  sources: AudioSource[] = [];
  preload = 'auto';
  api: VgApiService = new VgApiService();
  track: TextTrack | any = [];
  activeCuePoints: ICuePoint[] = [];
  showCuePointManager = true;
  json: JSON = JSON;
  loaded = false;

  @Input() audio_src: string = '';

  constructor(private cd: ChangeDetectorRef) {}

  onPlayerReady(source: VgApiService) {
    this.api = source;
    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(() => {
      this.track = this.api.getDefaultMedia().textTracks[0];
      this.loaded = true;
    });

    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      // Set the video to the beginning
      this.api.getDefaultMedia().currentTime = 0;
    });
  }

  onEnterCuePoint($event: any) {
    this.activeCuePoints.push({ id: $event.id, ...JSON.parse($event.text) });
    this.showCuePointManager = true;
  }

  onExitCuePoint($event: any) {
    this.activeCuePoints = this.activeCuePoints.filter(
      (c) => c.id !== $event.id
    );
  }

  onClickGo(cue: TextTrackCue) {
    this.api.getDefaultMedia().currentTime = cue?.startTime;
    this.api.play();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    const simpleChange = changes['audio_src'];
    if (simpleChange.currentValue !== simpleChange.previousValue) {
      this.sources = [
        {
          src: simpleChange.currentValue,
          type: 'audio/wav',
        },
      ];
      this.cd.detectChanges();
    }
  }
}

interface AudioSource {
  src: string;
  type: string;
}

interface ICuePoint {
  id: string;
  title: string;
  description: string;
  src: string;
  href: string;
}
