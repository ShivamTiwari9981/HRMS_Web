import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../service/loader.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.show();
   return next(req).pipe(
    // Hide loader when request completes or errors out
    finalize(() => loaderService.hide())
  );
};
