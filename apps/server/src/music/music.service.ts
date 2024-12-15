import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { MusicRepository } from "./music.repository";
import { PageOptionsDto } from "src/common/pagination/page-options.dto";

@Injectable()
export class MusicService {
  constructor(private musicRepository: MusicRepository) {}

  async create(body: CreateMusicDto) {
    return await this.musicRepository.create(body);
  }

  async getPaginatedMusic(pageOptionsDto: PageOptionsDto) {
    return await this.musicRepository.getPaginatedMusic(pageOptionsDto);
  }

  async findMusicById(id: number) {
    const music = await this.musicRepository.findMusicById(id);
    if (!music) {
      throw new NotFoundException("Music not found");
    }
    return music;
  }

  async update(id: number, body: UpdateMusicDto) {
    const music = await this.musicRepository.findMusicById(id);
    if (!music) {
      throw new NotFoundException("Music not found");
    }
    return await this.musicRepository.updateMusic(id, body);
  }

  async remove(id: number) {
    const music = await this.musicRepository.findMusicById(id);
    if (!music) {
      throw new BadRequestException("Music not found");
    }
    return await this.musicRepository.deleteMusic(id);
  }
}
