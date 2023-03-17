import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles: Array<string>;

  constructor(private fb: FormBuilder, private apiService: APIService, private router: Router) {
    this.registerForm = this.createForm();
    this.roles = apiService.roles;
  }

  createForm() {
    return this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      role: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: [RegisterComponent.match('password', 'confirmPassword')]
    });
  }

  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.apiService.register({
      name:     this.registerForm.get('name')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      address:  this.registerForm.get('address')?.value,
      phone:    this.registerForm.get('phone')?.value
    }).subscribe((res) => {
      this.router.navigate(["/login"]);
    });
  }

}
