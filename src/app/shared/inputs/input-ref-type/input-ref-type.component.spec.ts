import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRefTypeComponent } from './input-ref-type.component';

describe('InputRefTypeComponent', () => {
  let component: InputRefTypeComponent;
  let fixture: ComponentFixture<InputRefTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputRefTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRefTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
