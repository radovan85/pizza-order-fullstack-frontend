import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

export var authInterceptor = axios.interceptors.request.use(
  config => {
    var authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `${authToken}`;
    }

    return config;
  });

export var suspensionInterceptor = axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 451) {
      alert(`Account suspended`);
      localStorage.clear();
      window.location.reload();
    }

    return Promise.reject(error);

  });



export var errorInterceptor = axios.interceptors.response.use(
  response => response,
  error => {

    if (error.response.status === 401) {
      localStorage.clear();
      window.location.reload();
    }

    return Promise.reject(error);

  });

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private targetUrl = `http://localhost:8080/`;

  constructor(private router: Router) { }

  isAdmin(): boolean {
    var role = localStorage.getItem(`role`);
    if (role) {
      if (role == "ADMIN") {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }


  isUser(): boolean {
    var role = localStorage.getItem(`role`);
    if (role) {
      if (role == "ROLE_USER") {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }


  isAuthenticated() {
    var returnValue = false;
    var authUser = localStorage.getItem('currentUser');
    var authToken = localStorage.getItem('authToken');
    if (authUser) {
      if (authToken) {
        returnValue = true;
      }
    }

    return returnValue;
  }

  logout() {
    localStorage.clear();
    this.router.navigate([`login`]);
  }

  getTargetUrl(): string {
    return this.targetUrl;
  }

}
