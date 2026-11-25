import { Device, DeviceOs, DevicePlatform, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import type { Nullable } from '@kanopa/types';
import { Exclude } from 'class-transformer';
import { UserEntity } from './user.entity';

export class DeviceEntity {
  @ApiProperty() id: string;
  @ApiProperty() agent: string;
  @ApiProperty({ type: String, nullable: true }) browser: Nullable<string>;
  @ApiProperty({ enum: DevicePlatform, nullable: true })
  platform: Nullable<DevicePlatform>;
  @ApiProperty({ enum: DeviceOs, nullable: true }) os: Nullable<DeviceOs>;
  @ApiProperty() firstSeenAt: Date;
  @ApiProperty() lastSeenAt: Date;

  @ApiProperty({ type: UserEntity }) user: UserEntity;

  @Exclude() relUser: Prisma.UserGetPayload<{
    include: {
      linkedPreferences: true;
    };
  }>;

  constructor(partial: Partial<Device>) {
    Object.assign(this, partial);

    this.user = new UserEntity(this.relUser);
  }
}
