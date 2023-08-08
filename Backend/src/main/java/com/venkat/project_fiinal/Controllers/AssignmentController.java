package com.venkat.project_fiinal.Controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.venkat.project_fiinal.DTO.AssignmentRequestDTO;
import com.venkat.project_fiinal.DTO.AssignmentResponseDTO;
import com.venkat.project_fiinal.Entity.Assignment;
import com.venkat.project_fiinal.Entity.User;
import com.venkat.project_fiinal.Enums.AuthorityEnum;
import com.venkat.project_fiinal.Services.AssignmentService;
import com.venkat.project_fiinal.Services.userService;
import com.venkat.project_fiinal.Utils.AuthorityUtil;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
	@Autowired
	private AssignmentService asserv;
	@Autowired 
	private userService userserv;
	
	    

	    @PostMapping("")
	    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user,
	            @ModelAttribute AssignmentRequestDTO studentRequestDTO) {
	        if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_STUDENT.name(), user)) {
	            // Student submission
	            if (studentRequestDTO.getImage() == null || studentRequestDTO.getImage().isEmpty()) {
	                return ResponseEntity.badRequest().body("Image file is required for student submission.");
	            }

	            List<Assignment> assignments = null;
				try {
					assignments = asserv.save(user, studentRequestDTO.getDescription(), studentRequestDTO.getImage().getBytes());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	            return ResponseEntity.ok(assignments);
	        } else if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(), user)) {
	            // Code reviewer submission
	            if (studentRequestDTO.getDescription() == null || studentRequestDTO.getDescription().isEmpty()) {
	                return ResponseEntity.badRequest().body("Description is required for code reviewer submission.");
	            }

	            List<Assignment> assignments = asserv.save(user, studentRequestDTO.getDescription(),null);
	            return ResponseEntity.ok(assignments);
	        } else {
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to create an assignment.");
	        }
	    }

	    // ...
	

	@GetMapping("")
	public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user){
		Set<Assignment> set = asserv.findByUser(user);
		
		return ResponseEntity.ok(set);
	}
		@GetMapping("{assignmentid}")
		public ResponseEntity<?> getoneAssignments(@PathVariable Long assignmentid ,@AuthenticationPrincipal User user){
			Optional<Assignment> assignopt = asserv.findById(assignmentid);
			 
			return ResponseEntity.ok(new AssignmentResponseDTO(assignopt.orElse(new Assignment())));
		}
	@PutMapping("{assignmentid}")
	public ResponseEntity<?> updateAssignments(@PathVariable Long assignmentid ,@RequestBody Assignment assignment,@AuthenticationPrincipal User user ){
		if(assignment.getCodeReviewer() !=null) {
			User codeReviewer = assignment.getCodeReviewer();
			codeReviewer = userserv.finduserbyUsername(codeReviewer.getUsername()).orElse(new User());
			if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(), codeReviewer)) {
				assignment.setCodeReviewer(codeReviewer);
			}
			
		    }
		Assignment updatedassignment = asserv.save(assignment  );
		return ResponseEntity.ok(updatedassignment);
		}
	}
	

