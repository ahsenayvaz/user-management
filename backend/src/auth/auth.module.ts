import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

const jwtSecret = process.env.JWT_SECRET || randomBytes(32).toString('hex');

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
