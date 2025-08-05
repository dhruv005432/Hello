import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent {
  recognition: any;
  isListening = false;
  transcript: string = '';
  apiUrl = 'http://localhost:3000/speechLogs'; // json-server endpoint

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const piece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            this.transcript += piece + ' ';
            this.saveSpeech(piece);
          } else {
            interimTranscript += piece;
          }
        }
      };

      this.recognition.onerror = (err: any) => {
        console.error('Speech recognition error:', err);
        this.snackBar.open('Speech recognition error', 'Close', { duration: 3000 });
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          this.recognition.start(); // keep listening
        }
      };
    } else {
      this.snackBar.open('Speech recognition not supported in this browser', 'Close', { duration: 4000 });
    }
  }

  toggleListening() {
    if (this.isListening) {
      this.isListening = false;
      this.recognition.stop();
      this.snackBar.open('Stopped Listening 🎤', 'Close', { duration: 2000 });
    } else {
      this.isListening = true;
      this.recognition.start();
      this.snackBar.open('Started Listening 🎤', 'Close', { duration: 2000 });
    }
  }

  clearTranscript() {
    this.transcript = '';
    this.snackBar.open('Transcript cleared 🗑️', 'Close', { duration: 2000 });
  }

  updateTranscript() {
    if (!this.transcript.trim()) {
      this.snackBar.open('Transcript is empty. Nothing to update.', 'Close', { duration: 2500 });
      return;
    }
    const log = {
      text: this.transcript.trim(),
      timestamp: new Date().toISOString()
    };
    this.http.post(this.apiUrl, log).subscribe({
      next: () => {
        console.log('Transcript updated:', JSON.stringify(log));
        this.snackBar.open('Transcript updated ✅', 'Close', { duration: 2500 });
      },
      error: (err) => {
        console.error('Error updating transcript:', err);
        this.snackBar.open('Failed to update transcript ❌', 'Close', { duration: 2500 });
      }
    });
  }

  saveSpeech(text: string) {
    const log = {
      text: text,
      timestamp: new Date().toISOString()
    };
    this.http.post(this.apiUrl, log).subscribe({
      next: () => console.log('Saved speech piece:', JSON.stringify(log)),
      error: (err) => console.error('Error saving speech piece:', err)
    });
  }
}
