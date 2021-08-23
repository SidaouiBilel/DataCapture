import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDatasinkModalComponent } from './export-datasink-modal.component';

describe('ExportDatasinkModalComponent', () => {
  let component: ExportDatasinkModalComponent;
  let fixture: ComponentFixture<ExportDatasinkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportDatasinkModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDatasinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
