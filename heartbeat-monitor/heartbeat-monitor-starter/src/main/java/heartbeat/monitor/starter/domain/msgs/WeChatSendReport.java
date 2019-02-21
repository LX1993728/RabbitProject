package heartbeat.monitor.starter.domain.msgs;



/**
 * @apiNote 公众号 上报的监控
 * @author liuxun
 */
public class WeChatSendReport extends WeChatMsgInfo{
   private String  taskId; // 上报ID

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }
}
