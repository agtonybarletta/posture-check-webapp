class Webcam {
  public video!: HTMLVideoElement;
  public canvas!: HTMLCanvasElement;

  public isStarted: boolean = false;

  public outputHtmlVideoElements: HTMLVideoElement[];
  public outputHtmlCanvasElements: HTMLCanvasElement[];

  constructor() {
    this.outputHtmlVideoElements = [];
    this.outputHtmlCanvasElements = [];
    this.init();
  }

  public init(): void {
    this.video = <HTMLVideoElement>document.createElement("video");
    this.canvas = <HTMLCanvasElement>document.createElement("canvas");
  }

  public addVideo(video: HTMLVideoElement) {
    this.outputHtmlVideoElements.push(video);
    if (this.isStarted) {
      video.srcObject = this.video.srcObject;
    }
  }

  public addCanvas(canvas: HTMLCanvasElement) {
    this.outputHtmlCanvasElements.push(canvas);
  }

  public start() {
    let constraints: MediaTrackConstraints = {
      frameRate: 5,
    };
    // CHECK multiple start calls
    // check webcam
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw Error("no webcam");
    }

    return navigator.mediaDevices
      .getUserMedia({ video: constraints })
      .then((stream: MediaStream) => {
        this.video.srcObject = stream;
        for (let e of this.outputHtmlVideoElements) {
          console.log("adding video element");
          e.srcObject = this.video.srcObject;
        }
        this.video.addEventListener("loadedmetadata", (event) => {
          const { videoWidth: vw, videoHeight: vh } = this.video;
          this.video.width = vw;
          this.video.height = vh;
        });
        this.isStarted = true;
      })
      .catch(function (error) {
        console.log("Something went wrong", error);
      });
  }

  public stop() {
    // CHECK stop before start
    // CHECK multiple stop calls
    var stream: MediaStream | MediaSource | Blob | null = this.video.srcObject;
    // TODO check if MediaStream or MediaSource
    if (stream == null) {
      throw Error("stream is null");
    } else {
      stream = <MediaStream>stream;
    }
    var tracks: MediaStreamTrack[] = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }
    this.video.srcObject = null;
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
    this.isStarted = false;
  }

  public capture(): any {
    //this.canvas = document.createElement('canvas');
    console.log(this.video);
    return this.video.play().then(() => {
      this.canvas.width = this.video.width;
      this.canvas.height = this.video.height;

      const context = this.canvas.getContext("2d");
      const something = this.video;
      if (context) {
        context.drawImage(something, 0, 0, this.video.width, this.video.height);
        for (let c of this.outputHtmlCanvasElements) {
          c.getContext("2d")?.drawImage(something, 0, 0, c.width, c.height);
        }
        return;
      }
    });
  }

  public captureOnCanvas(canvas: HTMLCanvasElement): Promise<void> {
    return this.video.play().then(() => {
      canvas.width = this.video.width;
      canvas.height = this.video.height;

      const context = canvas.getContext("2d");
      const something = this.video;
      if (context) {
        context.drawImage(something, 0, 0, this.video.width, this.video.height);
        canvas
          .getContext("2d")
          ?.drawImage(something, 0, 0, canvas.width, canvas.height);
      }
      return Promise.resolve();
    });
  }

  public getVideoDimension(): { h: number; w: number; r: number } {
    return {
      h: this.video.height,
      w: this.video.width,
      r: this.video.height / this.video.width,
    };
  }
}
export { Webcam };
