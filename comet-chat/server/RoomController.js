class RoomController {
  constructor() {
    this.users = []
  }

  add(user) {
    this.users.push(user)
  }

  get(id) {
    return this.users.find(u => u.id === id)
  }

  remove(id) {
    const user = this.get(id)

    if(user) {
      this.users = this.users.filter(u => u.id !== id)
    }

    return user
  }

  getAll(room) {
    return this.users.filter(u => u.room === room)
  }
}

module.exports = function() {
  return new RoomController()
}
