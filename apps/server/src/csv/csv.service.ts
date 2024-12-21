import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { stringify, stringifier } from "csv";

@Injectable()
export class CsvService {
  async exportCsv<T>(
    data: T[],
    columns: string[],
  ): Promise<stringifier.Stringifier> {
    try {
      const csv = stringify(data, {
        header: true,
        columns: columns,
        cast: {
          date: (date, context) => {
            if (
              context.column === "created_at" ||
              context.column === "updated_at"
            ) {
              return date.toJSON();
            }
          },
        },
      });
      return csv;
    } catch (error) {
      throw new InternalServerErrorException("Error while exporting CSV file");
    }
  }
}
