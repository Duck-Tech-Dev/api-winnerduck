export enum Table {
  users = 'users',
  participants = 'participants',
  raffles = 'raffles'
}

export enum UserColumn {
  userid = 'userid',
  username = 'username',
  email = 'email',
  password = 'password',
  created_at = 'created_at'
}

export enum ParticipantColumn {
  participantid = 'participantid',
  info = 'info',
  raffleid = 'raffleid',
}

export enum RaffleColumn {
  raffleid = 'raffleid',
  rafflename = 'rafflename',
  form = 'form',
  authorid = 'authorid'
}
