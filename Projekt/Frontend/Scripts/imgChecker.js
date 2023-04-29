const url = "https://images.pexels.com/photos/7513412/pexels-photo-7513412.jpeg";

function checkImage(url) {
    var img = new Image();
    img.onload = function() {
      alert('The image is loaded.');
    };
    img.onerror = function() {
      alert('The image is not loaded.');
    };
    img.src = url;
  }

  checkImage(url);
