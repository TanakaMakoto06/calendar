package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/calendar")
    public String showCalendar() {
        return "index";
    }

    // 他のビューに関するメソッドもここに追加...
}
