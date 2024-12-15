import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { dbPool } from "src/db/db-pool";
import { IMusic } from "@libs/types";
import { PageOptionsDto } from "src/common/pagination/page-options.dto";
import { PageMetaDto } from "src/common/pagination/page-meta.dto";
import { PageDto } from "src/common/pagination/page.dto";

@Injectable()
export class MusicRepository {
  private pool = dbPool;

  async create(body: CreateMusicDto) {
    const client = await this.pool.connect();
    try {
      const { title, album_name, genre, artist_id } = body;

      const queryText = `
            INSERT INTO music
            ( title, album_name, genre, artist_id )
            VALUES($1,$2,$3,$4)
            RETURNING *
          `;
      const values = [title, album_name, genre, artist_id];

      const res = await client.query<IMusic>(queryText, values);
      return res.rows[0];
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    } finally {
      client.release();
    }
  }

  async getPaginatedMusic(pageOptionsDto: PageOptionsDto) {
    const client = await this.pool.connect();
    const { offset, limit } = pageOptionsDto;
    try {
      const queryText = `
      SELECT  *
      FROM music
      LIMIT $1
      OFFSET $2
      `;
      const values = [limit, offset];
      const res = await client.query<IMusic>(queryText, values);
      const count = await client.query<{ count: string }>(
        `SELECT COUNT(*) FROM music`,
      );

      const itemCount = Number(count.rows[0].count);
      const data = res.rows;
      const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });
      return new PageDto(data, pageMeta);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    } finally {
      client.release();
    }
  }

  async findMusicById(id: number) {
    const client = await this.pool.connect();
    try {
      const queryText = `
      SELECT *
      FROM music 
      WHERE id = $1
    `;
      const res = await client.query<IMusic>(queryText, [id]);
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

  async updateMusic(id: number, body: UpdateMusicDto) {
    const client = await this.pool.connect();
    try {
      let queryText = `UPDATE music SET`;
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
      const res = await client.query<IMusic>(queryText, values);
      return res.rows[0];
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    } finally {
      client.release();
    }
  }

  async deleteMusic(id: number) {
    const client = await this.pool.connect();
    try {
      const queryText = `DELETE FROM music where id = $1`;
      const value = [id];
      await client.query(queryText, value);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    } finally {
      client.release();
    }
  }
}
