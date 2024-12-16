import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { RegisterUserDto } from "./dto/register-user.dto";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async registerUser(body: RegisterUserDto) {
    const { password, confirm_password } = body;
    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    body.password = passwordHash;
    return await this.authRepository.registerUser(body);
  }

  async login(body: LoginDto) {
    const { password, email } = body;
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException("Invalid email or password");
    }
    const userPayload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    const access_token = this.jwtService.sign(userPayload);
    return {
      message: "Successfully logged in",
      user: { ...userPayload },
      access_token,
    };
  }
}
