$(document).ready(function () {
  new CMain({
    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS 
    bet_time: 10000, //WAITING TIME FOR PLAYER BETTING
    show_credits: false, //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
  });
  resize();
});
