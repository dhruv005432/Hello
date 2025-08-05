import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  transcript: string = '';
  recognition: any;
  isListening: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const { webkitSpeechRecognition }: any = (window as any);
      if (webkitSpeechRecognition) {
        this.recognition = new webkitSpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        this.recognition.onresult = (event: any) => {
          let interim = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              this.transcript += event.results[i][0].transcript + ' ';
              this.saveSpeech(event.results[i][0].transcript);
            } else {
              interim += event.results[i][0].transcript;
            }
          }
        };

        this.recognition.onerror = () => {
          this.snackBar.open('Speech recognition error!', 'Close', { duration: 3000 });
        };
      }
    }
  }

  startListening() {
    if (this.recognition && !this.isListening) {
      this.recognition.start();
      this.isListening = true;
      this.snackBar.open('Listening started 🎤', 'Close', { duration: 2000 });
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      this.snackBar.open('Listening stopped ⏹️', 'Close', { duration: 2000 });
    }
  }

  clearTranscript() {
    this.transcript = '';
    this.snackBar.open('Transcript cleared 🗑️', 'Close', { duration: 2000 });
  }

  saveSpeech(text: string) {
    const speechLog = {
      text,
      timestamp: new Date().toISOString()
    };
    console.log('Saving speech log:', JSON.stringify(speechLog));
    debugger;

    // Save to db.json (JSON Server)
    this.http.post('http://localhost:3000/speechLogs', speechLog).subscribe({
      next: () => console.log('Speech log saved ✅'),
      error: (err) => console.error('Error saving speech log:', err)
    });
  }
}
