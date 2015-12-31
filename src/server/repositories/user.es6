import User from '../models/user';

export function loadUserByName(username) {
  return new Promise((resolve, reject) => {
    User.loadOne({ name: username }).then(user => {
      resolve(user);
    }).catch(err => {
      reject(err);
    });
  });
}

export function addUser(user) {
  return new Promise((resolve, reject) => {
    User.create(user).save().then(savedUser => {
      if (!savedUser) {
        return reject(new Error('Cannot save User.'));
      }
      resolve(savedUser);
    }).catch(err => {
      reject(err);
    });
  });
}
