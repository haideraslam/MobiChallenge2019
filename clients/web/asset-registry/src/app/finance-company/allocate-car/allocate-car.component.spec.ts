import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateCarComponent } from './allocate-car.component';

describe('AllocateCarComponent', () => {
  let component: AllocateCarComponent;
  let fixture: ComponentFixture<AllocateCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
