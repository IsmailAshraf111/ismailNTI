import { Component, OnInit } from '@angular/core';
import { ContactMeService } from '../../services/contact-me.service';
@Component({
    selector: 'app-contact-me',
    templateUrl: './contact-me.component.html',
    styleUrls: ['./contact-me.component.css'],
    standalone: false
})
export class ContactMeComponent implements OnInit {
  contact: any = {};

  constructor(private contactService: ContactMeService) {}

  ngOnInit(): void {
    this.contactService.getContact().subscribe((data) => {
      this.contact = data;
    });
  }
}
