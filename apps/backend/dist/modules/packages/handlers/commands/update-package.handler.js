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
import { UpdatePackageCommand } from '../../commands/impl/update-package.command.js';
import { PackagesService } from '../../packages.service.js';
import { NotFoundException } from '@nestjs/common';
let UpdatePackageHandler = class UpdatePackageHandler {
    packagesService;
    constructor(packagesService) {
        this.packagesService = packagesService;
    }
    async execute(command) {
        const { id, updatePackageDto } = command;
        const pkg = await this.packagesService.findById(id);
        if (!pkg) {
            throw new NotFoundException('Encomenda não encontrada');
        }
        return this.packagesService.update(id, updatePackageDto);
    }
};
UpdatePackageHandler = __decorate([
    CommandHandler(UpdatePackageCommand),
    __metadata("design:paramtypes", [PackagesService])
], UpdatePackageHandler);
export { UpdatePackageHandler };
//# sourceMappingURL=update-package.handler.js.map