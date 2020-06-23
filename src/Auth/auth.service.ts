import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor() {
        console.log(process.env.JWT_SECRET);
    }
}