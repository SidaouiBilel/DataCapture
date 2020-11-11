import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatalakeContainerComponent } from './datalake-container.component';

describe('DatalakeContainerComponent', () => {
  let component: DatalakeContainerComponent;
  let fixture: ComponentFixture<DatalakeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatalakeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatalakeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
