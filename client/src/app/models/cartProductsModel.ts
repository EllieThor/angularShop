export class CartProduct {
  ID: number = 0;
  Qnt: number = 0;
  TotalPrice: number = 0;
  createdAt: string = '';
  updatedAt: string = '';
  productID: number = 0;
  cartID: number = 0;
  product: any = {
    ProductName: '',
    Price: 0,
    ImageName: '',
  };

  constructor(
    ID?: number,
    Qnt?: number,
    TotalPrice?: number,
    createdAt?: string,
    updatedAt?: string,
    productID?: number,
    cartID?: number,
    product?: any
  ) {
    this.ID = ID || 0;
    this.Qnt = Qnt || 0;
    this.TotalPrice = TotalPrice || 0;
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
    this.productID = productID || 0;
    this.cartID = cartID || 0;
    this.product = product || {};
  }
}
