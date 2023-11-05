import * as tf from '@tensorflow/tfjs'
import {DataTypeMap, GraphModel, LayersModel, NumericDataType} from '@tensorflow/tfjs';

class Model {
  
  private model!: LayersModel;
  //private MOBILENET_MODEL_PATH ='https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_100_224/classification/3/default/1';
  private MODEL_PATH ='http://localhost:3000/model/model1/model.json';

  private canvas: HTMLCanvasElement;

  constructor( canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  async init() {
    try {
      const model = await tf.loadLayersModel(this.MODEL_PATH);
      this.model = model;
      console.log(this.model);
    } catch (reason) {
      console.log(reason);
    }
  }

  predict(): Promise<number[]>{
    return tf.tidy( () => {
        const img = tf.browser.fromPixels(this.canvas).resizeBilinear([224,224]);

        // crop the image so we're using the center square
        //
        const size = Math.min(img.shape[0], img.shape[1]);
        console.log('size: ',size);
        const centerHeight = img.shape[0] / 2;
        const beginHeight = centerHeight - (size / 2);
        const centerWidth = img.shape[1] / 2;
        const beginWidth = centerWidth - (size / 2);
        
        const cropped = img.slice([beginHeight, beginWidth, 0], [size, size, 3]);

        // Expand the outer most dimension so we have a batch size of 1
        const batchedImage = cropped.expandDims(0);

        // Normalize the image between -1 and a1. The image comes in between 0-255
        // so we divide by 127 and subtract 1.
        //console.log('batched: ' + batchedImage.dataSync());
        //const captured =  batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
        const captured = batchedImage;
        //return (this.model.predict(captured) as tf.Tensor<tf.Rank>).array();
        return this.model.predict(captured )as tf.Tensor;

    }).data().then(
      (data: DataTypeMap[NumericDataType]) => {
        return Array.from(data) as number[];
      });
  }
  
}
export {Model};
