class Users {



  constructor() {
    this.users = [];
    }

    addUser(id, name, room) {
      var user = {id, name, room};
      this.users.push(user);
      //console.log('form inside add array is: ',this.users);
      return this.users;
    };

    removeUser(id) {
      var user = this.getUser(id);
      if (!user) {
        console.log('No such');

      }else {
        this.users = this.users.filter((user) => {
          return user.id !== id;
        });
        console.log(user,'is the guy');
      }
      return user;
    }

    getUser(id) {
      return this.users.filter((user) => {
        return user.id === id;
      });
    }

    getUsersList(room) {
      var filteredUsers = this.users.filter((user) => {
        return user.room === room;
      });

      var namesArray = filteredUsers.map((user) => {
        return user.name;
      });

      return namesArray;
    }

    getAllUsers() {
      return this.users;
    }



}

module.exports = {Users};
