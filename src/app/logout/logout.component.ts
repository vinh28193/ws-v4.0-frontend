import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../core/service/auth.service';

@Component({
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(private _authService: AuthService, private router: Router) {}
  id = '';
  ngOnInit() {
    this.id = localStorage.getItem('token');
    this.logout();
  }

  logout() {
    this._authService.logout();
    this.router.navigate(['login']);
  }
}
