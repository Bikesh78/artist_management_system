import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { JWT_SECRET } from "src/config/env.config";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuardProvider } from "./auth.guard";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, AuthGuardProvider],
})
export class AuthModule { }
