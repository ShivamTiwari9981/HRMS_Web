import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { AiAssistent } from '../../ai_assistent.service';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-document-upload',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './document-upload.html',
  styleUrl: './document-upload.css',
})
export class DocumentUpload {
  private uploadService = inject(AiAssistent);

  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  selectedFile = signal<File | null>(null);
  isUploading = signal<boolean>(false);

   onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files[0]);
    }
  }

  triggerFileInput(): void {
    this.fileInput()?.nativeElement.click();
  }

  uploadFile(): void {
    const file = this.selectedFile();
    if (!file) return;

    this.isUploading.set(true);

    // Call the service method and subscribe to the network response
    this.uploadService.uploadPdf(file).subscribe({
      next: (response) => {
        console.log('Upload success:', response);
        this.selectedFile.set(null); // Clear selected file on success
      },
      error: (error) => {
        console.error('Upload failed:', error);
      },
      complete: () => {
        this.isUploading.set(false); // Reset loading state
      }
    });
  }
}

