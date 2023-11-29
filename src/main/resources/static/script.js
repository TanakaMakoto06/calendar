
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
document.getElementById('currentMonth').textContent = new Date().toLocaleString('ja-JP', { month: 'long' });

// イベント情報のサンプルデータ
let events = [];

// サーバーから最新のイベントリストを取得してevents配列を更新する関数
function updateEvents() {
	// サーバーにGETリクエストを送信
	return fetch(`/calendar/eventsForDay?year=${currentDate.getFullYear()}&month=${currentDate.getMonth() + 1}&day=${currentDate.getDate()}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			// データの確認
			console.log(data);
			// レスポンスが配列であることを確認
			if (Array.isArray(data)) {
				// events配列を更新
				events = data.map(event => ({
					...event,
					date: new Date(event.startevent)  // starteventフィールドをDateオブジェクトに変換
				}));
			} else {
				console.error('Error: data is not an array');
			}
			// events配列の確認
			console.log(events);  // この行を追加
		})
		.catch(error => console.error('Error:', error));
}

function fetchWeather(lat, lon) {
    const apiKey = '0ba98d8fb694bf4346615212f28699d1';
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
        });
}

// 緯度と経度(東京の天気)
const lat = '35.6895';
const lon = '139.6917';

// APIリクエストを送信
fetchWeather(lat, lon)
    .then(data => {
        // レスポンスを処理し、カレンダーを生成
        generateCalendar(currentDate, data);
    });

function addCellClickEventListeners() {
	// カレンダーの各セルにクリックイベントリスナーを追加
	document.querySelectorAll('#calendar td').forEach(function(cell) {
		cell.addEventListener('click', function() {
			// セルがクリックされたときに日表示カレンダーに遷移
			// クリックされたセルの日付を取得
			const day = cell.querySelector('span').textContent;
			// 年と月も取得
			const year = currentDate.getFullYear();
			const month = currentDate.getMonth() + 1; // JavaScriptの月は0から始まるため、1を足す
			// 日付をクエリパラメータとして追加
			window.location.href = '/todayEvent?year=' + year + '&month=' + month + '&day=' + day;
		});
	});
}

// カレンダーを生成する関数
function generateCalendar(date, data) {
	// 現在の年と月を更新
	document.getElementById('currentYear').textContent = date.getFullYear();
	document.getElementById('currentMonth').textContent = date.toLocaleString('ja-JP', { month: 'long' });



	// カレンダーのHTML構造を生成
	let calendarHtml = '<table><thead><tr>';
	for (let i = 0; i < 7; i++) {
		calendarHtml += `<th>${['日', '月', '火', '水', '木', '金', '土'][i]}</th>`;
	}
	calendarHtml += '</tr></thead><tbody>';


	// 月の日数を取得
	const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

	// 前月の日数を取得 
	const daysInLastMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

	// 月の最初の日の曜日を取得
	const firstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

	// 各日付をカレンダーに挿入
	for (let i = 1; i <= daysInMonth; i++) {
		// その日の曜日を取得
		const dayOfWeek = new Date(date.getFullYear(), date.getMonth(), i).getDay();


		// その日の天気情報を取得
		let weatherIcon = '';
		if (data && data.list && data.list[i] && data.list[i].weather && data.list[i].weather[0]) {
			weatherIcon = data.list[i].weather[0].icon;
		} else {
			weatherIcon = ''; // デフォルトのアイコンを設定します。
		}

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
			// イベントデータの確認
			console.log(event);  // この行を追加
			// 日付の一致確認
			console.log(event.date.getFullYear(), event.date.getMonth(), event.date.getDate(), i);  // この行を追加
			if (event.date.getFullYear() === date.getFullYear() &&
				event.date.getMonth() === date.getMonth() &&
				event.date.getDate() === i) {
				// イベントタイトルを取得
				eventTitle = event.title;
			}
		});

		// 日付と天気アイコンを表示するセルを生成し、土曜日や日曜日の場合は 'weekend' クラスを追加
		calendarHtml += `<td class="${dayOfWeek === 0 || dayOfWeek === 6 ? 'weekend' : ''}${new Date().getDate() ===
			i && new Date().getMonth() === date.getMonth() && new Date().getFullYear() === date.getFullYear() ? ' today' : ''}">
<<<<<<< HEAD
<span>${i}</span><div class="weather-icon"><img src="http://openweathermap.org/img/w/${weatherIcon}.png"></div>${eventTitle ? `<div class="event" onclick="goToEventDetailPage('${eventTitle}')">${eventTitle}</div>`
				: ''}</td>`;



=======
<span>${i}</span><div class="weather-icon"><img src="http://openweathermap.org/img/w/${weatherIcon}.png"></div>${eventTitle ? `<div class="event" onclick="goToEventDetailPage(event, '${eventTitle}')">${eventTitle}</div>`
				: ''}</td>`; // 修正：イベントタイトルをセルに追加
>>>>>>> development

		// 土曜日または月の最後の日の場合、行を終了
		if (dayOfWeek === 6 || i === daysInMonth) {
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

	// カレンダーの各セルに非同期処理を追加
	document.querySelectorAll('#calendar td').forEach(function(cell) {
		// セルの日付を取得
		const day = cell.querySelector('span').textContent;
		// 年と月も取得
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth() + 1; // JavaScriptの月は0から始まるため、1を足す

		// サーバーからイベントデータを非同期に取得
		fetch(`/calendarApp/${year}/${month}/${day}`)
			.then(response => {
				// レスポンスが正常でない場合はエラーをスロー
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				// イベントデータを元にセルを更新
				if (Array.isArray(data)) {
					data.forEach(event => {
						cell.insertAdjacentHTML('beforeend', `<div>${event.title}</div>`);
					});
				} else {
					console.error('Error: data is not an array');
				}
			})
			.catch(error => console.error('Error:', error));
	});

	// カレンダーのHTML構造を完了させる
	calendarHtml += '</tbody></table>';
	calendarEl.innerHTML = calendarHtml;

	// カレンダーの各セルにクリックイベントリスナーを追加
	addCellClickEventListeners();

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
	//	app.post('/calendar/toroku', function(req, res) {
	//		// 新規イベントのデータを取得
	//		var newEvent = req.body.eventForm;
	//
	//		// 新規イベントのデータをevents配列に追加
	//		events.push(newEvent);
	//
	//		// レスポンスを送信
	//		res.send('Event added successfully');
	//	});
	currentDate.setMonth(currentDate.getMonth() - 1);
	fetchWeather(lat, lon).then(data => {
		generateCalendar(currentDate, data);
	});
});


// 次月ボタンのクリックイベント
nextMonthBtn.addEventListener('click', () => {
	currentDate.setMonth(currentDate.getMonth() + 1);
	fetchWeather(lat, lon).then(data => {
		generateCalendar(currentDate, data);
	});
});

// 検索ボタンのクリックイベント
<<<<<<< HEAD
searchBtn.addEventListener('click', () => {
	const searchText = searchBar.value;
	searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
	const filteredEvents = events.filter(event => event.title.includes(searchText));
	// そして、結果を何らかの方法で表示する
	displayEvents(filteredEvents);
=======
// 検索ボタンのクリックイベントをハンドルする
searchBtn.addEventListener('click', function() {
	// 検索バーの値を取得
	const name = searchBar.value;

	// /searchエンドポイントにリクエストを送る
	fetch('/calendar/searchEvent?name=' + name)
		.then(response => response.json())
		.then(events => {
			console.log(events);  // ここで検索結果をコンソールに出力

			// ポップアップを作成
			const popup = document.createElement('div');
			popup.id = 'popup';

			// ×ボタンを作成
			const closeBtn = document.createElement('button');
			closeBtn.id = 'closeBtn';
			closeBtn.textContent = '×';
			popup.appendChild(closeBtn);

			// ×ボタンのクリックイベントリスナーを追加
			closeBtn.addEventListener('click', function() {
				// ポップアップを非表示にする
				popup.style.display = 'none';
			});

			// 各イベントのタイトルと詳細ページへのリンクを追加
			events.forEach(event => {
				const link = document.createElement('a');
				link.href = '/calendar/eventsyousai' + event.id;  // イベントの詳細ページへのリンク
				link.textContent = event.name;  // イベントのタイトル
				popup.appendChild(link);

				// 詳細ページへのリンクを作成
				const detailLink = document.createElement('a');
				detailLink.href = '/calendar/eventsyousai' + event.id;  // イベントの詳細ページへのリンク
				detailLink.textContent = '詳細ページへ';  // リンクのテキスト
				popup.appendChild(detailLink);
			});
			console.log(popup);  // ここでポップアップをコンソールに出力

			// ポップアップを表示
			document.body.appendChild(popup);
		})
		.catch(error => {
			console.error('Error:', error);
		});
>>>>>>> development
});


// 日表示カレンダーのイベントデータを取得
fetch(`/calendar/eventsForDay?year=${currentDate.getFullYear()}&month=${currentDate.getMonth() + 1}&day=${currentDate.getDate()}`)
	.then(response => response.json())
	.then(data => {
		// ここでカレンダーを更新します
		data.forEach(event => {
			// イベントの日付を取得
			const eventDate = new Date(event.date);
			// カレンダーの対応するセルを取得
			const dayCell = calendarEl.querySelector(`td span:contains(${eventDate.getDate()})`).parentElement;
			// セルにイベントタイトルを追加
			dayCell.innerHTML += `<div class="event" onclick="goToEventDetailPage(event, '${event.title}')">${event.title}</div>`;
		});
	})
	.catch(error => console.error('Error:', error));

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
	window.location.href = "loginForm";
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
	fetchWeather(lat, lon).then(data => {
		generateCalendar(currentDate, data);
	});
});

// 月のセレクトボックスの変更イベント
monthSelect.addEventListener('change', () => {
	currentDate.setMonth(monthSelect.value - 1);
	fetchWeather(lat, lon).then(data => {
		generateCalendar(currentDate, data);
	});
});

// 初期表示のカレンダー生成
updateEvents().then(() => {
	generateCalendar(currentDate);
});
