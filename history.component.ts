import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  speechLogs: any[] = [];
  searchText: string = '';

  editId: number | null = null;
  editText: string = '';
  recognition: any;
  isRecording: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  get filteredLogs() {
    if (!this.searchText.trim()) return this.speechLogs;
    return this.speechLogs.filter(log =>
      log.text.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  loadHistory() {
    debugger;
    this.http.get<any[]>('http://localhost:3000/speechLogs').subscribe({
      next: (data) => {
        console.log('📜 History Data:', JSON.stringify(data));
        this.speechLogs = data;
      },
      error: (err) => {
        console.error('❌ Error fetching history:', err);
        alert('Failed to load history.');
      }
    });
  }

  startEdit(log: any) {
    this.editId = log.id;
    this.editText = log.text;
  }

  cancelEdit() {
    this.editId = null;
    this.editText = '';
    if (this.isRecording) this.stopSpeechUpdate();
  }

  saveEdit(log: any) {
    debugger;
    const updatedLog = { ...log, text: this.editText };
    console.log('🔄 Updating Entry:', JSON.stringify(updatedLog));

    this.http.put(`http://localhost:3000/speechLogs/${log.id}`, updatedLog).subscribe({
      next: () => {
        alert('✅ Entry updated successfully!');
        this.editId = null;
        this.loadHistory();
      },
      error: (err) => {
        alert('❌ Error updating entry');
        console.error(err);
      }
    });
  }

  deleteEntry(id: number) {
    debugger;
    if (confirm('Are you sure you want to delete this entry?')) {
      console.log('🗑️ Deleting Entry ID:', id);
      this.http.delete(`http://localhost:3000/speechLogs/${id}`).subscribe({
        next: () => {
          alert('✅ Entry deleted successfully!');
          this.loadHistory();
        },
        error: (err) => {
          alert('❌ Error deleting entry');
          console.error(err);
        }
      });
    }
  }

  // 🎤 Speech-to-Text for editing
  startSpeechUpdate() {
    debugger;
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      let transcript = event.results[event.results.length - 1][0].transcript;
      this.editText += ' ' + transcript;
      console.log('🎤 Update Transcript:', transcript);
    };

    this.recognition.onerror = (err: any) => {
      console.error('Speech recognition error:', err);
    };

    this.recognition.start();
    this.isRecording = true;
    console.log('🎤 Update recording started');
  }

  stopSpeechUpdate() {
    debugger;
    if (this.recognition) {
      this.recognition.stop();
      this.isRecording = false;
      console.log('⏹ Update recording stopped');
    }
  }
}
