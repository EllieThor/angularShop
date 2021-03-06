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

export class ShippingDateCart {
  cartID: number;
  ShippingDate: string = '';
  ShippingObj: any = {
    year: 0,
    month: 0,
    day: 0,
  };
  isAvailable?: boolean;

  constructor(cartID: number, ShippingDate: string, ShippingObj: any) {
    this.cartID = cartID || 0;
    this.ShippingDate = ShippingDate || '';
    this.ShippingObj = ShippingObj || { year: 0, month: 0, day: 0 };
    this.isAvailable = this.isAvailable;
  }
}
