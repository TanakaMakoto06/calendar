package com.example.controller;



import java.util.List;// この行を追加(稲本)

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	private final EventRepository eventRepository; // この行を追加(稲本)

	@Autowired
	public EventController(EventService eventService, CategoryService categoryService,
			EventRepository eventRepository) {
		this.eventService = eventService;
		this.categoryService = categoryService; // 追加
		this.eventRepository = eventRepository; // この行を追加(稲本)

	}

	@GetMapping("/eventsForDay")
	public ResponseEntity<List<Event>> getEventsForDay(@RequestParam int year, @RequestParam int month,
			@RequestParam int day) {
		List<Event> events = eventService.getEventsForDay(year, month, day);
		return ResponseEntity.ok(events);
	}

	// 新規イベント登録ページ表示用
	@GetMapping("torokuPage")
	public String torokuPage(@ModelAttribute("eventForm") EventForm eventForm, Model model) {
		
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
	@GetMapping("hensyuPage/{id}")
	public String henshuPage(@PathVariable("id") Integer id, Model model, @AuthenticationPrincipal LoginUser loginUser,
			@ModelAttribute("eventForm") EventForm eventForm) {
		 Event event = this.eventService.findById(id);
		
		 eventForm.setName(event.getName());
		 eventForm.setCategoryId(event.getCategory().getId());
	     //eventForm.setUserId(loginUser().getId()); // loginUser.getId()を使用 event.getUserId()
	     eventForm.setStartevent(event.getStartevent());
	     eventForm.setEndevent(event.getEndevent());
		 model.addAttribute("eventForm", eventForm);
		// 処理を追加
		return "hensyuPage";
	}

	

	// イベント編集の実行
	@PostMapping("henshu/{id}")
	public String henshu(@PathVariable("id") Integer id,@AuthenticationPrincipal LoginUser loginUser,
				EventForm eventForm) {
		// 処理を追加
		Event update = this.eventService.update(id, eventForm,loginUser);
		
		return "redirect:/calendar";
	}
	
	// イベント詳細ページ
	@GetMapping("/syousaiPage/{id}")

	public String syousaiPage(@PathVariable("id") Integer id, Model model, @AuthenticationPrincipal LoginUser loginUser,
			@ModelAttribute("eventForm") EventForm eventForm) {
		 Event event = this.eventService.findById(id);
		
		 eventForm.setName(event.getName());
		 eventForm.setCategoryId(event.getCategory().getId());
	     //eventForm.setUserId(loginUser().getId()); // loginUser.getId()を使用 event.getUserId()
	     eventForm.setStartevent(event.getStartevent());
	     eventForm.setEndevent(event.getEndevent());
		 model.addAttribute("eventForm", eventForm);

	    return "syousaiPage"; // syousaiPage.html への遷移
	}


	// イベント削除の実行
		@GetMapping("/delete/{id}")
		public String delete(@PathVariable("id") Integer id) {
			this.eventService.delete(id);
			System.out.print(id);
			// 削除後のリダイレクト
			return "redirect:/calendar";
		}
		
	
	//    検索機能の実装
	@GetMapping("/searchEvent")
	public ResponseEntity<List<Event>> searchEvents(@RequestParam String name) {
		List<Event> events = eventRepository.findByNameContains(name);
		return ResponseEntity.ok(events);
	}

}
