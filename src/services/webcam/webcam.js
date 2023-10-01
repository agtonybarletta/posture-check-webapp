function stopWebcam() {
  const video = document.getElementById("video"),
    vendorURL = window.URL || window.webkitURL;
  var stream = video.srcObject;
  var tracks = stream.getTracks();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    track.stop();
  }
  video.srcObject = null;
  stream.getTracks().forEach(function (track) {
    track.stop();
  });
}

function startWebcam(constraints) {
  var video = document.getElementById("video"),
    vendorURL = window.URL || window.webkitURL;

  if (navigator.mediaDevices.getUserMedia) {

    navigator.mediaDevices
      .getUserMedia({ video: constraints })
	  //.then( (stream) => {
//			return processStream(stream);
//		})
      .then(function (stream) {
        video.srcObject = stream;
		 video.addEventListener('loadedmetadata', (event) => {
			 console.log(video);
                    const { videoWidth: vw, videoHeight: vh } = video;
                    //video.width = 200;
                    video.width = vw;
                    //video.height = 200;
                    video.height = vh;
                });

      })
      .catch(function (error) {
        console.log("Something went wrong");
      });
  }
}

function processStream(stream) {
	 const mediaRecorder = new MediaRecorder(stream)
    let countUploadChunk = 0

    /*mediaRecorder.ondataavailable = (data) => {
        sendFile(data.data, countUploadChunk)
        countUploadChunk++
    }
	*/
    mediaRecorder.start()

    setInterval(() => {
        mediaRecorder.requestData()
    }, 500)
}
export { startWebcam, stopWebcam };
