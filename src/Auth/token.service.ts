import { JwtService } from "@nestjs/jwt";
import { IUser } from "../User/model/User";
import { IAuthPayload } from "./dto/authpayload.dto";
import { Injectable } from "@nestjs/common";
import { ResponseUserDto } from "../User/dto/responseuser.dto";
import { UserService } from "../User/user.service";

@Injectable()
export class TokenService {
    tickInDay = 86400000;

    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {

    }

    async signUser(userObj: ResponseUserDto): Promise<ResponseUserDto> {
        const payload: IAuthPayload = { username: userObj.username }
        const accessToken = await this.jwtService.sign(payload);

        userObj.accessToken = accessToken;
        userObj.accessTokenExpiredAt = new Date(Date.now() + 1 * this.tickInDay);
        userObj.refreshToken = "!!!"
        userObj.refreshTokenExpiredAt = new Date(Date.now() + 8 * this.tickInDay);
        console.log(userObj)
        return userObj;
    }

    async getPayload(token): Promise<IUser> {
        const payload = await this.jwtService.decode(token);
        console.log(payload["username"]);

        return await this.userService.find(payload["username"])
    }
}