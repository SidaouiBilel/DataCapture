import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeCorrelationComponent } from './node-correlation.component';

describe('NodeCorrelationComponent', () => {
  let component: NodeCorrelationComponent;
  let fixture: ComponentFixture<NodeCorrelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeCorrelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeCorrelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
