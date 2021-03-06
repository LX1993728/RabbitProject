package heartbeat.monitor.starter.domain.msgs;

import java.io.Serializable;

/**
 * @apiNote 异常用户
 * @author liuxun
 */
public class ExceptionUser implements Serializable {
    private static final long serialVersionUID = 1L;

    public ExceptionUser() {
    }
    private Long id; // ID

    private String  userName; // 登录用户名

    private String ip;  // 用户登录IP

    private String  exceptionType; // 异常类型


    private String flag; // 系统标识

    private String  prepositionId; // 如果非部委前置系统，此字段是空值

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getExceptionType() {
        return exceptionType;
    }

    public void setExceptionType(String exceptionType) {
        this.exceptionType = exceptionType;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getPrepositionId() {
        return prepositionId;
    }

    public void setPrepositionId(String prepositionId) {
        this.prepositionId = prepositionId;
    }


  }
