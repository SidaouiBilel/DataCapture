import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechMappingComponent } from './tech-mapping.component';

describe('TechMappingComponent', () => {
  let component: TechMappingComponent;
  let fixture: ComponentFixture<TechMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
