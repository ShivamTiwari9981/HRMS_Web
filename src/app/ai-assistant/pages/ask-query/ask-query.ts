import { Component, inject } from '@angular/core';
import { AiAssistent } from '../../ai_assistent.service';

@Component({
  selector: 'app-ask-query',
  imports: [],
  templateUrl: './ask-query.html',
  styleUrl: './ask-query.css',
})
export class AskQuery {
   private assistent = inject(AiAssistent);
query = '';

answer = '';

ask() {

  this.assistent
    .ask(this.query)
    .subscribe((res: any) => {

      this.answer =
        res.answer;
    });
}
}
