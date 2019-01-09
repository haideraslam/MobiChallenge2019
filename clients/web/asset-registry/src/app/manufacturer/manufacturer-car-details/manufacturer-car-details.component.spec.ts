import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerCarDetailsComponent } from './manufacturer-car-details.component';

describe('ManufacturerCarDetailsComponent', () => {
  let component: ManufacturerCarDetailsComponent;
  let fixture: ComponentFixture<ManufacturerCarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerCarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
