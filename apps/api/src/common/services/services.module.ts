import { Global, Module } from '@nestjs/common';
import { SessionService } from './session/session.service';
import { DeviceService } from './device/device.service';

@Module({
  providers: [SessionService, DeviceService],
  exports: [SessionService, DeviceService],
})
@Global()
export class ServicesModule {}
