package allatori.starter.test.controllers;

import com.allatori.starter.processors.TestProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class ExampleController {
    @Autowired
    private TestProcessor testProcessor;

    @GetMapping("/aaa")
    public Object aaa(){
        return testProcessor.getStrTest(new Date());
    }
}
