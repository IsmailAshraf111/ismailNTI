import { Component, inject, OnInit } from '@angular/core';
import { ContactMeService } from '../../services/contact-me.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IContact } from '../../models/icontact';
import { InputComponent } from '../../../../shared/input/input.component';
import { IGetContact } from '../../models/iget-contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-me-management',
  templateUrl: './contact-me-management.component.html',
  styleUrls: ['./contact-me-management.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, InputComponent],
})
export class ContactMeManagementComponent implements OnInit {
  contactData: IContact = {} as IContact;
  GetContactData: IGetContact = {} as IGetContact;

  contactForm!: FormGroup;
  private contactService = inject(ContactMeService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.contactForm = this.fb.group({
      headerContact: ['', [Validators.required]],
      description: ['', [Validators.required]],
      titleBox: ['', [Validators.required]],
      descriptionBox: ['', [Validators.required]],
      linkIconOne: ['', [Validators.required]],
      descIconOne: ['', [Validators.required]],
      iconeOne: ['', [Validators.required]],
      linkIconTwo: ['', [Validators.required]],
      descIconTwo: ['', [Validators.required]],
      iconeTwo: ['', [Validators.required]],
      _id: [''],
    });
  }

  ngOnInit(): void {
    this.contactService.getContact().subscribe((data) => {
      this.GetContactData = data;
      this.contactForm.patchValue({
        headerContact: this.GetContactData.headerContact,
        description: this.GetContactData.description,
        titleBox: this.GetContactData.titleBox,
        descriptionBox: this.GetContactData.descriptionBox,
        linkIconOne: this.GetContactData.linkIconOne,
        descIconOne: this.GetContactData.descIconOne,
        iconeOne: this.GetContactData.iconeOne,
        linkIconTwo: this.GetContactData.linkIconTwo,
        descIconTwo: this.GetContactData.descIconTwo,
        iconeTwo: this.GetContactData.iconeTwo,
        _id: this.GetContactData._id,
      });
    });
  }

  onSubmit(): void {
    const formData: IContact = {
      headerContact: this.contactForm.value.headerContact,
      description: this.contactForm.value.description,
      titleBox: this.contactForm.value.titleBox,
      descriptionBox: this.contactForm.value.descriptionBox,
      linkIconOne: this.contactForm.value.linkIconOne,
      descIconOne: this.contactForm.value.descIconOne,
      iconeOne: this.contactForm.value.iconeOne,
      linkIconTwo: this.contactForm.value.linkIconTwo,
      descIconTwo: this.contactForm.value.descIconTwo,
      iconeTwo: this.contactForm.value.iconeTwo,
    };
    const formDataUpdate: IGetContact = {
      ...formData,
      _id: this.contactForm.value._id,
    };

    if (formDataUpdate._id) {
      this.contactService
        .updateContact(this.GetContactData._id, formDataUpdate)
        .subscribe((data) => {
          console.log('Contact updated successfully!', data);
          this.router.navigate(['/contact-me']);
        });
    } else {
      this.contactService.createContact(formData).subscribe((data) => {
        this.contactData = data;
        console.log('Contact created successfully!', data);
        this.router.navigate(['/contact-me']);

      });
    }
  }
}
