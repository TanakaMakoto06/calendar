package com.example.service;

import java.util.List;

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
    
    /**
     * IDに紐づくブランド情報取得処理
     *
     * @param id イベントID
     * @return イベント情報
     */
    public Event get(Long id) {
        return eventRepository.findById(id).get();
    }
    
    /**
     * イベント情報登録処理
     *
     * @param event 保存したいブランド情報
     * @return 保存したブランド情報
     */
    public Event save(Event event) {
        return eventRepository.save(event);
    }
    
    /**
     * IDに紐づくイベント情報削除処理
     *
     * @param id イベントID
     */
    public void delete(Long id) {
        eventRepository.deleteById(id);
    }
}
