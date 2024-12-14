import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public.decorator";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post("register")
  async registerUser(@Body() body: RegisterUserDto) {
   return await this.authService.registerUser(body);
  }

  @Public()
  @Post("login")
  async login(@Body() body: LoginDto) {
   return await this.authService.login(body);
  }
}
