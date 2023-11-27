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

// ユーザーが新規登録時に選択した都道府県情報を取得
// この部分は実際のアプリケーションの実装によります
//const userCity = getUserCity();

// OpenWeatherMapのAPIキー
const apiKey = '0ba98d8fb694bf4346615212f28699d1';

// 緯度と経度(東京の天気)
const lat = '35.6895';
const lon = '139.6917';

// APIリクエストのURL
const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

// APIリクエストを送信
fetch(url)
	.then(response => response.json())
	.then(data => {
		// レスポンスを処理し、カレンダーを生成
		generateCalendar(currentDate, data);
	})
	.catch(error => {
		console.error('Error:', error);
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

	// 月の最初の日が日曜日でない場合、新しい行を開始し、前月の余白部分を空セルで埋める
	//	if (firstDayOfWeek !== 0) {
	//		calendarHtml += '<tr>';
	//		for (let i = 0; i < firstDayOfWeek; i++) {
	//			calendarHtml += `<td class="prev-month"><span>${daysInLastMonth - firstDayOfWeek + i + 1}</span></td>`;
	//		}
	//	}

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

		// 日付と天気アイコンを表示するセルを生成
		//		calendarHtml += `<td><span>${i}</span><div class="weather-icon"><img src="http://openweathermap.org/img/w/${weatherIcon}.png"></div></td>`;

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

		// 日付と天気アイコンを表示するセルを生成し、土曜日や日曜日の場合は 'weekend' クラスを追加
		calendarHtml += `<td class="${dayOfWeek === 0 || dayOfWeek === 6 ? 'weekend' : ''}${new Date().getDate() ===
			i && new Date().getMonth() === date.getMonth() && new Date().getFullYear() === date.getFullYear() ? ' today' : ''}">
<span>${i}</span><div class="weather-icon"><img src="http://openweathermap.org/img/w/${weatherIcon}.png"></div>${eventTitle ? `<div class="event" onclick="goToEventDetailPage(event, '${eventTitle}')">${eventTitle}</div>`
				: ''}</td>`;




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
	currentDate.setMonth(currentDate.getMonth() - 1);
	generateCalendar(currentDate);
});


// 次月ボタンのクリックイベント
nextMonthBtn.addEventListener('click', () => {
	currentDate.setMonth(currentDate.getMonth() + 1);
	generateCalendar(currentDate);
});

// 検索ボタンのクリックイベント
// 検索ボタンのクリックイベントをハンドルする
searchBtn.addEventListener('click', function() {
	// 検索バーの値を取得
	const name = searchBar.value;
	// 検索バーの表示状態を切り替える
//	searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';

	// /searchエンドポイントにリクエストを送る
	fetch('/calendar/searchEvent?name=' + name)
		.then(response => response.json())
		.then(events => {
			console.log(events);  // ここで検索結果をコンソールに出力
			// ポップアップを作成
			const popup = document.createElement('div');
			popup.id = 'popup';

			// 各イベントのタイトルと詳細ページへのリンクを追加
			events.forEach(event => {
				const link = document.createElement('a');
				link.href = '/calendar/eventsyousai' + event.id;  // イベントの詳細ページへのリンク
				link.textContent = event.name;  // イベントのタイトル
				popup.appendChild(link);
			});
			console.log(popup);  // ここでポップアップをコンソールに出力

			// ポップアップを表示
			document.body.appendChild(popup);
		})
		.catch(error => {
			console.error('Error:', error);
		});
});

// イベント詳細ページへの遷移
function goToEventDetailPage(event, title) {
	// ブラウザのデフォルトのクリックイベントの動作をキャンセル
	event.preventDefault();
	// イベントの伝播を停止
	event.stopPropagation();
	// ここにイベント詳細ページへの遷移処理を記述
	// イベントタイトルをクエリパラメータとして追加
	window.location.href = 'eventsyousai?title=' + title;
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
	generateCalendar(currentDate);
});

// 月のセレクトボックスの変更イベント
monthSelect.addEventListener('change', () => {
	currentDate.setMonth(monthSelect.value - 1);
	generateCalendar(currentDate);
});

// 初期表示のカレンダー生成
generateCalendar(currentDate);

