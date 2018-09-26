package com.allatori.starter.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan(basePackages = {"com.allatori.starter"})
@PropertySource(value = {"classpath:allatori_default.properties"},ignoreResourceNotFound = true)
public class AllatoriConfig {

}
