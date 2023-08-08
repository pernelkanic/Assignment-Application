package com.venkat.project_fiinal.Enums;

import com.fasterxml.jackson.annotation.JsonFormat;


@JsonFormat(shape = JsonFormat.Shape.OBJECT)	
public enum AssignmentEnums {
	PENDING_SUBMISSION("Pending Submission" , 1),
	SUBMITTED("Submitted", 2),
	IN_REVIEW("In Review" ,3),
	NEEDS_UPDATE("Needs Update", 4),
	COMPLETED("Completed", 5),
	RESUBMITTED("Re-submitted", 6);
	
	private String status;
	private Integer step;
	public String getStatus() {
		return status;
	}
	public Integer getStep() {
		return step;
	}
	private AssignmentEnums(String status, Integer step) {
		this.status = status;
		this.step = step;
	}
		
	
}


