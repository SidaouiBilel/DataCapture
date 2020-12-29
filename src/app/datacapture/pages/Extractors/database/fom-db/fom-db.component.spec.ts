import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FomDbComponent } from './fom-db.component';

describe('FomDbComponent', () => {
  let component: FomDbComponent;
  let fixture: ComponentFixture<FomDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FomDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FomDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
