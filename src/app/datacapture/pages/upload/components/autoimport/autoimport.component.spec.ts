import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoimportComponent } from './autoimport.component';

describe('AutoimportComponent', () => {
  let component: AutoimportComponent;
  let fixture: ComponentFixture<AutoimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
