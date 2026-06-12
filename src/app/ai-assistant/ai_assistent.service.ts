import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiService } from '../core/service/api.service';
import { API_END_POINT } from '../core/constants/global.constant';
import { Observable } from 'rxjs';
import { ApiType } from '../shared/enum/ApiType';

@Injectable({
  providedIn: 'root',
})
export class AiAssistent {
    // api = 'http://localhost:8000';
    private api_service = inject(ApiService)

 uploadPdf(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.api_service.post(API_END_POINT.UPLOAD_PDF, formData,ApiType.AI);
  }

  ask(query: string) {
    return this.api_service.post(`${API_END_POINT.CHAT_API}/query`,
    {
        query
      }
    );
  }
}
