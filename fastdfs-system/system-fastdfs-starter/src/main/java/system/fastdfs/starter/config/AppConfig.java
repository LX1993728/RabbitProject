package system.fastdfs.starter.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppConfig {

    private String fdfsUrl = "20.1.0.150";


    public String getFdfsUrl() {
        return this.fdfsUrl;
    }

    public void setFdfsUrl(String fdfsUrl) {
        this.fdfsUrl = fdfsUrl;
    }

}
