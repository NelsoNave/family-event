import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const prisma = new PrismaClient();
const execPromise = promisify(exec);

class FaceRecognitionService {
  /**
   * 画像から顔を認識する
   * @param imageUrl Cloudinaryの画像URL
   * @param pictureId 画像ID
   */
  async recognizeFaces(imageUrl: string, pictureId: number): Promise<any> {
    try {
      // 画像をダウンロード（一時ファイルとして保存）
      const tempImagePath = await this.downloadImage(imageUrl);

      // Pythonスクリプトを実行して顔認識
      const result = await this.executePythonScript(tempImagePath);

      // 一時ファイルを削除
      fs.unlinkSync(tempImagePath);

      // 結果を解析してDBに保存
      await this.processFaceResults(result, pictureId);

      return result;
    } catch (error) {
      console.error("Face recognition error:", error);
      throw error;
    }
  }

  /**
   * 画像をダウンロードして一時ファイルとして保存
   */
  private async downloadImage(imageUrl: string): Promise<string> {
    // 実装: 画像をダウンロードして一時ファイルに保存
    // ここでは簡略化のため省略
    return "/path/to/temp/image.jpg";
  }

  /**
   * Pythonスクリプトを実行
   */
  private async executePythonScript(imagePath: string): Promise<any> {
    const scriptPath = path.resolve(__dirname, "../scripts/face_recognizer.py");
    const { stdout } = await execPromise(`python3 ${scriptPath} ${imagePath}`);

    try {
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error("Failed to parse face recognition results");
    }
  }

  /**
   * 顔認識結果を処理してDBに保存
   */
  private async processFaceResults(
    results: any,
    pictureId: number,
  ): Promise<void> {
    // 画像内の各顔について処理
    for (const result of results) {
      if (!result.faces || result.faces.length === 0) continue;

      for (const face of result.faces) {
        if (face.name === "Unknown") {
          // 未知の顔の場合、新しいタグを生成
          const newTag = await this.generateUniqueTag();

          // 顔情報をDBに保存
          await prisma.facePictures.create({
            data: {
              pictureId,
              tag: newTag,
            },
          });
        } else {
          // 顔情報をDBに保存
          await prisma.facePictures.create({
            data: {
              pictureId,
              tag: face.name,
            },
          });
        }
      }
    }
  }

  /**
   * ユニークなタグを生成
   */
  private async generateUniqueTag(): Promise<string> {
    // fetch last tag
    const lastTag = await prisma.facePictures.findFirst({
      where: { tag: { startsWith: "user" } },
      orderBy: { tag: "desc" },
    });

    if (!lastTag) {
      return "userA";
    }

    // Create next tag
    const currentChar = lastTag.tag.charAt(4); // e.g. 'userA' -> 'A'
    const nextChar = String.fromCharCode(currentChar.charCodeAt(0) + 1);

    // Next Z -> AA
    if (nextChar > "Z") {
      const currentLength = lastTag.tag.length - 4; // e.g. 'userA' -> 1
      return `user${"A".repeat(currentLength + 1)}`;
    }

    return `user${nextChar}`;
  }
}

export default new FaceRecognitionService();
