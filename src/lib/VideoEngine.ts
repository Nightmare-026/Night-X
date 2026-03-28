"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export class VideoEngine {
  private static instance: FFmpeg | null = null;
  private static isLoading = false;

  public static async getInstance(): Promise<FFmpeg> {
    if (this.instance) return this.instance;
    if (this.isLoading) {
        while (!this.instance) {
            await new Promise(r => setTimeout(r, 100));
        }
        return this.instance;
    }

    this.isLoading = true;
    const ffmpeg = new FFmpeg();
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });

    this.instance = ffmpeg;
    this.isLoading = false;
    return ffmpeg;
  }
}
