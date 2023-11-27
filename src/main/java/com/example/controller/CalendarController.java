package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    

    @GetMapping("/{year}/{month}/{day}")
    public List<Event> getEventsForDay(@PathVariable int year, @PathVariable int month, @PathVariable int day) {
        return calendarService.getEventsForDay(year, month, day);
    }
    @PostMapping("/event")
    public Event createEvent(@RequestBody Event event) {
        return calendarService.createEvent(event);
    }
    
    @GetMapping("/searchCalendar")
    public List<Event> searchEvents(@RequestParam String name) {
        return calendarService.searchEvents(name);
    }

    // 他のエンドポイントもここに追加...
}