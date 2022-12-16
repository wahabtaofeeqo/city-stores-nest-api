import { Controller, Logger, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseController } from 'src/core/base.controller';
import {
  PasswordResetDTO,
  RegisterDTO,
  LoginDTO,
  EmailDTO, 
  GoogleRegDTO,
  GoogleIDDTO}  from './dto/auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { ApiBody, ApiResponse } from '@nestjs/swagger/dist/decorators';
import { User } from '../user/entities/user.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController extends BaseController {
  constructor(
    private readonly authService: AuthService) {
    super();
  }

  /**
   * Authenticate users
   *
   * @param dto
   * @returns
   */
  @Post('login')
  @ApiOperation({ description: 'Login'})
  async login(@Body() dto:LoginDTO) {
    const data = await this.authService.login(dto);
    return this.okResponse('Login successful', data);
  }

  /**
   * Authenticate users
   *
   * @param dto
   * @returns
   */
  @Post('google-login')
  @ApiOperation({ description: 'Login with Google'})
  async loginWithGoogle(@Body() dto:GoogleIDDTO) {
    const data = await this.authService.login(dto, true);
    return this.okResponse('Login successful', data);
  }

  /**
   * Creates new user model
   *
   * @param dto
   * @returns
   */
  @Post('register')
  @ApiOperation({ description: 'Register'})
  async register(@Body() dto: RegisterDTO) {
    const user = await this.authService.register(dto);
    return this.okResponse('Account created successfully', user);
  }

  /**
   * Creates new user model
   *
   * @param dto
   * @returns
   */
  @Post('google-register')
  @ApiOperation({ description: 'Register with Google'})
  async registerWithGoogle(@Body() dto: GoogleRegDTO) {
    const user = await this.authService.register(dto, true);
    return this.okResponse('Account created successfully', user);
  }

  /**
   * Forgot Password
   *
   * @param dto
   * @returns object
   */
  @Post('forgot-password')
  @ApiOperation({ description: 'Forgot Password'})
  async sendCodeToEmail(@Body() dto: EmailDTO) {
    const model = await this.authService.sendResetCode(dto);

    // Dev purpose
    return this.okResponse('Reset code has been sent to your mail', {
      code: model.code,
    });
  }

  /**
   * Reset password
   *
   * @param dto
   * @returns object
   */
  @Post('reset-password')
  @ApiOperation({ description: 'Reset Password'})
  async resetPassword(@Body() dto: PasswordResetDTO) {
    await this.authService.resetPasscode(dto);
    return this.okResponse('Password reset successfully');
  }
}
