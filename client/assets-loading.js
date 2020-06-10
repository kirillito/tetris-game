
var imagesToLoad = 0;

function loadImageForTrackCode(trackCode, fileName) {
  beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
  var	imageList	=	[
    
    ];
    
  imagesToLoad = imageList.length;

  for (img of imageList) {
     
  }
}

function beginLoadingImage(imgNode, fileName) {
  imgNode.src = "images/" + fileName;
  imgNode.onload = setAssetAsLoadedAndLaunchIfReady();
}

function setAssetAsLoadedAndLaunchIfReady() {
  imagesToLoad--;
  this.launchIfReady();
}