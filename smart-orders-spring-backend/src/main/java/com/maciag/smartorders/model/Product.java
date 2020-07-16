package com.maciag.smartorders.model;

import javax.persistence.*;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.List;


@Entity
@Table(name="Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    private String name;
    private double price;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<AddToRemove> addsToRemove;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<ProductOption> options;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name="subcatg_id")
    private SubCatg subCatgs;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name="type_id")
    private ProductType type;


    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public Product() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<AddToRemove> getAddsToRemove() {
        return addsToRemove;
    }

    public void setAddsToRemove(List<AddToRemove> addsToRemove) {
        this.addsToRemove = addsToRemove;
    }

    public List<ProductOption> getOptions() {
        return options;
    }

    public void setOptions(List<ProductOption> options) {
        this.options = options;
    }

    public SubCatg getSubCatgs() {
        return subCatgs;
    }

    public void setSubCatgs(SubCatg subCatgs) {
        this.subCatgs = subCatgs;
    }

    public ProductType getType() {
        return type;
    }

    public void setType(ProductType type) {
        this.type = type;
    }
}
