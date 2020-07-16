package com.maciag.smartorders.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="AddToRemove")
public class AddToRemove {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    private String name;

    public AddToRemove() {
    }


    public AddToRemove(String name) {
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
