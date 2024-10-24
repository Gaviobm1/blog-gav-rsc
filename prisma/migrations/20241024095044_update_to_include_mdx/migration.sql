-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "post" TEXT NOT NULL,
    "href" VARCHAR(500) NOT NULL,
    "created_on" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
