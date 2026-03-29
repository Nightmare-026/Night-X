"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export class VideoEngine {
  private static instance: FFmpeg | null = null;
  private static isLoading = false;
  private static loadError: Error | null = null;

  public static async getInstance(): Promise<FFmpeg> {
    // If already loaded, return singleton
    if (this.instance) return this.instance;

    // If a previous load attempt failed, reset and retry
    if (this.loadError) {
      this.loadError = null;
      this.isLoading = false;
    }

    // If currently loading, wait with a timeout guard (max 60s)
    if (this.isLoading) {
      let waited = 0;
      while (this.isLoading && waited < 60000) {
        await new Promise((r) => setTimeout(r, 100));
        waited += 100;
      }
      if (this.instance) return this.instance;
      if (this.loadError) throw this.loadError;
      throw new Error("FFmpeg load timeout. Please refresh the page and try again.");
    }

    this.isLoading = true;
    this.loadError = null;

    try {
      const ffmpeg = new FFmpeg();
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });

      this.instance = ffmpeg;
      return ffmpeg;
    } catch (err) {
      this.loadError = err as Error;
      this.instance = null;
      throw err;
    } finally {
      this.isLoading = false;
    }
  }

  /** Force-resets the singleton (useful after a fatal FFmpeg error) */
  public static reset(): void {
    this.instance = null;
    this.isLoading = false;
    this.loadError = null;
  }
}
