package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Event;
import com.example.service.CalendarService;

@RestController
@RequestMapping("/calendar")
public class CalendarController {

    private final CalendarService calendarService;

    @Autowired
    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }
    

    @GetMapping("/{year}/{month}")
    public List<Event> getEventsForMonth(@PathVariable int year, @PathVariable int month) {
        return calendarService.getEventsForMonth(year, month);
    }

    @PostMapping("/event")
    public Event createEvent(@RequestBody Event event) {
        return calendarService.createEvent(event);
    }

    // 他のエンドポイントもここに追加...
}