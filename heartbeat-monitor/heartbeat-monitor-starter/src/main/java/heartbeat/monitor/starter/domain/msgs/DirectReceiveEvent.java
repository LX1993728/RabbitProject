package heartbeat.monitor.starter.domain.msgs;

import java.util.Date;

/**
 * @apiNote 指挥系统接收事件的监控数据
 */
public class DirectReceiveEvent extends DirectMsgInfo {
    public DirectReceiveEvent() {
    }

    private Date receiveTime;// 接收时间

    private Boolean isResolved; // 是否处理完毕

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
