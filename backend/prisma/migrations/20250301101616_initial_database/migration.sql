-- CreateTable
CREATE TABLE "pictures" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_public_url" TEXT NOT NULL,

    CONSTRAINT "pictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "face_pictures" (
    "id" SERIAL NOT NULL,
    "picture_id" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "face_pictures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "face_pictures" ADD CONSTRAINT "face_pictures_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE CASCADE ON UPDATE CASCADE;
