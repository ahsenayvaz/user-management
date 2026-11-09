import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, IsString } from 'class-validator';
import { UsersService } from '../users/users.service';

class LoginDto {
  @IsString() @IsNotEmpty() username: string;
  @IsString() @IsNotEmpty() password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.usersService.findByUsername(dto.username);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
      role: user.role,
    });
    const { password, ...safeUser } = user;
    return { accessToken, user: safeUser };
  }
}
