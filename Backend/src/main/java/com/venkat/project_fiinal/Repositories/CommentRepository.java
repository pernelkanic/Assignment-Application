package com.venkat.project_fiinal.Repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.venkat.project_fiinal.Entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	
	@Query("select c from Comment c where c.assignment.id = :assignmentid")
	Set<Comment> findByAssignmentId(Long assignmentid);

}
