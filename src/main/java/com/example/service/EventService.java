package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Category; // 追加
import com.example.entity.Event;
import com.example.entity.User;
import com.example.form.EventForm;
import com.example.repository.CategoryRepository;
import com.example.repository.EventRepository;

@Service
public class EventService {

	private final EventRepository eventRepository;
	private final CategoryRepository categoryRepository; // 追加

	@Autowired
	public EventService(EventRepository eventRepository, CategoryRepository categoryRepository) {
		this.eventRepository = eventRepository;
		this.categoryRepository = categoryRepository; // 追加
	}

	public List<Event> getEventsForDay(int year, int month, int day) { // 稲本記述追加
		// EventRepository を使用して、指定された年、月、日のイベントを取得するロジック
		return eventRepository.findEventsForDay(year, month, day); // 稲本記述追加
	}

	public List<Event> findAll() {
		return this.eventRepository.findAll();
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
		event.setStartevent(eventForm.getStartevent()); // getStartdatetimeから変更(稲本)
		event.setEndevent(eventForm.getEndevent()); //getEnddatetimeから変更(稲本)

		// EventRepository を使用して、新しいイベントを作成するロジック
		return eventRepository.save(event);
	}

	public Event findById(Integer id) {
		Optional<Event> optionalEvent = this.eventRepository.findById(id);
		Event event = optionalEvent.get();
		return event;
	}

	// データ更新用のメソッドです
	public Event update(Integer id, EventForm eventForm, LoginUser loginUser) {

		// データ１件分のEntityクラスを取得します
		Event event = this.findById(id);

		// カテゴリIDからCategoryエンティティを取得
		Category category = categoryRepository.findById(eventForm.getCategoryId())
				.orElseThrow(() -> new RuntimeException("Category not found"));
		event.setCategory(category);
		
		event.setName(eventForm.getName());
		event.setUserId(loginUser.getId()); // loginUser.getId()を使用
		event.setStartevent(eventForm.getStartevent()); // getStartdatetimeから変更(稲本)
		event.setEndevent(eventForm.getEndevent()); 

		// repository.saveメソッドを利用してデータの保存を行います
		return this.eventRepository.save(event);
	}

	// データ削除用のメソッドです
	public void delete(Integer id) {
		this.eventRepository.deleteById(id);
	}

	
}
