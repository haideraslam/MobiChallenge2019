import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackFleetComponent } from './track-fleet.component';

describe('TrackFleetComponent', () => {
  let component: TrackFleetComponent;
  let fixture: ComponentFixture<TrackFleetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackFleetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
