package com.monitor.system.controllers;

import com.monitor.system.config.MonitorSystemInfo;
import com.monitor.system.repository.GeneralService;
import com.monitor.system.repository.WrapperService;
import com.monitor.system.vo.ErrorVO;
import com.monitor.system.vo.ServiceAppVO;

import heartbeat.monitor.starter.domain.Health;
import heartbeat.monitor.starter.domain.MonitorFlags;
import heartbeat.monitor.starter.domain.ServiceApp;
import heartbeat.monitor.starter.domain.UserCount;
import heartbeat.monitor.starter.processors.HeartBeatResolver;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author liuxun
 * @apiNote 通用控制器
 */

@Api(tags = {"1.通用控制器 例如故障告警/异常用户/离线在线用户数 整体服务信息"})
@RequestMapping("/common")
@RestController
public class CommonController {

    @Autowired
    private GeneralService generalService;

    @Autowired
    private WrapperService wrapperService;
    
    @Autowired
    private DirectController directController;
    
    @Autowired
    private GridManController gridManController;
    
    @Autowired
    private PrePositionController prePositionController;
    
    @Autowired
    private ReportController reportController;

    @Autowired
    private WechatController wechatController;
    
    @PersistenceContext
    private EntityManager em;

    @Autowired
    private HeartBeatResolver heartBeatResolver;


    @ApiOperation(value = "获取每种消息类型的条数", tags = {""})
    @ApiImplicitParams({
            @ApiImplicitParam(name = "prepositionId", value = "部委前置的ID标识 如果不是部委前置可设置为空", required = false, paramType = "query", dataType = "String"),
            @ApiImplicitParam(name = "flag", value = "系统标识符", required = true, paramType = "query", dataType = "String"),
            @ApiImplicitParam(name = "type", value = "0 表示获取异常用户 1表示获取故障告警", required = true, paramType = "query", dataType = "Integer")

    })
    @GetMapping("/userAndExceptions")
    public Object getUsers(String prepositionId, String flag, Integer type) {
        if (type != 0 && type != 1) {
            return new ErrorVO("type只能为0或1  0表示用户 1表示预警");
        }

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

    @ApiOperation(value = "获取指定服务的在线离线用户数", tags = {""})
    @ApiImplicitParams({
            @ApiImplicitParam(name = "prepositionId", value = "部委前置的ID标识 如果不是部委前置可设置为空", required = false, paramType = "query", dataType = "String"),
            @ApiImplicitParam(name = "flag", value = "系统标识符", required = true, paramType = "query", dataType = "String")
    })
    @GetMapping("/usercount")
    public Object getUserCountOfService(String prepositionId, String flag) {
        if (flag == null) {
            return new ErrorVO("flag参数不能为空");
        }
        String key = flag + (prepositionId == null ? "" : "_" + prepositionId);
        UserCount userCount = MonitorSystemInfo.IN_OUT_LINE_USER_MAP.get(key);
        if (userCount == null) {
            userCount = new UserCount();
            userCount.setOutLineUsers(0L);
            userCount.setInLineUsers(0L);
        }
        return userCount;
    }

    @ApiOperation(value = "获取所有服务的部署以及健康信息", tags = {""})
    @GetMapping("/infos")
    public Object getAllHealthInfo() {
        return heartBeatResolver.getHealthInfo();
    }
    
    @ApiOperation(value = "获取所有服务的部署以及健康信息+消息数量", tags = {""})
    @GetMapping("/appinfos")
    public Object getAllHealthAndCounts() {
    	Health healthInfo = heartBeatResolver.getHealthInfo();
    	List<ServiceApp> preApps = healthInfo.getPreApps();
    	List<ServiceApp> otherApps = healthInfo.getOtherApps();
    	Map<String,List<ServiceAppVO>> healthVO= new HashMap<>();
    	List<ServiceAppVO> preAppVOs = new ArrayList<>();
    	List<ServiceAppVO> otherAppVOs = new ArrayList<>();
    	for (ServiceApp app : preApps) {
			ServiceAppVO appVO = new ServiceAppVO();
			appVO.copyPropertyToThis(app);
			 Map<String, Long> countOfPreposition = prePositionController.getMsgCountOfPreposition(app.getId());
			appVO.setCounts(countOfPreposition);
			preAppVOs.add(appVO);
		}
    	for (ServiceApp app : otherApps) {
    		ServiceAppVO appVO = new ServiceAppVO();
    		appVO.copyPropertyToThis(app);
    		Map<String, Long> counts = null;
    		if(app.getFlag().equals(MonitorFlags.DIRECT_FLAG)) {
    			counts = directController.getMsgCountOfDirect();
    		}else if (app.getFlag().equals(MonitorFlags.GRIDMAN_FLAG)) {
				counts = gridManController.getMsgCountOfGridMan();
			}else if (app.getFlag().equals(MonitorFlags.REPORTING_FLAG)) {
				counts = reportController.getMsgCountOfReport();
			}else if (app.getFlag().equals(MonitorFlags.WECHAT_FLAG)) {
				counts = wechatController.getMsgCountOfWechat();
			}
    		appVO.setCounts(counts);
    		otherAppVOs.add(appVO);
    	}
    	
    	healthVO.put("preApps", preAppVOs);
    	healthVO.put("otherApps", otherAppVOs);
    	return healthVO;
    }
    

}