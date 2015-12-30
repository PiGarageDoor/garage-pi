import { Document } from 'camo';

export default class User extends Document {
  constructor() {
    super();

    this.schema({
      token: String,
      name: String,
    });
  }
}
