import { Component, OnInit } from '@angular/core';
import { ContactMeService } from '../../services/contact-me.service';

@Component({
    selector: 'app-contact-me-management',
    templateUrl: './contact-me-management.component.html',
    styleUrls: ['./contact-me-management.component.css'],
    standalone: false
})
export class ContactMeManagementComponent implements OnInit {
  contact: any = {};

  constructor(private contactService: ContactMeService) {}

  ngOnInit(): void {
    this.contactService.getContact().subscribe((data) => {
      this.contact = data;
    });
  }

  updateContact(): void {
    this.contactService
      .updateContact(this.contact._id, this.contact)
      .subscribe((data) => {
        console.log('Contact updated successfully!', data);
      });
  }
}
