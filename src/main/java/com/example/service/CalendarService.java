package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.entity.Category;
import com.example.entity.Event;
import com.example.repository.CategoryRepository;
import com.example.repository.EventRepository;

@Service
public class CalendarService {

	private final EventRepository eventRepository;
	private final CategoryRepository categoryRepository;

	@Autowired
	public CalendarService(EventRepository eventRepository, CategoryRepository categoryRepository) {
		this.eventRepository = eventRepository;
		this.categoryRepository = categoryRepository;
	}

	public List<Event> getEventsForDay(int year, int month, int day) {
		// ここで年と月に基づいてイベントを取得します。
		// 実装はEventRepositoryとデータベースの設計に依存します。
		return eventRepository.findEventsForDay(year, month, day);
	}

	public List<Event> searchEvents(String name) {
		return eventRepository.findByNameContains(name);
	}

	@Transactional
	public Event createEvent(Event event) {
	    // カテゴリが存在することを確認
	    Category category = categoryRepository.findById(event.getCategory().getId())
	        .orElseThrow(() -> new RuntimeException("Category not found"));

	    // イベントを作成
	    try {
	        Event savedEvent = eventRepository.save(event);
	        return savedEvent;
	    } catch (Exception e) {
	        // エラーハンドリング
	        throw new RuntimeException("Event creation failed", e);
	    }
	}

	// 他のメソッドもここに追加...
}