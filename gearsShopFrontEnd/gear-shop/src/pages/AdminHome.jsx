import NavBarAdmin from "../components/NavBarAdmin";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CardProduct from "../components/CardProduct";
import "./home.css";
export default function AdminHome() {
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    axios.get("http://localhost:8080/product/getAll").then((response) => {
      setProducts(response.data);
    });
  };
  useEffect(() => {
    getProducts();
  }, []);

  function renderProduct() {
    return products.map((product) => {
      return <CardProduct key={product.id} product={product} />;
    });
  }
  return (
    <>
      <NavBarAdmin></NavBarAdmin>
      <div className="container product-list">{renderProduct()}</div>
    </>
  );
}
