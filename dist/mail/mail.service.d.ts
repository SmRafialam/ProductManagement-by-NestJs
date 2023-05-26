import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendInvitation(email: string, subject: string, link: string, userName?: string): Promise<SentMessageInfo>;
    sendResetLink(email: string, subject: string, link: string, userName?: string): Promise<SentMessageInfo>;
}
