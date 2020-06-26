import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserService } from "../User/user.service";
import { IAuthPayload } from "./dto/authpayload.dto";

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: IAuthPayload) {

        console.log("PAYLOAD", payload)
        const { username } = payload;
        var user = this.userService.find(username);

        if (!user) {
            throw new UnauthorizedException()
        }

        return user;
    }
}