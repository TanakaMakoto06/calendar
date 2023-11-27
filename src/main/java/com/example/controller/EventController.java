package com.example.controller;


import java.util.List;// この行を追加(稲本)

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.entity.Event;
import com.example.form.EventForm;
import com.example.repository.EventRepository;
import com.example.service.CategoryService;
import com.example.service.EventService;
import com.example.service.LoginUser;

@Controller
@RequestMapping("/calendar")
public class EventController {

	private EventService eventService;
	private CategoryService categoryService;
	private final EventRepository eventRepository;  // この行を追加(稲本)

	@Autowired
	public EventController(EventService eventService, CategoryService categoryService, EventRepository eventRepository) {
		this.eventService = eventService;
		this.categoryService = categoryService; // 追加
		this.eventRepository = eventRepository; // この行を追加(稲本)
		
	}

	// 新規イベント登録ページ表示用
	@GetMapping("torokuPage")
	public String torokuPage(@ModelAttribute("eventForm") EventForm eventForm, Model model) {
		// 処理を追加
		Event event = new Event();
		
		return "torokuPage";
	}

	// 新規イベント登録の実行
		@PostMapping("toroku")
		public String toroku(EventForm eventForm, @AuthenticationPrincipal LoginUser loginUser) {
			
			this.eventService.save(eventForm, loginUser.getUser());

			// 一覧ページへリダイレクトします
			return "redirect:/calendar";
		}
	
	// イベント編集ページ
	@GetMapping("henshu/{id}")
	public String henshuPage(@PathVariable("id") Integer id, Model model,
			@ModelAttribute("eventForm") EventForm eventForm) {
		// 処理を追加
		return "calendar/henshuPage";
	}

	// イベント編集の実行
	@PostMapping("henshu/{id}")
	public String henshu(@PathVariable("id") Integer id, @ModelAttribute("eventForm") EventForm eventForm) {
		// 処理を追加

		return "redirect:/calendar";
	}

	// イベント削除の実行
	@PostMapping("sakujo/{id}")
	public String sakujo(@PathVariable("id") Integer id) {
		// 処理を追加
		return "redirect:/calendar";
	}

	//    検索機能の実装
	@GetMapping("/searchEvent")
	public ResponseEntity<List<Event>> searchEvents(@RequestParam String name) {
		List<Event> events = eventRepository.findByNameContains(name);
		return ResponseEntity.ok(events);
	}

}
