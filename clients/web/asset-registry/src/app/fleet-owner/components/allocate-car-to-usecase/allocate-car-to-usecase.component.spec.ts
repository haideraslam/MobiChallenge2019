import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateCarToUsecaseComponent } from './allocate-car-to-usecase.component';

describe('AllocateCarToUsecaseComponent', () => {
  let component: AllocateCarToUsecaseComponent;
  let fixture: ComponentFixture<AllocateCarToUsecaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateCarToUsecaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateCarToUsecaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
