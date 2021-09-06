import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeStatisticsComponent } from './node-statistics.component';

describe('NodeStatisticsComponent', () => {
  let component: NodeStatisticsComponent;
  let fixture: ComponentFixture<NodeStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
