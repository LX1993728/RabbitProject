package heartbeat.monitor.starter.domain.msgs;

import java.util.Date;

/**
 * @apiNote 网格员发送任务监控
 */
public class GridManSendReport extends GridManMsgInfo {
    public GridManSendReport() {
    }

    private String taskId; // 任务ID
    private Date sendTime; // 发出时间
    private Boolean isSuccess; // 是否成功

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
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
