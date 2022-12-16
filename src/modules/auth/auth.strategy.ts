import { Injectable,  UnauthorizedException} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {

    constructor(public service: ConfigService, private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: service.get<string>('JWT_SECRET_KEY'),
        })
    }

    async validate(payload: any) {
        const user = await this.userService.findOne({id: payload.id});
        if(!user) {
            throw new  UnauthorizedException();
        }

        //
        const { password, ...profile } = user;
        return profile;
    }
}