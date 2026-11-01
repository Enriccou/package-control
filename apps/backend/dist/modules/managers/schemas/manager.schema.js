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
let Manager = class Manager {
    name;
    email;
    password;
    role;
    isActive;
    deletedAt;
    createdAt;
    updatedAt;
};
__decorate([
    Prop({ required: true }),
    __metadata("design:type", String)
], Manager.prototype, "name", void 0);
__decorate([
    Prop({ required: true, unique: true, lowercase: true }),
    __metadata("design:type", String)
], Manager.prototype, "email", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", String)
], Manager.prototype, "password", void 0);
__decorate([
    Prop({ required: true, enum: ['ADMIN', 'MANAGER'], default: 'MANAGER' }),
    __metadata("design:type", String)
], Manager.prototype, "role", void 0);
__decorate([
    Prop({ default: true }),
    __metadata("design:type", Boolean)
], Manager.prototype, "isActive", void 0);
__decorate([
    Prop({ type: Date, default: null, sparse: true }),
    __metadata("design:type", Object)
], Manager.prototype, "deletedAt", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Date)
], Manager.prototype, "createdAt", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Date)
], Manager.prototype, "updatedAt", void 0);
Manager = __decorate([
    Schema({ timestamps: true, collection: 'managers' })
], Manager);
export { Manager };
export const ManagerSchema = SchemaFactory.createForClass(Manager);
ManagerSchema.index({ createdAt: -1 });
ManagerSchema.index({ isActive: 1 });
//# sourceMappingURL=manager.schema.js.map