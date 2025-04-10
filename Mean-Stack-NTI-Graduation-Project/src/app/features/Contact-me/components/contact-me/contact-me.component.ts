import { Component, inject, OnInit } from '@angular/core';
import { ContactMeService } from '../../services/contact-me.service';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IGetContact } from '../../models/iget-contact';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TranslatePipe } from '@ngx-translate/core';
import { InputComponent } from '../../../../shared/input/input.component';
@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    ProgressSpinnerModule,
    ButtonModule,
    TranslatePipe,
    InputComponent,
    ReactiveFormsModule,
  ],
})
export class ContactMeComponent implements OnInit {
    // homeData: IHome = {} as IHome;

  contact: IGetContact = {} as IGetContact;
  private contactService = inject(ContactMeService);
  private fb = inject(FormBuilder);
  contactWhatsapp = { name: '', message: '' };
  whatsappForm: FormGroup;

  constructor() {
    this.whatsappForm = this.fb.group({
      name: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.contactService.getContact().subscribe((data) => {
      this.contact = data;
      // console.log(
      //   'phone numbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbber',
      //   this.contact.phoneNumber
      // );
    });
  }

  sendWhatsappMessage() {
    if (this.whatsappForm.value) {
      const name = this.whatsappForm.get('name')?.value;
      const message = this.whatsappForm.get('message')?.value;
      const fullMessage = `Hi, my name is ${name}. ${message}`;
      const encodedMsg = encodeURIComponent(fullMessage);
      const phone = '201120012415';
      window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
    }
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
