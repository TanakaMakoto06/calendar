package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import com.example.entity.Event;

import com.example.entity.User;
import com.example.form.EventForm;

import com.example.repository.EventRepository;

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
    public List<Event> findAll() {
        return this.eventRepository.findAll();
    }

    public Event save(EventForm eventForm, User loginUser) {
    	Event event = new Event();
    	
		// フィールドのセットを行います
    	event.setName(eventForm.getName());
    	event.setCategoryId(eventForm.getCategoryId());
    	event.setUserId(loginUser.getId()); // loginUser.getId()を使用
    	event.setStartevent(eventForm.getStartevent());
    	event.setEndevent(eventForm.getEndevent());	
    	
        // EventRepository を使用して、新しいイベントを作成するロジック
        return eventRepository.save(event);
    }
    
    
    public Event findById(Integer id) {
      Optional<Event> optionalEvent = this.eventRepository.findById(id);
      Event event  = optionalEvent.get();
      	return event;
  }
    
    
 // データ更新用のメソッドですgin
    public Event update(Integer id ,EventForm eventForm, User loginUser) {
       
		// データ１件分のEntityクラスを取得します
        Event event = this.findById(id);
        // Formクラスのフィールドをセットします
        event.setName(eventForm.getName());
        event.setCategoryId(eventForm.getCategoryId());
    	event.setUserId(loginUser.getId()); // loginUser.getId()を使用
    	event.setStartevent(eventForm.getStartevent());
    	event.setEndevent(eventForm.getEndevent());
        
       
        // repository.saveメソッドを利用してデータの保存を行います
        return this.eventRepository.save(event);
    }

	

	

   
}
