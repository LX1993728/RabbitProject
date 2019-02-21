package heartbeat.monitor.starter.domain.msgs;

import java.io.Serializable;

/**
 * @apiNote 指挥系统消息的 监控数据父类
 */
public class DirectMsgInfo extends BaseInfo implements Serializable {
    private static final long serialVersionUID = 1L;

    public DirectMsgInfo() {
    }

    private Long id; // 主键ID

    private String eventId; // 事件标识

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
