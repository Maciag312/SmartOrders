package com.maciag.smartorders.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name="ProductOption")
public class ProductOption {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    private String category;
    private String name;
    private double price;

    public ProductOption(String category, String name, double price) {
        this.category = category;
        this.name = name;
        this.price = price;
    }

    public ProductOption() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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
}
