export class User {
  ID?: number;
  FirstName: string = '';
  LastName: string = '';
  Email: string = '';
  Password: string = '';
  Phone: number = 0;
  Street: string = '';
  StreetNumber: number = 0;
  FlatNumber: number = 0;
  City: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  Role: number = 0;

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
  ) {
    this.ID = ID || 0;
    this.FirstName = FirstName || '';
    this.LastName = LastName || '';
    this.Email = Email || '';
    this.Password = Password || '';
    this.Phone = Phone || 0;
    this.Street = Street || '';
    this.StreetNumber = StreetNumber || 0;
    this.FlatNumber = FlatNumber || 0;
    this.City = City || '';
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
    this.Role = Role || 0;
  }
}
// `ID`,
//   `Role`,
//   `FirstName`,
//   `LastName`,
//   `Email`,
//   `Password`,
//   `Phone`,
//   `Street`,
//   `StreetNumber`,
//   `FlatNumber`,
//   `City`,
//   `createdAt`,
//   `updatedAt`;
