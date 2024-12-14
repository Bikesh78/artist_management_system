export enum GenderEnum {
  m = "m",
  f = "f",
  o = "o",
}

export enum GenreEnum {
  rnb = 'rnb',
  country = 'country',
  classic = 'classic',
  rock = 'rock',
  jazz = 'jazz'
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  dob: Date;
  phone: string;
  gender: GenderEnum;
  address: string;
}

