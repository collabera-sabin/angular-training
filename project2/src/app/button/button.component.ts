import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = ""
  @Input() isBack: boolean = false

  constructor(private router: Router, private location: Location) {}

  click() {
    if (this.isBack) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
