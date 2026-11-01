var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsOptional, IsString, MinLength, MaxLength, IsDateString, Matches } from 'class-validator';
export class UpdateResidentDto {
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
    IsOptional(),
    IsString(),
    MinLength(3),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateResidentDto.prototype, "name", void 0);
__decorate([
    IsOptional(),
    IsEmail(),
    __metadata("design:type", String)
], UpdateResidentDto.prototype, "email", void 0);
__decorate([
    IsOptional(),
    IsString(),
    Matches(/^\d{10,11}$/),
    __metadata("design:type", String)
], UpdateResidentDto.prototype, "phone", void 0);
__decorate([
    IsOptional(),
    IsString(),
    Matches(/^\d{11}$/),
    __metadata("design:type", String)
], UpdateResidentDto.prototype, "cpf", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MinLength(5),
    __metadata("design:type", String)
], UpdateResidentDto.prototype, "address", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateResidentDto.prototype, "apartment", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateResidentDto.prototype, "propertyId", void 0);
__decorate([
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], UpdateResidentDto.prototype, "moveInDate", void 0);
__decorate([
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], UpdateResidentDto.prototype, "moveOutDate", void 0);
//# sourceMappingURL=update-resident.dto.js.map