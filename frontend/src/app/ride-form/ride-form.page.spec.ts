import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RideFormPage } from './ride-form.page';

describe('RideFormPage', () => {
  let component: RideFormPage;
  let fixture: ComponentFixture<RideFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RideFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
