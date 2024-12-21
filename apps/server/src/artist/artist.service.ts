import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ArtistRepository } from "./artist.repository";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { PageOptionsDto } from "src/common/pagination/page-options.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";

@Injectable()
export class ArtistService {
  constructor(private artistRepository: ArtistRepository) { }

  async create(body: CreateArtistDto) {
    return await this.artistRepository.create(body);
  }

  async getPaginatedArtists(pageOptionsDto: PageOptionsDto) {
    return await this.artistRepository.getPaginatedArtists(pageOptionsDto);
  }

  async getAllArtists(){
    return await this.artistRepository.getAllArtist()
  }

  async findArtistById(id: number) {
    const artist = await this.artistRepository.findArtistById(id);
    if (!artist) {
      throw new NotFoundException("Artist not found");
    }
    return artist;
  }

  async findMusicByArtist(id: number, pageOptionsDto: PageOptionsDto) {
    const artist = await this.artistRepository.findArtistById(id);
    if (!artist) {
      throw new NotFoundException("Artist not found");
    }
    const music = await this.artistRepository.findMusicByArtist(
      id,
      pageOptionsDto,
    );
    return music;
  }

  async update(id: number, body: UpdateArtistDto) {
    const artist = await this.artistRepository.findArtistById(id);
    if (!artist) {
      throw new NotFoundException("Artist not found");
    }
    return await this.artistRepository.updateArtist(id, body);
  }

  async remove(id: number) {
    const artist = await this.artistRepository.findArtistById(id);
    if (!artist) {
      throw new BadRequestException("Artist not found");
    }
    return await this.artistRepository.deleteArtist(id);
  }
}
