package com.venkat.project_fiinal.Services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.venkat.project_fiinal.DTO.CommentDto;
import com.venkat.project_fiinal.Entity.Assignment;
import com.venkat.project_fiinal.Entity.Comment;
import com.venkat.project_fiinal.Entity.User;
import com.venkat.project_fiinal.Repositories.CommentRepository;
import com.venkat.project_fiinal.Repositories.assignmentRepository;

@Service
public class CommentService {
	
	@Autowired
	private CommentRepository commentrepo;
	@Autowired
	private assignmentRepository assignrepo;
	
	public Comment save(CommentDto commentdto , User user) {
		
		Comment comment = new Comment();
		comment.setText(commentdto.getText());
		comment.setCreatedBy(user);
		Assignment assign = assignrepo.getById(commentdto.getAssignmentId());
		comment.setCreatedDate(LocalDateTime.now());
		comment.setAssignment(assign);
		return  commentrepo.save(comment);
		
		
	}

	public Set<Comment> getCommentbyAssignmentid(Long assignmentid) {
		Set<Comment> comment = commentrepo.findByAssignmentId(assignmentid);
		
		return comment;
	}
}
