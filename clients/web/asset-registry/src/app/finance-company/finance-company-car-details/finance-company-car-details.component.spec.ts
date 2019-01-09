import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceCompanyCarDetailsComponent } from './finance-company-car-details.component';

describe('FinanceCompanyCarDetailsComponent', () => {
  let component: FinanceCompanyCarDetailsComponent;
  let fixture: ComponentFixture<FinanceCompanyCarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceCompanyCarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceCompanyCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
