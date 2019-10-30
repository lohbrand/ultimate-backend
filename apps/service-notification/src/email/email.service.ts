import { Injectable, Logger } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { UserEntity } from '@graphqlcqrs/repository/entities';
import { ConfigService } from '@graphqlcqrs/common/services/config.service';
import { MailData } from '@sendgrid/helpers/classes/mail';

@Injectable()
export class EmailService {
  constructor(
    private readonly sendGrid: SendGridService,
  ) {}

  public async sendEmail(data: Partial<MailData> | Array<Partial<MailData>>, isMultiple?: boolean) {
    if (data) { return null; }

    try {
      await this.sendGrid.send({ ...data, from: 'noreply@demo.com' }, isMultiple);
    } catch (e) {
      Logger.error(e.message, e);
    }
  }
}