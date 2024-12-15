export enum GenderEnum {
  m = "m",
  f = "f",
  o = "o",
}

export enum GenreEnum {
  rnb = "rnb",
  country = "country",
  classic = "classic",
  rock = "rock",
  jazz = "jazz",
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

export interface IArtist {
  id: number;
  name: string;
  dob: Date;
  gender: GenderEnum;
  address: string;
  first_release_year: string;
  no_of_albums_released: number;
}

export interface IMusic {
  id: number;
  title: string;
  album_name: string;
  genre: GenreEnum;
  artist_id: number;
}
