import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsuDataEditorComponent } from './rsu-data-editor.component';

describe('RsuDataEditorComponent', () => {
  let component: RsuDataEditorComponent;
  let fixture: ComponentFixture<RsuDataEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RsuDataEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsuDataEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
