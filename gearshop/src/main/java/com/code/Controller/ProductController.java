package com.code.Controller;

import com.code.Entity.Product;
import com.code.Entity.ProductImg;
import com.code.Model.Uploader;
import com.code.Service.CategoryService;
import com.code.Service.ProductImgService;
import com.code.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService ProductService ;

    @Autowired
    private CategoryService CategoryService ;

    @Autowired
    private ProductImgService ProductImgService ;

    @RequestMapping("/getAll")
    public List<Product> getAll(){
        return ProductService.getAll();
    }

    @PostMapping("/save")
    public Product save(
            @RequestParam("name") String name,
            @RequestParam("cateID") int cateID ,
            @RequestParam("price") Long price ,
            @RequestParam("description") String description
    ){
        Product product = new Product();
        product.setEnable(true);
        product.setCategory(CategoryService.findById(cateID));
        product.setName(name);
        product.setPrice(price);
        product.setDescription(description);
        ProductService.save(product);
        return product;
    }

    @PostMapping("/update")
    public Product update(
            @RequestParam("id") int id ,
            @RequestParam("name") String name,
            @RequestParam("cateID") int cateID ,
            @RequestParam("price") Long price ,
            @RequestParam("description") String description
    ){
        Product product = ProductService.findById(id);
        product.setEnable(true);
        product.setCategory(CategoryService.findById(cateID));
        product.setName(name);
        product.setPrice(price);
        product.setDescription(description);
        ProductService.save(product);
        return product;
    }

    @GetMapping("/deleteProduct")
    public String deleteProduct(
            @RequestParam("id") int id
    ){
        Product product = ProductService.findById(id);
        product.setEnable(false);
        ProductService.save(product);
        return "OK";
    }

    @PostMapping("/uploadIMG")
    public String uploadIMG(
            @RequestParam("id") int id ,
            @RequestParam("img") MultipartFile img
    ){
        Uploader uploader = new Uploader();
        Product product = ProductService.findById(id) ;
        product.setImg(uploader.uploadFile(img));
        ProductService.save(product);
        return "Successful";
    }

    @PostMapping("/addIMG")
    public String addIMG(
            @RequestParam("id") int id ,
            @RequestParam("img") MultipartFile img
    ){
        Uploader uploader = new Uploader();
        ProductImg ProductImg = new ProductImg() ;
        ProductImg.setProduct(ProductService.findById(id));
        ProductImg.setImg(uploader.uploadFile(img));
        return "Successful";
    }
}
