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
import * as mongoose from 'mongoose';
export var PackageStatus;
(function (PackageStatus) {
    PackageStatus["RECEIVED"] = "received";
    PackageStatus["PENDING"] = "pending";
    PackageStatus["PICKED_UP"] = "picked_up";
    PackageStatus["FAILED"] = "failed";
})(PackageStatus || (PackageStatus = {}));
let Package = class Package {
    residentId;
    carrier;
    trackingNumber;
    description;
    status;
    receivedAt;
    pickupAt;
    notificationAttempts;
    lastNotificationAt;
    notificationConfirmedAt;
    notificationFailed;
    deletedAt;
    createdAt;
    updatedAt;
};
__decorate([
    Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Resident', required: true }),
    __metadata("design:type", String)
], Package.prototype, "residentId", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", String)
], Package.prototype, "carrier", void 0);
__decorate([
    Prop(),
    __metadata("design:type", String)
], Package.prototype, "trackingNumber", void 0);
__decorate([
    Prop(),
    __metadata("design:type", String)
], Package.prototype, "description", void 0);
__decorate([
    Prop({ enum: PackageStatus, default: PackageStatus.RECEIVED }),
    __metadata("design:type", String)
], Package.prototype, "status", void 0);
__decorate([
    Prop({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Package.prototype, "receivedAt", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Date)
], Package.prototype, "pickupAt", void 0);
__decorate([
    Prop({ default: 0 }),
    __metadata("design:type", Number)
], Package.prototype, "notificationAttempts", void 0);
__decorate([
    Prop({ default: null, sparse: true }),
    __metadata("design:type", Date)
], Package.prototype, "lastNotificationAt", void 0);
__decorate([
    Prop({ default: null, sparse: true }),
    __metadata("design:type", Date)
], Package.prototype, "notificationConfirmedAt", void 0);
__decorate([
    Prop({ default: false }),
    __metadata("design:type", Boolean)
], Package.prototype, "notificationFailed", void 0);
__decorate([
    Prop({ type: Date, default: null, sparse: true }),
    __metadata("design:type", Object)
], Package.prototype, "deletedAt", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Date)
], Package.prototype, "createdAt", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Date)
], Package.prototype, "updatedAt", void 0);
Package = __decorate([
    Schema({ timestamps: true, collection: 'packages' })
], Package);
export { Package };
export const PackageSchema = SchemaFactory.createForClass(Package);
PackageSchema.index({ createdAt: -1 });
PackageSchema.index({ status: 1 });
PackageSchema.index({ residentId: 1 });
PackageSchema.index({ pickupAt: 1 });
//# sourceMappingURL=package.schema.js.map