package com.venkat.project_fiinal.Utils;

import com.venkat.project_fiinal.Entity.User;



public class AuthorityUtil {
	public static  boolean hasRole(String role, User user) {
		return user.getAuthorities().stream()
									.filter(auth->auth.getAuthority().equals(role))
									.count()>0;
	}

	
}
