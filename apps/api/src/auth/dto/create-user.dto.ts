import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Language, Theme } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @Transform((ctx) => (ctx.value as string).trim().toLowerCase())
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsEnum(Language)
  @ApiProperty({ enum: Language, required: false })
  lang?: Language;

  @IsOptional()
  @IsEnum(Theme)
  @ApiProperty({ enum: Theme, required: false })
  theme?: Theme;
}
