import DB from '../lib/db';
import User from '../models/user';
import config from 'config';

const dbConfig = config.get('nedb');

export function loadUserByName(username) {
  return new Promise((resolve, reject) => {
    const db = new DB(dbConfig);
    db.connect().then(() => {
      User.loadOne({ name: username }).then(user => {
        if (!user) {
          reject(new Error('User not found.'));
          return;
        }
        resolve(user);
      });
    });
  });
}

export function addUser(user) {
  return new Promise((resolve, reject) => {
    const db = new DB(dbConfig);
    db.connect().then(() => {
      User.create(user).save().then(savedUser => {
        if (!savedUser) {
          reject(new Error('Cannot save User.'));
          return;
        }
        resolve(savedUser);
      });
    });
  });
}