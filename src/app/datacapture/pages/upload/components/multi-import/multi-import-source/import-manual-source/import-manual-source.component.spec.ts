import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportManualSourceComponent } from './import-manual-source.component';

describe('ImportManualSourceComponent', () => {
  let component: ImportManualSourceComponent;
  let fixture: ComponentFixture<ImportManualSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportManualSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportManualSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
