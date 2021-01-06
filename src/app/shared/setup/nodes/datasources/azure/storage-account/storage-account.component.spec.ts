import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageAccountComponent } from './storage-account.component';

describe('StorageAccountComponent', () => {
  let component: StorageAccountComponent;
  let fixture: ComponentFixture<StorageAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
