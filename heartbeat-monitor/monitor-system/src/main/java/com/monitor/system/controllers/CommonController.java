package com.monitor.system.controllers;

import com.monitor.system.config.MonitorSystemInfo;
import com.monitor.system.repository.GeneralService;
import com.monitor.system.repository.WrapperService;
import com.monitor.system.vo.ChartVO;
import com.monitor.system.vo.ErrorVO;
import com.monitor.system.vo.ServiceAppVO;

import heartbeat.monitor.starter.domain.*;
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

import java.util.*;

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
            if (flag.equals(MonitorFlags.PREPOSITION_FLAG)){
                return em.createQuery("SELECT  a FROM ExceptionUser a WHERE a.flag=:flag AND a.prepositionId=:prepositionId")
                        .setParameter("prepositionId", prepositionId)
                        .setParameter("flag", flag)
                        .getResultList();
            }else {
                return em.createQuery("SELECT  a FROM ExceptionUser a WHERE a.flag=:flag ")
                        .setParameter("flag", flag)
                        .getResultList();
            }
        } else if (type == 1) {
            if (flag.equals(MonitorFlags.PREPOSITION_FLAG)){
                return em.createQuery("SELECT  a FROM FaultWaring a WHERE a.flag=:flag AND a.prepositionId=:prepositionId")
                        .setParameter("prepositionId", prepositionId)
                        .setParameter("flag", flag)
                        .getResultList();
            }else {
                return em.createQuery("SELECT  a FROM FaultWaring a WHERE a.flag=:flag")
                        .setParameter("flag", flag)
                        .getResultList();
            }
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
        Long normals = 0L;
        Long warns = 0L;
        Long errors = 0L;

        Health healthInfo = heartBeatResolver.getHealthInfo();
        List<ServiceApp> preApps = healthInfo.getPreApps();
        List<ServiceApp> otherApps = healthInfo.getOtherApps();
        Map<String, List<ServiceAppVO>> healthVO = new HashMap<>();
        List<ServiceAppVO> preAppVOs = new ArrayList<>();
        List<ServiceAppVO> otherAppVOs = new ArrayList<>();
        for (ServiceApp app : preApps) {
            ServiceAppVO appVO = new ServiceAppVO();
            appVO.copyPropertyToThis(app);
            Map<String, Long> countOfPreposition = prePositionController.getMsgCountOfPreposition(app.getId());
            appVO.setCounts(countOfPreposition);

            // 统计数量
            Set<InstanceItem> instances = app.getInstances();
            for (InstanceItem instance : instances) {
                if (instance.getLevel() == 0) {
                    normals++;
                } else if (instance.getLevel() == 1) {
                    warns++;
                } else if (instance.getLevel() == 2) {
                    errors++;
                }
                if (instance.getLevel() > appVO.getRun()) {
                    appVO.setRun(instance.getLevel());
                }
            }
            preAppVOs.add(appVO);
        }
        for (ServiceApp app : otherApps) {
            ServiceAppVO appVO = new ServiceAppVO();
            appVO.copyPropertyToThis(app);
            Map<String, Long> counts = null;
            if (app.getFlag().equals(MonitorFlags.DIRECT_FLAG)) {
                counts = directController.getMsgCountOfDirect();
            } else if (app.getFlag().equals(MonitorFlags.GRIDMAN_FLAG)) {
                counts = gridManController.getMsgCountOfGridMan();
            } else if (app.getFlag().equals(MonitorFlags.REPORTING_FLAG)) {
                counts = reportController.getMsgCountOfReport();
            } else if (app.getFlag().equals(MonitorFlags.WECHAT_FLAG)) {
                counts = wechatController.getMsgCountOfWechat();
            }
            appVO.setCounts(counts);

            // 统计数量
            Set<InstanceItem> otherInstances = app.getInstances();
            for (InstanceItem otherInstance : otherInstances) {
                if (otherInstance.getLevel() == 0) {
                    normals++;
                } else if (otherInstance.getLevel() == 1) {
                    warns++;
                } else if (otherInstance.getLevel() == 2) {
                    errors++;
                }
                if (otherInstance.getLevel() > appVO.getRun()) {
                    appVO.setRun(otherInstance.getLevel());
                }
            }
            otherAppVOs.add(appVO);
        }
        Map<String, Long> infos = new HashMap<>();
        infos.put("normals", normals);
        infos.put("warns", warns);
        infos.put("errors", errors);
        healthVO.put("preApps", preAppVOs);
        healthVO.put("otherApps", otherAppVOs);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("healths", healthVO);
        resultMap.put("infos", infos);

        return resultMap;
    }

    @ApiOperation(value = "获取所有服务的图表信息", tags = {""})
    @ApiImplicitParams({
            @ApiImplicitParam(name = "flag", value = "服务的标识", required = true, paramType = "query", dataType = "String"),
            @ApiImplicitParam(name = "prepositionId", value = "部委前置的ID标识", required = false, paramType = "query", dataType = "String")
    })
    @GetMapping("/chart")
    public Object getChartData(String flag, String prepositionId) {
        if (flag == null) {
            return new ErrorVO("flag不能为null");
        }
        if (flag.equals(MonitorFlags.PREPOSITION_FLAG) && prepositionId == null) {
            return new ErrorVO("前置系统prepositionId不能为null");
        }

        Map<String, Object> resultMap = new HashMap<>();

        if (flag.equals(MonitorFlags.PREPOSITION_FLAG)) {
            ChartVO executionTrue = prePositionController.getMsgCountOfExecution(prepositionId, true);
            ChartVO executionFalse = prePositionController.getMsgCountOfExecution(prepositionId, false);
            ChartVO instructionTrue = prePositionController.getMsgCountOfInstruction(prepositionId, true);
            ChartVO instructionFalse = prePositionController.getMsgCountOfInstruction(prepositionId, false);
            ChartVO reportTrue = prePositionController.getMsgCountOfReport(prepositionId, true);
            ChartVO reportFalse = prePositionController.getMsgCountOfReport(prepositionId, true);

            resultMap.put("timeList", executionTrue.getTimesList());

            resultMap.put("executionTrue", executionTrue.getCountList());
            resultMap.put("executionFalse", executionFalse.getCountList());
            resultMap.put("instructionTrue", instructionTrue.getCountList());
            resultMap.put("instructionFalse", instructionFalse.getCountList());
            resultMap.put("reportTrue", reportTrue.getCountList());
            resultMap.put("reportFalse", reportFalse.getCountList());
        }else if (flag.equals(MonitorFlags.REPORTING_FLAG)){
            ChartVO eventTrue = reportController.getEventCountOfReport(true);
            ChartVO eventFalse = reportController.getEventCountOfReport(false);
            ChartVO msgTrue = reportController.getMsgCountOfMsg(true);
            ChartVO msgFalse = reportController.getMsgCountOfMsg(false);

            resultMap.put("timeList",eventTrue.getTimesList());

            resultMap.put("eventTrue",eventTrue.getCountList());
            resultMap.put("eventFalse",eventFalse.getCountList());
            resultMap.put("msgTrue",msgTrue.getCountList());
            resultMap.put("msgFalse",msgFalse.getCountList());

        }else if(flag.equals(MonitorFlags.DIRECT_FLAG)){
            ChartVO eventTrue = directController.getEventCountOfDirect(true);
            ChartVO eventFalse = directController.getEventCountOfDirect(false);
            ChartVO execution = directController.getExecutionCountOfDirect();
            ChartVO instructionTrue = directController.getInstructionCountOfDirect(true);
            ChartVO instructionFalse = directController.getInstructionCountOfDirect(false);

            resultMap.put("timeList",eventTrue.getTimesList());

            resultMap.put("eventTrue",eventTrue.getCountList());
            resultMap.put("eventFalse",eventFalse.getCountList());
            resultMap.put("execution",execution.getCountList());
            resultMap.put("instructionTrue",instructionTrue.getCountList());
            resultMap.put("instructionFalse",instructionFalse.getCountList());

        }else if (flag.equals(MonitorFlags.GRIDMAN_FLAG)){
            ChartVO executionTrue = gridManController.getExecutionsOfGridMan(true);
            ChartVO executionFalse = gridManController.getExecutionsOfGridMan(false);
            ChartVO instructionTrue = gridManController.getMsgCountOfInstruction(true);
            ChartVO instructionFalse = gridManController.getMsgCountOfInstruction(false);
            ChartVO receiveTaskTrue = gridManController.getReceiveTaskOfGridMan(true);
            ChartVO receiveTaskFalse = gridManController.getReceiveTaskOfGridMan(false);
            ChartVO sendTaskTrue = gridManController.getSendTaskOfGridMan(true);
            ChartVO sendTaskFalse = gridManController.getSendTaskOfGridMan(false);
            ChartVO reportTrue = gridManController.getSendReportOfGridMan(true);
            ChartVO reportFalse = gridManController.getSendReportOfGridMan(false);

            resultMap.put("timeList",executionTrue.getTimesList());

            resultMap.put("executionTrue",executionTrue.getCountList());
            resultMap.put("executionFalse",executionFalse.getCountList());
            resultMap.put("instructionTrue",instructionTrue.getCountList());
            resultMap.put("instructionFalse",instructionFalse.getCountList());
            resultMap.put("receiveTaskTrue",receiveTaskTrue.getCountList());
            resultMap.put("receiveTaskFalse",receiveTaskFalse.getCountList());
            resultMap.put("sendTaskTrue",sendTaskTrue.getCountList());
            resultMap.put("sendTaskFalse",sendTaskFalse.getCountList());
            resultMap.put("reportTrue",reportTrue.getCountList());
            resultMap.put("reportFalse",reportFalse.getCountList());

        }else if (flag.equals(MonitorFlags.WECHAT_FLAG)){
            ChartVO appealTrue = wechatController.getAppealCountOfWechat(true);
            ChartVO appealFalse = wechatController.getAppealCountOfWechat(false);
            ChartVO reportTrue = wechatController.getReportCountOfWechat(true);
            ChartVO reportFalse = wechatController.getReportCountOfWechat(false);

            resultMap.put("timeList",appealTrue.getTimesList());

            resultMap.put("appealTrue",appealTrue.getCountList());
            resultMap.put("appealFalse",appealFalse.getCountList());
            resultMap.put("reportTrue",reportTrue.getCountList());
            resultMap.put("reportFalse",reportFalse.getCountList());
        }else{
            return "flag error";
        }
        return resultMap;
    }
}
