package com.maciag.smartorders.repository;

import com.maciag.smartorders.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {
    Optional<ProductType> findByName(String name);

}

