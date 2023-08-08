package com.venkat.project_fiinal.Controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.venkat.project_fiinal.DTO.CommentDto;
import com.venkat.project_fiinal.Entity.Comment;
import com.venkat.project_fiinal.Entity.User;
import com.venkat.project_fiinal.Services.CommentService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
	@Autowired
	private CommentService commentservice;
	@PostMapping("")
	public ResponseEntity<Comment>createComment(@RequestBody CommentDto commentdto, @AuthenticationPrincipal User user){
		Comment comment = commentservice.save(commentdto,user);
		return ResponseEntity.ok(comment);
	}
	@GetMapping("")
	public ResponseEntity<Set<Comment>> getCommentsByAssignment(@RequestParam Long Assignmentid ){
		Set<Comment>comments = commentservice.getCommentbyAssignmentid(Assignmentid);
		return ResponseEntity.ok(comments);
	}
	
}
