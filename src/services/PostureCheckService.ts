import * as tf from '@tensorflow/tfjs'
import Controller from "../lib/controller";

class PostureCheckService {

  private controller: Controller;
  private examples: {[key: string]: tf.Tensor} = {};

  constructor()  {
    this.controller = new Controller();
  }

  captureAndPredict() {
    return this.controller.predict();
  }

  addExample(classLabel: string) {
    this.controller.addExample(classLabel);
  }

  fit() {
    this.controller.fit();
  }

  addVideo(video: HTMLVideoElement) {
    this.controller.addVideo(video);
  }

  stopWebcam() {
    this.controller.stopWebcam();
  }
  
  startWebcam() {
    this.controller.startWebcam();
  }

}

export default PostureCheckService;
