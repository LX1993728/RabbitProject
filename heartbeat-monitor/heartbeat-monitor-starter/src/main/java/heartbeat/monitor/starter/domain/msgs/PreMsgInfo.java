package heartbeat.monitor.starter.domain.msgs;

import java.io.Serializable;

/**
 * @apiNote 接报监控数据的统一父类
 */
public class PreMsgInfo extends BaseInfo implements Serializable {
    private static final long serialVersionUID = 1L;

    public PreMsgInfo() {
    }


    private Long id; // 主键ID

    private String taskId;// 任务ID

    private String prepositionId; // 此处处理的是部委前置的信息，此字段值用不为null


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getPrepositionId() {
        return prepositionId;
    }

    public void setPrepositionId(String prepositionId) {
        this.prepositionId = prepositionId;
    }

}
