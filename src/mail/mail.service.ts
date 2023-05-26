import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getInvitationTemplate, getResetTemplate } from './mail.template';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendInvitation(email: string, subject: string, link: string, userName?: string) {
        try {
            const response = await this.mailerService.sendMail({
                to: email,
                from: process.env.SYSTEM_SENDER,
                subject: subject,
                text: link,
                html: getInvitationTemplate(userName, link)
            })
            return response
        }catch(err) {
            throw new HttpException('Email not send', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async sendResetLink(email: string, subject: string, link: string, userName?: string) {
        try {
            const response = await this.mailerService.sendMail({
                to: email,
                from: process.env.SYSTEM_SENDER,
                subject: subject,
                text: link,
                html: getResetTemplate(userName, link)
            });
            return response;
        }catch(err) {
            throw new HttpException('Email not send', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
