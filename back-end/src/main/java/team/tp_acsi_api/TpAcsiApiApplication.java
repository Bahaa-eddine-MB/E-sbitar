package team.tp_acsi_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
public class TpAcsiApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TpAcsiApiApplication.class, args);
		System.out.println("started");
	}
	
}
