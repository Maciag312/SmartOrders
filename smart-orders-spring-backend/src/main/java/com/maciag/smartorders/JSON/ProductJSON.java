package com.maciag.smartorders.JSON;

import java.math.BigDecimal;
import java.util.List;

public class ProductJSON {

    public String name;
    public double price;

    public List<OptionJSON> options;
    public List<AddToRemoveJSON> removeableadds;

    public String subcatg;
    public String type;


}
