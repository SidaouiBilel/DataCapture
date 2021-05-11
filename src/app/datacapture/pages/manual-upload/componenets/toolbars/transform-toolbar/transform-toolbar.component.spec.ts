import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformToolbarComponent } from './transform-toolbar.component';

describe('TransformToolbarComponent', () => {
  let component: TransformToolbarComponent;
  let fixture: ComponentFixture<TransformToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransformToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
