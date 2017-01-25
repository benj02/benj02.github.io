var videos = [
  {id: "T5Ap6rkyBHY", times: [500, 600]},
  {id: "O5RdMvgk8b0", times: [200, 600]},
  {id: "UpNTwXycNww", times: [230, 600, 700]},
  {id: "hdGnUnDwO_8", times: [10]}
];

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
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
    var time = pickRandom(video.times);
    playVideo(video.id, time);
  }

  SC.initialize({
    client_id: "6ab048dec3b8ddde4cbbe5b0867b44bb",
  });

  SC.stream("/tracks/122909532").then(function(player){
    player.play();
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
