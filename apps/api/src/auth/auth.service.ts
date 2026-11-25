import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../common/database/database.service';
import { SessionService } from '../common/services/session/session.service';
import { DeviceService } from '../common/services/device/device.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly db: DatabaseService,
    private readonly sessionService: SessionService,
    private readonly deviceService: DeviceService,
  ) {}
}
