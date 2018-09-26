package com.allatori.starter.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @apiNote 简单测试 验证starter中的控制器是可以被项目继承的
 * @author liuxun
 */

@RestController
public class TestController {

    @GetMapping("/test")
    public Object test(){
        return "Hello, this is a simple allatori test";
    }
}
