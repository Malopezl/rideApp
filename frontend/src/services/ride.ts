import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ride } from "src/models/ride";

@Injectable()
export class RideService {
  private url = 'http://localhost:1337/ride';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<[Ride]> {
    let token = localStorage.getItem('jwt');
    return this.http.get(this.url, {
      headers: { 'Authorization': `${token}` }
    }) as Observable<[Ride]>;
  }

  public create(ride: Ride) {
    return this.http.post(this.url, ride);
  }

  public update(ride: Ride) {
    return this.http.put(`${this.url}/${ride.id}`, ride);
  }

  public getById(id: string): Observable<Ride> {
    let token = localStorage.getItem('jwt');
    return this.http.get(`${this.url}/${id}`, {
      headers: { 'Authorization': `${token}` }
    }) as Observable<Ride>;
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
