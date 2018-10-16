package system.fastdfs.starter.config;

import org.springframework.stereotype.Component;

@Component
public class AppConfig {

    private String fdfsUrl = "192.168.1.150";


    public String getFdfsUrl() {
        return this.fdfsUrl;
    }

    public void setFdfsUrl(String fdfsUrl) {
        this.fdfsUrl = fdfsUrl;
    }

}
