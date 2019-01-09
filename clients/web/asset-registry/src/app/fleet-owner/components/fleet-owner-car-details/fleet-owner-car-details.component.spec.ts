import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetOwnerCarDetailsComponent } from './fleet-owner-car-details.component';

describe('FleetOwnerCarDetailsComponent', () => {
  let component: FleetOwnerCarDetailsComponent;
  let fixture: ComponentFixture<FleetOwnerCarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetOwnerCarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetOwnerCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
