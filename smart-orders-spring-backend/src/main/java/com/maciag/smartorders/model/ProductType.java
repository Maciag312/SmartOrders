package com.maciag.smartorders.model;

import javax.persistence.*;
import javax.persistence.Table;

@Entity
@Table(name="ProductType")
public class ProductType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="type_id")
    Long id;

    private String name;

    public ProductType(String name) {
        this.name = name;
    }

    public ProductType() {
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