package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

	List<Event> findEventsForMonth(int year, int month);

}
