import { Query } from '../';
import { MatchTable } from '../models';
import * as format from 'pg-format';

const find = (sender_id: number, receiver_id: number) => Query<MatchTable>('SELECT * FROM matches WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)', [sender_id, receiver_id]);
const insert = (match: MatchTable) => Query('INSERT INTO matches (sender_id, receiver_id, status) VALUES ($1, $2, $3)', 
                                            [match.sender_id, match.receiver_id, match.status]);
const updateStatus = (match_id: number, status: number) => Query('UPDATE matches SET status = $1 WHERE id = $2', [status, match_id]);

export default {
    find,
    insert,
    updateStatus  
}