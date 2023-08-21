import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickCardComponent } from './click-card.component';

describe('ClickCardComponent', () => {
  let component: ClickCardComponent;
  let fixture: ComponentFixture<ClickCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
