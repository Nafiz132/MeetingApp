import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';  
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService); 
  const toastr = inject(ToastrService);  

  return accountService.currentUser$.pipe(
    map(user => {
      if (user) {
        return true;
      } else {
        // toastr.error('access denied!',undefined, {
        //   timeOut: 1000,
        //   positionClass: 'toast-bottom-right' 
        // });
        return false;
      }
    })
  );
};