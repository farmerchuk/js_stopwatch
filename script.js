var stopwatch = {
  intervalId: undefined,
  running: false,
  hours: 0,
  minutes: 0,
  seconds: 0,
  centiseconds: 0,

  startStopwatch: function() {
    if (this.running) return;
    this.running = true;
    this.intervalId = setInterval(function() {
      this.advanceCentiseconds();
    }.bind(this), 10);
  },

  stopStopwatch: function() {
    this.running = false;
    clearInterval(this.intervalId);
  },

  resetStopwatch: function() {
    this.running = false;
    clearInterval(this.intervalId);
    this.centiseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.resetDisplay();
  },

  advanceCentiseconds: function() {
    var cent = this.formatTime(this.centiseconds);

    $('#centiseconds').html(cent);
    if (this.centiseconds === 0) this.advanceSeconds();
    this.centiseconds = this.centiseconds >= 99 ? 0 : this.centiseconds + 1;
  },

  advanceSeconds: function() {
    var seconds = this.formatTime(this.seconds);

    $('#seconds').html(seconds);
    if (this.seconds === 0) this.advanceMinutes();
    this.seconds = this.seconds >= 59 ? 0 : this.seconds + 1;
  },

  advanceMinutes: function() {
    var minutes = this.formatTime(this.minutes);

    $('#minutes').html(minutes);
    if (this.minutes === 0) this.advanceHours();
    this.minutes = this.minutes >= 59 ? 0 : this.minutes + 1;
  },

  advanceHours: function() {
    var hours = this.formatTime(this.hours);

    $('#hours').html(hours);
    this.hours = this.hours >= 59 ? 0 : this.hours + 1;
  },

  formatTime: function(time) {
    var timeString = String(time);
    return timeString.length === 1 ? '0' + timeString : timeString;
  },

  resetDisplay: function() {
    $('.time-segment').html('00');
  },

  bind: function() {
    $('#start-stop').on('click', function(e) {
      e.preventDefault();
      $startStopBtn = $(e.currentTarget);

      if ($startStopBtn.html() === 'Start') {
        this.startStopwatch();
        $startStopBtn.html('Stop');
      } else {
        this.stopStopwatch();
        $startStopBtn.html('Start');
      }
    }.bind(this));

    $('#reset').on('click', function(e) {
      e.preventDefault();
      $startStopBtn = $('#start-stop');

      this.resetStopwatch();
      $startStopBtn.html('Start');
    }.bind(this));
  },

  init: function() {
    this.bind();
  },
}

stopwatch.init();
