import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineEditorToolbarComponent } from './pipeline-editor-toolbar.component';

describe('PipelineEditorToolbarComponent', () => {
  let component: PipelineEditorToolbarComponent;
  let fixture: ComponentFixture<PipelineEditorToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineEditorToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineEditorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
