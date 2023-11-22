package com.example.entity;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
    
    private LocalDateTime deletedAt;
    @Temporal(TemporalType.DATE)
    private Date date;

    
    private int userId;
   
    


    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public Category getCategory() {
		 return category;
	 }
	 public void setCategory(Category category) {
		 this.category = category;
	 }
	 
	 public LocalDateTime getDeletedAt() {
		 return deletedAt;
	 }
	 public void setDeletedAt(LocalDateTime deletedAt) {
		 this.deletedAt = deletedAt;
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

    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
