export class User {
  id!: number;
  name!: string;

  getRole():string {
    return "standard";
  }

  //helper method that will be used to convert json file to User type.
  static fromHttp(user: User) : User {
    const newUser = new User();
    newUser.id = user.id;
    newUser.name = user.name;
    return newUser;
  }
}
