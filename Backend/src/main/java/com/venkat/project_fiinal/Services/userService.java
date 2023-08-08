package com.venkat.project_fiinal.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.venkat.project_fiinal.Entity.User;
import com.venkat.project_fiinal.Repositories.userRepository;

@Service	
public class userService {
	@Autowired 
	private userRepository userrepo;
	public Optional<User> finduserbyUsername(String username) {
		return userrepo.findByUsername(username);
		
	}
}
