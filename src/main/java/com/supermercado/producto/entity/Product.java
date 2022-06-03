package com.supermercado.producto.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "products")
@Data

public class Product {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "description", nullable = false, length = 100)
    private String description;

}