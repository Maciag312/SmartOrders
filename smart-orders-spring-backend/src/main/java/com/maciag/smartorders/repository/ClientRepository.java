package com.maciag.smartorders.repository;


import com.maciag.smartorders.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByMail(String mail);
}
