package heartbeat.monitor.starter.domain.msgs;

import java.util.Date;

/**
 * @apiNote 指挥系统发出指令的监控数据
 */
public class DirectSendInstruction extends DirectMsgInfo {
    public DirectSendInstruction() {
    }

    private String taskId; // 任务ID

    private String instructionId; // 发出的指令ID

    private Date sendTime; // 发出时间

    private Boolean isSuccess; // 是否成功


    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getInstructionId() {
        return instructionId;
    }

    public void setInstructionId(String instructionId) {
        this.instructionId = instructionId;
    }

    public Date getSendTime() {
        return sendTime;
    }

    public void setSendTime(Date sendTime) {
        this.sendTime = sendTime;
    }

    public Boolean getSuccess() {
        return isSuccess;
    }

    public void setSuccess(Boolean success) {
        isSuccess = success;
    }


}
