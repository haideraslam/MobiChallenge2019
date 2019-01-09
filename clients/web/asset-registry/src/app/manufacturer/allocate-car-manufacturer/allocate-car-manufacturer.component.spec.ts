import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateCarManufacturerComponent } from './allocate-car-manufacturer.component';

describe('AllocateCarManufacturerComponent', () => {
  let component: AllocateCarManufacturerComponent;
  let fixture: ComponentFixture<AllocateCarManufacturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateCarManufacturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateCarManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
