var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication.service';
var RolUserGuard = /** @class */ (function () {
    function RolUserGuard(_authService, router) {
        this._authService = _authService;
        this.router = router;
    }
    RolUserGuard.prototype.canActivate = function (next, state) {
        if (this._authService.esRol('ROLE_USUARIO')) {
            return true;
        }
        swal.fire({
            title: 'Error',
            text: 'No tienes Permisos para ingresar a la página solicitada',
            type: 'error',
            allowOutsideClick: false,
            allowEscapeKey: false
        });
        return false;
    };
    RolUserGuard.prototype.canLoad = function (route, segments) {
        if (this._authService.esRol('ROLE_USUARIO')) {
            return true;
        }
        return false;
    };
    RolUserGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthenticationService,
            Router])
    ], RolUserGuard);
    return RolUserGuard;
}());
export { RolUserGuard };
//# sourceMappingURL=rol-user.guard.js.map