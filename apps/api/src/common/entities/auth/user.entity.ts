import type { List, Nullable } from '@kanopa/types';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  Language,
  NotificationChannel,
  Theme,
  User,
  UserPreference,
} from '@prisma/client';

export class UserName {
  @ApiProperty() first: string;
  @ApiProperty() last: string;
  @ApiProperty() full: string;
  @ApiProperty() initials: string;

  constructor(firstName: string, lastName: string) {
    this.first = firstName;
    this.last = lastName;
    this.full = `${firstName} ${lastName}`;
    this.initials = `${firstName[0]}${lastName[0]}`;
  }
}

export class UserPreferenceEntity {
  @ApiProperty({ enum: Language }) lang: Language;
  @ApiProperty({ enum: Theme }) theme: Theme;
  @ApiProperty() timezone: string;
  @ApiProperty() notificationsEnabled: boolean;
  @ApiProperty({ enum: NotificationChannel, isArray: true })
  notificationChannels: List<NotificationChannel>;
  @ApiProperty() showEmail: boolean;
  @ApiProperty() showPhone: boolean;
  @ApiProperty() showLinkedin: boolean;
  @ApiProperty() updatedAt: Date;

  constructor(partial: Partial<UserPreference>) {
    Object.assign(this, partial);
  }
}

export class UserEntity {
  @ApiProperty() id: string;
  @ApiProperty({ type: UserName }) name: UserName;
  @ApiProperty({ type: String, nullable: true }) phone: Nullable<string>;
  @ApiProperty() email: string;
  @ApiProperty({ type: String, nullable: true }) linkedin: Nullable<string>;
  @ApiProperty() active: boolean;
  @ApiProperty({ type: Date, nullable: true }) emailVerifiedAt: Nullable<Date>;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  @ApiProperty({ type: Date, nullable: true }) deletedAt: Nullable<Date>;

  @ApiProperty({ type: UserPreferenceEntity })
  preferences: UserPreferenceEntity;

  @Exclude() firstName: string;
  @Exclude() lastName: string;
  @Exclude() linkedPreferences: Nullable<UserPreference>;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);

    this.name = new UserName(this.firstName, this.lastName);

    if (!this.linkedPreferences)
      throw new Error('User preference not provided.');
    this.preferences = new UserPreferenceEntity(this.linkedPreferences);
  }
}
