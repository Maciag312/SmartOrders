package com.maciag.smartorders.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name="ProductToOrder")
public class ProductToOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    private double totalPrice;

    public ProductToOrder() {
    }

    public ProductToOrder(Product product) {
        this.product = product;
    }

    @OneToMany(cascade = CascadeType.ALL)
    List<ProductOption> options;

    @OneToMany(cascade = CascadeType.ALL)
    List<AddToRemove> addsToRemove;

    @NotNull
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="product_id")
    Product product;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<ProductOption> getOptions() {
        return options;
    }

    public void setOptions(List<ProductOption> options) {
        this.options = options;
    }

    public List<AddToRemove> getAddsToRemove() {
        return addsToRemove;
    }

    public void setAddsToRemove(List<AddToRemove> addsToRemove) {
        this.addsToRemove = addsToRemove;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
