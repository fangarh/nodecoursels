import { JwtService } from "@nestjs/jwt";
import { IUser } from "../User/User";
import { IAuthPayload } from "./dto/authpayload.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {

    }

    async signUser(userObj: IUser): Promise<IUser> {
        const payload: IAuthPayload = { username: userObj.username }
        const accessToken = await this.jwtService.sign(payload);

        userObj.token.AccessToken = accessToken;
        userObj.token.AccessTokenExpiredAt = new Date('1d');

        return userObj;
    }
}