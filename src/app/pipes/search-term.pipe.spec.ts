import { SearchTerm } from './search-term.pipe';
import { TestBed } from '@angular/core/testing';
import { Renderer2 } from '@angular/core';

describe('SearchTermPipe', () => {
  let pipe: SearchTerm;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchTerm],
      providers: [Renderer2],
    });
    renderer = TestBed.inject(Renderer2);
    pipe = new SearchTerm(renderer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the value if the search term is not found', () => {
    const value = 'This is a test';
    const searchTerm = 'not found';
    expect(pipe.transform(value, searchTerm)).toEqual(value);
  });

  it('should return the value with the search term highlighted', () => {
    const value = 'This is a test';
    const searchTerm = 'test';
    expect(pipe.transform(value, searchTerm)).toEqual(
      'This is a <strong>test</strong>'
    );
  });
});
