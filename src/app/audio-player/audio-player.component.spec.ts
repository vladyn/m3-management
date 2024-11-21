import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioPlayerComponent } from './audio-player.component';
import { AuthDmsService } from '../services/auth-dms.service/auth-dms.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AudioPlayerComponent', () => {
  let component: AudioPlayerComponent;
  let fixture: ComponentFixture<AudioPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioPlayerComponent, HttpClientTestingModule],
      providers: [AuthDmsService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a showCuePointManager property', () => {
    expect(component.showCuePointManager).toBeTrue();
  });

  it('should hide the cue point manager', () => {
    component.showCuePointManager = false;
    fixture.detectChanges();
    expect(component.showCuePointManager).toBeFalse();
    expect(fixture.nativeElement.querySelector('#cuePoints')).toBeNull();
  });

  it('should show the cue point manager', () => {
    component.showCuePointManager = true;
    fixture.detectChanges();
    expect(component.showCuePointManager).toBeTrue();
    expect(fixture.nativeElement.querySelector('#cuePoints')).not.toBeNull();
  });

  it('should hide the "#queList" when the component.track.cues.length is 0', () => {
    component.track = {
    };

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#cueList')).toBeNull();
  });

  it('should show the "#queList" when the component.track.cues.length is greater than 0', () => {
    component.track = {
      cues: [
        {
          "text": "{\n    \"title\": \"Collection tab\",\n    \"description\": \"Описателен текст за конкретния cue point.\",\n    \"src\": \"assets/images/m3_day1.png\",\n    \"href\": \"/#/collection\"\n}",
          "startTime": "234234",
          "endTime": "234234"
      },
      {
          "text": "{\n    \"title\": \"Collection tab\",\n    \"description\": \"Описателен текст за конкретния cue point.\",\n    \"src\": \"assets/images/m3_day1.png\",\n    \"href\": \"/#/collection\"\n}",
          "startTime": "234324",
          "endTime": "234324"
      }
      ],
    };

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#queList')).not.toBeNull();
  });
});
