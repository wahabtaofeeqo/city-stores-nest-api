import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordReset } from '../user/entities/password-reset.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      PasswordReset
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (service: ConfigService) => {
        return {
          secret: service.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: '1d'
          }
        }
      }
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthStrategy
  ]
})
export class AuthModule {}
