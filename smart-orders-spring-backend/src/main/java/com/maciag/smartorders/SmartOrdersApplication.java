package com.maciag.smartorders;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableAutoConfiguration
@EnableJpaRepositories
@SpringBootApplication
public class SmartOrdersApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartOrdersApplication.class, args);
    }

}
