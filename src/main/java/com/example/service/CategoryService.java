package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.entity.Category;

@Service
public class CategoryService {
	
	 private Object categoryRepository;

	public List<Category> findAll() {
	        return ( (CategoryService) this.categoryRepository).findAll();
	        
	    }
}
