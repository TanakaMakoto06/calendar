package com.example.service;

import java.time.LocalDateTime;
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

    public List<Event> getEventsForDay(int year, int month, int day) { // 稲本記述追加
        // EventRepository を使用して、指定された年、月、日のイベントを取得するロジック
        return eventRepository.findEventsForDay(year, month, day); // 稲本記述追加
    }
    public List<Event> findAll() {
        return this.eventRepository.findAll();
    }

    public Event save(EventForm eventForm, User User) {
    	Event event = new Event();
    	
		// フィールドのセットを行います
    	event.setName(eventForm.getName());
    	event.setCategoryId(eventForm.getCategoryId());
    	event.setUserId(User.getId()); // loginUser.getId()を使用
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
    public Event update(Integer id ,EventForm eventForm, LoginUser loginUser) {
       
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

//	public void delete(Integer id, EventForm eventForm) {
//		this.eventRepository.deleteById(id);
//		
//		
//	}
	public void delete(Integer id) {
	    this.eventRepository.deleteById(id);
	}
	
//	 public Event delete(Integer id) {
//    // idから該当のEntityクラスを取得します
//    //Event event = this.findById(id);
//    // EntityクラスのdeletedAtフィールドを現在日時で上書きします
//    event.setDeletedAt(LocalDateTime.now());
//    // 更新処理
//    return this.eventRepository.save(event);
//}

}
   

