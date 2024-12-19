import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ArtistService } from "./artist.service";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { PageOptionsDto } from "src/common/pagination/page-options.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";

@Controller("artist")
export class ArtistController {
  constructor(private artistService: ArtistService) { }

  @Post()
  create(@Body() body: CreateArtistDto) {
    return this.artistService.create(body);
  }

  @Get()
  getPaginatedArtists(@Query() pageOptionsDto: PageOptionsDto) {
    return this.artistService.getPaginatedArtists(pageOptionsDto);
  }

  @Get(":id")
  findArtistById(@Param("id") id: number) {
    return this.artistService.findArtistById(id);
  }

  @Get(":id/music")
  findMusicByArtist(
    @Param("id") id: number,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return this.artistService.findMusicByArtist(id, pageOptionsDto);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() body: UpdateArtistDto) {
    return this.artistService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.artistService.remove(id);
  }
}
