package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.form.EventForm;
import com.example.entity.Category;
import com.example.service.CategoryService;
import com.example.service.EventService;


@Controller
@RequestMapping("/calendar")
public class EventController {
	
	private EventService eventService;
	private CategoryService categoryService;

	@Autowired
	 public EventController(EventService eventService, CategoryService categoryService) {
	        this.eventService = eventService;
	        this.categoryService = categoryService; // 追加
	    }

    // 新規イベント登録ページ表示用
    @GetMapping("toroku")
    public String torokuPage(@ModelAttribute("eventForm") EventForm eventForm ,Model model) {
        // 処理を追加
        return "event/torokuPage";
    }
    

    // 新規イベント登録の実行
    @PostMapping("toroku")
    public String toroku(EventForm eventForm) {
        // 処理を追加
    	this.eventService.save(eventForm);
        // 一覧ページへリダイレクトします
        return "redirect:/event";
    }

    // イベント編集ページ
    @GetMapping("henshu/{id}")
    public String henshuPage(@PathVariable("id") Integer id, Model model
                             , @ModelAttribute("eventForm") EventForm eventForm) {
        // 処理を追加
        return "event/henshuPage";
    }

    // イベント編集の実行
    @PostMapping("henshu/{id}")
    public String henshu(@PathVariable("id") Integer id, @ModelAttribute("eventForm") EventForm eventForm) {
        // 処理を追加

        return "redirect:/event";
    }

    // イベント削除の実行
    @PostMapping("sakujo/{id}")
    public String sakujo(@PathVariable("id") Integer id) {
        // 処理を追加
        return "redirect:/calendar";
    }

}
