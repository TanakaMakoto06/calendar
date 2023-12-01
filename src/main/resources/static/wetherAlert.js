// OpenWeatherMapのAPIキー
const apiKey = '0ba98d8fb694bf4346615212f28699d1';

// 予定の情報を取得（仮の予定データを使用）
const userEvents = [
    {
        date: '2023-12-01', // 仮の日付（yyyy-mm-dd）
        title: '外出予定1'
    },
    {
        date: '2023-12-05', // 仮の日付（yyyy-mm-dd）
        title: '外出予定2'
    }
];

// 天気情報を取得する関数
function getWeatherInfo(date) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            checkWeatherForNotification(date, data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// 天気情報をチェックして通知を送信する関数
function checkWeatherForNotification(date, weatherData) {
    const targetDate = new Date(date);
    const today = new Date();

    // 当日の天気情報を取得
    const weatherForecastForToday = weatherData.list.find(item => {
        return new Date(item.dt * 1000).toDateString() === today.toDateString();
    });

    // 当日の天気が雨かどうかを確認
    if (weatherForecastForToday && weatherForecastForToday.weather && weatherForecastForToday.weather[0].main.toLowerCase() === 'rain') {
        // 予定の前日を計算（ここでは1日前）
        const oneDayBeforeEvent = new Date(targetDate);
        oneDayBeforeEvent.setDate(targetDate.getDate() - 1);

        // アラート通知を表示
        alert(`天気が雨であることを確認し、${oneDayBeforeEvent.toDateString()}の外出の前日にアラート通知を表示します。`);
    }
}

// 予定ごとに天気情報を取得し、通知をチェック
userEvents.forEach(event => {
    getWeatherInfo(event.date);
});
