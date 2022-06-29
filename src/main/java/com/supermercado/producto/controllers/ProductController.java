package com.supermercado.producto.controllers;

import com.supermercado.producto.entity.Product;
import com.supermercado.producto.repository.ProductRepository;
import com.supermercado.producto.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;
    private Message message = new Message();



    @RequestMapping(value = "api/product/{id}", method = RequestMethod.GET)
    public ResponseEntity<Product> getProducto(@PathVariable Long id){
        Optional<Product> foundUser = productRepository.findById(id);
        if(foundUser.isPresent()){
            return ResponseEntity.ok(foundUser.get());
        }
        Map<String, String> errorResponse=new HashMap<>();
        return new ResponseEntity(errorResponse,HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value= "api/product", method = RequestMethod.POST)
    public ResponseEntity createProduct(@RequestBody Product product){
        Map<String,String> response = new LinkedHashMap<>();
        try{
            product.setName(product.getName());
            product.setDescription(product.getDescription());
            product.setExistencia(product.getExistencia());
            product.setPrecio(product.getPrecio());
            productRepository.save(product);
            return message.viewMessage(HttpStatus.OK, "success", "registered product success");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.INTERNAL_SERVER_ERROR, "error", "An error ocurred while registering the product");
        }
    }

    @RequestMapping(value = "api/product", method = RequestMethod.GET)
    public List<Product> listProduct(){
        return productRepository.findAll();
    }

    @RequestMapping(value= "api/product/{id}", method = RequestMethod.PUT)
    public ResponseEntity editProduct(@RequestBody Product newProduct, @PathVariable Long id){
        Map<String, String> response = new HashMap<>();
        try{
            Product product = productRepository.findById(id).get();
            product.setName(newProduct.getName());
            product.setDescription(newProduct.getDescription());
            product.setExistencia(product.getExistencia());
            product.setPrecio(product.getPrecio());
            productRepository.save(product);

            return message.viewMessage(HttpStatus.OK, "success", "Product edit success");
        }catch(Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND, "error", "Product not found");
        }
    }

    @RequestMapping(value = "api/product/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteProduct(@PathVariable Long id){
        Map<String, String> response = new HashMap<>();
        try{
            Product product = productRepository.findById(id).get();
            productRepository.delete(product);
            return message.viewMessage(HttpStatus.OK, "success", "product delete success");
        }catch(Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND, "error", "product not found");
        }
    }
}
