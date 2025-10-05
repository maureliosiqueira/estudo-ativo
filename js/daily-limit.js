let dailyCount = 0;
const DAILY_LIMIT_FREE = 10;

function updateDailyStatus() {
  const today = new Date().toDateString();
  const storedDate = localStorage.getItem('estudoAtivo.lastDate');
  const storedCount = parseInt(localStorage.getItem('estudoAtivo.dailyCount') || '0');

  if (storedDate !== today) {
    dailyCount = 0;
    localStorage.setItem('estudoAtivo.lastDate', today);
    localStorage.setItem('estudoAtivo.dailyCount', '0');
  } else {
    dailyCount = storedCount;
  }

  document.getElementById('daily-status').textContent = 
    `${dailyCount}/${DAILY_LIMIT_FREE} (gratuito)`;
}

function incrementDailyCount() {
  dailyCount++;
  localStorage.setItem('estudoAtivo.dailyCount', dailyCount.toString());
  updateDailyStatus();
}

function canAnswerMore() {
  const isPremium = document.getElementById('userPlan')?.textContent === 'Premium';
  return isPremium || dailyCount < DAILY_LIMIT_FREE;
}
