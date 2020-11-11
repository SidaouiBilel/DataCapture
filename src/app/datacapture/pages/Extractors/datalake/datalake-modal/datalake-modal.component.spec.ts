import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatalakeModalComponent } from './datalake-modal.component';

describe('DatalakeModalComponent', () => {
  let component: DatalakeModalComponent;
  let fixture: ComponentFixture<DatalakeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatalakeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatalakeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
