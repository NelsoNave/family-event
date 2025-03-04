import { PrismaClient } from "@prisma/client";
import { Queue } from "bullmq";
import faceRecognitionService from "../services/face-recognition.service";

const prisma = new PrismaClient();

// Redisを使用したジョブキューの設定
const faceProcessingQueue = new Queue("face-processing", {
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
});

// キューの処理ロジック
faceProcessingQueue.process(async (job) => {
  try {
    const { pictureId, imageUrl } = job.data;

    // 処理ステータスを更新
    await prisma.pictures.update({
      where: { id: pictureId },
      data: { processingStatus: "processing" },
    });

    // 顔認識サービスを呼び出し
    const result = await faceRecognitionService.recognizeFaces(
      imageUrl,
      pictureId,
    );

    // 処理完了ステータスを更新
    await prisma.pictures.update({
      where: { id: pictureId },
      data: {
        processingStatus: "completed",
        faceCount: result.reduce(
          (count, img) => count + (img.faces?.length || 0),
          0,
        ),
      },
      { where: { id: pictureId } },
    );

    return { success: true, pictureId, faceCount: result.length };
  } catch (error) {
    console.error("Face processing worker error:", error);

    // エラー時のステータス更新
    if (job.data.pictureId) {
      await PictureModel.update(
        { processingStatus: "failed", processingError: error.message },
        { where: { id: job.data.pictureId } },
      );
    }

    throw error;
  }
});

// エラーハンドリング
faceProcessingQueue.on("failed", (job, error) => {
  console.error(`Job ${job.id} failed with error: ${error.message}`);
});

// キューにジョブを追加する関数
export const addFaceProcessingJob = async (
  pictureId: number,
  imageUrl: string,
) => {
  return await faceProcessingQueue.add(
    { pictureId, imageUrl },
    {
      attempts: 3, // 失敗時の再試行回数
      backoff: {
        // 再試行間隔
        type: "exponential",
        delay: 5000, // 5秒から指数関数的に増加
      },
    },
  );
};

export default faceProcessingQueue;
