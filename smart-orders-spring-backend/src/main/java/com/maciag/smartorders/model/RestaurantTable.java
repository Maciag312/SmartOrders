package com.maciag.smartorders.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
@javax.persistence.Table(name="RestaurantTable")
public class RestaurantTable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    private String name;

    public RestaurantTable() {
    }

    public RestaurantTable(String name) {
        this.name = name;
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
}
