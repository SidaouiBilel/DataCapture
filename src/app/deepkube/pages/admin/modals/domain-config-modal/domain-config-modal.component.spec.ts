import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainConfigModalComponent } from './domain-config-modal.component';

describe('DomainConfigModalComponent', () => {
  let component: DomainConfigModalComponent;
  let fixture: ComponentFixture<DomainConfigModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainConfigModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
