import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeStatisticsHcpComponent } from './node-statistics-hcp.component';

describe('NodeStatisticsHcpComponent', () => {
  let component: NodeStatisticsHcpComponent;
  let fixture: ComponentFixture<NodeStatisticsHcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeStatisticsHcpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeStatisticsHcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
