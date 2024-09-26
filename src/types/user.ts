export class User {
  user_id: string;
  full_name: string;
  email: string;
  jwt_token: string;
  phone_number: string;
  role: string;

  constructor(
    user_id: string,
    full_name: string,
    email: string,
    jwt_token: string,
    phone_number: string,
    role: string
  ) {
    this.user_id = user_id;
    this.full_name = full_name;
    this.email = email;
    this.jwt_token = jwt_token;
    this.phone_number = phone_number;
    this.role = role;
  }
}
