package heartbeat.monitor.starter.domain.msgs;

import java.io.Serializable;
import java.util.Date;

/**
 * @apiNote 公众号消息监控
 */

public class WeChatMsgInfo extends BaseInfo implements Serializable {
    private static final long serialVersionUID = 1L;

    public WeChatMsgInfo() {
    }

    private Long id; // 主键ID

    private Date sendTime; // 发出时间

    private Boolean isSuccess; // 是否成功

    public static long getSerialVersionUID() {
        return serialVersionUID;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
