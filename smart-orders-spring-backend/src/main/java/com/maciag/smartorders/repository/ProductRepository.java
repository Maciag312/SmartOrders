package com.maciag.smartorders.repository;

import com.maciag.smartorders.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
