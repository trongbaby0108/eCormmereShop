import React, { useEffect, useState } from "react";
import {  Button, Form } from "react-bootstrap";
import "../components/products.css";
import NavBarAdmin from "../components/NavBarAdmin";
import { Route, useParams } from "react-router-dom";

export default function CategoryPage() {
  return (
    <div>
      <NavBarAdmin></NavBarAdmin>
      <div className="container">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Tên sản phẩm"
              onChange={(e) => {
                const { name, value } = e.target;
              }}
            />
          </Form.Group>
          <Button variant="primary">
            Thêm
          </Button>
        </Form>
      </div>
    </div>
  );
}
