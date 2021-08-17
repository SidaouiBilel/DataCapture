import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsuCompositionComponent } from './rsu-composition.component';

describe('RsuCompositionComponent', () => {
  let component: RsuCompositionComponent;
  let fixture: ComponentFixture<RsuCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RsuCompositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsuCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
