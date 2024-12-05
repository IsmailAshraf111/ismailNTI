import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMeManagementComponent } from './contact-me-management.component';

describe('ContactMeManagementComponent', () => {
  let component: ContactMeManagementComponent;
  let fixture: ComponentFixture<ContactMeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactMeManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactMeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
