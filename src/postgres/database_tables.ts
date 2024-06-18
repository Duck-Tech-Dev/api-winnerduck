export enum Table {
  users = 'users',
  participants = 'participants',
  raffles = 'raffles'
}

export enum UserColumn {
  id = 'id',
  username = 'username',
  email = 'email',
  password = 'password',
  created_at = 'created_at'
}

export enum ParticipantColumn {
  id = 'id',
  info = 'info',
  raffle_id = 'raffle_id',
}

export enum RaffleColumn {
  id = 'id',
  title = 'title',
  form = 'form',
  author_id = 'author_id'
}
