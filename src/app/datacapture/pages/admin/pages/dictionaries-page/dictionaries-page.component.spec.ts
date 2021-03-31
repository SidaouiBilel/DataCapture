import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionariesPageComponent } from './dictionaries-page.component';

describe('DictionariesPageComponent', () => {
  let component: DictionariesPageComponent;
  let fixture: ComponentFixture<DictionariesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionariesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionariesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
