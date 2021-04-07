package com.example.helloworld;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class HelloApplication {

        public static void main(String[] args) {
                SpringApplication.run(HelloApplication.class, args);
        }
}

@RestController
class Hello {

    @RequestMapping("/")
    String index() {
        return "Hello world";
    }

	@PostMapping("/greeting")
	String greeting(@RequestBody Message message) {
        System.out.println(message.id);
        return "Hello " + message.name;
    }
}

class Message {
	public Integer id;
    public String name;
}