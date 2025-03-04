package com.miempresa;

import jakarta.ejb.Stateless;

@Stateless
public class HolaEJB {
    public String getMensaje() {
        return "Hello, World from EJB!";
    }
}
