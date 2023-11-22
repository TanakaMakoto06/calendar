package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Event;
import com.example.repository.EventRepository;

@Service
public class CalendarService {

    private final EventRepository eventRepository;

    @Autowired
    public CalendarService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getEventsForMonth(int year, int month) {
        // ここで年と月に基づいてイベントを取得します。
        // 実装はEventRepositoryとデータベースの設計に依存します。
        return eventRepository.findEventsForMonth(year, month);
    }

    public Event createEvent(Event event) {
        // ここで新しいイベントを作成します。
        // 実装はEventRepositoryとデータベースの設計に依存します。
        return eventRepository.save(event);
    }

    // 他のメソッドもここに追加...
}