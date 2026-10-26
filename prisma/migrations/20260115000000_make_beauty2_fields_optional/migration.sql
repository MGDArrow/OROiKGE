-- AlterTable: делаем необязательными данные представителя и педагога
ALTER TABLE "BeautyII"
ALTER COLUMN "representativeSurname"
DROP NOT NULL,
ALTER COLUMN "representativeName"
DROP NOT NULL,
ALTER COLUMN "representativeFathername"
DROP NOT NULL,
ALTER COLUMN "representativePhone"
DROP NOT NULL,
ALTER COLUMN "teacherSurname"
DROP NOT NULL,
ALTER COLUMN "teacherName"
DROP NOT NULL,
ALTER COLUMN "teacherFathername"
DROP NOT NULL,
ALTER COLUMN "teacherPhone"
DROP NOT NULL;