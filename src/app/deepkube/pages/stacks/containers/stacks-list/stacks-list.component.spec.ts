import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StacksListComponent } from './stacks-list.component';

describe('StacksListComponent', () => {
  let component: StacksListComponent;
  let fixture: ComponentFixture<StacksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StacksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StacksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
