package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
	
	

    @Query("SELECT e FROM Event e WHERE YEAR(e.startevent) = :year AND MONTH(e.startevent) = :month")
    List<Event> findEventsForMonth(@Param("year") int year, @Param("month") int month);
    
//    曖昧検索用
    @Query("SELECT e FROM Event e WHERE e.name LIKE %:name%")
    List<Event> findByNameContains(@Param("name") String name);

	Optional<Event> findById(Integer id);

	void deleteById(Integer id);

}
