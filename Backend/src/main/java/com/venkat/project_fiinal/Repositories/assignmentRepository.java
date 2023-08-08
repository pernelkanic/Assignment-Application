package com.venkat.project_fiinal.Repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.venkat.project_fiinal.Entity.Assignment;
import com.venkat.project_fiinal.Entity.User;

@Repository
public interface assignmentRepository extends JpaRepository<Assignment,Long>	{

	 Set<Assignment> findByUser(User user);
	 @Query("select a from Assignment a "
	 		+ "where (a.status ='Submitted' and (a.codeReviewer is null or a.codeReviewer =:codeReviewer))"
			 +"or a.codeReviewer = :codeReviewer")		
	 Set<Assignment> findByCodeReviewer(User codeReviewer);
	
	 
	
}

