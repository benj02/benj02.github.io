var videos = [
  {id: "T5Ap6rkyBHY", times: [500, 600]},
  {id: "O5RdMvgk8b0", times: [200, 600]},
  {id: "UpNTwXycNww", times: [230, 600]},
  {id: "hdGnUnDwO_8", times: [10, 60]},
  {id: "EJqo90lNYLs", times: [60, 60]},
  {id: "_hwDdE0Gu4E", times: [10, 60]},
  {id: "DYAWTcAfHgI", times: [0, 60]},
  {id: "OGFdcaUC6lI", times: [0, 60]},
  {id: "ux7gSKl0Tgw", times: [10, 3600]},
  {id: "R8GlRWPMwFc", times: [10, 45]}
];

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomOnInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

(function($) {
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

  function playRandomVideo() {
    var video = pickRandom(videos);
    var time = randomOnInterval(video.times[0], video.times[1]);
    playVideo(video.id, time);
  }

  SC.initialize({
    client_id: "6ab048dec3b8ddde4cbbe5b0867b44bb",
  });

  SC.stream("/tracks/222969505").then(function(player){
    window.player = player;
    window.player.play();
  }).catch(function(err) {
    console.log("got this here error " + err);
  });

  $(function() {
    // Grab a random video!
    playRandomVideo();
    document.body.addEventListener("keypress", function(e) {
      console.log("test");
      playRandomVideo();
    });
    setTimeout(function() {
      $(".pattern").fadeOut(500);
      $(".big-background-container").fadeOut(500);
    }, 10000);
  });
})(jQuery);
