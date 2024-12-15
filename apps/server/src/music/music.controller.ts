import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { MusicService } from "./music.service";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { PageOptionsDto } from "src/common/pagination/page-options.dto";

@Controller("music")
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  create(@Body() body: CreateMusicDto) {
    return this.musicService.create(body);
  }

  @Get()
  getPaginatedMusic(@Query() pageOptionsDto: PageOptionsDto) {
    return this.musicService.getPaginatedMusic(pageOptionsDto);
  }

  @Get(":id")
  findMusicById(@Param("id") id: number) {
    return this.musicService.findMusicById(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() body: UpdateMusicDto) {
    return this.musicService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.musicService.remove(id);
  }
}
