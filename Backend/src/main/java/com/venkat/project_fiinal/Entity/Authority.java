package com.venkat.project_fiinal.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity

public class Authority implements GrantedAuthority{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	private String authority;
	@ManyToOne(optional =false )
	
	private User user;
	
	public  Authority(String authority) {
		this.authority = authority;
	}
	public Long getId() {
		return Id;
	}
	
	public void setId(Long id) {
		Id = id;
	}
	@Override
	public String getAuthority() {
		return authority;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	@Override
	public String toString() {
		return "Authority [Id=" + Id + ", authority=" + authority + ", user=" + user + "]";
	}
	public Authority(Long id, String authority, User user) {
		super();
		Id = id;
		this.authority = authority;
		this.user = user;
	}
	public Authority() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
