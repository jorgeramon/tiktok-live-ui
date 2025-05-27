export interface IRequest {
  _id: string;
  live_id: string;
  user_id: string;
  user_username: string;
  user_nickname: string;
  user_picture: string;
  request: string;
  completed: boolean;
  requested_at: string;
  completed_at: string;
}
