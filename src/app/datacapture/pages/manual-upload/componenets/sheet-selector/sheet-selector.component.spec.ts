import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetSelectorComponent } from './sheet-selector.component';

describe('SheetSelectorComponent', () => {
  let component: SheetSelectorComponent;
  let fixture: ComponentFixture<SheetSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
