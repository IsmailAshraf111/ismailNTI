import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

export const toastrInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(ToastrService);
  const method = req.method;



  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          let message :string = '';
          switch(method) {
            case 'GET':
              message = 'Data retrieved successfully';
              break;
            case 'POST':
              message = 'Data created successfully';
              break;
            case 'PUT':
              message = 'Data updated successfully';
              break;
            case 'DELETE':
              message = 'Data deleted successfully';
              break;
          }
          toastr.success(message);
        }
      },
      error: (err) => {
        toastr.error('Error', 'Request failed');
      }
    })
  )
};
