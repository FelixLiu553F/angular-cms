import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationManagementComponent } from './vacation-management.component';

describe('VacationManagementComponent', () => {
  let component: VacationManagementComponent;
  let fixture: ComponentFixture<VacationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
