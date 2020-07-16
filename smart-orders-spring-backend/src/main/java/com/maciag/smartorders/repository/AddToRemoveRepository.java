package com.maciag.smartorders.repository;

import com.maciag.smartorders.model.AddToRemove;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;


public interface AddToRemoveRepository extends JpaRepository<AddToRemove, Long> {

    Optional<AddToRemove> findByName(String name);
}
