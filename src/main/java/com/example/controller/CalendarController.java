package com.example.controller;

import java.util.List;

import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Event;
import com.example.service.CalendarService;

@RestController
@RequestMapping("/calendarApp")
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
    // サンプルコード
    // イベントデータをJSONデータとして返すメソッド
    @RequestMapping(value = "/eventsForDay", method = RequestMethod.GET)
    public @ResponseBody String getEventsForDayWithParams(@RequestParam("year") int year, @RequestParam("month") int month, @RequestParam("day") int day) {
      // イベントデータをDBから取得
      List<Event> events = calendarService.getEventsForDay(year, month, day);
      // JSONデータを生成するためのStringBuilder
      StringBuilder json = new StringBuilder();
      // JSONデータの開始
      json.append("[");
      // イベントデータの数だけ繰り返す
      for (int i = 0; i < events.size(); i++) {
        // イベントデータを取得
        Event event = events.get(i);
        // JSONデータの要素の開始
        json.append("{");
        // イベントデータのプロパティと値をJSONデータに追加
        // プロパティ名と値の間にコロン(:)を入れる
        // プロパティ名と値はダブルクオーテーション("")で囲む
        json.append("\"id\":").append("\"").append(event.getId()).append("\",");
        json.append("\"title\":").append("\"").append(StringEscapeUtils.escapeJson(event.getName())).append("\",");
        json.append("\"date\":").append("\"").append(StringEscapeUtils.escapeJson(event.getStartevent().toString())).append("\",");
        json.append("\"description\":").append("\"").append(StringEscapeUtils.escapeJson(event.getEndevent().toString())).append("\"");
        // JSONデータの要素の終了
        json.append("}");
        // 最後の要素でない場合はカンマ(,)を追加
        if (i < events.size() - 1) {
          json.append(",");
        }
      }
      // JSONデータの終了
      json.append("]");
      // JSONデータを文字列として返す
      return json.toString();
    }
}