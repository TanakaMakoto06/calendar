package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

}
