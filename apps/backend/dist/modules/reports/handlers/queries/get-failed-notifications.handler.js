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
import { GetFailedNotificationsQuery } from '../../queries/impl/get-failed-notifications.query.js';
import { ReportsService } from '../../reports.service.js';
let GetFailedNotificationsHandler = class GetFailedNotificationsHandler {
    reportsService;
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    async execute(query) {
        const { skip, limit } = query;
        return this.reportsService.getFailedNotifications(skip, limit);
    }
};
GetFailedNotificationsHandler = __decorate([
    QueryHandler(GetFailedNotificationsQuery),
    __metadata("design:paramtypes", [ReportsService])
], GetFailedNotificationsHandler);
export { GetFailedNotificationsHandler };
//# sourceMappingURL=get-failed-notifications.handler.js.map