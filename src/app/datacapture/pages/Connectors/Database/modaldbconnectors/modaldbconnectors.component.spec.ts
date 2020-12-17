import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldbconnectorsComponent } from './modaldbconnectors.component';

describe('ModaldbconnectorsComponent', () => {
  let component: ModaldbconnectorsComponent;
  let fixture: ComponentFixture<ModaldbconnectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldbconnectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldbconnectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
