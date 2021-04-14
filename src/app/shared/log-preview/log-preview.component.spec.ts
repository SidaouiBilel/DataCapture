import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogPreviewComponent } from './log-preview.component';

describe('LogPreviewComponent', () => {
  let component: LogPreviewComponent;
  let fixture: ComponentFixture<LogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
