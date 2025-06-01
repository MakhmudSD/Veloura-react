import axios from "axios";
import { serverApi } from "../lib/config";
import { Product, ProductInquiry } from "../lib/types/product";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      console.log("getProducts here");
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
  
      if (input.productCategory)
        url += `&productCategory=${input.productCategory}`;
      if (input.search)
        url += `&search=${input.search}`;
  
      const result = await axios.get(url);
      console.log("result:", result);
      return result.data;
    } catch (err) {
      console.log("ERROR on getProducts", err);
      throw err;
    }
  }
  
  public async getProduct(productId: string): Promise<Product> {
    try{
      const url = `${this.path}/product/${productId}`
      const result = await axios.get(url, {withCredentials: true}) // checks the requesting member
      return result.data
    }catch(err) {
      console.log("ERROR on getProduct", err);
      throw err;
    }
  } 
}

export default ProductService;
