import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toster = inject(ToastrService);
    success(msg: string) {
      this.toster.success(msg);
  }

  error(msg: string) {
    this.toster.error(msg);
  }

  warning(msg: string) {
    this.toster.warning(msg);
  }
}
