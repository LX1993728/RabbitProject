package heartbeat.monitor.starter.domain.msgs;

import java.io.Serializable;


public class BaseInfo implements Serializable {

    private String messageId;
    private String sendIp;
    private String  receiveIp; // 接收IP
    private String sendFlag; // 系统标识
    private String sendPrepositionId; // 如果非前置则为null

    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public String getSendIp() {
        return sendIp;
    }

    public void setSendIp(String sendIp) {
        this.sendIp = sendIp;
    }

    public String getReceiveIp() {
        return receiveIp;
    }

    public void setReceiveIp(String receiveIp) {
        this.receiveIp = receiveIp;
    }

    public String getSendFlag() {
        return sendFlag;
    }

    public void setSendFlag(String sendFlag) {
        this.sendFlag = sendFlag;
    }

    public String getSendPrepositionId() {
        return sendPrepositionId;
    }

    public void setSendPrepositionId(String sendPrepositionId) {
        this.sendPrepositionId = sendPrepositionId;
    }
}
