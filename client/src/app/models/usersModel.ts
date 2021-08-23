import { Cart } from './cartsModel';

export class City {
  Symbol: string = '';
  name: string = '';
  population: string = '';

  constructor(Symbol: string, name: string, population: string) {
    this.Symbol = Symbol || '';
    this.name = name || '';
    this.population = population || '';
  }
}

export class User {
  ID?: number;
  FirstName: string = '';
  LastName: string = '';
  Email: string = '';
  Password: string = '';
  Phone?: number;
  Street: string = '';
  StreetNumber?: number;
  FlatNumber?: number;
  City: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  Role: number = 0;
  // Carts: Array<Cart> = [];

  constructor(
    ID?: number,
    FirstName?: string,
    LastName?: string,
    Email?: string,
    Password?: string,
    Phone?: number,
    Street?: string,
    StreetNumber?: number,
    FlatNumber?: number,
    City?: string,
    createdAt?: string,
    updatedAt?: string,
    Role?: number
    // Carts?: Array<Cart>
  ) {
    this.ID = ID;
    this.FirstName = FirstName || '';
    this.LastName = LastName || '';
    this.Email = Email || '';
    this.Password = Password || '';
    this.Phone = Phone;
    this.Street = Street || '';
    this.StreetNumber = StreetNumber;
    this.FlatNumber = FlatNumber;
    this.City = City || '';
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
    this.Role = Role || 0;
    // this.Carts = Carts || [];
  }
}
