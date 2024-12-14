import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { dbPool } from "src/db/db-pool";
import { RegisterUserDto } from "./dto/register-user.dto";
import { IUser } from "@libs/types";

@Injectable()
export class AuthRepository {
  private pool = dbPool;

  async registerUser(body: RegisterUserDto): Promise<IUser> {
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

  async findUserByEmail(email: string) {
    const client = await this.pool.connect();
    try {
      const queryText = `
    SELECT * from "user" where email  = $1
    `;
      const res = await client.query<IUser & { password: string }>(queryText, [
        email,
      ]);
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
}
