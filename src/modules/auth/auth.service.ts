import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Str } from 'src/utils/str-utils';
import { PasswordResetDTO } from './dto/auth.dto';
import { PasswordReset } from '../user/entities/password-reset.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    @InjectRepository(PasswordReset)
    private prRepository: Repository<PasswordReset>) {}

  private readonly logger = new Logger(AuthService.name);

  /**
   * Auth
   *
   * @param data
   * @returns
   */
  async login(data: any, isGoogle = false) {

    // Find User
    let user = null;
    if(isGoogle) {
      user = await this.userService.findOne({google_id: data.google_id})
    }
    else {
      user = await this.userService.getUser(data.email);
    }
    
    if (!user) throw new NotFoundException('Username not correct');

    if (!isGoogle) {
      const isValid = await bcrypt.compare(data.password, user.password);
      if (!isValid) throw new NotFoundException('Passcode not correct');  
    }
  
    /**
     * Access Token
     *
     */
    const token = this.jwt.sign({
      id: user.id,
      email: user.email,
    });

    //
    return { token, user };
  }

  /**
   * handles user model creation
   *
   * @param data
   * @returns
   */
  async register(data: any, isGoogle = false) {

    /**
     * Check user
     * 
     */
    let user = await this.userService.findOne({
      email: data.email
    });

    if(user) {
      throw new BadRequestException("Email has already been taken");
    }

    user = await this.userService.findOne({
      google_id: data.google_id
    });

    if(user) {
      throw new BadRequestException("Account already exist");
    }

    /**
     * Prep data
     */
    data = {
      ...data,
      password: await bcrypt.hash(isGoogle ? "password" : data.password, 10)
    };

   
    //
    user = await this.userService.create(data);

    /**
     * Hide password
     *
     */
    const { password, ...model } = user;

    //
    return model;
  }

  /**
   * process password reset
   *
   * @param data
   *
   */
  async sendResetCode(data: any) {

    /**
     * Get User
     *
     */
    const user = await this.userService.findOne({ email: data.email });

    if (user) {
      
      // Generate Code
      const code = Str.number(4);

      // Save code
      let model = await this.prRepository.findOne({
        where: {email: data.email}
      })
      if(model) {
        this.prRepository.update(model.id, {
          code: code.toString()
        })
      }
      else {
        model = await this.prRepository.save({
          email: data.email,
          code: code.toString(),
        });
      }

      // Send to main
      this.emailResetCode(code)

      //
      return model
    }

    throw new NotFoundException('User does not exist');
  }

  /**
   *
   * @param data
   */
  async resetPasscode(data: PasswordResetDTO) {

    // Find model
    let user = await this.userService.findOne({
      email: data.email,
    });

    if(!user) throw new NotFoundException('User account does not exist');

    // Confirm code
    let pr = await this.prRepository.findOne({
      where: {
        code: data.code
      },
    });

    if(!pr || pr.email != user.email) throw new NotFoundException('Code is invalid');

    //
    const encryptedPasscode = await bcrypt.hash(data.password, 10);

    //
    user.password = encryptedPasscode;
    user = await this.userService.update(user.id, user);

    /**
     * Hide passcode
     *
     */
    const { password, ...model } = user;

    //
    return model;
  }

  emailResetCode(code: any) {
    // Handle
  }
}
