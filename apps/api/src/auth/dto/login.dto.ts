import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ type: 'boolean', required: false })
  keep?: boolean;
}
