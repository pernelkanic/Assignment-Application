package com.venkat.project_fiinal.DTO;

import org.springframework.web.multipart.MultipartFile;

public class AssignmentRequestDTO {
    private String description;
    private MultipartFile image;
    
  
	public MultipartFile getImage() {
		return image;
	}

	public void setImage(MultipartFile image) {
		this.image = image;
	}

	public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
