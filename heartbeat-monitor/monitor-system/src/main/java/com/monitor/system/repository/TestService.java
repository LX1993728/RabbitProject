package com.monitor.system.repository;

import com.monitor.system.entity.*;
import com.monitor.system.vo.ChartVO;
import com.monitor.system.vo.PageVO;
import heartbeat.monitor.starter.domain.MonitorFlags;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class TestService {
    private final Logger log = LoggerFactory.getLogger(TestService.class);
    @PersistenceContext
    private EntityManager em;

    @Autowired
    private GeneralService generalService;

    @Autowired
    private WrapperService wrapperService;

    public void testInsert() {
        for (int i = 0; i < 63; i++) {
            WeChatSendAppeal appeal = new WeChatSendAppeal();
            appeal.setAppealId("AppelId1");
            appeal.setReceiveIp("192.168.1.111");
            appeal.setSendIp("192.178.1.222");
            appeal.setSendTime(new Date());
            appeal.setSuccess(true);
            WeChatSendAppeal appeal2 = new WeChatSendAppeal();
            appeal2.setAppealId("AppelId2");
            appeal2.setReceiveIp("192.168.1.111");
            appeal2.setSendIp("199.188.111");
            appeal2.setSendTime(new Date());
            appeal2.setSuccess(false);
            WeChatSendAppeal appeal3 = new WeChatSendAppeal();
            appeal3.setAppealId("AppelId1");
            appeal3.setReceiveIp("192.168.1.112");
            appeal3.setSendTime(new Date());
            appeal3.setSuccess(true);
            WeChatSendReport report = new WeChatSendReport();
            report.setTaskId("ReportId2");
            report.setReceiveIp("192.168.1.222");
            report.setSuccess(true);
            report.setSendTime(new Date());
            appeal.setSendTime(new Date(new Date().getTime() - 24 * 60 * 60 + 60 * i));
            WeChatSendReport report2 = new WeChatSendReport();
            report2.setTaskId("ReportId2");
            report2.setReceiveIp("192.168.1.222");
            report2.setSuccess(true);
            report2.setSendTime(new Date());
            appeal2.setSendTime(new Date(new Date().getTime() - 24 * 60 * 60 + 60 * i));
            em.persist(appeal);
            em.persist(appeal2);
            em.persist(appeal3);
            em.persist(report);
            em.persist(report2);

            // 前置
            PreSendReport preSendReport = new PreSendReport();
            preSendReport.setSendTime(new Date());
            preSendReport.setSuccess(true);
            preSendReport.setPrepositionId("POLICE");
            preSendReport.setReceiveIp("192.168.1.100");
            preSendReport.setSendIp("192.187.1.122");
            preSendReport.setTaskId("taskID" + new Date());
            PreSendExecution preSendExecution = new PreSendExecution();
            preSendExecution.setEventId("eventID" + new Date());
            preSendExecution.setExecutionId("executionID" + new Date());
            preSendExecution.setInstructionId("instructionId" + new Date());
            preSendExecution.setSendTime(new Date());
            preSendExecution.setPrepositionId("POLICE");
            preSendExecution.setReceiveIp("1232.888.2323.222");
            preSendExecution.setSuccess(true);
            PreReceiveInstruction preReceiveInstruction = new PreReceiveInstruction();
            preReceiveInstruction.setEventId("eventId" + new Date());
            preReceiveInstruction.setPrepositionId("POLICE");
            preReceiveInstruction.setInstructionId("instructionId" + new Date());
            preReceiveInstruction.setSendIp("87.18.111");
            preReceiveInstruction.setReceiveTime(new Date());
            preReceiveInstruction.setReceiveIp("109.87.122.11");
            preReceiveInstruction.setResolved(true);

            em.persist(preSendReport);
            em.persist(preSendExecution);
            em.persist(preReceiveInstruction);

            // 接报
            ReportReceiveMsg reportReceiveMsg = new ReportReceiveMsg();
            reportReceiveMsg.setMsgId("msgId" + new Date());
            reportReceiveMsg.setReceiveSource("从XXYY处发来");
            reportReceiveMsg.setReceiveTime(new Date());
            reportReceiveMsg.setResolved(false);
            reportReceiveMsg.setReceiveIp("128.187.1.900");
            ReportSendEvent reportSendEvent = new ReportSendEvent();
            reportSendEvent.setEventId("eventId" + new Date());
            reportSendEvent.setSendIp("192.167.1.199");
            reportSendEvent.setSendTime(new Date());
            reportSendEvent.setSuccess(true);
            reportSendEvent.setReceiveIp("192.178.1.188");

            em.persist(reportReceiveMsg);
            em.persist(reportSendEvent);


            // 指挥
            DirectReceiveEvent directReceiveEvent = new DirectReceiveEvent();
            directReceiveEvent.setReceiveTime(new Date());
            directReceiveEvent.setResolved(true);
            directReceiveEvent.setSendIp("192.187.1.222");
            directReceiveEvent.setEventId("eventId" + new Date());
            directReceiveEvent.setReceiveIp("198.1.121.112");
            DirectReceiveExecution directReceiveExecution = new DirectReceiveExecution();
            directReceiveExecution.setExecutionId("executionId" + new Date());
            directReceiveExecution.setInstructionId("instructionId" + new Date());
            directReceiveExecution.setReceiveSource("xxxxxxx");
            directReceiveExecution.setReceiveTime(new Date());
            directReceiveExecution.setTaskId("taskId" + new Date());
            directReceiveExecution.setEventId("eventId" + new Date());
            directReceiveExecution.setReceiveIp("192.187.1.233");
            DirectSendInstruction directSendInstruction = new DirectSendInstruction();
            directSendInstruction.setInstructionId("instructionID" + new Date());
            directSendInstruction.setSendIp("187.199.1.233");
            directSendInstruction.setSendTime(new Date());
            directSendInstruction.setSuccess(true);
            directSendInstruction.setEventId("eventId" + new Date());
            directSendInstruction.setTaskId("taskId" + new Date());
            directSendInstruction.setReceiveIp("198.121.12");

            em.persist(directReceiveEvent);
            em.persist(directReceiveExecution);
            em.persist(directSendInstruction);

            // 网格员
            GridManReceiveInstruction gridManReceiveInstruction = new GridManReceiveInstruction();
            gridManReceiveInstruction.setEventId("eventId" + new Date());
            gridManReceiveInstruction.setInstructionId("instructionId" + new Date());
            gridManReceiveInstruction.setReceiveIp("187.12.12.111");
            gridManReceiveInstruction.setReceiveTime(new Date());
            gridManReceiveInstruction.setResolved(true);
            gridManReceiveInstruction.setSendIp("192.187.1.233");
            GridManReceiveTask gridManReceiveTask = new GridManReceiveTask();
            gridManReceiveTask.setReceiveIp("192.187.1.233");
            gridManReceiveTask.setReceiveTime(new Date());
            gridManReceiveTask.setResolved(true);
            gridManReceiveTask.setSendIp("192.187.1.233");
            gridManReceiveTask.setTaskId("taskId" + new Date());
            GridManSendExecution gridManSendExecution = new GridManSendExecution();
            gridManSendExecution.setEventId(randomm());
            gridManSendExecution.setExecutionId(randomm());
            gridManSendExecution.setInstructionId(randomm());
            gridManSendExecution.setReceiveIp(randomm());
            gridManSendExecution.setSendIp(randomm());
            gridManSendExecution.setSendTime(new Date());
            gridManSendExecution.setSuccess(true);
            gridManSendExecution.setTaskId(randomm());
            GridManSendReport gridManSendReport = new GridManSendReport();
            gridManSendReport.setReceiveIp(randomm());
            gridManSendReport.setSendIp(randomm());
            gridManSendReport.setSendTime(new Date());
            gridManSendReport.setSuccess(true);
            gridManSendReport.setTaskId(randomm());
            GridManSendTask gridManSendTask = new GridManSendTask();
            gridManSendTask.setReceiveIp(randomm());
            gridManSendTask.setSendIp(randomm());
            gridManSendTask.setSendTime(new Date());
            gridManSendTask.setSuccess(true);
            gridManSendTask.setTaskId(randomm());

            em.persist(gridManReceiveInstruction);
            em.persist(gridManReceiveTask);
            em.persist(gridManSendExecution);
            em.persist(gridManSendReport);
            em.persist(gridManSendTask);

            FaultWaring faultWaring = new FaultWaring();
            faultWaring.setWarnBeginTime(new Date());
            faultWaring.setWarningContent("异常内容XXXXX"+new Date());
            faultWaring.setWarnIp("192.123.123");
            ExceptionUser exceptionUser = new ExceptionUser();
            exceptionUser.setExceptionType("密码错误");
            exceptionUser.setIp("192.167.1.233");
            exceptionUser.setUserName("zhansgan");
            if (i > 0 && i<10){
                exceptionUser.setFlag(MonitorFlags.PREPOSITION_FLAG);
                exceptionUser.setPrepositionId("POLICE");
                faultWaring.setFlag(MonitorFlags.PREPOSITION_FLAG);
                faultWaring.setPrepositionId("POLICE");
            }else if (i >=10 && i< 20){
                exceptionUser.setFlag(MonitorFlags.DIRECT_FLAG);
                faultWaring.setFlag(MonitorFlags.DIRECT_FLAG);
            }else if (i >=20 && i<30){
                exceptionUser.setFlag(MonitorFlags.GRIDMAN_FLAG);
                faultWaring.setFlag(MonitorFlags.GRIDMAN_FLAG);
            }else if (i >=30 && i<40){
                exceptionUser.setFlag(MonitorFlags.WECHAT_FLAG);
                faultWaring.setFlag(MonitorFlags.WECHAT_FLAG);
            }else if (i >=40 && i<50){
                exceptionUser.setFlag(MonitorFlags.REPORTING_FLAG);
                faultWaring.setFlag(MonitorFlags.REPORTING_FLAG);
            }else{
                exceptionUser.setFlag(MonitorFlags.GRIDMAN_FLAG);
                faultWaring.setFlag(MonitorFlags.GRIDMAN_FLAG);
            }
            em.persist(faultWaring);
            em.persist(exceptionUser);

        }
    }
    public void testInsert2() {
        for (int i = 0; i < 73; i++) {
            WeChatSendAppeal appeal = new WeChatSendAppeal();
            appeal.setAppealId("AppelId1");
            appeal.setReceiveIp("192.168.1.111");
            appeal.setSendIp("192.178.1.222");
            appeal.setSendTime(new Date());
            appeal.setSuccess(false);
            WeChatSendAppeal appeal2 = new WeChatSendAppeal();
            appeal2.setAppealId("AppelId2");
            appeal2.setReceiveIp("192.168.1.111");
            appeal2.setSendIp("199.188.111");
            appeal2.setSendTime(new Date());
            appeal2.setSuccess(false);
            WeChatSendAppeal appeal3 = new WeChatSendAppeal();
            appeal3.setAppealId("AppelId1");
            appeal3.setReceiveIp("192.168.1.112");
            appeal3.setSendTime(new Date());
            appeal3.setSuccess(false);
            WeChatSendReport report = new WeChatSendReport();
            report.setTaskId("ReportId2");
            report.setReceiveIp("192.168.1.222");
            report.setSuccess(false);
            report.setSendTime(new Date());
            appeal.setSendTime(new Date(new Date().getTime() - 24 * 60 * 60 + 60 * i));
            WeChatSendReport report2 = new WeChatSendReport();
            report2.setTaskId("ReportId2");
            report2.setReceiveIp("192.168.1.222");
            report2.setSuccess(false);
            report2.setSendTime(new Date());
            appeal2.setSendTime(new Date(new Date().getTime() - 24 * 60 * 60 + 60 * i));
            em.persist(appeal);
            em.persist(appeal2);
            em.persist(appeal3);
            em.persist(report);
            em.persist(report2);

            // 前置
            PreSendReport preSendReport = new PreSendReport();
            preSendReport.setSendTime(new Date());
            preSendReport.setSuccess(false);
            preSendReport.setPrepositionId("POLICE");
            preSendReport.setReceiveIp("192.168.1.100");
            preSendReport.setSendIp("192.187.1.122");
            preSendReport.setTaskId("taskID" + new Date());
            PreSendExecution preSendExecution = new PreSendExecution();
            preSendExecution.setEventId("eventID" + new Date());
            preSendExecution.setExecutionId("executionID" + new Date());
            preSendExecution.setInstructionId("instructionId" + new Date());
            preSendExecution.setSendTime(new Date());
            preSendExecution.setPrepositionId("POLICE");
            preSendExecution.setReceiveIp("1232.888.2323.222");
            preSendExecution.setSuccess(false);
            PreReceiveInstruction preReceiveInstruction = new PreReceiveInstruction();
            preReceiveInstruction.setEventId("eventId" + new Date());
            preReceiveInstruction.setPrepositionId("POLICE");
            preReceiveInstruction.setInstructionId("instructionId" + new Date());
            preReceiveInstruction.setSendIp("87.18.111");
            preReceiveInstruction.setReceiveTime(new Date());
            preReceiveInstruction.setReceiveIp("109.87.122.11");
            preReceiveInstruction.setResolved(false);

            em.persist(preSendReport);
            em.persist(preSendExecution);
            em.persist(preReceiveInstruction);

            // 接报
            ReportReceiveMsg reportReceiveMsg = new ReportReceiveMsg();
            reportReceiveMsg.setMsgId("msgId" + new Date());
            reportReceiveMsg.setReceiveSource("从XXYY处发来");
            reportReceiveMsg.setReceiveTime(new Date());
            reportReceiveMsg.setResolved(false);
            reportReceiveMsg.setReceiveIp("128.187.1.900");
            ReportSendEvent reportSendEvent = new ReportSendEvent();
            reportSendEvent.setEventId("eventId" + new Date());
            reportSendEvent.setSendIp("192.167.1.199");
            reportSendEvent.setSendTime(new Date());
            reportSendEvent.setSuccess(false);
            reportSendEvent.setReceiveIp("192.178.1.188");

            em.persist(reportReceiveMsg);
            em.persist(reportSendEvent);


            // 指挥
            DirectReceiveEvent directReceiveEvent = new DirectReceiveEvent();
            directReceiveEvent.setReceiveTime(new Date());
            directReceiveEvent.setResolved(false);
            directReceiveEvent.setSendIp("192.187.1.222");
            directReceiveEvent.setEventId("eventId" + new Date());
            directReceiveEvent.setReceiveIp("198.1.121.112");
            DirectReceiveExecution directReceiveExecution = new DirectReceiveExecution();
            directReceiveExecution.setExecutionId("executionId" + new Date());
            directReceiveExecution.setInstructionId("instructionId" + new Date());
            directReceiveExecution.setReceiveSource("xxxxxxx");
            directReceiveExecution.setReceiveTime(new Date());
            directReceiveExecution.setTaskId("taskId" + new Date());
            directReceiveExecution.setEventId("eventId" + new Date());
            directReceiveExecution.setReceiveIp("192.187.1.233");
            DirectSendInstruction directSendInstruction = new DirectSendInstruction();
            directSendInstruction.setInstructionId("instructionID" + new Date());
            directSendInstruction.setSendIp("187.199.1.233");
            directSendInstruction.setSendTime(new Date());
            directSendInstruction.setSuccess(false);
            directSendInstruction.setEventId("eventId" + new Date());
            directSendInstruction.setTaskId("taskId" + new Date());
            directSendInstruction.setReceiveIp("198.121.12");

            em.persist(directReceiveEvent);
            em.persist(directReceiveExecution);
            em.persist(directSendInstruction);

            // 网格员
            GridManReceiveInstruction gridManReceiveInstruction = new GridManReceiveInstruction();
            gridManReceiveInstruction.setEventId("eventId" + new Date());
            gridManReceiveInstruction.setInstructionId("instructionId" + new Date());
            gridManReceiveInstruction.setReceiveIp("187.12.12.111");
            gridManReceiveInstruction.setReceiveTime(new Date());
            gridManReceiveInstruction.setResolved(false);
            gridManReceiveInstruction.setSendIp("192.187.1.233");
            GridManReceiveTask gridManReceiveTask = new GridManReceiveTask();
            gridManReceiveTask.setReceiveIp("192.187.1.233");
            gridManReceiveTask.setReceiveTime(new Date());
            gridManReceiveTask.setResolved(false);
            gridManReceiveTask.setSendIp("192.187.1.233");
            gridManReceiveTask.setTaskId("taskId" + new Date());
            GridManSendExecution gridManSendExecution = new GridManSendExecution();
            gridManSendExecution.setEventId(randomm());
            gridManSendExecution.setExecutionId(randomm());
            gridManSendExecution.setInstructionId(randomm());
            gridManSendExecution.setReceiveIp(randomm());
            gridManSendExecution.setSendIp(randomm());
            gridManSendExecution.setSendTime(new Date());
            gridManSendExecution.setSuccess(false);
            gridManSendExecution.setTaskId(randomm());
            GridManSendReport gridManSendReport = new GridManSendReport();
            gridManSendReport.setReceiveIp(randomm());
            gridManSendReport.setSendIp(randomm());
            gridManSendReport.setSendTime(new Date());
            gridManSendReport.setSuccess(false);
            gridManSendReport.setTaskId(randomm());
            GridManSendTask gridManSendTask = new GridManSendTask();
            gridManSendTask.setReceiveIp(randomm());
            gridManSendTask.setSendIp(randomm());
            gridManSendTask.setSendTime(new Date());
            gridManSendTask.setSuccess(false);
            gridManSendTask.setTaskId(randomm());

            em.persist(gridManReceiveInstruction);
            em.persist(gridManReceiveTask);
            em.persist(gridManSendExecution);
            em.persist(gridManSendReport);
            em.persist(gridManSendTask);

            FaultWaring faultWaring = new FaultWaring();
            faultWaring.setFlag(MonitorFlags.PREPOSITION_FLAG);
            faultWaring.setPrepositionId("POLICE");
            faultWaring.setWarnBeginTime(new Date());
            faultWaring.setWarningContent("异常内容XXXXX"+new Date());
            faultWaring.setWarnIp("192.123.123");
            ExceptionUser exceptionUser = new ExceptionUser();
            exceptionUser.setFlag(MonitorFlags.PREPOSITION_FLAG);
            exceptionUser.setPrepositionId("POLICE");
            exceptionUser.setExceptionType("密码错误");
            exceptionUser.setIp("192.167.1.233");
            exceptionUser.setUserName("zhansgan");
            em.persist(faultWaring);
            em.persist(exceptionUser);

        }
    }

    private String  randomm(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }

    /*
    public List<WeChatMsgInfo> testQuery() {
        final TypedQuery<WeChatMsgInfo> query =
                em.createQuery("SELECT we FROM WeChatMsgInfo we WHERE we.class='WeChatSendAppeal' and we.receiveIp = :ip and we.appealId =?1 ", WeChatMsgInfo.class);
        int page = 1;
        int pageSize = 10;
        int firstIndex = (page - 1) * 10;
        query.setFirstResult(firstIndex).setMaxResults(pageSize);
        query.setParameter("ip","192.168.1.111").setParameter(1,"AppelId1");
         List<WeChatMsgInfo> resultList = query.getResultList();
        for (int i = 0; i < resultList.size(); i++) {
            if (resultList.get(i) instanceof WeChatSendAppeal) {
                WeChatSendAppeal appeal = (WeChatSendAppeal) resultList.get(i);
                log.info("======== 类型= WeChatSendAppeal {}", appeal.getAppealId());
            }
        }
        return resultList;
    }
    */

    public PageVO testQuery() {
        Map<String, Object> params = new HashMap<>();
//        params.put("appealId","AppelId1");
//        params.put("receiveIp","192.168.1.112");
//        params.put("isSuccess",true);
        return generalService.criteriaQuery(1L, 10L, WeChatMsgInfo.class, WeChatSendAppeal.class, params);
    }

    public Long testGetCount() {
        Map<String, Object> params = new HashMap<>();
        params.put("receiveIp", "192.168.1.111");
        return generalService.getTotalCount(WeChatMsgInfo.class, WeChatSendAppeal.class, params);
    }

    public ChartVO testChart() {
        return wrapperService.getChartDataByCriteria(WeChatMsgInfo.class, WeChatSendAppeal.class, null, "sendTime");
    }

    public void testSaveOrUpdate() {
        WeChatSendAppeal appeal = new WeChatSendAppeal();
        appeal.setAppealId("XXXXXXXX");
        appeal.setReceiveIp("192.168.1.115");
        appeal.setSuccess(true);
        appeal.setSendTime(new Date());
        generalService.saveOrUpdateByField(WeChatMsgInfo.class, WeChatSendAppeal.class, "appealId", "AppelId1", appeal);
    }

    public static void main(String[] args) {
        System.out.println("aaa_" + null);
    }
}
