package system.fastdfs.starter.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppConfig {

    private String fdfsUrl = "anrong123.s1.natapp.cc";


    public String getFdfsUrl() {
        return this.fdfsUrl;
    }

    public void setFdfsUrl(String fdfsUrl) {
        this.fdfsUrl = fdfsUrl;
    }

}
