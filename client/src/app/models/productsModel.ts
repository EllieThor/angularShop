export class Category {
  ID: number = 0;
  CategoryName: string = '';
  createdAt: string = '';
  updatedAt: string = '';

  constructor(
    ID: number,
    CategoryName: string,
    createdAt: string,
    updatedAt: string
  ) {
    this.ID = ID || 0;
    this.CategoryName = CategoryName || '';
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
  }
}

export class Product {
  [x: string]: any;
  ID: number = 0;
  ProductName: string = '';
  Price: number = 0;
  Description: string = '';
  ImageName: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  CategoryID: number = 0;

  constructor(
    ID?: number,
    ProductName?: string,
    Price?: number,
    Description?: string,
    ImageName?: string,
    createdAt?: string,
    updatedAt?: string,
    CategoryID?: number
  ) {
    this.ID = ID || 0;
    this.ProductName = ProductName || '';
    this.Price = Price || 0;
    this.Description = Description || '';
    this.ImageName = ImageName || '';
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
    this.CategoryID = CategoryID || 0;
  }
}
