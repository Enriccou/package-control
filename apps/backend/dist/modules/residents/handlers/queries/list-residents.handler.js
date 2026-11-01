var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { QueryHandler } from '@nestjs/cqrs';
import { ListResidentsQuery } from '../../queries/impl/list-residents.query.js';
import { ResidentsService } from '../../residents.service.js';
let ListResidentsHandler = class ListResidentsHandler {
    residentsService;
    constructor(residentsService) {
        this.residentsService = residentsService;
    }
    async execute(query) {
        const { skip, limit } = query;
        return this.residentsService.findAll(skip, limit);
    }
};
ListResidentsHandler = __decorate([
    QueryHandler(ListResidentsQuery),
    __metadata("design:paramtypes", [ResidentsService])
], ListResidentsHandler);
export { ListResidentsHandler };
//# sourceMappingURL=list-residents.handler.js.map