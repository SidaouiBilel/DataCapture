import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeCheckSocialComponent } from './node-check-social.component';

describe('NodeCheckSocialComponent', () => {
  let component: NodeCheckSocialComponent;
  let fixture: ComponentFixture<NodeCheckSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeCheckSocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeCheckSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
