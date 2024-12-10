import { HighlightDirective } from "./highlight.directive";
import { TestBed } from "@angular/core/testing";
import { Renderer2, ElementRef } from "@angular/core";
import { MockElementRef } from "../../tests/elmentRefMock";

describe('HighlightDirective', () => {
  let directive: HighlightDirective;
  let renderer: Renderer2;
  let mockElementRef: ElementRef;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HighlightDirective ],
      providers: [{ provide: Renderer2, useValue: { setAttribute: () => {} } }, { provide: ElementRef, useClass: MockElementRef }]
    });
    mockElementRef = TestBed.inject(ElementRef);
    renderer = jasmine.createSpyObj('Renderer2', ['setProperty', 'addClass', 'removeClass', 'setAttribute', 'removeAttribute', 'setStyle', 'removeStyle', 'selectRootElement', 'createElement', 'createComment', 'createText', 'destroy', 'appendChild', 'insertBefore', 'removeChild', 'parentNode', 'nextSibling', 'setValue', 'listen']);
    directive = new HighlightDirective(mockElementRef, renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });


  it('should set data-match attribute', () => {
    directive.setDataMatch = true;
    directive.content = 'test';
    directive.ngOnChanges({});
    console.log(mockElementRef);
    expect(mockElementRef.nativeElement.getAttribute('data-match')).toBe('test');
  });
});
