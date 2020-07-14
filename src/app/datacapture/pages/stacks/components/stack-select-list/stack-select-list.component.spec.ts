import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackSelectListComponent } from './stack-select-list.component';

describe('StackSelectListComponent', () => {
  let component: StackSelectListComponent;
  let fixture: ComponentFixture<StackSelectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackSelectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
