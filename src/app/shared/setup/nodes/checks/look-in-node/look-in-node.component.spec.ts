import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookInNodeComponent } from './look-in-node.component';

describe('LookInNodeComponent', () => {
  let component: LookInNodeComponent;
  let fixture: ComponentFixture<LookInNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookInNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookInNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
