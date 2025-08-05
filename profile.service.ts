import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/users'; // using users table from db.json

  constructor(private http: HttpClient) {}

  getProfile(email: string): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}?email=${email}`);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/${profile.id}`, profile);
  }
}
