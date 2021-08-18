import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeCheckComponent } from './node-check.component';

describe('NodeCheckComponent', () => {
  let component: NodeCheckComponent;
  let fixture: ComponentFixture<NodeCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
