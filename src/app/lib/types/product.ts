import {
  ProductCategory,
  ProductTier,
  ProductStatus,
  ProductTargetAudience,
} from "../enums/products.enum";

export interface Product {
  _id: string;
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productName: string;
  productPrice: number;
  productTier: ProductTier; 
  productQuantity?: number;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  productVolumeMl?: number; 
  productTargetAudience?: ProductTargetAudience;
}

export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productCategory?: ProductCategory;
  search?: string;
}