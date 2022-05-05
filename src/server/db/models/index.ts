export interface UserTable {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  url?: string;
}

export interface MatchTable {
  id?: number;
  sender_id?: number;
  receiver_id?: number;
  status?: number;
}

export interface Video {
  id?: number;
  name?: string;
  url?: string;
  user_id?: number;
}
