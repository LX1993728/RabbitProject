package com.monitor.system.controllers;

import com.monitor.system.repository.GeneralService;
import com.monitor.system.repository.WrapperService;
import com.monitor.system.vo.ErrorVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;

/**
 * @author liuxun
 * @apiNote 通用控制器
 */

@Api(tags = {"1.通用控制器 例如故障告警/异常用户/离线在线用户数"})
@RequestMapping("/common")
@RestController
public class CommonController {

    @Autowired
    private GeneralService generalService;

    @Autowired
    private WrapperService wrapperService;

    @PersistenceContext
    private EntityManager em;


    @ApiOperation(value = "获取每种消息类型的条数", tags = {""})
    @ApiImplicitParams({
            @ApiImplicitParam(name = "prepositionID", value = "部委前置的ID标识 如果不是部委前置可设置为空", required = false, paramType = "query", dataType = "String"),
            @ApiImplicitParam(name = "flag", value = "系统标识符", required = true, paramType = "query", dataType = "String"),
            @ApiImplicitParam(name = "type", value = "0 表示获取故障用户 1表示获取故障告警", required = true, paramType = "query", dataType = "Integer")

    })
    @GetMapping("/userAndExceptions")
    public Object getUsers(String prepositionId, String flag, Integer type) {
        if (type != 0 && type != 1) {
            return new ErrorVO("type只能为0或1  0表示用户 1表示预警");
        }
        Map<String, Object> params = new HashMap<>();
        params.put("prepositionID", prepositionId);
        params.put("flag", flag);

        if (type == 0) {
            return em.createQuery("SELECT  a FROM ExceptionUser a WHERE a.flag=:flag AND a.prepositionId=:prepositionId")
                    .setParameter("prepositionId", prepositionId)
                    .setParameter("flag", flag)
                    .getResultList();
        } else if (type == 1) {
            return em.createQuery("SELECT  a FROM FaultWaring a WHERE a.flag=:flag AND a.prepositionId=:prepositionId")
                    .setParameter("prepositionId", prepositionId)
                    .setParameter("flag", flag)
                    .getResultList();
        }
        return null;
    }
}
