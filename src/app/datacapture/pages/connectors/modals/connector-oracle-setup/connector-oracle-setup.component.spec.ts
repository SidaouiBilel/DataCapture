import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorOracleSetupComponent } from './connector-oracle-setup.component';

describe('ConnectorOracleSetupComponent', () => {
  let component: ConnectorOracleSetupComponent;
  let fixture: ComponentFixture<ConnectorOracleSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectorOracleSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorOracleSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
