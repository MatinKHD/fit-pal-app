import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

import { AuthService } from "../../services/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  canActivate() {
    if( !this.authService.auth()?.authenticated ) this.router.navigate(['/auth/login']);
    return !! this.authService.auth()?.authenticated;
  }
}
