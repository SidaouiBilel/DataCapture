import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookInComponent } from './look-in.component';

describe('LookInComponent', () => {
  let component: LookInComponent;
  let fixture: ComponentFixture<LookInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
