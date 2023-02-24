import { Component, Input } from '@angular/core';
import { faAddressCard, faPhone, faMailBulk, faGlobe } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Input() contact:any
  icons = {
    faAddressCard,
    faPhone,
    faMailBulk,
    faGlobe
  }
}
