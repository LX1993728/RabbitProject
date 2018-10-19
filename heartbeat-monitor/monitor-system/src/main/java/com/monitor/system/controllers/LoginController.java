package com.monitor.system.controllers;

import com.monitor.system.entity.User;
import com.monitor.system.repository.GeneralService;
import com.monitor.system.utils.MD5Utils;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequestMapping("/user")
@RestController
public class LoginController {
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private GeneralService generalService;

    @PersistenceContext
    private EntityManager em;

    @GetMapping("/register")
    public Object register(){

        String originPassword = "123456";

        User user = new User();
        user.setUsername("admin");
        user.setSalt(UUID.randomUUID().toString().replaceAll("-",""));
        user.setPassword(MD5Utils.getStrMD5(originPassword+user.getSalt()));

        User user2 = new User();
        user2.setUsername("zhangsan");
        user2.setSalt(UUID.randomUUID().toString().replaceAll("-",""));
        user2.setPassword(MD5Utils.getStrMD5(originPassword+user2.getSalt()));

        generalService.persisent(user);
        generalService.persisent(user2);
        return "success";
    }

    @ApiOperation(value = "login", tags = {""})
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public Object login(@RequestBody User user,HttpSession session){
        Map<String,Object> resultMap = new HashMap<>();
        if (user.getUsername() == null || user.getUsername().trim().length() == 0){
            resultMap.put("isSuccess",false);
            resultMap.put("info","用户名和密码不能为空");
            return resultMap;
        }
        String username = user.getUsername().trim();
        String password = user.getPassword().trim();

        List<User> listUsers = em.createQuery("SELECT u FROM User u WHERE u.username=:username", User.class)
                .setParameter("username", username)
                .getResultList();
        if (listUsers.size() == 0){
            resultMap.put("isSuccess",false);
            resultMap.put("info","不存在此用户");
            return resultMap;
        }

        User u = listUsers.get(0);
        String realPass = u.getPassword();
        if (MD5Utils.getStrMD5(password+u.getSalt()).equals(realPass)){

            resultMap.put("isSuccess",true);
            resultMap.put("info","登录成功");
            u.setPassword(null);
            u.setSalt(null);
            resultMap.put("user",u);
            // 存入session
            session.setAttribute("user",u);
            return resultMap;
        }

        resultMap.put("isSuccess",false);
        resultMap.put("info","密码错误");
        return resultMap;
    }

    @ApiOperation(value = "logout", tags = {""})
    @GetMapping("/logout")
    public Object loggout(HttpSession session){
        session.invalidate();
        return "success";
    }
}
