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
  isMark: boolean = false;

  constructor(
    ID?: number,
    Qnt?: number,
    TotalPrice?: number,
    createdAt?: string,
    updatedAt?: string,
    productID?: number,
    cartID?: number,
    isMark?: boolean,
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
    this.isMark = isMark || false;
  }
}
//  {
//         "ID": 1,
//         "Qnt": 1,
//         "TotalPrice": 50,
//         "createdAt": "2021-08-26T12:42:17.000Z",
//         "updatedAt": "2021-08-26T12:42:17.000Z",
//         "productID": 40,
//         "cartID": 31,
//         "product": {
//             "ProductName": "סימפוניה זיתים",
//             "Price": 19.7,
//             "ImageName": "1596962647453_ESB34_L_P_5839108_1.png"
//         }
//     }
// item.Qnt * item.product.Price;
