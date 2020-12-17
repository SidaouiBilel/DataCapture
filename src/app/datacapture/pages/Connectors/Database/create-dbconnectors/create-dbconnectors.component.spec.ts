import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDBconnectorsComponent } from './create-dbconnectors.component';

describe('CreateDBconnectorsComponent', () => {
  let component: CreateDBconnectorsComponent;
  let fixture: ComponentFixture<CreateDBconnectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDBconnectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDBconnectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
