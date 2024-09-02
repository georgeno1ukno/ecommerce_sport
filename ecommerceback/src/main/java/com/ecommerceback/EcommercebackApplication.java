package com.ecommerceback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.ecommerceback")
public class EcommercebackApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommercebackApplication.class, args);
    }

}
