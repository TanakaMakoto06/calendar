package com.example.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.entity.User;
import com.example.service.UserService;

// RegistrationController.java
@Controller
public class RegistrationController {

	private final UserService userService;

	@Autowired
	public RegistrationController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/register")
	public String showRegistrationForm(Model model) {
		model.addAttribute("user", new User());

		// 都道府県リストをモデルに追加
		List<String> prefectures = Arrays.asList(
				"北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島",
				"茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川",
				"新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜",
				"静岡", "愛知", "三重", "滋賀", "京都", "大阪", "兵庫",
				"奈良", "和歌山", "鳥取", "島根", "岡山", "広島", "山口",
				"徳島", "香川", "愛媛", "高知", "福岡", "佐賀", "長崎",
				"熊本", "大分", "宮崎", "鹿児島", "沖縄"); // すべての都道府県をリストアップ
		model.addAttribute("prefectures", prefectures);

		return "register";
	}

	@PostMapping("/register")
	public String registerUser(@ModelAttribute("user") User user, Model model) {
		// パスワードと再パスワードが一致するか確認
		if (!user.getPassword().equals(user.getConfirmPassword())) {
			model.addAttribute("error", "パスワードと再パスワードが一致しません");
			return "redirect:/register"; // ログイン画面にリダイレクトする例

		}

		// ユーザーの新規登録ロジックをServiceクラスを介して実行
		userService.registerNewUser(user.getName(), user.getEmail(), user.getPassword(), user.getPrefecture());

		return "redirect:/calendar";
	}
}
