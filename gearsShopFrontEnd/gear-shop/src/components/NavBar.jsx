import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import axios from "axios";
export default function Header() {
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
          <Navbar.Brand href="#home">Trang chủ</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Thể loại" id="collasible-nav-dropdown">
                {renderCategory()}
              </NavDropdown>
              <Nav.Link href="#">Sản phẩm</Nav.Link>
              <Nav.Link href="#">Bảo hành</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Giỏ hàng</Nav.Link>
              <Nav.Link href="#memes">Lịch sử mua hàng</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
