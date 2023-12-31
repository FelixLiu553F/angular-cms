import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkReportComponent } from './work-report.component';

describe('WorkReportComponent', () => {
  let component: WorkReportComponent;
  let fixture: ComponentFixture<WorkReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
