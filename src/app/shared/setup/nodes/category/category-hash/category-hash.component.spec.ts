import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHashComponent } from './category-hash.component';

describe('CategoryHashComponent', () => {
  let component: CategoryHashComponent;
  let fixture: ComponentFixture<CategoryHashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryHashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
