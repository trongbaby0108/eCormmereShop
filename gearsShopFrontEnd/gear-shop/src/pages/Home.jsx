import React, { useEffect, useState } from "react";
import axios from "axios";
import CardProduct from "../components/CardProduct";
import "./home.css";
import NavBar from "../components/NavBar";

export default function Home() {
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
        <NavBar></NavBar>
      <div className="container product-list">{renderProduct()}</div>
    </>
  );
}
