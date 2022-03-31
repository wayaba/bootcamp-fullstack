db.createUser({
  user: 'wayaba',
  pwd: 'wayaba123',
  roles: [
    {
      role: 'dbOwner',
      db: 'note-db',
    },
  ],
})
