import { useState } from "react";
import { Webcam } from "../../lib/webcam/webcam";
class WebcamService {

  public webcam: Webcam = new Webcam();
  public callback: Function = () => {};

  startWebcam: any = () => {
    let constrains: MediaTrackConstraints = {
      frameRate: 5,
    };
    console.log('starting webcam');
    this.webcam.start(constrains).then( () => {
      console.log('webcam started');

    });
  };
  stopWebcam: any = () => {
    this.webcam.stop();
  };

  capture: any = () => {
    return this.webcam.capture();
  };

  getVideoDimension = (): any => {
    return this.webcam.getVideoDimension();
  }

  addCanvas = (canvas: HTMLCanvasElement) : any => {
    return this.webcam.addCanvas(canvas);
  }

  addVideo = (video: HTMLVideoElement) : any => {
    return this.webcam.addVideo(video);
  }
}
export default WebcamService;
