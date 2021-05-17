import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersInputComponent } from './headers-input.component';

describe('HeadersInputComponent', () => {
  let component: HeadersInputComponent;
  let fixture: ComponentFixture<HeadersInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadersInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
