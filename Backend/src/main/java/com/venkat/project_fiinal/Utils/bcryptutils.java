package com.venkat.project_fiinal.Utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class bcryptutils {
	
	private PasswordEncoder passwordencoder;
	public bcryptutils() {
		this.passwordencoder = new BCryptPasswordEncoder();
	}
	public PasswordEncoder getpasswordencoder() {
		return passwordencoder;
	}
	
}
