import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Credential } from "src/models/credential";

@Injectable()
export class AuthenticationService {
  private url = 'http://localhost:1337/user';

  constructor(private http: HttpClient) { }

  public login(credentials: Credential) {
    return this.http.post(`${this.url}/login`, credentials);
  }

  public signup(credentials: Credential) {
    return this.http.post(`${this.url}/signup`, credentials);
  }

}
