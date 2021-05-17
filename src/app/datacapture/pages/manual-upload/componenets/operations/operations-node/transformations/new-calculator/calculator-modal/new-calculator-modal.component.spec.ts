import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCalculatorModalComponent } from './new-calculator-modal.component';

describe('NewCalculatorModalComponent', () => {
  let component: NewCalculatorModalComponent;
  let fixture: ComponentFixture<NewCalculatorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCalculatorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCalculatorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
