(function($) {
  $(document).ready(function() {
    //Device.js will check if it is Tablet or Mobile - http://matthewhudson.me/projects/device.js/
    if (!device.tablet() && !device.mobile()) {
    } else {
      //jQuery will add the default background to the preferred class 
      $('.big-background, .small-background-section').addClass('big-background-default-image');
    }
  });
})(jQuery);
