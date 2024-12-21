import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { dbPool } from "src/db/db-pool";
import { PageOptionsDto } from "src/common/pagination/page-options.dto";
import { IArtist } from "@libs/types";
import { PageMetaDto } from "src/common/pagination/page-meta.dto";
import { PageDto } from "src/common/pagination/page.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";

@Injectable()
export class ArtistRepository {
  private pool = dbPool;

  async create(body: CreateArtistDto) {
    const client = await this.pool.connect();
    try {
      const {
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released,
      } = body;

      const queryText = `
            INSERT INTO artist
            (name, dob, gender, address, first_release_year, no_of_albums_released)
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *
          `;
      const values = [
        name,
        dob,
        gender,
        address,
        first_release_year,
        no_of_albums_released,
      ];

      const res = await client.query<IArtist>(queryText, values);
      return res.rows[0];
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    } finally {
      client.release();
    }
  }

  async getPaginatedArtists(pageOptionsDto: PageOptionsDto) {
    const client = await this.pool.connect();
    const { offset, limit } = pageOptionsDto;
    try {
      const queryText = `
      SELECT  *
      FROM artist
      ORDER by created_at desc
      LIMIT $1
      OFFSET $2
      `;
      const values = [limit, offset];
      const res = await client.query<IArtist>(queryText, values);
      const count = await client.query<{ count: string }>(
        `SELECT COUNT(*) FROM artist`,
      );

      const itemCount = Number(count.rows[0].count);
      const data = res.rows;
      const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });
      const result = new PageDto(data, pageMeta);
      return result;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    } finally {
      client.release();
    }
  }

  async getAllArtist() {
    const client = await this.pool.connect();
    try {
      const queryText = `
      SELECT *
      FROM artist
      ORDER by created_at desc
      `;
      const res = await client.query<IArtist>(queryText);
      return res.rows;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    } finally {
      client.release();
    }
  }

  async findArtistById(id: number) {
    const client = await this.pool.connect();
    try {
      const queryText = `
      SELECT *
      FROM artist 
      WHERE id = $1
    `;
      const res = await client.query<IArtist>(queryText, [id]);
      if (res.rowCount === 0) {
        return null;
      }
      return res.rows[0];
    } catch (err) {
      throw new InternalServerErrorException(err);
    } finally {
      client.release();
    }
  }

  async findMusicByArtist(id: number, pageOptionsDto: PageOptionsDto) {
    const { offset, limit } = pageOptionsDto;
    const client = await this.pool.connect();
    try {
      const queryText = `
      select * 
      from music 
      WHERE music.artist_id = $3
      ORDER BY created_at DESC
      LIMIT $1
      OFFSET $2
      `;

      const res = await client.query<IArtist>(queryText, [limit, offset, id]);
      const count = await client.query<{ count: string }>(
        `SELECT COUNT(*) FROM music where music.artist_id = $1`,
        [id],
      );

      const itemCount = Number(count.rows[0].count);
      const data = res.rows;
      const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });
      return new PageDto(data, pageMeta);
    } catch (err) {
      throw new InternalServerErrorException(err);
    } finally {
      client.release();
    }
  }

  async updateArtist(id: number, body: UpdateArtistDto) {
    const client = await this.pool.connect();
    try {
      let queryText = `UPDATE artist SET`;
      let values = [];

      Object.entries(body).forEach(([key, value], index) => {
        queryText = queryText + ` ${key} = $${index + 1},`;
        values = [...values, value];
      });
      queryText = queryText.slice(0, -1);
      values = [...values, id];

      queryText =
        queryText +
        `
      WHERE id = $${values.length} 
      RETURNING *
      `;
      const res = await client.query<IArtist>(queryText, values);
      return res.rows[0];
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    } finally {
      client.release();
    }
  }

  async deleteArtist(id: number) {
    const client = await this.pool.connect();
    try {
      const queryText = `DELETE FROM artist where id = $1`;
      const value = [id];
      await client.query(queryText, value);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    } finally {
      client.release();
    }
  }
}
