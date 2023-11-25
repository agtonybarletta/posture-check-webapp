import * as tf from "@tensorflow/tfjs";
import {
  DataTypeMap,
  GraphModel,
  LayersModel,
  NumericDataType,
} from "@tensorflow/tfjs";

class Model<
  C extends
    | tf.PixelData
    | ImageData
    | HTMLImageElement
    | HTMLCanvasElement
    | HTMLVideoElement
    | ImageBitmap
> {
  private model!: LayersModel;
  //private MOBILENET_MODEL_PATH ='https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_100_224/classification/3/default/1';
  // TODO make it into a parameter
  private MODEL_PATH = "/model/model1/model.json";

  private canvas: C;

  private datasetX: tf.Tensor[] = [];
  private datasetY: number[] = []; 

  constructor(canvas: C) {
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

  capture(): tf.Tensor {
    return tf.tidy(() => {
      const img = tf.browser.fromPixels(this.canvas).resizeBilinear([224, 224]);

      // crop the image so we're using the center square
      const size = Math.min(img.shape[0], img.shape[1]);
      const centerHeight = img.shape[0] / 2;
      const beginHeight = centerHeight - size / 2;
      const centerWidth = img.shape[1] / 2;
      const beginWidth = centerWidth - size / 2;

      const cropped = img.slice([beginHeight, beginWidth, 0], [size, size, 3]);

      // Expand the outer most dimension so we have a batch size of 1
      const batchedImage = cropped.expandDims(0);

      // Normalize the image between -1 and a1. The image comes in between 0-255
      // so we divide by 127 and subtract 1.
      //const captured =  batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
      const captured = batchedImage;
      return captured;
    });
  }

  captureFromCanvas(canvas: C): tf.Tensor {
    return tf.tidy(() => {
      const img = tf.browser.fromPixels(canvas).resizeBilinear([224, 224]);

      // crop the image so we're using the center square
      const size = Math.min(img.shape[0], img.shape[1]);
      const centerHeight = img.shape[0] / 2;
      const beginHeight = centerHeight - size / 2;
      const centerWidth = img.shape[1] / 2;
      const beginWidth = centerWidth - size / 2;

      const cropped = img.slice([beginHeight, beginWidth, 0], [size, size, 3]);

      // Expand the outer most dimension so we have a batch size of 1
      const batchedImage = cropped.expandDims(0);

      // Normalize the image between -1 and a1. The image comes in between 0-255
      // so we divide by 127 and subtract 1.
      //const captured =  batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
      const captured = batchedImage;
      return captured;
    });
  }

  predict(): Promise<number[]> {
    return tf
      .tidy(() => {
        const img = tf.browser
          .fromPixels(this.canvas)
          .resizeBilinear([224, 224]);

        // crop the image so we're using the center square
        const size = Math.min(img.shape[0], img.shape[1]);
        const centerHeight = img.shape[0] / 2;
        const beginHeight = centerHeight - size / 2;
        const centerWidth = img.shape[1] / 2;
        const beginWidth = centerWidth - size / 2;

        const cropped = img.slice(
          [beginHeight, beginWidth, 0],
          [size, size, 3]
        );

        // Expand the outer most dimension so we have a batch size of 1
        const batchedImage = cropped.expandDims(0);

        // Normalize the image between -1 and a1. The image comes in between 0-255
        // so we divide by 127 and subtract 1.
        //const captured =  batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
        const captured = batchedImage;
        //return (this.model.predict(captured) as tf.Tensor<tf.Rank>).array();
        return this.model.predict(captured) as tf.Tensor;
      })
      .data()
      .then((data: DataTypeMap[NumericDataType]) => {
        return Array.from(data) as number[];
      });
  }

  addExample(canvas: C, classIndex: number) {
    console.log('adding classIndex: ', classIndex);
    const tensor = tf.tidy( () => {
      const tensor = this.captureFromCanvas(canvas);
      const reshapedTensor = tensor.reshape([224,224,3]);
      //this.dataset[classIndex] = tf.concat([oldTensor, tensor], 0);
      return reshapedTensor;
    })
    this.datasetX.push(tensor);
    this.datasetY.push(classIndex);
  }

  fit() {
    tf.tidy( () => {
      //const datasetSize = this.dataset.map( i => i.shape[0]).reduce((t,n) => t + n, 0);
      // transform dataset to tf dataset
      const datasetX = this.datasetX;
      const datasetY = this.datasetY;
      function* data() {
       for (let i = 0; i < datasetX.length; i++) {
         // Generate one sample at a time.
         console.log('yelding: ', datasetX[i]);
         yield datasetX[i];
       }
      }

      function* labels() {
       for (let i = 0; i < datasetY.length; i++) {
         // Generate one sample at a time.
         yield datasetY[i];
       }
      }

      const xs = tf.data.generator(data);
      const ys = tf.data.generator(labels);
      // We zip the data and labels together, shuffle and batch 32 samples at a time.
      const ds = tf.data.zip({xs, ys}).shuffle(datasetX.length /* bufferSize */).batch(4);

      // call fit
      // Train the model for 5 epochs.
      this.model.compile({
        optimizer: tf.train.adam(.01),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      })
      this.model.fitDataset(ds, 
        {
          epochs: 5,
      }).then(info => {
       console.log('Accuracy', info.history.acc);
      });
    });
  }
}
export { Model };
