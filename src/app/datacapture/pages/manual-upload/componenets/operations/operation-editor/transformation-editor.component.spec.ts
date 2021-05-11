import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformationEditorComponent } from './transformation-editor.component';

describe('TransformationEditorComponent', () => {
  let component: TransformationEditorComponent;
  let fixture: ComponentFixture<TransformationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransformationEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
