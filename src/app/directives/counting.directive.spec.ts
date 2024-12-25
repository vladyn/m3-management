import { CountingDirective } from './counting.directive';
import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

describe('CountingDirective', () => {
  let directive: CountingDirective;
  let mockElementRef: ElementRef;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: { nativeElement: { innerHTML: 'test' } } }]
    });
    mockElementRef = TestBed.inject(ElementRef);
    directive = new CountingDirective(mockElementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should count characters', () => {
    directive.onClick(new MouseEvent('click'));
    expect(mockElementRef.nativeElement.innerHTML).toBe('4');
  });
});
