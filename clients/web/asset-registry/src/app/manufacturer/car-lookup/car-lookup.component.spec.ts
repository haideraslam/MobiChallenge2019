import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarLookupComponent } from './car-lookup.component';

describe('CarLookupComponent', () => {
  let component: CarLookupComponent;
  let fixture: ComponentFixture<CarLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
