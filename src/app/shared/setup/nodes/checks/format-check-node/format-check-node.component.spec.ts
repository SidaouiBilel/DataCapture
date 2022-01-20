import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatCheckNodeComponent } from './format-check-node.component';

describe('FormatCheckNodeComponent', () => {
  let component: FormatCheckNodeComponent;
  let fixture: ComponentFixture<FormatCheckNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatCheckNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatCheckNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
