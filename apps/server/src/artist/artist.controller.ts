import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ArtistService } from "./artist.service";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { PageOptionsDto } from "src/common/pagination/page-options.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { Response } from "express";
import { CsvService } from "src/csv/csv.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("artist")
export class ArtistController {
  constructor(
    private artistService: ArtistService,
    private csvService: CsvService,
  ) { }

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

  @Get("export/all")
  async exportArtist(@Res() res: Response) {
    const artists = await this.artistService.getAllArtists();
    res.header("Content-Type", "text/csv");
    res.attachment("artist.csv");
    const columns = Object.keys(artists[0]);
    const result = await this.csvService.exportCsv(artists, columns);
    result.pipe(res);
  }

  @Post("import")
  @UseInterceptors(FileInterceptor("file"))
  async importArtist(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /.(csv)/ })],
        fileIsRequired: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.artistService.importCsv(file);
  }
}
