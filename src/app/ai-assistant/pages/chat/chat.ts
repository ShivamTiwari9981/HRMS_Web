import { Component } from '@angular/core';
import { AiAssistent } from '../../ai_assistent.service';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}
@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
query = '';

  selectedFile!: File;

  messages: any[] = [];

  constructor(
    private aiService: AiAssistent
  ) {}

  onFileSelected(event: any) {

    this.selectedFile =
      event.target.files[0];
  }

 

  sendMessage() {

    if (!this.query.trim()) {
      return;
    }

    const userQuery = this.query;

    this.messages.push({
      role: 'user',
      content: userQuery
    });

    this.query = '';

    this.aiService
      .ask(userQuery)
      .subscribe((response: any) => {

        this.messages.push({
          role: 'assistant',
          content: response.answer
        });

      });
  }
}
