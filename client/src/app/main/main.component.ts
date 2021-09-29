import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  error = null;
  form: FormGroup = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]]
  });
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }
  onSubmit() {
    this.error = null;
    if(this.form.invalid) return;
    
    this.userService.attemptAuth('login', this.form.value)
    .subscribe(res => {
      this.router.navigate(['/shopping']);
    }, err => this.error = err.error)
  }

}
