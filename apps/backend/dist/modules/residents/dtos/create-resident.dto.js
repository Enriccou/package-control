var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsDateString, IsOptional, Matches } from 'class-validator';
export class CreateResidentDto {
    name;
    email;
    phone;
    cpf;
    address;
    apartment;
    propertyId;
    moveInDate;
    moveOutDate;
}
__decorate([
    IsNotEmpty({ message: 'Nome é obrigatório' }),
    IsString(),
    MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' }),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "name", void 0);
__decorate([
    IsNotEmpty({ message: 'Email é obrigatório' }),
    IsEmail({}, { message: 'Email inválido' }),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "email", void 0);
__decorate([
    IsNotEmpty({ message: 'Telefone é obrigatório' }),
    IsString(),
    Matches(/^\d{10,11}$/, { message: 'Telefone deve ter 10 ou 11 dígitos' }),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "phone", void 0);
__decorate([
    IsOptional(),
    IsString(),
    Matches(/^\d{11}$/, { message: 'CPF deve ter 11 dígitos' }),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "cpf", void 0);
__decorate([
    IsNotEmpty({ message: 'Endereço é obrigatório' }),
    IsString(),
    MinLength(5),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "address", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "apartment", void 0);
__decorate([
    IsNotEmpty({ message: 'ID da propriedade é obrigatório' }),
    IsString(),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "propertyId", void 0);
__decorate([
    IsNotEmpty({ message: 'Data de mudança é obrigatória' }),
    IsDateString(),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "moveInDate", void 0);
__decorate([
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], CreateResidentDto.prototype, "moveOutDate", void 0);
//# sourceMappingURL=create-resident.dto.js.map