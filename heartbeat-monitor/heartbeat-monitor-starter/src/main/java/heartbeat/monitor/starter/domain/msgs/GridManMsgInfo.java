package heartbeat.monitor.starter.domain.msgs;

/**
 * @apiNote 网格员的监控数据
 */
public class GridManMsgInfo extends BaseInfo{
    private static final long serialVersionUID = 1L;

    public GridManMsgInfo() {
    }

    private Long id; // 主键ID

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
