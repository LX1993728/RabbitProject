package heartbeat.monitor.starter.domain.msgs;

import java.io.Serializable;

/**
 * @apiNote 指挥系统消息的 监控数据父类
 */
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    public User() {
    }

    private Long id; // 主键ID

    private String username; // 用户名

    private String  password; // 密码

    private String salt; //盐

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }
}
