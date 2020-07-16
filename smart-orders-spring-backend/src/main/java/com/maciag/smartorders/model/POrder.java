package com.maciag.smartorders.model;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Entity
@javax.persistence.Table(name="POrder")
public class POrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    public POrder(RestaurantTable restaurantTable, List<ProductToOrder> productToOrder, Client client) {
        this.restaurantTable = restaurantTable;
        this.productToOrder = productToOrder;
        this.client = client;
        this.creation_time = Calendar.getInstance().getTime();
    }

    public POrder() {
    }

    @Temporal(TemporalType.TIMESTAMP)
    Date creation_time;

    @Temporal(TemporalType.TIMESTAMP)
    Date handled_time;

    @ManyToOne(cascade = CascadeType.ALL)
    RestaurantTable restaurantTable;

    @ManyToMany(cascade = CascadeType.ALL)
    List<ProductToOrder> productToOrder;

    @ManyToOne(cascade = CascadeType.ALL)
    Client client;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreation_time() {
        return creation_time;
    }

    public void setCreation_time(Date creation_time) {
        this.creation_time = creation_time;
    }

    public Date getHandled_time() {
        return handled_time;
    }

    public void setHandled_time(Date handled_time) {
        this.handled_time = handled_time;
    }

    public RestaurantTable getRestaurantTable() {
        return restaurantTable;
    }

    public void setRestaurantTable(RestaurantTable restaurantTable) {
        this.restaurantTable = restaurantTable;
    }

    public List<ProductToOrder> getProductToOrder() {
        return productToOrder;
    }

    public void setProductToOrder(List<ProductToOrder> productToOrder) {
        this.productToOrder = productToOrder;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
