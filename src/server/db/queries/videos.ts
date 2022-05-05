import { Query } from "../";
import { Video } from "../models";
import * as format from "pg-format";

const findOne = (column: string, operator: string, value: string | number) =>
  Query<Video>(
    format(
      `SELECT * FROM videos WHERE %I ${operator} %L LIMIT 1`,
      column,
      value
    )
  );
const findAll = (column: string, operator: string, value: string) =>
  Query<Video[]>(
    format(`SELECT * FROM videos WHERE %I ${operator} %L`, column, value)
  );
const findUnmatched = (user_id: number) =>
  Query<Video[]>(
    "SELECT * FROM videos WHERE user_id <> $1 AND user_id NOT IN (SELECT sender_id FROM matches WHERE receiver_id = $1 AND status <> 0 UNION SELECT receiver_id FROM matches WHERE sender_id = $1);",
    [user_id]
  );
const insert = (columns: string[], values: (string | number)[]) =>
  Query(
    format(
      `INSERT INTO videos (${columns.join(", ")}) VALUES (%L) RETURNING url`,
      values
    )
  );
const deleteMany = (column: string, operator: string, value: string | number) =>
  Query<Video>(
    format(`DELETE FROM videos WHERE %I ${operator} %L`, column, value)
  );

export default {
  findOne,
  findAll,
  findUnmatched,
  insert,
  deleteMany,
};
