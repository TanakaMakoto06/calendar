package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Event;
import com.example.form.EventForm;
import com.example.repository.EventRepository;

@Service
public class EventService {
	
	private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getEventsForDay(int year, int month, int day) { // 稲本記述追加
        // EventRepository を使用して、指定された年、月、日のイベントを取得するロジック
        return eventRepository.findEventsForDay(year, month, day); // 稲本記述追加
    }

    public Event save(EventForm eventForm) {
    	Event event = new Event();
    	
		// フィールドのセットを行います
    	event.setName(eventForm.getName());
    	event.setCategoryId(eventForm.getCategoryId());
    	event.setStartevent(eventForm.getStartdatetime());
    	event.setEndevent(eventForm.getEnddatetime());	
    	
        // EventRepository を使用して、新しいイベントを作成するロジック
        return eventRepository.save(event);
    }
}
