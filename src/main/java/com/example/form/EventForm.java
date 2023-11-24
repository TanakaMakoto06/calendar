package com.example.form;


import java.time.LocalDateTime;

import com.example.entity.Category;

public class EventForm {	
	
	 private String name;
	 
	 private Integer userid;
	 
	 private Integer categoryid;
	 
	 private  LocalDateTime startdatetime;
	 
	 private  LocalDateTime enddatetime;

	private Category category;
	 
	 
	 
	 
	 

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
	 
	 public Category getCategory() {
		 return this.category;
	 }
	 public void setCategory(Category category) {
		 this.category = category;
	 }
	 
	 public Integer getCategoryid() {
	        return this.categoryid;
	 }
	 
	 public void setCategoryid(int categoryid) {
	        this.categoryid = categoryid;
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
	    
	    public void  setEnddatatime(LocalDateTime enddatetime) {
	         this.enddatetime = enddatetime;
	    }
		
}