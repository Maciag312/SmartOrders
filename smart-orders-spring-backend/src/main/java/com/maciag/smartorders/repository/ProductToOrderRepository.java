package com.maciag.smartorders.repository;

import com.maciag.smartorders.model.AddToRemove;
import com.maciag.smartorders.model.Product;
import com.maciag.smartorders.model.ProductOption;
import com.maciag.smartorders.model.ProductToOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface ProductToOrderRepository extends JpaRepository<ProductToOrder, Long> {

    List<ProductToOrder> findAllByProduct(Product product);
}
