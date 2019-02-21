package heartbeat.monitor.starter.domain.msgs;

import java.io.Serializable;

/**
 * @apiNote 接报的监控数据的父类
 * @author liuxun
 */
public class ReportMsgInfo extends BaseInfo implements Serializable {
    private static final long serialVersionUID = 1L;

    public ReportMsgInfo() {
    }

    private Long id; // 主键ID

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
