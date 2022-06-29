package com.supermercado.producto.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "product")
@Data

public class Product {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column(nullable = false, length = 100, unique = true)
    private String name;

    @Column(nullable = false, length = 100, unique = true)
    private String description;

    @Column(nullable = false, length = 50)
    private String existencia;

    @Column(nullable = false, length = 50)
    private String precio;
}