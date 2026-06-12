import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentUpload } from './pages/document-upload/document-upload';
import { Chat } from './pages/chat/chat';

const routes: Routes = [
  {
     path: '',
     component: DocumentUpload
   },
    {
     path: 'chat',
     component: Chat
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AiAssistantRoutingModule { }
