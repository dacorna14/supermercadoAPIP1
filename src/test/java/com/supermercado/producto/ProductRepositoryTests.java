package com.supermercado.producto;

import com.supermercado.producto.entity.Product;
import com.supermercado.producto.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class ProductRepositoryTests {

    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private ProductRepository repository;


    @Test
    public void testCreateProduct(){
        Product product = new Product();
        product.setName("Leche");
        product.setDescription("Lacteo");

        Product savedProduct = repository.save(product);

        Product existProduct = entityManager.find(Product.class, savedProduct.getId());

        assertEquals(product.getName(), existProduct.getName());
    }

}
