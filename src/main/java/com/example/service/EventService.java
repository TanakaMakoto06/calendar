package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Event;
import com.example.repository.EventRepository;

import java.util.List;

@Service
public class EventService {
	
	private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getEventsForMonth(int year, int month) {
        // EventRepository を使用して、指定された年と月のイベントを取得するロジック
        return eventRepository.findEventsForMonth(year, month);
    }

    public Event createEvent(Event event) {
        // EventRepository を使用して、新しいイベントを作成するロジック
        return eventRepository.save(event);
    }


   
}
