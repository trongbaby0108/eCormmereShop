import './App.css';
import ProductsAdmin from './pages/ProductsAdmin';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import AdminHome from './pages/AdminHome';
import CategoryPage from './pages/CategoryPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/" element={<AdminHome />}></Route>
        <Route path="/admin/product" element={<ProductsAdmin />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin/category" element={<CategoryPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
