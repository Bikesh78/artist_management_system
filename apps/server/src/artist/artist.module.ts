import { Module } from "@nestjs/common";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { ArtistRepository } from "./artist.repository";
import { CsvService } from "src/csv/csv.service";

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository, CsvService],
})
export class ArtistModule { }
