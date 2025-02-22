-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_image_url" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_families" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "profile_image_url" TEXT NOT NULL,

    CONSTRAINT "user_families_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "host_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "is_ask_restrictions" BOOLEAN NOT NULL,
    "theme" TEXT NOT NULL,
    "note_for_things_to_buy" TEXT NOT NULL,
    "note_for_necessities" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_participants" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "user_family_id" INTEGER,
    "message_to_host" TEXT NOT NULL,
    "is_accepted" BOOLEAN NOT NULL,
    "is_attended" BOOLEAN NOT NULL,

    CONSTRAINT "event_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participant_restrictions" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "participant_restrictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "necessities" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "item" TEXT NOT NULL,

    CONSTRAINT "necessities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participant_necessities" (
    "necessity_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "is_added" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "things_to_buy" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "item" TEXT NOT NULL,
    "is_purchase" BOOLEAN NOT NULL,

    CONSTRAINT "things_to_buy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timelines" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "schedule_item" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timelines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medias" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "image_title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "event_participants_event_id_user_id_user_family_id_key" ON "event_participants"("event_id", "user_id", "user_family_id");

-- CreateIndex
CREATE UNIQUE INDEX "participant_necessities_necessity_id_user_id_key" ON "participant_necessities"("necessity_id", "user_id");

-- AddForeignKey
ALTER TABLE "user_families" ADD CONSTRAINT "user_families_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_participants" ADD CONSTRAINT "event_participants_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_participants" ADD CONSTRAINT "event_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_participants" ADD CONSTRAINT "event_participants_user_family_id_fkey" FOREIGN KEY ("user_family_id") REFERENCES "user_families"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participant_restrictions" ADD CONSTRAINT "participant_restrictions_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participant_restrictions" ADD CONSTRAINT "participant_restrictions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "necessities" ADD CONSTRAINT "necessities_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participant_necessities" ADD CONSTRAINT "participant_necessities_necessity_id_fkey" FOREIGN KEY ("necessity_id") REFERENCES "necessities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participant_necessities" ADD CONSTRAINT "participant_necessities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "things_to_buy" ADD CONSTRAINT "things_to_buy_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timelines" ADD CONSTRAINT "timelines_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
