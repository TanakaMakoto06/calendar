package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Category;  // 追加
import com.example.entity.Event;
import com.example.entity.User;
import com.example.form.EventForm;
import com.example.repository.CategoryRepository;
import com.example.repository.EventRepository;

@Service
public class EventService {
	
	private final EventRepository eventRepository;
	private final CategoryRepository categoryRepository;  // 追加

    @Autowired
    public EventService(EventRepository eventRepository, CategoryRepository categoryRepository)  {
        this.eventRepository = eventRepository;
        this.categoryRepository = categoryRepository;  // 追加
    }

    public List<Event> getEventsForDay(int year, int month, int day) { // 稲本記述追加
        // EventRepository を使用して、指定された年、月、日のイベントを取得するロジック
        return eventRepository.findEventsForDay(year, month, day); // 稲本記述追加
    }

    public Event save(EventForm eventForm, User loginUser) {
        Event event = new Event();
        
        // フィールドのセットを行います
        event.setName(eventForm.getName());

        // カテゴリIDからCategoryエンティティを取得
        Category category = categoryRepository.findById(eventForm.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Category not found"));
        event.setCategory(category);

        event.setUserId(loginUser.getId()); // loginUser.getId()を使用
        event.setStartevent(eventForm.getStartdatetime());
        event.setEndevent(eventForm.getEnddatetime());    
        
        // EventRepository を使用して、新しいイベントを作成するロジック
        return eventRepository.save(event);
    }
}
