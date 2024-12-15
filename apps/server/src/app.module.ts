import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [AuthModule, UserModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
