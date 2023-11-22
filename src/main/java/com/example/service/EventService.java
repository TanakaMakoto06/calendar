package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Event;
import com.example.form.EventForm;
import com.example.repository.EventRepository;

@Service
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }
    
    public List<Event> findAll() {
        return this.eventRepository.findAll();
    }
    
 // データ保存用のメソッドです
    public Event save(EventForm eventForm) {
        // Entityクラスのインスタンスを生成します
        Event event = new Event();
        // フィールドのセットを行います
        event.setName(eventForm.getName());
       //event.setCategoryid(eventForm.getCategory());
        // カテゴリIDをセットする
       // event.setCategoryid(eventForm.getCategoryId());
        
        // repository.saveメソッドを利用してデータの保存を行います
        return this.eventRepository.save(event);
    }
    
}
