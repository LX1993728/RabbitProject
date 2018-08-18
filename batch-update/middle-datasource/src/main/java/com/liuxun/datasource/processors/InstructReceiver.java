package com.liuxun.datasource.processors;

import com.alibaba.fastjson.JSON;
import com.liuxun.datasource.core.domain.GlobalInfo;
import com.liuxun.datasource.core.domain.GlobalReflect;
import com.liuxun.datasource.core.domain.InstructResult;
import com.liuxun.datasource.core.domain.Instruction;
import com.liuxun.datasource.service.ProcessInstructService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
public class InstructReceiver {
    private static final Logger logger = LoggerFactory.getLogger(InstructReceiver.class);

//    @Autowired
    private ProcessInstructService processInstructService;

//    @Autowired
    private ResultSender resultSender;

    private String instructResolveRouteKey;

    public InstructReceiver(ProcessInstructService processInstructService, ResultSender resultSender,String instructResolveRouteKey) {
        this.processInstructService = processInstructService;
        this.resultSender = resultSender;
        this.instructResolveRouteKey = instructResolveRouteKey;
    }

    @RabbitListener(queues = {"#{acceptInstructQueue.name}"})
    @RabbitHandler
    public void receiveAndProcessInstruct(Instruction instruction){
        logger.info("==Receive Instruction==={}=====", JSON.toJSON(instruction));
        logger.info("==开启线程池:执行指令对应操作......");

        ExecutorService threadPool = Executors.newCachedThreadPool();
        threadPool.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(3000L);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                if (GlobalReflect.operationIDToInstructTaskMap.containsKey(instruction.getOperationID())
                        && GlobalReflect.resolveKeyOperationIdsBindingsMap.containsKey(instructResolveRouteKey)
                        && GlobalReflect.resolveKeyOperationIdsBindingsMap.get(instructResolveRouteKey).contains(instruction.getOperationID())){
                    InstructResult instructResult = processInstructService.processInstruction(instruction.getOperationID(),instruction.getId());
                    logger.info("==处理完毕返回指令结果 结果队列Route_key={} InstructResult={} ",instruction.getResultRouteKey(), JSON.toJSONString(instructResult));
                    logger.info("==开始发送处理结果......");
                    // 开发发送处理结果
                    resultSender.sendInstruct(instructResult,instruction.getResultRouteKey());
                    logger.info("==结果返回完毕");
                }else {
                    InstructResult instructResult = new InstructResult(instruction.getOperationID(),false,null,instruction.getId());
                    logger.info("===指令不合法 返回失败的处理结果=====instructResult= {}",instructResult);
                    resultSender.sendInstruct(instructResult,instruction.getResultRouteKey());
                    logger.info("===返回错误提示信息完毕==========");
                }


            }
        });

    }

}
