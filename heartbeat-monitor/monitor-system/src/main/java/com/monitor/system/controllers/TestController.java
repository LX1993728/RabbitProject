package com.monitor.system.controllers;

import com.monitor.system.entity.ExceptionUser;
import com.monitor.system.repository.GeneralService;
import com.monitor.system.repository.TestService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"0. 简单测试"})
@RestController
public class TestController {
    @Autowired
    private TestService testService;
    @Autowired
    GeneralService generalService;

    @Value("${fdfs-host}")
    private String fdfsHost;

    @GetMapping("/add")
    public Object addTest() {
        testService.testInsert();
        return "success";
    }
    @GetMapping("/add2")
    public Object addTest2() {
        testService.testInsert2();
        return "success";
    }

    @GetMapping("/query")
    public Object queryTest() {
        return testService.testQuery();
    }

    @GetMapping("/count")
    public Object testGetCount() {
        return testService.testGetCount();
    }

    @GetMapping("/chart")
    public Object testChart(){
        return testService.testChart();
    }

    @GetMapping("/saveOrUpdate")
    public Object testSU(){
        testService.testSaveOrUpdate();
        return "success";
    }

    @GetMapping("/test1")
    public Object test1(){
        ExceptionUser user = new ExceptionUser();
        user.setUserName("张三测试乱码");
        generalService.persisent(user);
        return "success";
    }

    @GetMapping("/aaa")
    public Object aaa(){
        return fdfsHost;
    }

}
