import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformationToolbarComponent } from './transformation-toolbar.component';

describe('TransformationToolbarComponent', () => {
  let component: TransformationToolbarComponent;
  let fixture: ComponentFixture<TransformationToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformationToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformationToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
