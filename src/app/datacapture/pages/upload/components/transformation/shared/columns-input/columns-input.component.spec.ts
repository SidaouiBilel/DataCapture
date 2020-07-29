import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsInputComponent } from './columns-input.component';

describe('ColumnsInputComponent', () => {
  let component: ColumnsInputComponent;
  let fixture: ComponentFixture<ColumnsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
