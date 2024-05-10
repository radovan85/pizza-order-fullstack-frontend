import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private targetUrl = `http://localhost:8080/api/users/`;
  private adminTargetUrl = `http://localhost:8080/api/admin/`;

  getCurrentUser() {
    return axios.get(`${this.targetUrl}currentUser`);
  }


  collectAllUsers() {
    return axios.get(`${this.adminTargetUrl}allUsers`);
  }

  async suspendUser(userId: any) {
    return await axios.get(`${this.adminTargetUrl}suspendUser/${userId}`);
  }

  async reactivateUser(userId: any) {
    return await axios.get(`${this.adminTargetUrl}reactivateUser/${userId}`);
  }

}
