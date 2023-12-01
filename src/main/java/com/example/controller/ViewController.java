package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/calendar")
    public String showCalendar() {
        return "index";
    }

    @GetMapping("/todayEvent")
    public String todayEvent() {
        return "/todayEvent";
    }
    // 他のビューに関するメソッドもここに追加...
}
