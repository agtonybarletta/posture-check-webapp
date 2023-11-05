import ModelService from "./model/ModelService";
import WebcamService from "./webcam/WebcamService";

class PostureCheckService {

  private webcamService: WebcamService;
  private modelService: ModelService;

  private canvas: HTMLCanvasElement; 

  constructor(webcamService: WebcamService, modelService: ModelService)  {
    this.webcamService = webcamService;
    this.modelService = modelService;
    this.canvas = document.createElement("canvas");
    console.log("initialized postureCheck service with");
    console.log("webcam: ", webcamService );
    console.log("model: ", modelService );
    this.init();
  }

  init() {
    // the model need a 244x244 image size resized from an image having ratio: 3:4 or w/h 1.33333
    const ratio = 0.75
		this.canvas.height = 224*ratio;
		this.canvas.width = 224;
    this.webcamService.addCanvas(this.canvas);
    this.modelService.init(this.canvas).then( () => { console.log("model initialized!");});
  }

  capture() {
    console.time();
		return this.webcamService.capture().then(() => {
			return this.modelService.predict().then( (data: any) => {
        console.log('from postureCheckService: ', data);
        console.timeEnd();
        return data;
      });;
		});
  }

}

export default PostureCheckService;
