var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
let Resident = class Resident {
    name;
    email;
    phone;
    cpf;
    address;
    apartment;
    propertyId;
    moveInDate;
    moveOutDate;
    isActive;
    deletedAt;
    createdAt;
    updatedAt;
};
__decorate([
    Prop({ required: true }),
    __metadata("design:type", String)
], Resident.prototype, "name", void 0);
__decorate([
    Prop({ required: true, unique: true, lowercase: true }),
    __metadata("design:type", String)
], Resident.prototype, "email", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", String)
], Resident.prototype, "phone", void 0);
__decorate([
    Prop(),
    __metadata("design:type", String)
], Resident.prototype, "cpf", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", String)
], Resident.prototype, "address", void 0);
__decorate([
    Prop(),
    __metadata("design:type", String)
], Resident.prototype, "apartment", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", String)
], Resident.prototype, "propertyId", void 0);
__decorate([
    Prop({ type: Date, required: true }),
    __metadata("design:type", Date)
], Resident.prototype, "moveInDate", void 0);
__decorate([
    Prop({ type: Date }),
    __metadata("design:type", Date)
], Resident.prototype, "moveOutDate", void 0);
__decorate([
    Prop({ default: true }),
    __metadata("design:type", Boolean)
], Resident.prototype, "isActive", void 0);
__decorate([
    Prop({ type: Date, default: null, sparse: true }),
    __metadata("design:type", Object)
], Resident.prototype, "deletedAt", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Date)
], Resident.prototype, "createdAt", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Date)
], Resident.prototype, "updatedAt", void 0);
Resident = __decorate([
    Schema({ timestamps: true, collection: 'residents' })
], Resident);
export { Resident };
export const ResidentSchema = SchemaFactory.createForClass(Resident);
ResidentSchema.index({ createdAt: -1 });
ResidentSchema.index({ isActive: 1 });
ResidentSchema.index({ propertyId: 1 });
//# sourceMappingURL=resident.schema.js.map