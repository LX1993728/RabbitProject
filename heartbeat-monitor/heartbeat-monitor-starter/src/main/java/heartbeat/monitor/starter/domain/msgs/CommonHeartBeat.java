package heartbeat.monitor.starter.domain.msgs;

import java.io.Serializable;

/**
 * @author liuxun
 * @apiNote 心跳信息
 */

public class CommonHeartBeat implements Serializable {
    private static final long serialVersionUID = 1L;

    public CommonHeartBeat() {
    }

    private Long id; // 主键ID

    private String preInfos;

    private String notPreInfos;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPreInfos() {
        return preInfos;
    }

    public void setPreInfos(String preInfos) {
        this.preInfos = preInfos;
    }

    public String getNotPreInfos() {
        return notPreInfos;
    }

    public void setNotPreInfos(String notPreInfos) {
        this.notPreInfos = notPreInfos;
    }
}
