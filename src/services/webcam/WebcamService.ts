import {useState} from 'react';
import {startWebcam, stopWebcam} from './webcam'
class WebcamService {
	public canvas: HTMLCanvasElement | undefined;
	public callback: Function = () => {};
	startWebcam: any = () => {
		let constrains: MediaTrackConstraints = {
			frameRate:5 
		}
		startWebcam(constrains);
	}
	stopWebcam: any = () => {
		stopWebcam()
	}
	capture: any = () => {
		//this.canvas = document.createElement('canvas');		
		var video = <HTMLVideoElement> document.getElementById("video");
		video.play().then( () => {
			this.canvas = <HTMLCanvasElement> document.getElementById('canvas');
			this.canvas.width = video.width;
			this.canvas.height = video.height;

			const context = this.canvas.getContext('2d');
			const something = video;
			if (context) {
				context.drawImage( something, 0, 0, video.width, video.height);
				console.log(something);
				console.log(context);
				var capture = <HTMLImageElement> document.getElementById('capture');
				  var dataUrl = this.canvas.toDataURL();
				  capture.src = dataUrl;
				  this.callback("caputured " + Date.now())
			}
		});
	}
	setCallback: any = (callback: Function) => {
		this.callback =	callback;
	}

};
export default WebcamService;
