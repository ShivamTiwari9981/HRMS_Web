import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { inject } from '@angular/core';

export const onboardingGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  const isCompleted =
    storageService.IsCompanyProfieCompete();

  if (!isCompleted) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
