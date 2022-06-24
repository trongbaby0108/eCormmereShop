import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../components/products.css";

export default function NavBarAdmin() {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get("http://localhost:8080/category/getAll").then((response) => {
      setCategories(response.data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  function renderCategory() {
    return categories.map((category) => {
      return (
        <NavDropdown.Item key={category.id}>{category.name}</NavDropdown.Item>
      );
    });
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/admin">Trang chủ</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/admin/category">Loại sản phẩm</Nav.Link>
              <Nav.Link href="/admin/product">Sản phẩm</Nav.Link>
              <Nav.Link href="/admin/brand">Hãng sản xuất</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
