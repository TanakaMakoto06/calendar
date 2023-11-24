
//	 カレンダー要素や各種ボタン、セレクトボックスなどの取得
		const calendarEl = document.getElementById('calendar');
		const prevMonthBtn = document.getElementById('prevMonth');
		const nextMonthBtn = document.getElementById('nextMonth');
		const yearSelect = document.getElementById('yearSelect');
		const monthSelect = document.getElementById('monthSelect');
		const searchBtn = document.getElementById('searchBtn');
		const searchBar = document.getElementById('searchBar');
		const addEventBtn = document.getElementById('addEventBtn');
		const logoutBtn = document.getElementById('logoutBtn');

		// 現在の日付を取得し、初期表示の月を設定
		let currentDate = new Date();
		document.getElementById('currentMonth').textContent = new Date().toLocaleString('ja-JP', {month: 'long'});

		// イベント情報のサンプルデータ
		const events = [
			{
				date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
				title: 'イベント1',
			},
			{
				date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
				title: 'イベント2',
			},
		];


		// カレンダーを生成する関数
		function generateCalendar(date) {
			// 現在の月を更新
			document.getElementById('currentMonth').textContent = date.toLocaleString('ja-JP', {month: 'long'});

			// カレンダーのHTML構造を生成
			let calendarHtml = '<table><thead><tr>';
			for (let i = 0; i < 7; i++) {
				calendarHtml += `<th>${['日', '月', '火', '水', '木', '金', '土'][i]}</th>`;
			}
			calendarHtml += '</tr></thead><tbody><tr>';


			// 月の日数を取得
			const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

			// 前月の日数を取得 
			const daysInLastMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

			// 各日付をカレンダーに挿入
			for (let i = 1; i <= daysInMonth; i++) {
				// その日の曜日を取得
				const dayOfWeek = new Date(date.getFullYear(), date.getMonth(), i).getDay();

				// 月の最初の日の場合、新しい行を開始
				if (i === 1) {
					calendarHtml += '<tr>';
					// 前月の余白部分を空セルで埋める
					for (let j = 0; j < dayOfWeek; j++) {
						calendarHtml += `<td><span class="faint">${daysInLastMonth - dayOfWeek + j + 1}</span></td>`;
					}
				}

				// イベントデータをチェック
				let eventTitle = '';
				events.forEach(event => {
					if (event.date.getFullYear() === date.getFullYear() &&
						event.date.getMonth() === date.getMonth() &&
						event.date.getDate() === i) {
						// イベントタイトルを取得
						eventTitle = event.title;
					}
				});

				// 日付を表示するセルを生成し、土曜日や日曜日の場合は 'weekend' クラスを追加
				calendarHtml += `<td class="${dayOfWeek === 0 || dayOfWeek === 6 ? 'weekend' : ''}${new Date().getDate() ===
					i && new Date().getMonth() === date.getMonth() && new Date().getFullYear() === date.getFullYear() ? ' today' : ''}"
    onclick="goToDateCalendar(${date.getFullYear()}, ${date.getMonth()}, ${i})">
    <span>${i}</span>${eventTitle ? `<div class="event" onclick="goToEventDetailPage('${eventTitle}')">${eventTitle}</div>`
						: ''}</td>`;



				// 土曜日の場合、行を終了して新しい行を開始
				if (dayOfWeek === 6) {
					calendarHtml += '</tr>';
					// 月末でない場合、新しい行を追加
					if (i < daysInMonth) {
						calendarHtml += '<tr>';
					}
					// 月末の場合、最後の週の余白を空セルで埋める
				} else if (i === daysInMonth) {
					let nextMonthDay = 1; //  翌月の日付カウンターを追加
					for (let j = dayOfWeek + 1; j <= 6; j++) {
						// 翌月の日付を追加 
						calendarHtml += `<td class="next-month"><span>${nextMonthDay++}</span></td>`;
					}
					calendarHtml += '</tr>';
				}
			}
			// カレンダーのHTML構造を完了させる
			calendarHtml += '</tbody></table>';
			calendarEl.innerHTML = calendarHtml;

			// イベント情報をカレンダーに追加
			events.forEach(event => {
				if (event.date.getFullYear() === date.getFullYear() && event.date.getMonth() === date.getMonth() && event.date.getDate() === date.getDate()) {
					const dayCell = calendarEl.querySelector(`td`);
					dayCell.innerHTML += `<div>${event.title}</div>`;
				}
			});
		}

		// 前月ボタンのクリックイベント
		prevMonthBtn.addEventListener('click', () => {
			currentDate.setMonth(currentDate.getMonth() - 1);
			generateCalendar(currentDate);
		});


		// 次月ボタンのクリックイベント
		nextMonthBtn.addEventListener('click', () => {
			currentDate.setMonth(currentDate.getMonth() + 1);
			generateCalendar(currentDate);
		});

		// 検索ボタンのクリックイベント
		searchBtn.addEventListener('click', () => {
			const searchText = searchBar.value;
			searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
			const filteredEvents = events.filter(event => event.title.includes(searchText));
			// そして、結果を何らかの方法で表示する
			displayEvents(filteredEvents);
		});


		// イベント詳細ページへの遷移
		function goToEventDetailPage(title) {
			// ここにイベント詳細ページへの遷移処理を記述
		}



		// ログアウトボタンのクリックイベント
		logoutBtn.addEventListener('click', () => {
			// ログアウト処理をここに記述
			// ここでログアウト処理を行う
			// 例えば、セッションストレージをクリアしてログインページにリダイレクトする
			sessionStorage.clear();
			window.location.href = "login.html";
		});

		// 年のセレクトボックスのオプションを生成
		for (let i = currentDate.getFullYear() - 50; i <= currentDate.getFullYear() + 50; i++) {
			const option = document.createElement('option');
			option.value = i;
			option.text = i;
			yearSelect.appendChild(option);
		}

		// 月のセレクトボックスのオプションを生成
		for (let i = 1; i <= 12; i++) {
			const option = document.createElement('option');
			option.value = i;
			option.text = i;
			monthSelect.appendChild(option);
		}

		// 初期表示時の年月をセット
		yearSelect.value = currentDate.getFullYear();
		monthSelect.value = currentDate.getMonth() + 1;

		// 年のセレクトボックスの変更イベント
		yearSelect.addEventListener('change', () => {
			currentDate.setFullYear(yearSelect.value);
			generateCalendar(currentDate);
		});

		// 月のセレクトボックスの変更イベント
		monthSelect.addEventListener('change', () => {
			currentDate.setMonth(monthSelect.value - 1);
			generateCalendar(currentDate);
		});

		// 初期表示のカレンダー生成
		generateCalendar(currentDate);

