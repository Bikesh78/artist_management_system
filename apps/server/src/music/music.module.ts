import { Module } from "@nestjs/common";
import { MusicService } from "./music.service";
import { MusicController } from "./music.controller";
import { MusicRepository } from "./music.repository";

@Module({
  controllers: [MusicController],
  providers: [MusicService, MusicRepository],
})
export class MusicModule {}
