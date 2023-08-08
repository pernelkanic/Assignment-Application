package com.venkat.project_fiinal.DTO;

import com.venkat.project_fiinal.Entity.Assignment;
import com.venkat.project_fiinal.Entity.User;
import com.venkat.project_fiinal.Enums.AssignmentEnums;

public class AssignmentResponseDTO {
    private Assignment assignment;
    
    private AssignmentEnums[] assignenums = AssignmentEnums.values();

    public AssignmentResponseDTO(Assignment assignment) {
    	super();
        this.assignment = assignment;
       
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }



    public AssignmentEnums[] getAssignenums() {
        return assignenums;
    }
}
