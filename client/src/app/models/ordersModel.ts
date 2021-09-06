export class Order {
  ID: number = 0;
  FinalPrice: number = 0;
  ShippingCity: string = '';
  ShippingStreet: string = '';
  ShippingDate: string = '';
  CreditCard: string = '';
  cartID: number = 0;
  userID: number = 0;
  createdAt: string = '';
  updatedAt: string = '';

  constructor(
    ID?: number,
    FinalPrice?: number,
    ShippingCity?: string,
    ShippingStreet?: string,
    ShippingDate?: string,
    CreditCard?: string,
    cartID?: number,
    userID?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.ID = ID || 0;
    this.FinalPrice = FinalPrice || 0;
    this.ShippingCity = ShippingCity || '';
    this.ShippingStreet = ShippingStreet || '';
    this.ShippingDate = ShippingDate || '';
    this.CreditCard = CreditCard || '';
    this.cartID = cartID || 0;
    this.userID = userID || 0;
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
  }
}
//`ID`, `FinalPrice`, `ShippingCity`, `ShippingStreet`, `ShippingDate`, `CreditCard`, `createdAt`, `updatedAt`, `cartID`, `userID`
