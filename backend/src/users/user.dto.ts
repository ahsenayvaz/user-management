import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString() @IsNotEmpty() username: string;
  @IsString() @MinLength(6) password: string;
  @IsString() @IsNotEmpty() fullName: string;
  @IsIn(['admin', 'user']) role: 'admin' | 'user';
}

export class UpdateUserDto {
  @IsOptional() @IsString() @IsNotEmpty() username?: string;
  @IsOptional() @IsString() @MinLength(6) password?: string;
  @IsOptional() @IsString() @IsNotEmpty() fullName?: string;
  @IsOptional() @IsIn(['admin', 'user']) role?: 'admin' | 'user';
}
