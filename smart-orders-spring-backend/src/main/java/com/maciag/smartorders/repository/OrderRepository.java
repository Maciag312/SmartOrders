package com.maciag.smartorders.repository;

import com.maciag.smartorders.model.POrder;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderRepository extends JpaRepository<POrder, Long> {
}
