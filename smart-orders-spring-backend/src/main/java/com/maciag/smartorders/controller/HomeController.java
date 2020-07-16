package com.maciag.smartorders.controller;


import com.maciag.smartorders.JSON.OrderJSON;
import com.maciag.smartorders.JSON.ProductJSON;
import com.maciag.smartorders.model.*;
import com.maciag.smartorders.service.OrderService;
import com.maciag.smartorders.service.ProductService;
import com.maciag.smartorders.service.RestaurantService;
import jdk.jfr.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HomeController {

    @Autowired
    OrderService orderService;

    @Autowired
    ProductService productService;

    @Autowired
    RestaurantService restaurantService;

    @PostMapping(path = "/addProduct", consumes = "application/json")
    public void addProduct(@RequestBody ProductJSON product){
        productService.addProduct(product.name, product.price, product.type, product.subcatg,product.removeableadds, product.options);
    }

    @PostMapping(path = "/order", consumes = "application/json")
    public boolean order(@RequestBody OrderJSON order){
        return orderService.order(order.client_mail, order.table, order.products);
    }

    @GetMapping("/getAllSubCatg")
    public List<SubCatg> getAllSubCategories(){
        return productService.getAllSubCatg();
    }

    @GetMapping("/getAllProductsType")
    public List<ProductType> getAllProductType(){
        return productService.getAllProductTypes();
    }


    @GetMapping("/getAllOrders")
    public List<POrder> getAllOrders(){
        return orderService.getAllOrders();
    }

    @GetMapping("/getAllProducts")
    public List<Product> getAllProducts(){
         return productService.getAllProducts();
    }

    @GetMapping("/sayHello")
    public String sayHello(){
        return "Hello!";
    }

    @PostMapping(value = "/addTable/{table_name}")
    public RestaurantTable addTable(@PathVariable String table_name){
        table_name=table_name.toLowerCase();
        return restaurantService.addTable(table_name);
    }





}
