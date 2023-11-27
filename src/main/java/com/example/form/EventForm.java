package com.example.form;


import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;



public class EventForm {	
	
	 private String name;
	 
	 private Integer userid;
	 
	 //private Integer categoryId;
	 
	 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	 private  LocalDateTime startdatetime;
	 
	 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	 private  LocalDateTime enddatetime;

	 private Integer categoryId;

	
	 
	 

	 public String getName() {
	        return this.name;
	 }
	 public void setName(String name) {
	        this.name = name;
	 }
	 
	 public Integer getUserid() {
	        return this.userid;
	 }
	 
	 public void setUserid(int userid) {
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
	 
	 
	 public LocalDateTime getStartdatetime() {
	        return this.startdatetime;
	    }
	    
	    public void  setStartdatetime(LocalDateTime startdatetime) {
	         this.startdatetime = startdatetime;
	    }
	    
	    public LocalDateTime getEnddatetime() {
	        return this.enddatetime;
	    }
	    
	    public void  setEnddatetime(LocalDateTime enddatetime) {
	         this.enddatetime = enddatetime;
	    }
		
}