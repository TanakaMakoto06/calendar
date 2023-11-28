package com.example.form;


import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;



public class EventForm {	
	
	 private String name;
	 
	 private Integer userid;
	
	 
	 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	 private  LocalDateTime startevent;
	 
	 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	 private  LocalDateTime endevent;

	 private Integer categoryId;

	
	 
	 

	 public String getName() {
	        return this.name;
	 }
	 public void setName(String name) {
	        this.name = name;
	 }
	 
	 public Integer getUserId() {
	        return this.userid;
	 }
	 
	 public void setUserId(Integer userid) {
	        this.userid = userid;
	 }
//	 
//	 public Category getCategory() {
//		 return this.category;
//	 }
//	 public void setCategory(Category category) {
//		 this.category = category;
//	 }
	 
	 public Integer getCategoryId() {
	        return this.categoryId;
	 }
	 
	 public void setCategoryId(Integer categoryId) {
	        this.categoryId = categoryId;
	 }
	 
	 
	 public LocalDateTime getStartevent() {
	        return this.startevent;
	    }
	    
	    public void  setStartevent(LocalDateTime startevent) {
	         this.startevent = startevent;
	    }
	    
	    public LocalDateTime getEndevent() {
	        return this.endevent;
	    }
	    
	    public void  setEndevent(LocalDateTime endevent) {
	         this.endevent = endevent;
	    }
		
		
}