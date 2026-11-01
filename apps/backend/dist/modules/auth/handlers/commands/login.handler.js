var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../../commands/impl/login.command.js';
import { AuthService } from '../../auth.service.js';
let LoginHandler = class LoginHandler {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async execute(command) {
        return this.authService.login(command.loginDto);
    }
};
LoginHandler = __decorate([
    CommandHandler(LoginCommand),
    __metadata("design:paramtypes", [AuthService])
], LoginHandler);
export { LoginHandler };
//# sourceMappingURL=login.handler.js.map