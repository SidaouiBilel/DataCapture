import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatCheckComponent } from './format-check.component';

describe('FormatCheckComponent', () => {
  let component: FormatCheckComponent;
  let fixture: ComponentFixture<FormatCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
