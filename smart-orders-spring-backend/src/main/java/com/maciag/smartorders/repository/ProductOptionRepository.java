package com.maciag.smartorders.repository;

import com.maciag.smartorders.model.ProductOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.Optional;

public interface ProductOptionRepository extends JpaRepository<ProductOption, Long> {

    Optional<ProductOption> findByNameAndCategoryAndPrice(String name, String category, double price);

}
