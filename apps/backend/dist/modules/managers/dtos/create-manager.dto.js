var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsEnum } from 'class-validator';
export var ManagerRole;
(function (ManagerRole) {
    ManagerRole["ADMIN"] = "ADMIN";
    ManagerRole["MANAGER"] = "MANAGER";
})(ManagerRole || (ManagerRole = {}));
export class CreateManagerDto {
    name;
    email;
    password;
    role = ManagerRole.MANAGER;
}
__decorate([
    IsNotEmpty({ message: 'Nome é obrigatório' }),
    IsString(),
    MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' }),
    __metadata("design:type", String)
], CreateManagerDto.prototype, "name", void 0);
__decorate([
    IsNotEmpty({ message: 'Email é obrigatório' }),
    IsEmail({}, { message: 'Email inválido' }),
    __metadata("design:type", String)
], CreateManagerDto.prototype, "email", void 0);
__decorate([
    IsNotEmpty({ message: 'Senha é obrigatória' }),
    IsString(),
    MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
    Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message: 'Senha deve conter maiúscula, minúscula, número e caractere especial (!@#$%^&*)',
    }),
    __metadata("design:type", String)
], CreateManagerDto.prototype, "password", void 0);
__decorate([
    IsEnum(ManagerRole, { message: 'Role deve ser ADMIN ou MANAGER' }),
    __metadata("design:type", String)
], CreateManagerDto.prototype, "role", void 0);
//# sourceMappingURL=create-manager.dto.js.map