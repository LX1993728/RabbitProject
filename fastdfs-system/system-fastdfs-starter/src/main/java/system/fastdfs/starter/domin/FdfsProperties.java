package system.fastdfs.starter.domin;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("fdfs.prefix")
public class FdfsProperties {

    // 是否剥离前缀
    private Boolean strip;

    public Boolean getStrip() {
        return strip;
    }

    public void setStrip(Boolean strip) {
        this.strip = strip;
    }
}
