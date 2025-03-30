import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthAdminService } from '../../services/auth-admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  msg: String = '';

  constructor(private authService: AuthAdminService, private router: Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.myForm.valid) {
      const { username, password } = this.myForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          if (response && response.token) {
            console.log('Log in successful:', response);
            localStorage.setItem('token', response.token);
            this.msg = 'Login successful';
            this.router.navigate(['/dashboard'])
          } else{
            this.msg = 'Ue=nexpected response from server'
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          this.msg = 'Invalid username or password';
        },
      });
    } else {
      this.msg = 'paease fill all fields correctly';
    }
  }
}
