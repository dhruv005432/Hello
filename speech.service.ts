import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SpeechLog {
  id?: number;
  transcript: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private apiUrl = 'http://localhost:3000/speechLogs';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<SpeechLog[]> {
    return this.http.get<SpeechLog[]>(this.apiUrl);
  }

  saveLog(log: SpeechLog): Observable<SpeechLog> {
    return this.http.post<SpeechLog>(this.apiUrl, log);
  }
}
