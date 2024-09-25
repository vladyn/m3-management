import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensitiveWordsComponent } from './sensitive-words.component';

describe('SensitiveWordsComponent', () => {
  let component: SensitiveWordsComponent;
  let fixture: ComponentFixture<SensitiveWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensitiveWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensitiveWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
