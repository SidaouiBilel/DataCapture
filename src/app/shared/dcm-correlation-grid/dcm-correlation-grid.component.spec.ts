import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcmCorrelationGridComponent } from './dcm-correlation-grid.component';

describe('DcmCorrelationGridComponent', () => {
  let component: DcmCorrelationGridComponent;
  let fixture: ComponentFixture<DcmCorrelationGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcmCorrelationGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcmCorrelationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
