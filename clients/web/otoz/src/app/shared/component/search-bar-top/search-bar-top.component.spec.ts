import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarTopComponent } from './search-bar-top.component';

describe('SearchBarTopComponent', () => {
  let component: SearchBarTopComponent;
  let fixture: ComponentFixture<SearchBarTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
