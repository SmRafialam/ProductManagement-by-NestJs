"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const mail_template_1 = require("./mail.template");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendInvitation(email, subject, link, userName) {
        try {
            const response = await this.mailerService.sendMail({
                to: email,
                from: process.env.SYSTEM_SENDER,
                subject: subject,
                text: link,
                html: (0, mail_template_1.getInvitationTemplate)(userName, link)
            });
            return response;
        }
        catch (err) {
            throw new common_1.HttpException('Email not send', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendResetLink(email, subject, link, userName) {
        try {
            const response = await this.mailerService.sendMail({
                to: email,
                from: process.env.SYSTEM_SENDER,
                subject: subject,
                text: link,
                html: (0, mail_template_1.getResetTemplate)(userName, link)
            });
            return response;
        }
        catch (err) {
            throw new common_1.HttpException('Email not send', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map