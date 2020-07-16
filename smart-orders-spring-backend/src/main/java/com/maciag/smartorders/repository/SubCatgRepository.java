package com.maciag.smartorders.repository;

import com.maciag.smartorders.model.SubCatg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface SubCatgRepository extends JpaRepository<SubCatg, Long> {

    Optional<SubCatg> findByName(String name);
}
