function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var videos = shuffle([
  {id: "T5Ap6rkyBHY", times: [500, 600]},
  {id: "O5RdMvgk8b0", times: [200, 600]},
  {id: "UpNTwXycNww", times: [230, 600]},
  {id: "hdGnUnDwO_8", times: [10, 60]},
  {id: "EJqo90lNYLs", times: [60, 60]},
  {id: "_hwDdE0Gu4E", times: [10, 60]},
  {id: "DYAWTcAfHgI", times: [0, 60]},
  {id: "OGFdcaUC6lI", times: [0, 60]},
  {id: "ux7gSKl0Tgw", times: [10, 3600]},
]);

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomOnInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


var firstVideo = true;
function playVideo(id, seek) {
  console.log("playing '" + id + "' at '" + seek + "'");
  if (firstVideo) {
    $("#bgndVideo").YTPlayer({
      videoURL: id,
      containment: "body",
      autoPlay: true,
      quality: "hd720",
      mute: true,
      startAt: seek,
      opacity: 1
    });
    firstVideo = false;
  } else {
    $("#bgndVideo").YTPChangeMovie({
      videoURL: id,
      startAt: seek
    });
  }
}

var nextVideo = 0;
function playNextVideo() {
  if (nextVideo === videos.length) {
    nextVideo = 0;
    videos = shuffle(videos);
  }
  var video = videos[nextVideo++];
  var time = randomOnInterval(video.times[0], video.times[1]);
  playVideo(video.id, time);
}

$(function() {
  SC.initialize({
    client_id: "6ab048dec3b8ddde4cbbe5b0867b44bb",
  });

  SC.stream("/tracks/222969505").then(function(player){
    window.player = player;
    window.player.play();
  }).catch(function(err) {
    console.log("got this here error " + err);
  });
  // Grab a random video!
  playNextVideo();
  setTimeout(function() {
    $(".pattern").fadeOut(1500);
    $(".big-background-container").fadeOut(1500);
  }, 10000);
});

function AppViewModel() {
  var self = this;
  self.showModal = ko.observable(false);
  document.body.addEventListener("keypress", function(e) {
    console.log(e.which);
    if (e.which === 32) {
      console.log("test");
      self.showModal(!self.showModal());
    // } else if (e.which === 110 || e.which === 78) {
    } else {
      playNextVideo();
    }
  });
}

ko.bindingHandlers.modalVisible = {
  init: function(el, val) {
    $(el).modal({
      show: false,
      backdrop: "static",
      keyboard: false
    });
  },

  update: function(el, val) {
    if (val()()) {
      $(el).modal("show");
    } else {
      $(el).modal("hide");
    }
  }
};


ko.applyBindings(new AppViewModel());
