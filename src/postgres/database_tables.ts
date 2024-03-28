export enum Table {
  users = 'users',
  participants = 'participants',
}

export enum UserColumn {
  id = 'userid',
  username = 'username',
  email = 'email',
  password = 'password',
  created_at = 'created_at'
}

export enum ParticipantColumn {
  id = 'participantid',
  info = 'info',
  raffleid = 'raffleid',
}
