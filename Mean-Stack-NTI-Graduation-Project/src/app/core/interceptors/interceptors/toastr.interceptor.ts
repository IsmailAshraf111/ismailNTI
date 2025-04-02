import { HttpInterceptorFn } from '@angular/common/http';

export const toastrInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
