import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserService } from "../User/user.service";
import { IAuthPayload } from "./dto/authpayload.dto";
import { IUser } from "../User/User";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {
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

    async signReloaded(userObj: IUser): Promise<IUser> {
        const payload: IAuthPayload = { username: userObj.username }
        const accessToken = await this.jwtService.sign(payload);

        userObj.token.AccessToken = accessToken;
        userObj.token.AccessTokenExpiredAt = new Date('1d');
        console.log(accessToken);
        return userObj
    }
}