package com.maciag.smartorders.service;


import com.maciag.smartorders.JSON.AddToRemoveJSON;
import com.maciag.smartorders.JSON.OptionJSON;
import com.maciag.smartorders.model.*;
import com.maciag.smartorders.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {


    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductOptionRepository productOptionRepository;

    @Autowired
    AddToRemoveRepository addToRemoveRepository;

    @Autowired
    ProductTypeRepository productTypeRepository;

    @Autowired
    SubCatgRepository subCatgRepository;

    public void addProduct(String productName, double price, String productType, String productSubCatg, List<AddToRemoveJSON> addToRemoveJSONList, List<OptionJSON> optionJSONList){


        SubCatg subCatg = subCatgRepository.findByName(productSubCatg).orElse(null);
        ProductType productT =  productTypeRepository.findByName(productType).orElse(null);


        if(subCatg==null)
            subCatg = subCatgRepository.save(new SubCatg(productSubCatg));

        if(productT==null)
            productT = productTypeRepository.save(new ProductType(productType));

        Product product = new Product(productName, price);

        product.setType(productT);
        product.setSubCatgs(subCatg);

        List<ProductOption> productOptions = new ArrayList<>();
        List<AddToRemove>  addToRemoves  = new ArrayList<>();

        for(int i = 0; i<addToRemoveJSONList.size();i++){
            String atr_name = addToRemoveJSONList.get(i).name;
            AddToRemove atr = addToRemoveRepository.findByName(atr_name).orElse(null);
            if(atr==null){
                atr = new AddToRemove(atr_name);
                atr = addToRemoveRepository.save(atr);
            }
            addToRemoves.add(atr);

        }
        for(int i = 0; i<optionJSONList.size();i++){
            String o_name = optionJSONList.get(i).name;
            String category = optionJSONList.get(i).category;
            double o_price = optionJSONList.get(i).price;

            ProductOption pr_opt = productOptionRepository.findByNameAndCategoryAndPrice(o_name, category, o_price).orElse(null);
            if(pr_opt==null){
                pr_opt = new ProductOption(o_name,category, o_price);
                pr_opt = productOptionRepository.save(pr_opt);
            }
            productOptions.add(pr_opt);
        }



        product.setAddsToRemove(addToRemoves);
        product.setOptions(productOptions);
        productRepository.save(product);
    }
    public List<Product> getAllProducts(){
        List<Product> products = (List<Product>) productRepository.findAll();
        return products;
    }

    public List<ProductType> getAllProductTypes(){
        return (List<ProductType>) productTypeRepository.findAll();
    }

    public List<SubCatg> getAllSubCatg(){
        return (List<SubCatg>) subCatgRepository.findAll();
    }
}
