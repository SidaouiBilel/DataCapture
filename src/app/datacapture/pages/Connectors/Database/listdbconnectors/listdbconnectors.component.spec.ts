import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdbconnectorsComponent } from './listdbconnectors.component';

describe('ListdbconnectorsComponent', () => {
  let component: ListdbconnectorsComponent;
  let fixture: ComponentFixture<ListdbconnectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdbconnectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdbconnectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
