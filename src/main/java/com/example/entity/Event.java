package com.example.entity;


import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table(name = "EVENTS")
public class Event {

    @Id
    @SequenceGenerator(name = "EVENT_ID_GENERATOR", sequenceName = "EVENT_ID_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "EVENT_ID_GENERATOR")
    @Column(name = "ID")
    private Integer id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "START_EVENT")
    private LocalDateTime startevent;

    @Column(name = "END_EVENT")
    private LocalDateTime endevent;

    @Column(name = "USER_ID")
    private Integer userId;

    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID")
    @JsonBackReference  // 追加
    private Category category;


    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    

    public Integer getUserId() {
        return this.userId;
    }

    public void setUserId(Integer userId) {
         this.userId = userId;
    }

    public String getName() {
        return this.name;
    }

    public  void setName(String name) {
        this.name = name;
    }
    
    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
	 
	 
	 public LocalDateTime getStartevent() {
		 return startevent;
	 }
	 public void setStartevent(LocalDateTime startevent) {
		 this.startevent = startevent;
	 }
	 
	 public LocalDateTime getEndevent() {
		 return endevent;
	 }
	 public void setEndevent(LocalDateTime endevent) {
		 this.endevent = endevent;
	 }
	 
	 
	 	
	 
//	 下記のコメントアウトについては44,72,76行目の定義内容と被っているためエラーが発生したためコメントアウトしました。
//	 44行目：category
//	 72行目：getCategory
//	 76行目：setCategory(Category category)
	 
//	    @ManyToOne
//	    @JoinColumn(name = "CATEGORY_ID", insertable = false, updatable = false)
//	    private Category category;
//	    
//	    public Category getCategory() {
//	        return this.category;
//	    }
//	    public void setCategory(Category category) {
//	        this.category = category;
//	    }
	    
	    @ManyToOne
	    @JoinColumn(name = "USER_ID", insertable = false, updatable = false)
	    private User user;

	    public User getUser() {
	        return this.user;
	    }
	    public void setUser(User user) {
	        this.user = user;
	    }
	    
	}