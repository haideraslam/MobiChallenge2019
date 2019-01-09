import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationQueueComponent } from './application-queue.component';

describe('ApplicationQueueComponent', () => {
  let component: ApplicationQueueComponent;
  let fixture: ComponentFixture<ApplicationQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
