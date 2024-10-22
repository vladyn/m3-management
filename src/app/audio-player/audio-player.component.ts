import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { VgCoreModule, VgApiService } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule} from '@videogular/ngx-videogular/buffering';

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: [ './audio-player.component.scss' ],
    standalone: true,
    imports: [VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule, CommonModule],
    providers: [VgApiService]
})
export class AudioPlayerComponent implements OnInit {
    sources: AudioSource[];
    src: Array<any> = [];
    preload = 'auto';
    api: VgApiService = new VgApiService();
    track: TextTrack|any = [];
    activeCuePoints: ICuePoint[] = [];
    showCuePointManager = true;
    json: JSON = JSON;
    loaded = false;

    constructor(private cd: ChangeDetectorRef) {
        this.sources = [
            {
                src: "/assets/audio/E_DarinaD_D_2024-10-07_H_100748_060_CLID_00894553778.wav",
                type: "audio/wav"
            }
        ];
    }

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
      this.cd.detectChanges();
    }

    onEnterCuePoint($event: any) {
      this.activeCuePoints.push({ id: $event.id, ...JSON.parse($event.text) });
      this.showCuePointManager = true;
      this.cd.detectChanges();
    }

    onExitCuePoint($event: any) {
      this.activeCuePoints = this.activeCuePoints.filter(
        (c) => c.id !== $event.id
      );
      this.cd.detectChanges();
    }

    onClickGo(cue: TextTrackCue) {
      this.api.getDefaultMedia().currentTime = cue?.startTime;
      this.api.play();
      this.cd.detectChanges();
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
      this.cd.detectChanges();
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

interface ICuePoint2 {
  startTime: number;
  endTime: number;
  id: string;
  text: { title: string; description: string };
}
