import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { MusicModule } from './music/music.module';
import { CsvModule } from "./csv/csv.module";

@Module({
  imports: [AuthModule, UserModule, ArtistModule, MusicModule,CsvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
