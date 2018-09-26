package com.allatori.starter.processors;

import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @apiNote 在此包下封装一些 工具方法供引入此starter的项目使用
 * @author liuxun
 */

@Component
public class TestProcessor {

    /**
     * @apiNote 简单测试 测试格式化时间
     * @param date
     * @return
     */
    public String getStrTest(Date date){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return dateFormat.format(date);
    }
}
