package com.maciag.smartorders.service;


import com.maciag.smartorders.JSON.Product_orderJSON;
import com.maciag.smartorders.model.*;
import com.maciag.smartorders.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {


    @Autowired
    ClientRepository clientRepository;

    @Autowired
    RestaurantTableRepository tableRepository;


    @Autowired
    ProductRepository productRepository;


    @Autowired
    AddToRemoveRepository addToRemoveRepository;

    @Autowired
    ProductOptionRepository productOptionRepository;

    @Autowired
    ProductToOrderRepository productToOrderRepository;

    @Autowired
    OrderRepository orderRepository;


    private ProductToOrder saveProductToOrder(Product product, List<ProductOption> productOptions, List<AddToRemove> addToRemoves, double totalPrice){
        ProductToOrder productToOrder = new ProductToOrder();
        productToOrder.setProduct(product);
        productToOrder.setOptions(productOptions);
        productToOrder.setAddsToRemove(addToRemoves);
        productToOrder.setTotalPrice(totalPrice);
        productToOrder = productToOrderRepository.save(productToOrder);
        return productToOrder;
    }


    public boolean order(String clientsMail, String tableName, List<Product_orderJSON> productOrderJSONs){
        Client client = clientRepository.findByMail(clientsMail).orElse(null);
        if(client==null){
            client = new Client(clientsMail);
            client = clientRepository.save(client);
        }
        RestaurantTable restaurantTable = tableRepository.findByName(tableName).orElse(null);
        if(restaurantTable==null)
            return false;



        List<ProductToOrder> productToOrders = new ArrayList<>();

        for(int i = 0; i<productOrderJSONs.size();i++){

            Product product = productRepository.findById(productOrderJSONs.get(i).product_id).orElse(null);
            if(product==null)return false;
            BigDecimal totalPrice = BigDecimal.valueOf(product.getPrice());

            List<ProductOption> productOptions = new ArrayList<>();
            List<AddToRemove> addToRemoves = new ArrayList<>();


            for(int j=0; j<productOrderJSONs.get(i).addsToRemove_id.size();j++){
                AddToRemove addToRemove = addToRemoveRepository.findById(productOrderJSONs.get(i).addsToRemove_id.get(j)).orElse(null);
                if(addToRemove==null)
                    return false;
                addToRemoves.add(addToRemove);

            }
            for(int j=0; j<productOrderJSONs.get(i).options_id.size();j++){
                ProductOption productOption = productOptionRepository.findById(productOrderJSONs.get(i).options_id.get(j)).orElse(null);
                if(productOption==null)
                    return false;
                productOptions.add(productOption);
                totalPrice = totalPrice.add(BigDecimal.valueOf(productOption.getPrice()));

            }

            List<ProductToOrder> productsToOrder = productToOrderRepository.findAllByProduct(product);

            ProductToOrder productToOrder = null;

            boolean doesntContain;
            if(productsToOrder.size()==0){
                productToOrders.add(saveProductToOrder(product, productOptions, addToRemoves, totalPrice.doubleValue()));

            }

            for(int j=0; i<productsToOrder.size();i++){
                doesntContain = false;
                for(int k=0; k<addToRemoves.size();k++){
                    if(!productsToOrder.get(j).getAddsToRemove().contains(addToRemoves.get(k)))
                        doesntContain = true;
                }
                for(int k=0; k<productOptions.size();k++){
                    if(!productsToOrder.get(j).getOptions().contains(productOptions.get(k)))
                        doesntContain = true;
                }
                if(doesntContain) {
                    productToOrders.add(saveProductToOrder(product, productOptions, addToRemoves, totalPrice.doubleValue()));
                }else
                    productToOrders.add(productsToOrder.get(j));
            }

        }
        POrder POrder = new POrder(restaurantTable,productToOrders,client);

        orderRepository.save(POrder);

        return true;
    }
    public List<POrder> getAllOrders(){
        return orderRepository.findAll();
    }
}
