package com.example.form;


import java.sql.Date;
import java.time.LocalDateTime;

public class EventForm {	
	
	 private String name;
	 
	 private Integer userid;
	 
	 private Integer categoryid;
	 
	 private  LocalDateTime startdatetime;
	 
	 private  LocalDateTime enddatetime;
	 
	 
	 
	 
	 

	 public String getName() {
	        return this.name;
	 }
	 public void setName(String name) {
	        this.name = name;
	 }
	 
	 public Integer getuserid() {
	        return this.userid;
	 }
	 
	 public void setuserid(int userid) {
	        this.userid = userid;
	 }
	 
	 public Integer getcategoryid() {
	        return this.categoryid;
	 }
	 
	 public void setcategoryid(int categoryid) {
	        this.categoryid = categoryid;
	 }
	 
	 
	 public LocalDateTime startdatetime() {
	        return this.startdatetime;
	    }
	    
	    public void  startdatetime(LocalDateTime startdatetime) {
	         this.startdatetime = startdatetime;
	    }
	    
	    public LocalDateTime getenddatetime() {
	        return this.enddatetime;
	    }
	    
	    public void  setenddatatime(LocalDateTime enddatetime) {
	         this.enddatetime = enddatetime;
	    }


	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Integer getCategoryId() {
		return this.categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
}