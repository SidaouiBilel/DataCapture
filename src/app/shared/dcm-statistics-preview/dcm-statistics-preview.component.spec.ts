import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcmStatisticsPreviewComponent } from './dcm-statistics-preview.component';

describe('DcmStatisticsPreviewComponent', () => {
  let component: DcmStatisticsPreviewComponent;
  let fixture: ComponentFixture<DcmStatisticsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcmStatisticsPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcmStatisticsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
