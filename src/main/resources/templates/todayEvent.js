document.addEventListener('DOMContentLoaded', function () {
    const scheduleContainer = document.getElementById('schedule');
    const currentDateElement = document.getElementById('currentDate');
    
     // 戻るボタンのクリックイベントを追加
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
      // ここにカレンダー一覧画面への遷移処理を記述
      // 遷移先のURLを設定し、window.location.href を使用して遷移させる
      // 例: window.location.href = 'カレンダー一覧画面のURL';
    });

    // サンプルのイベントデータ（仮定）
    const eventData = [
      { start: '2023-11-21T09:00:00', end: '2023-11-21T10:30:00', title: '会議' },
      { start: '2023-11-21T12:00:00', end: '2023-11-21T13:00:00', title: '昼食' },
      // 他のイベントを追加
    ];

    // 一日の予定を表示する関数
    function displaySchedule(date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const scheduleItems = eventData.filter(event => {
        const eventTime = new Date(event.start);
        return eventTime >= startOfDay && eventTime <= endOfDay;
      });

      for (let hour = 0; hour < 24; hour++) {
        const hourBlock = document.createElement('div');
        hourBlock.classList.add('hour-block');

        const timeDisplay = document.createElement('div');
        timeDisplay.classList.add('time-display');
        timeDisplay.textContent = `${hour.toString().padStart(2, '0')}:00`; // 時刻表示

        const eventContainer = document.createElement('div');
        eventContainer.classList.add('event-container');

        const eventsInHour = scheduleItems.filter(event => {
          const eventStartTime = new Date(event.start);
          const eventEndTime = new Date(event.end);
          const eventStartHour = eventStartTime.getHours();
          const eventEndHour = eventEndTime.getHours();
          return hour >= eventStartHour && hour < eventEndHour;
        });

        if (eventsInHour.length > 0) {
          eventsInHour.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            const eventStartTime = new Date(event.start);
            const eventEndTime = new Date(event.end);
            const eventStartHour = eventStartTime.getHours();
            const eventStartMinutes = eventStartTime.getMinutes();
            const eventEndHour = eventEndTime.getHours();
            const eventEndMinutes = eventEndTime.getMinutes();
            const eventHeight = ((eventEndHour - eventStartHour) * 60 + (eventEndMinutes - eventStartMinutes)) * 2;
            const eventTop = eventStartMinutes * 2;
            eventDiv.style.height = `${eventHeight}px`;
            eventDiv.style.top = `${eventTop}px`;
            eventDiv.textContent = event.title;
            eventContainer.appendChild(eventDiv);
          });
        }

        hourBlock.appendChild(timeDisplay);
        hourBlock.appendChild(eventContainer);

        scheduleContainer.appendChild(hourBlock);
      }
    }

    // タイトルと日付を表示する関数
    function displayTitleAndDate() {
      const currentDate = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
      const formattedDate = currentDate.toLocaleDateString('ja-JP', options);
      currentDateElement.textContent = formattedDate;
    }

    // 今回はクリックで日付を指定することとして、クリックしたらその日のスケジュールを表示
    const targetDate = '2023-11-22'; // 仮の日付（実際にはクリックイベントなどで取得）

    displayTitleAndDate();
    displaySchedule(targetDate);
  });