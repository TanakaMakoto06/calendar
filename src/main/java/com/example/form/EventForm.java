package com.example.form;


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
}