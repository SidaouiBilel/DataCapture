import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitCheckNodeComponent } from './limit-check-node.component';

describe('LimitCheckNodeComponent', () => {
  let component: LimitCheckNodeComponent;
  let fixture: ComponentFixture<LimitCheckNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitCheckNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitCheckNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
