package com.maciag.smartorders.model;

import javax.persistence.*;
import javax.persistence.Table;


@Entity
@Table(name="SubCatg")
public class SubCatg {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "subcatg_id")
    Long id;

    private String name;

    public SubCatg(){}

    public SubCatg(String name) {
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
