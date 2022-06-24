import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import "../components/products.css";
import NavBarAdmin from "../components/NavBarAdmin";
import { priceFormatter } from "../untils/format";

export default function Products() {
  const [update, setUpdate] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ds, setDs] = useState("none");
  const newForm = {
    id: 0,
    name: "",
    price: 0,
    img: {},
    description: "",
    categoryId: 0,
  };
  const [form, setForm] = useState(newForm);

  const getProducts = () => {
    axios.get("http://localhost:8080/product/getAll").then((response) => {
      setProducts(response.data);
    });
  };

  const getCategories = () => {
    axios.get("http://localhost:8080/category/getAll").then((response) => {
      setCategories(response.data);
    });
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  useEffect(() => {}, []);

  function renderProduct() {
    return products.map((product) => {
      return (
        <tr key={product.id}>
          <td className="text-center align-middle">{product.id}</td>
          <td className="text-center align-middle">{product.name}</td>
          <td className="text-center align-middle">
            {priceFormatter(product.price)}
          </td>
          <td className="text-center align-middle">{product.description}</td>
          <td className="text-center align-middle">
            {product.enable ? "Còn kinh doanh" : "Ngưng kinh doanh"}
          </td>
          <td className="text-center align-middle">
            <Button
              variant="danger"
              className="m-2"
              onClick={deleteProduct(product)}
            >
              Xóa
            </Button>
            <Button
              variant="info"
              className="m-2"
              onClick={() => {
                setUpdate(true);
                setForm(product);
                setDs("block");
              }}
            >
              Sửa sản phẩm
            </Button>{" "}
          </td>
        </tr>
      );
    });
  }

  function renderCategory() {
    return categories.map((category) => {
      return (
        <option value={category.id} key={category.id}>
          {category.name}
        </option>
      );
    });
  }

  function addProduct() {
    return async () => {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("cateID", form.categoryId);
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/product/save",
        data: formData,
      });
      const product = response.data;
      const imgFromData = new FormData();
      imgFromData.append("id", product.id);
      imgFromData.append("img", form.img);
      const imgResponse = axios({
        method: "post",
        url: "http://localhost:8080/product/uploadIMG",
        data: imgFromData,
      });
      console.log(imgResponse.data);
      window.location.reload(false);
      setForm(newForm);
    };
  }

  function updateProduct() {
    const formData = new FormData();

    formData.append("id", form.id);
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("cateID", form.categoryId);
  }

  function deleteProduct(product) {
    return async () => {
      const res = await axios({
        method: "get",
        url: "http://localhost:8080/product/deleteProduct",
        params:  {id : product.id},
      });
      window.location.reload(false);
    };
  }

  function showForm() {
    return (
      <>
        <div style={{ display: ds }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Tên sản phẩm"
                value={form.name}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setForm((form) => ({ ...form, [name]: value }));
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giá sản phẩm</Form.Label>
              <Form.Control
                type="number"
                placeholder="Giá sản phẩm"
                name="price"
                value={form.price}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setForm((form) => ({ ...form, [name]: value }));
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Mô tả"
                value={form.description}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setForm((form) => ({ ...form, [name]: value }));
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Loại sản phẩm</Form.Label>
              <Form.Select
                name="categoryId"
                defaultValue={"DEFAULT"}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setForm((form) => ({ ...form, [name]: value }));
                }}
              >
                <option value="DEFAULT" disabled hidden>
                  Chọn loại sản phẩm
                </option>
                {renderCategory()}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh sản phẩm</Form.Label>
              <Form.Control
                type="file"
                placeholder="Giá sản phẩm"
                name="img"
                onChange={(e) => {
                  const { name, files } = e.target;
                  setForm((form) => ({ ...form, [name]: files[0] }));
                }}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={addProduct()}
            >
              {update == true ? "Cập nhật" : "Thêm sản phẩm"}
            </Button>
          </Form>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBarAdmin />
      <div className="container">
        <div className="btn_add">
          <Button
            variant="success"
            onClick={() => {
              let isDs = ds === "block" ? "none" : "block";
              setForm(newForm);
              setDs(isDs);
              setUpdate(false);
            }}
          >
            Thêm sản phẩm
          </Button>{" "}
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center align-middle">Mã sản phẩm</th>
              <th className="text-center align-middle">Tên sản phẩm</th>
              <th className="text-center align-middle">Giá bán</th>
              <th className="text-center align-middle">Mô tả</th>
              <th className="text-center align-middle">Trạng thái</th>
              <th className="text-center align-middle">Hoạt động</th>
            </tr>
          </thead>
          <tbody>{renderProduct()}</tbody>
        </Table>
        {showForm()}
      </div>
    </>
  );
}
