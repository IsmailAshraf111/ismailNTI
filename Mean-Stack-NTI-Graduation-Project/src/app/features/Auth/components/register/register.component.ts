import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../../shared/input/input.component';
import { AuthAdminService } from '../../services/auth-admin.service';
import { Router } from '@angular/router';
import { emailValidator } from '../../../../shared/validators/email.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [ReactiveFormsModule, InputComponent],
})
export class RegisterComponent {
  register!: FormGroup;

  private fb = inject(FormBuilder);
  private authUsers = inject(AuthService);
  private router = inject(Router);

  message: string = '';
  isSuccess: boolean = false;
  isLoading: boolean = false;

  constructor() {
    // role: new FormControl('user');

    this.register = this.fb.group({
      // fullName: ['', [Validators.required]],
      email: ['',[ Validators.required, emailValidator()]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required]],
      // PhoneNumber: ['',[ Validators.required]],
      // Gender: ['', [Validators.required]],
      // DateOfBirth: ['', [Validators.required]],
    });
  }

  onsubmit() {
    const registerData = this.register.value;
    this.authUsers.register(registerData).subscribe({
      next(data) {
        if(data && data.token){
          localStorage.setItem('token', data.token);
        }
       
      },
    })
  }
 
}
