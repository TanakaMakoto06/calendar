package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {


    @Query("SELECT e FROM Event e WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month")
    List<Event> findEventsForMonth(@Param("year") int year, @Param("month") int month);

}

