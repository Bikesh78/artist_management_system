import { IUser } from "@libs/types";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PageMetaDto } from "src/common/pagination/page-meta.dto";
import { PageOptionsDto } from "src/common/pagination/page-options.dto";
import { PageDto } from "src/common/pagination/page.dto";
import { dbPool } from "src/db/db-pool";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserRepository {
  private pool = dbPool;

  async getPaginatedUsers(pageOptionsDto: PageOptionsDto) {
    const client = await this.pool.connect();
    const { offset, limit } = pageOptionsDto;
    try {
      const queryText = `
      SELECT id, first_name, last_name, email, phone, dob, gender, address, created_at, updated_at 
      FROM "user"
      LIMIT $1
      OFFSET $2
      `;
      const values = [limit, offset];
      const res = await client.query<IUser>(queryText, values);
      const count = await client.query<{ count: string }>(
        `select count(*) from "user"`,
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

  async findUserById(id: number) {
    const client = await this.pool.connect();
    try {
      const queryText = `
      SELECT id, first_name, last_name, email, phone, dob, gender, address, created_at, updated_at 
      FROM "user" 
      WHERE id = $1
    `;
      const res = await client.query<IUser>(queryText, [id]);
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

  async createUser(body: CreateUserDto) {
    const client = await this.pool.connect();
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        dob,
        phone,
        gender,
        address,
      } = body;

      const queryText = `
            INSERT INTO "user"
            (first_name, last_name,email, password, dob, phone, gender, address)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *
          `;
      const values = [
        first_name,
        last_name,
        email,
        password,
        dob,
        phone,
        gender,
        address,
      ];

      const res = await client.query<IUser & { password: string }>(
        queryText,
        values,
      );
      delete res.rows[0].password;
      return res.rows[0];
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    } finally {
      client.release();
    }
  }

  async updateUser(id: number, body: UpdateUserDto) {
    const client = await this.pool.connect();
    try {
      let queryText = `UPDATE "user" SET`;
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
      const res = await client.query<IUser & { password: string }>(
        queryText,
        values,
      );
      return res.rows[0];
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    } finally {
      client.release();
    }
  }

  async deleteUser(id: number) {
    const client = await this.pool.connect();
    try {
      const queryText = `DELETE FROM "user" where id = $1`;
      const value = [id];
      await client.query(queryText, value);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    } finally {
      client.release();
    }
  }
}
