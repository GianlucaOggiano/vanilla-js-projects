const finalDate = 'March 23, 2021 09:59:00';
const container = document.querySelector('.container');
const eventDateElement = document.getElementById('eventdate');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

eventDateElement.innerHTML = finalDate;

const countDown = () => {
  const eventDate = new Date(finalDate).getTime();
  const now = new Date().getTime();
  const diff = eventDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24)).toLocaleString(
    'en-US',
    { minimumIntegerDigits: 2 },
  );

  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  ).toLocaleString('en-US', { minimumIntegerDigits: 2 });

  const minutes = Math.floor(
    (diff % (1000 * 60 * 60)) / (1000 * 60),
  ).toLocaleString('en-US', { minimumIntegerDigits: 2 });

  const seconds = Math.floor(
    (diff % (1000 * 60)) / 1000,
  ).toLocaleString('en-US', { minimumIntegerDigits: 2 });

  daysElement.innerText = days;
  hoursElement.innerText = hours;
  minutesElement.innerText = minutes;
  secondsElement.innerText = seconds;

  if (diff <= 0) {
    clearInterval(interval);
    container.innerHTML = `
      <div class='is-expired'>
        <h1 class='open'>We are <span>open</span></h1>
        <p>Visit now our store!</p>
      </div>
      <div class="social-icons">
      <img src="./img/icon-facebook.svg" alt="facebook">
      <img src="./img/icon-instagram.svg" alt="instagram">
      <img src="./img/icon-pinterest.svg" alt="pinterest">
    </div>
    `;
  }
};

const interval = setInterval(countDown, 1000);
countDown();
