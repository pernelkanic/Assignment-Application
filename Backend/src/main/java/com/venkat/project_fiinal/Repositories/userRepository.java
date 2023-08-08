package com.venkat.project_fiinal.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.venkat.project_fiinal.Entity.User;

public interface userRepository extends JpaRepository<User,Long>	{

	Optional<User> findByUsername(String username);
	@Query("SELECT u FROM User u JOIN u.authorities a WHERE a.authority = :role")
	List<User> findByRole(String role);

	
	
	
}
