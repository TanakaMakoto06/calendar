package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.entity.Event;
import com.example.repository.EventRepository;

@Service
public class CalendarService {

	private final EventRepository eventRepository;

	@Autowired
	public CalendarService(EventRepository eventRepository) {
		this.eventRepository = eventRepository;
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
		// ここで新しいイベントを作成します。
		// 実装はEventRepositoryとデータベースの設計に依存します。
		//return eventRepository.save(event);
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