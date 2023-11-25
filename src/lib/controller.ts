import {Model} from "./model/model";
import {Webcam} from "./webcam/webcam";

class Controller {
  private webcam: Webcam;
  private model: Model<HTMLCanvasElement>;

  // canvas used in inference mode
  private canvas: HTMLCanvasElement; 

  public classLabelIndexMap = ["correct", "incorrect", "none"];

  constructor() {
    this.canvas = document.createElement("canvas");
    const ratio = 0.75
		this.canvas.height = 224*ratio;
		this.canvas.width = 224;
    this.webcam = new Webcam();
    this.webcam.addCanvas(this.canvas);
    this.model = new Model(this.canvas);
    this.model.init().then( () => {console.log("Model initalized")});
  }

  startWebcam() {
    this.webcam.start().then( () => {console.log('webcam started')});
  }
  stopWebcam() {
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

  fit() {
    this.model.fit();
  }


  predict(): Promise<number[]>{
    console.time();
		return this.webcam.capture().then(() => {
			return this.model.predict().then( (data: any) => {
        console.log('from postureCheckService: ', data);
        console.timeEnd();
        return data;
      });;
		});
  }

  addExample(classLabel: string) {
    const canvas = document.createElement('canvas');
    console.log(canvas);
    this.webcam.captureOnCanvas(canvas).then( () => {
      console.log('captured');
      this.model.addExample(canvas, this.getClassIndex(classLabel))
      canvas.remove();
    });
  }

  getClassIndex(classLabel: string) {
    return this.classLabelIndexMap.indexOf(classLabel) ;
  }
} 

export default Controller;
