import { Component, OnInit } from '@angular/core';
import { ContactMeService } from '../../services/contact-me.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IGetContact } from '../../models/iget-contact';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
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
    FormsModule,
    CommonModule,
    RouterLink,
    ButtonModule,

  ],
})
export class ContactMeComponent implements OnInit {
  contact: IGetContact = {} as IGetContact;

  constructor(private contactService: ContactMeService) {}

  ngOnInit(): void {
    this.contactService.getContact().subscribe((data) => {
      this.contact = data;
    });
  }
}
