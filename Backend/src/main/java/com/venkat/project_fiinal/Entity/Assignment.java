package com.venkat.project_fiinal.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Entity
public class Assignment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	private String status;
	private String description;
	private String userSubmitted;
	public String getUserSubmitted() {
		return userSubmitted;
	}
	public void setUserSubmitted(String userSubmitted) {
		this.userSubmitted = userSubmitted;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	private String githuburl;
	private String branch;
	private String codeReviewUrl;
	private Integer number;
	  @Lob
	  @Column(length = Integer.MAX_VALUE)
	    private byte[] image;	
	  
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
	@ManyToOne(optional=false)
	
	private User user;
	
	@ManyToOne()
	private User codeReviewer;
	
	public User getCodeReviewer() {
		return codeReviewer;
	}
	public void setCodeReviewer(User codeReviewer) {
		this.codeReviewer = codeReviewer;
	}
	public Integer getNumber() {
		return number;
	}
	public void setNumber(Integer number) {
		this.number = number;
	}
	public Long getId() {
		return Id;
	}
	public void setId(Long id) {
		Id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getGithuburl() {
		return githuburl;
	}
	public void setGithuburl(String githuburl) {
		this.githuburl = githuburl;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public String getCodeReviewUrl() {
		return codeReviewUrl;
	}
	public void setCodeReviewUrl(String codeReviewUrl) {
		this.codeReviewUrl = codeReviewUrl;
	}
	public Assignment(Long id, String status, String githuburl, String branch, String codeReviewUrl , User user,Integer number) {
		super();
		Id = id;
		this.status = status;
		this.githuburl = githuburl;
		this.branch = branch;
		this.codeReviewUrl = codeReviewUrl;
		this.user = user;
		this.number= number;
	}
	public Assignment() {
		super();
		
	}
	@Override
	public String toString() {
		return "Assignment [Id=" + Id + ", status=" + status + ", githuburl=" + githuburl + ", branch=" + branch
				+ ", codeReviewUrl=" + codeReviewUrl + "]";
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
}
