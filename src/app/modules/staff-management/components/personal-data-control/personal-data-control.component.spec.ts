import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataControlComponent } from './personal-data-control.component';

describe('PersonalDataControlComponent', () => {
  let component: PersonalDataControlComponent;
  let fixture: ComponentFixture<PersonalDataControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDataControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDataControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
