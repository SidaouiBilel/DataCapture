import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDataResultComponent } from './upload-data-result.component';

describe('UploadDataResultComponent', () => {
  let component: UploadDataResultComponent;
  let fixture: ComponentFixture<UploadDataResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDataResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDataResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
