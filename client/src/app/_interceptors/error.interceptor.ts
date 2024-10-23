import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const router= inject(Router);
  const toastr= inject(ToastrService);
  return next(request).pipe(
    catchError((error:HttpErrorResponse)=>{
      if(error){
        switch(error.status){
          case 400:
            if(error.error.errors){
              const modelStatErrors: string[]=[];
              for(const key in error.error.errors){
                if(error.error.errors[key]){
                  modelStatErrors.push(error.error.errors[key])
                }
              }
              toastr.error('Validation errors occured');
              return throwError(() => modelStatErrors.flat());
          }else{
              toastr.error(error.error, error.status.toString());
          }
          break;
          case 401:
            toastr.error(error.error,error.status.toString());
            break;
          case 404: 
            router.navigateByUrl('/not-found');
            break;
          case 500:
             const navigationExtras: NavigationExtras={state:{error:error.error}};
             router.navigateByUrl('/server-error',navigationExtras);
             break;
           default:
            // toastr.error('Something went wrong');
            console.log(error);
            break;
        }
      }
      return throwError(()=>error);
    })
  )
};
