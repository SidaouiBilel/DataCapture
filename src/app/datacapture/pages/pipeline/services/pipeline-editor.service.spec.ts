import { TestBed } from '@angular/core/testing';

import { PipelineEditorService } from './pipeline-editor.service';

describe('PipelineEditorService', () => {
  let service: PipelineEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipelineEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
