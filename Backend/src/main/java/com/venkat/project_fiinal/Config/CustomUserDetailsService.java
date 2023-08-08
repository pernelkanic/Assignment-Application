package com.venkat.project_fiinal.Config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.venkat.project_fiinal.Entity.User;
import com.venkat.project_fiinal.Repositories.userRepository;
import com.venkat.project_fiinal.Utils.bcryptutils;
@Service
public class CustomUserDetailsService  implements UserDetailsService{
	@Autowired
	private bcryptutils passwordEncoder;
	@Autowired
	private userRepository userrepo;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		
		Optional<User> useropt=  userrepo.findByUsername(username);
		
		return useropt.orElseThrow(()->new UsernameNotFoundException("Invalid Credentials"));
				
	}

}
