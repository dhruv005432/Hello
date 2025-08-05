import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  recognition: any;
  isListening = false;
  aboutText: string = '';

  constructor(private ngZone: NgZone) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            this.aboutText += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        this.ngZone.run(() => {
          this.aboutText = this.aboutText + interimTranscript;
        });
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event);
        alert('Speech recognition error: ' + event.error);
      };
    } else {
      alert('Your browser does not support Speech Recognition.');
    }
  }

  startListening() {
    if (this.recognition) {
      this.aboutText = '';
      this.recognition.start();
      this.isListening = true;
    }
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}
