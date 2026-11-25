import { Log, LogType, Prisma } from '@prisma/client';
import type { Nullable } from '@kanopa/types';
import { UserEntity } from '../auth/user.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LogEntity {
  @ApiProperty() id: string;
  @ApiProperty({ enum: LogType }) type: LogType;
  @ApiProperty({ type: String, nullable: true }) ip: Nullable<string>;
  @ApiProperty({ type: String, nullable: true }) agent: Nullable<string>;
  @ApiProperty({ type: Object, nullable: true }) meta: Nullable;
  @ApiProperty() createdAt: Date;

  @ApiProperty({ type: UserEntity, nullable: true }) user: Nullable<UserEntity>;

  @Exclude() sessionId: string;
  @Exclude() relUser: Nullable<
    Prisma.UserGetPayload<{
      include: {
        linkedPreferences: true;
      };
    }>
  >;

  constructor(partial: Partial<Log>) {
    Object.assign(this, partial);

    this.user = this.relUser ? new UserEntity(this.relUser) : null;
  }
}
