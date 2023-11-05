import {Model} from "../../lib/model/model";
class ModelService {
  public model!: Model;
  
  init(canvas: HTMLCanvasElement) {
    this.model = new Model(canvas); 
    return this.model.init()
  }

  predict() {
    return this.model.predict();
  }
}
export default ModelService;
