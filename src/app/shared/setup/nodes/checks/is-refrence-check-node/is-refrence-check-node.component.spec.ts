import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsRefrenceCheckNodeComponent } from './is-refrence-check-node.component';

describe('IsRefrenceCheckNodeComponent', () => {
  let component: IsRefrenceCheckNodeComponent;
  let fixture: ComponentFixture<IsRefrenceCheckNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsRefrenceCheckNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsRefrenceCheckNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
