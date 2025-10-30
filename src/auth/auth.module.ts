import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    UsersModule,  
    AdminModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY || 'defaultSecret',
      signOptions: {
        expiresIn: Number(process.env.ACCESS_TOKEN_TIME) || '15m', 
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
