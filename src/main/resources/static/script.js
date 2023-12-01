
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
		})
		.catch(error => console.error('Error:', error));
}


// カレンダーの更新
updateEvents().then(() => {
	generateCalendar(currentDate);
}).catch(error => console.error('Error:', error));

// 緯度と経度(東京の天気)
const lat = '35.6895';
const lon = '139.6917';

function fetchWeather(lat, lon) {
	const apiKey = '0ba98d8fb694bf4346615212f28699d1';
	const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			console.log(data);  // APIからのレスポンスをコンソールに出力
			return data;
		})
		.catch(error => {
			console.error('Error:', error);
		});
}

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
		// その日のイベントを取得
		let dailyEvents = events.filter(event =>
			event.date.getFullYear() === date.getFullYear() &&
			event.date.getMonth() === date.getMonth() &&
			event.date.getDate() === i
		);

		// 日付と天気アイコンを表示するセルを生成し、土曜日や日曜日の場合は 'weekend' クラスを追加
		calendarHtml += `<td class="${dayOfWeek === 0 || dayOfWeek === 6 ? 'weekend' : ''}${new Date().getDate() ===
			i && new Date().getMonth() === date.getMonth() && new Date().getFullYear() === date.getFullYear() ? ' today' : ''}">
<span>${i}</span><div class="weather-icon"><img src="http://openweathermap.org/img/w/${weatherIcon}.png"></div>`;

		// その日の各イベントのタイトルをセルに追加
		dailyEvents.forEach(event => {
			calendarHtml += `<div class="event" onclick="goToEventDetailPage(event, '${event.id}')">${event.name}</div>`;
		});

		calendarHtml += `</td>`; // 修正：イベントタイトルをセルに追加



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
	document.querySelectorAll('#calendar td').forEach(async function(cell) {
		// セルの日付を取得
		const day = cell.querySelector('span').textContent;
		// 年と月も取得
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth() + 1; // JavaScriptの月は0から始まるため、1を足す

		try {
			// サーバーからイベントデータを非同期に取得
			const response = await fetch(`/calendarApp/${year}/${month}/${day}`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();

			// イベントデータを元にセルを更新
			if (Array.isArray(data)) {
				data.forEach(event => {
					cell.insertAdjacentHTML('beforeend', `<div>${event.name}</div>`);
				});
			} else {
				console.error('Error: data is not an array');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	});
	// 石川さん編集
	document.querySelectorAll('#calendar td').forEach(async function(cell) {
		const day = cell.querySelector('span').textContent;
		const tmp = new Date(currentDate.getFullYear, currentDate.getMonth, day, 0, 0, 0, 0);
		let otherEvents = events.filter(event =>
			event.date.getFullYear() === tmp.getFullYear() &&
			event.date.getMonth() === tmp.getMonth() &&
			event.date.getDate() === i
		);
		otherEvents.forEach(o_event => {
			calendarHtml += `<div class="event" onclick="goToEventDetailPage(event, '${o_event.id}')">${o_event.name}</div>`;
		});

		calendarHtml += `</td>`; // 修正：イベントタイトルをセルに追加
	});


	// カレンダーのHTML構造を完了させる
	calendarHtml += '</tbody></table>';
	calendarEl.innerHTML = calendarHtml;

	// カレンダーの各セルにクリックイベントリスナーを追加
	addCellClickEventListeners();
}

// 前月ボタンのクリックイベント
prevMonthBtn.addEventListener('click', () => {
	currentDate.setMonth(currentDate.getMonth() - 1);
	fetchWeather(lat, lon).then(data => {
		generateCalendar(currentDate, data);
	});
});

// とりあえずここまで確認

// 次月ボタンのクリックイベント
nextMonthBtn.addEventListener('click', () => {
	currentDate.setMonth(currentDate.getMonth() + 1);
	fetchWeather(lat, lon).then(data => {
		generateCalendar(currentDate, data);
	});
});

// 検索ボタンのクリックイベント
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
});

// 新規イベント登録の実行
function toroku(eventForm) {
	fetch('/calendar/toroku', {
		method: 'POST',
		body: JSON.stringify(eventForm),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.text();
		})
		.then(message => {
			console.log(message);  // レスポンスメッセージをコンソールに出力

			// イベントが追加された後にカレンダーを更新
			return updateEvents();
		})
		.then(() => {
			return fetchWeather(lat, lon);
		})
		.then(data => {
			// カレンダーを生成
			generateCalendar(currentDate, data);

			// 修正：新しいイベントを自動的に表示
			events.forEach(event => {
				const dayCell = calendarEl.querySelector(`td:nth-child(${event.date.getDate() + 1})`);
				if (dayCell) {
					dayCell.innerHTML += `<div>${event.name}</div>`;
				}
			});
		})
		.catch(error => console.error('Error:', error));
}


// 日表示カレンダーのイベントデータを取得
fetch(`/calendar/eventsForDay?year=${currentDate.getFullYear()}&month=${currentDate.getMonth() + 1}&day=${currentDate.getDate()}`)
	.then(response => response.json())
	.then(data => {
		// ここでカレンダーを更新します
		data.forEach(event => {
			// イベントの日付を取得
			const eventDate = new Date(event.date);
			// 日付が有効であることを確認
			if (!isNaN(eventDate.getDate())) {
				// カレンダーの対応するセルを取得
				const dayCell = calendarEl.querySelector(`td span:contains(${eventDate.getDate()})`).parentElement;
				// セルにイベントタイトルを追加
				dayCell.innerHTML += `<div class="event" onclick="goToEventDetailPage(event, '${event.name}')">${event.name}</div>`;
			}
		});
	})
	.catch(error => console.error('Error:', error));

// イベント詳細ページへの遷移
function goToEventDetailPage(event, id) {
	// イベントのIDをURLに追加
	window.location.href = '/calendar/syousaiPage/' + id;
	event.stopPropagation();
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
fetchWeather(lat, lon).then(data => {
	updateEvents().then(() => {
		generateCalendar(currentDate, data);
	});
});
