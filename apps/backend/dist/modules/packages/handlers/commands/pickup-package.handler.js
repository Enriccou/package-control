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
import { PickupPackageCommand } from '../../commands/impl/pickup-package.command.js';
import { PackagesService } from '../../packages.service.js';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PackageStatus } from '../../schemas/package.schema.js';
let PickupPackageHandler = class PickupPackageHandler {
    packagesService;
    constructor(packagesService) {
        this.packagesService = packagesService;
    }
    async execute(command) {
        const { id } = command;
        const pkg = await this.packagesService.findById(id);
        if (!pkg) {
            throw new NotFoundException('Encomenda não encontrada');
        }
        if (pkg.status === PackageStatus.PICKED_UP) {
            throw new BadRequestException('Encomenda já foi retirada');
        }
        return this.packagesService.markAsPickedUp(id);
    }
};
PickupPackageHandler = __decorate([
    CommandHandler(PickupPackageCommand),
    __metadata("design:paramtypes", [PackagesService])
], PickupPackageHandler);
export { PickupPackageHandler };
//# sourceMappingURL=pickup-package.handler.js.map