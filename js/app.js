(function($) {
  function playVideo(id, seek) {
    $("#bgndVideo").mb_YTPlayer({
      videoURL: id,
      containment: "body",
      autoPlay: true,
      quality: "hd720",
      mute: true,
      startAt: seek,
      opacity: 1
    }); 
  }
  SC.initialize({
    client_id: "6ab048dec3b8ddde4cbbe5b0867b44bb",
  });

  SC.stream("/tracks/32536311").then(function(player){
    player.play();
  });

  $(function() {
    playVideo("T5Ap6rkyBHY", 200);
    // playVideo("O5RdMvgk8b0", 680);
    // playVideo("UpNTwXycNww", 1260);
    // playVideo("UpNTwXycNww", 1480);
  });
})(jQuery);
