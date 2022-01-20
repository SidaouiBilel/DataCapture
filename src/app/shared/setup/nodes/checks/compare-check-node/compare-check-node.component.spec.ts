import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareCheckNodeComponent } from './compare-check-node.component';

describe('CompareCheckNodeComponent', () => {
  let component: CompareCheckNodeComponent;
  let fixture: ComponentFixture<CompareCheckNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareCheckNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareCheckNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
