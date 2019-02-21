package heartbeat.monitor.starter.domain.msgs;

import java.util.Date;

/**
 * @apiNote 网格员接收任务监控
 */
public class GridManReceiveTask extends GridManMsgInfo {
    public GridManReceiveTask() {
    }

    private String taskId; // 任务ID
    private Date receiveTime; // 接收时间
    private Boolean isResolved; // 是否处理完毕

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public Date getReceiveTime() {
        return receiveTime;
    }

    public void setReceiveTime(Date receiveTime) {
        this.receiveTime = receiveTime;
    }

    public Boolean getResolved() {
        return isResolved;
    }

    public void setResolved(Boolean resolved) {
        isResolved = resolved;
    }

}
