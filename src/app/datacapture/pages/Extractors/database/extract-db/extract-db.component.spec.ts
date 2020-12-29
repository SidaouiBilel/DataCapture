import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractDBComponent } from './extract-db.component';

describe('ExtractDBComponent', () => {
  let component: ExtractDBComponent;
  let fixture: ComponentFixture<ExtractDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtractDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
