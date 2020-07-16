package com.maciag.smartorders.service;

import com.maciag.smartorders.model.RestaurantTable;
import com.maciag.smartorders.repository.RestaurantTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService {

    @Autowired
    RestaurantTableRepository restaurantTableRepository;

    public RestaurantTable addTable(String tableName){
        RestaurantTable restaurantTable = restaurantTableRepository.findByName(tableName).orElse(null);
        if(restaurantTable==null)
            restaurantTable = restaurantTableRepository.save(new RestaurantTable(tableName));
        return restaurantTable;
    }
}
