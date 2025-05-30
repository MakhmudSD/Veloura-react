import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useHistory } from "react-router-dom";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { retrieveProducts } from "../productsPage/selector";
import { setProducts } from "../productsPage/slice";
import { Product } from "../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCategory } from "../../lib/enums/products.enum";
import { serverApi } from "../../lib/config";

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export function OurLatestProducts() {
  const history = useHistory();
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  useEffect(() => {
    const productService = new ProductService();
    productService
      .getProducts({
        page: 1,
        limit: 7,
        order: "createdAt", // optional
        productCategory: ProductCategory.ALL, // or your relevant category
        search: "",
        gender: "",
        volume: "",
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error fetching collections products", err));
  }, []);

  const chooseProductDetail = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <Container className="collection-container homepage">
      <Box className="collection-title">
        <span>Our Latest Products</span>
      </Box>
      <Box className="collection-grid">
        {products.slice(0, 7).map((item, index) => (
          <Box className="collection-item" key={index}>
            <div className="image-wrapper">
              <img
                src={`${serverApi}/${item.productImages[0]}`}
                alt={item.productName}
                onClick={() => chooseProductDetail(item._id)}
              />
            </div>
            <p>{item.productName}</p>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default OurLatestProducts;
