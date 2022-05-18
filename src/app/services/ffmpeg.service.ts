import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  isReady = false;
  private ffmpeg;

  constructor() {
    this.ffmpeg = createFFmpeg({ log: true });
  }

  async init() {
    if (this.isReady) {
      return;
    }

    await this.ffmpeg.load();

    this.isReady = true;
  }

  async getScreenshots(file: File) {
    const data = await fetchFile(file);

    this.ffmpeg.FS('writeFile', file.name, data);

    await this.ffmpeg.run(
      // Input
      '-i', file.name,
      // Output Options
      '-ss', '00:00:01',
      '-frames:v', '1',
      '-filter:v', 'scale=510:-1',
      // Output
      'output_01.png'
    )
  }
}
