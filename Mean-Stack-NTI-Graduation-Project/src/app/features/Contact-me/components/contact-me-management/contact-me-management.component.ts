import { Component, inject, OnInit } from '@angular/core';
import { ContactMeService } from '../../services/contact-me.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IContact } from '../../models/icontact';
import { InputComponent } from '../../../../shared/input/input.component';
import { IGetContact } from '../../models/iget-contact';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-me-management',
  templateUrl: './contact-me-management.component.html',
  styleUrls: ['./contact-me-management.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, InputComponent, TranslatePipe, ReactiveFormsModule],
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
      description: ['', [Validators.required]],
      boxTitle: ['', [Validators.required]],
      // iconOneLink: ['', [Validators.required]],
      // iconOneName: ['', [Validators.required]],
      // iconOne: ['', [Validators.required]],
      // IconTwoLink: ['', [Validators.required]],
      // IconTwoName: ['', [Validators.required]],
      // iconTwo: ['', [Validators.required]],
      // phoneNumber: ['', Validators.required],
      communication: this.fb.array([this.createCommunicationGroup()]),
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^20(10|11|12|15)[0-9]{8}$/)],
      ],
      _id: [''],
    });
  }

  createCommunicationGroup(): FormGroup {
    return this.fb.group({
      link: ['', [Validators.required]],
      name: ['', [Validators.required]],
      icon: ['', [Validators.required]],
    });
  }

  get communication(): FormArray {
    return this.contactForm.get('communication') as FormArray;
  }

  addCommunication() {
    this.communication.push(this.createCommunicationGroup());
  }

  removeCommunication(index: number): void {
    if (this.communication.length > 0) {
      this.communication.removeAt(index);
    }
  }

  ngOnInit(): void {
    this.contactService.getContact().subscribe((data) => {
      this.GetContactData = data;
      this.contactForm.patchValue({
        description: this.GetContactData.description,
        boxTitle: this.GetContactData.boxTitle,
        // iconOneLink: this.GetContactData.iconOneLink,
        // iconOneName: this.GetContactData.iconOneName,
        // iconOne: this.GetContactData.iconOne,
        // IconTwoLink: this.GetContactData.IconTwoLink,
        // IconTwoName: this.GetContactData.IconTwoName,
        // iconTwo: this.GetContactData.iconTwo,
        phoneNumber: this.GetContactData.phoneNumber,
        _id: this.GetContactData._id,

       
      });
      this.communication.clear()

      this.GetContactData.communication.forEach((commou)=>{
        this.communication.push(
          this.fb.group({
            link: [commou.link],
            name: [commou.name],
            icon: [commou.icon],
          })
        )

      })

    });
  }

  onSubmit(): void {
    const formData: IContact = {
      description: this.contactForm.value.description,
      boxTitle: this.contactForm.value.boxTitle,
      // iconOneLink: this.contactForm.value.iconOneLink,
      // iconOneName: this.contactForm.value.iconOneName,
      // iconOne: this.contactForm.value.iconOne,
      // IconTwoLink: this.contactForm.value.IconTwoLink,
      // IconTwoName: this.contactForm.value.IconTwoName,
      // iconTwo: this.contactForm.value.iconTwo,
      phoneNumber: this.contactForm.value.phoneNumber,
      communication: this.contactForm.value.communication
    
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

  getCommunicationGroup(index: number): FormGroup {
    return this.communication.at(index) as FormGroup;
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
