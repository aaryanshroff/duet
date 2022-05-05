import { Query } from "../";
import { UserTable } from "../models";
import * as format from "pg-format";

const find = (column: string, value: string | number) =>
  // String interpolation for column name safe since the variable 'column' isn't decided by the user 
  // 'value' can be decided by user, so it's sanitized by NodePG before including in query
  Query<UserTable>(`SELECT users.*, videos.url FROM users LEFT JOIN videos ON users.id = videos.user_id WHERE ${column}=$1`, [value]);
const insert = (newUser: UserTable) =>
  Query<UserTable>(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
    [newUser.first_name, newUser.last_name, newUser.email, newUser.password]
  );
const findAll = (sender_id: number) =>
  Query<UserTable>(
    "SELECT id, first_name, last_name, email \
    FROM users WHERE id IN \
    (SELECT receiver_id FROM matches WHERE sender_id=$1 AND status=1 \
    UNION \
    SELECT sender_id FROM matches WHERE receiver_id=$1 AND status=1)",
    [sender_id]
  );

export default {
  find,
  findAll,
  insert,
};
