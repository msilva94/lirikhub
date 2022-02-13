import { Component, OnInit } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { DarkmodeService } from '../../services/darkmode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;
  isError:boolean;
  message:String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private titleService:Title,
    private darkmodeService:DarkmodeService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Authenticate - LIRIK Hub');
    this.isError = false;
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token);
        this.router.navigate(['/']);
      } else {
        this.isError = true;
        this.message = data.msg;
      }
    });
  }
}
