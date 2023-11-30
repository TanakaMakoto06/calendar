package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/css/**", "/js/**");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// 認可の設定
		http.authorizeRequests()
		.antMatchers("/loginForm", "/register").permitAll()
		.anyRequest().authenticated();
		
		// 認証に関する設定
		http.formLogin()
		.loginProcessingUrl("/login")
		.loginPage("/loginForm")
		.usernameParameter("email")
		.passwordParameter("password")
		.defaultSuccessUrl("/calendar", true)
		.failureUrl("/loginForm?error");
		
		// ログアウトに関する設定
		http.logout()
		.logoutUrl("/logout")
		.logoutSuccessUrl("/loginForm");
		
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
