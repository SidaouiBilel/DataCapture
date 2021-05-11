import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PycodeComponent } from './pycode.component';

describe('PycodeComponent', () => {
  let component: PycodeComponent;
  let fixture: ComponentFixture<PycodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PycodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
