import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPreviewComponent } from './header-preview.component';

describe('HeaderPreviewComponent', () => {
  let component: HeaderPreviewComponent;
  let fixture: ComponentFixture<HeaderPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
