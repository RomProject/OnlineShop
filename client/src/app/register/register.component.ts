import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error = null;
  form: FormGroup = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }
  onSubmit() {
    this.error = null;
    if(this.form.invalid) return;
    
    this.userService.attemptAuth('register', this.form.value)
    .subscribe(res => {
      this.router.navigate(['/shopping']);
    }, err => this.error = err.error)
  }


}
