package com.venkat.project_fiinal.Utils;

import java.io.IOException;
import org.springframework.http.HttpHeaders;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.venkat.project_fiinal.Repositories.userRepository;

import java.util.List;

@Component
public class jwtFilter extends OncePerRequestFilter {
	
	@Autowired
	private userRepository userrepo;
	@Autowired
	private JwtUtil jwtutil;
	
		@Override
	    protected void doFilterInternal(HttpServletRequest request,
	                                    HttpServletResponse response,
	                                    FilterChain chain)
	            throws ServletException, IOException {
	        // Get authorization header and validate
	        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
	        if (!StringUtils.hasText(header)||( StringUtils.hasText(header) && !header.startsWith("Bearer "))) {
	            chain.doFilter(request, response);
	            return;
	        }

	        final String token = header.split(" ")[1].trim();
	        
	        
	        UserDetails userDetails = userrepo
		            .findByUsername(jwtutil.extractUsername(token))
		            .orElse(null);
	        
	        if (!jwtutil.validateToken(token ,userDetails)) {
	            chain.doFilter(request, response);
	            return;
	        }

	        // Get user identity and set it on the spring security context
	       UsernamePasswordAuthenticationToken
	            authentication = new UsernamePasswordAuthenticationToken(
	                userDetails, null,
	                userDetails == null ?
	                    List.of() : userDetails.getAuthorities()
	            );

	        authentication.setDetails(
	            new WebAuthenticationDetailsSource().buildDetails(request)
	        );

	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        chain.doFilter(request, response);
	    }

	}
	

