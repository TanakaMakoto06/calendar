// イベント編集画面に遷移する関数
function redirectToEventEdit() {
  // イベント編集画面への遷移処理を記述
  // 仮のURLとして、イベント編集ページに遷移するコードを記述します。
  alert('イベント編集画面に遷移します'); // 仮のアラート表示（実際にはページ遷移処理に置き換える）
}

// 天気が悪いかどうかを判断し、アラートを表示する関数
function showWeatherAlert() {
  const isBadWeather = true; // 仮の悪天候フラグ（実際には天気情報を取得する必要があります）

  if (isBadWeather) {
    const alertDiv = document.getElementById('alertMessage');
    const weatherMessage = document.getElementById('weatherMessage');

    weatherMessage.innerText = '〇月〇日は悪天候が予想されています。';
    alertDiv.style.display = 'block'; // アラートを表示
  }
}

// ページが読み込まれた時にアラートを表示する処理
window.onload = function () {
  showWeatherAlert();
};

// イベント編集ボタンにクリックイベントを追加
document.getElementById('eventEditButton').addEventListener('click', redirectToEventEdit);
