package com.venkat.project_fiinal.Services;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.venkat.project_fiinal.Entity.Assignment;
import com.venkat.project_fiinal.Entity.User;
import com.venkat.project_fiinal.Enums.AssignmentEnums;
import com.venkat.project_fiinal.Enums.AuthorityEnum;
import com.venkat.project_fiinal.Repositories.assignmentRepository;
import com.venkat.project_fiinal.Repositories.userRepository;


@Service
public class AssignmentService {
	@Autowired
	private assignmentRepository assignrepo;
	@Autowired
	private userRepository userrepo;
	public List<Assignment> save(User user , String description, byte[] imageBytes) {
		 List<User> students = userrepo.findByRole("ROLE_STUDENT");

		    List<Assignment> savedAssignments = new ArrayList<>();

		    // Create and save assignments for each student
		    for (User student : students) {
		        Assignment assignment = new Assignment();
		        assignment.setStatus(AssignmentEnums.PENDING_SUBMISSION.getStatus());
		        assignment.setNumber(findNextAssignment(student)); 
		        assignment.setUser(student);
		        assignment.setDescription(description);
		        assignment.setCodeReviewer(user);
		        assignment.setImage(imageBytes);
		        savedAssignments.add(assignrepo.save(assignment));
		    }

		    return savedAssignments;
	}
	
	private Integer findNextAssignment(User user) {
		Set<Assignment>assignmentByuser = assignrepo.findByUser(user);
		if(assignmentByuser == null) {
			return 1;
		}
		Optional<Integer> assignmentnumopt = assignmentByuser.stream()
						.sorted((a1,a2)->{
							if(a1.getNumber() == null)return 1;
							if(a2.getNumber() == null)return 1;
							return a2.getNumber().compareTo(a1.getNumber());
						})
						.map(assignment -> {
							if(assignment.getNumber()==null)return 1;
							return assignment.getNumber()+1;
						})
						.findFirst();
		return assignmentnumopt.orElse(1);
		
		
		
	}

	public Set<Assignment> findByUser(User user){
		boolean isCodeReviewer = user.getAuthorities()
			.stream()
			.filter(auth->AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority()))
			.count()>0;
		if(isCodeReviewer) {
			return assignrepo.findByCodeReviewer(user);
		}
		else {
			
			return assignrepo.findByUser(user);
		}
	}
	public Optional<Assignment> findById(Long assignmentId) {
		return assignrepo.findById(assignmentId);
	}
	public Assignment save(Assignment assignment ) {
		 
	        
		return assignrepo.save(assignment);
	}
}
