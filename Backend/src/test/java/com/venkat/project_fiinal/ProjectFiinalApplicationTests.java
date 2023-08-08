package com.venkat.project_fiinal;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@SpringBootTest
class ProjectFiinalApplicationTests {

	@Test
	void contextLoads() {
	}
	@Test
	void passwordTest() {
		PasswordEncoder password = new BCryptPasswordEncoder();
		password.encode("venkat03");
		System.out.println(password.encode("venkat03"));
		
	}

}
