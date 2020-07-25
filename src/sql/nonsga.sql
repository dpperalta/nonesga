/*
Created: 25/6/2020
Modified: 2/7/2020
Project: NoNeSGA
Model: NoNeSGA
Database: PostgreSQL 10
*/


-- Create tables section -------------------------------------------------

-- Table user

CREATE TABLE "user"(
 "userID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "nick" Character varying(100),
 "pass" Character varying(400) NOT NULL,
 "email" Character varying(80) NOT NULL,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "status" Smallint,
 "unregisteredDate" Timestamp with time zone,
 "lastLogin" Timestamp with time zone,
 "isActive" Boolean DEFAULT true NOT NULL,
 "personID" Integer,
 "roleID" Integer,
 "collegeID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "user"."userID" IS 'Unique autoincremental ID for a user'
;
COMMENT ON COLUMN "user"."nick" IS 'Nickname used to authenticate a user (in case of no mail convention)'
;
COMMENT ON COLUMN "user"."pass" IS 'Stores the password of the user'
;
COMMENT ON COLUMN "user"."email" IS 'Unique email addres to acces into application'
;
COMMENT ON COLUMN "user"."registeredDate" IS 'Similar as creationDate, stores registration date timestamp'
;
COMMENT ON COLUMN "user"."status" IS 'Stores a status code, the status is defined by API

0: Free access (demo, trial, etc.)
1. Active
2. Active with payment request
3. Active with payment verified
4. Active with payment delayed
5. Active with payment delayed verified
6. Active with no access because payment
7. Active with no access because banned
8. Forbidden acces
9. Restricted access
10. Need admin verification'
;
COMMENT ON COLUMN "user"."unregisteredDate" IS 'In case of cancellation, this field stores the timestamp of cancellation'
;
COMMENT ON COLUMN "user"."lastLogin" IS 'Timestamp for the last loggin in the application'
;
COMMENT ON COLUMN "user"."isActive" IS 'true: for active users
false:: for active users'
;

-- Create indexes for table user

CREATE INDEX "user_person_ix" ON "user" ("personID")
;

CREATE INDEX "user_role_ix" ON "user" ("roleID")
;

CREATE INDEX "user_college_ix" ON "user" ("collegeID")
;

-- Add keys for table user

ALTER TABLE "user" ADD CONSTRAINT "PK_user" PRIMARY KEY ("userID")
;

ALTER TABLE "user" ADD CONSTRAINT "idUser" UNIQUE ("userID")
;

ALTER TABLE "user" ADD CONSTRAINT "email" UNIQUE ("email")
;

ALTER TABLE "user" ADD CONSTRAINT "nick" UNIQUE ("nick");

-- Table person

CREATE TABLE "person"(
 "personID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "dni" Character varying(13) NOT NULL,
 "birthdate" Date,
 "names" Character varying(100) NOT NULL,
 "lastNames" Character varying(100) NOT NULL,
 "completeName" Character varying(200),
 "image" Character varying(500),
 "details" Text,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone,
 "isActive" Boolean DEFAULT true,
 "bio" Text,
 "votes" Integer,
 "sex" Character varying(50) NOT NULL,
 "personTypeID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "person"."personID" IS 'Unique autoincremental identification for a person'
;
COMMENT ON COLUMN "person"."dni" IS 'Document National of Identification, is the unique number for a natural o juridic person'
;
COMMENT ON COLUMN "person"."birthdate" IS 'Date of birth of the person registered'
;
COMMENT ON COLUMN "person"."names" IS 'Name or names of the person'
;
COMMENT ON COLUMN "person"."lastNames" IS 'Last names of the person
'
;
COMMENT ON COLUMN "person"."completeName" IS 'names + " " + lastNames are the complete name of a person'
;
COMMENT ON COLUMN "person"."image" IS 'Stores the file than contain pictures If the person upload an photo or imagen of himself'
;
COMMENT ON COLUMN "person"."details" IS 'Aditional details to describe the person'
;
COMMENT ON COLUMN "person"."registeredDate" IS 'Timestamp for the registration date'
;
COMMENT ON COLUMN "person"."unregisteredDate" IS 'Timestamp for the cancelation or unregistered time
'
;
COMMENT ON COLUMN "person"."isActive" IS 'true: active
false: inactive

A person shouldn''t deleted from the database'
;
COMMENT ON COLUMN "person"."bio" IS 'The bio that''s writed by the person, to show in his profile'
;
COMMENT ON COLUMN "person"."votes" IS 'A simply evaluation field to set a popularity level for a person'
;
COMMENT ON COLUMN "person"."sex" IS 'Selection of the sex for a person, it must be Male or Female'
;

-- Create indexes for table person

CREATE INDEX "person_personType_ix" ON "person" ("personTypeID")
;

-- Add keys for table person

ALTER TABLE "person" ADD CONSTRAINT "PK_person" PRIMARY KEY ("personID")
;

ALTER TABLE "person" ADD CONSTRAINT "dni" UNIQUE ("dni")
;

-- Table personType

CREATE TABLE "personType"(
 "personTypeID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "personType" Smallint NOT NULL,
 "typeName" Character varying(50) NOT NULL,
 "details" Character varying(500),
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone,
 "isActive" Boolean DEFAULT true NOT NULL
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "personType"."personTypeID" IS 'Unique autoincremental identification for a person type
'
;
COMMENT ON COLUMN "personType"."personType" IS 'Types of person
1: Natural
2: Juridic
3: Agent
4: Father
5: Mother
6: Relative
7: Grandfather
8: Grandmother'
;
COMMENT ON COLUMN "personType"."typeName" IS 'Name or description to the type of person'
;
COMMENT ON COLUMN "personType"."details" IS 'Contain aditional details for the type of person'
;
COMMENT ON COLUMN "personType"."registeredDate" IS 'Timestamp for the registration date'
;
COMMENT ON COLUMN "personType"."unregisteredDate" IS 'Timestamp for the unregistration date'
;
COMMENT ON COLUMN "personType"."isActive" IS 'true: active
false: inactive'
;

-- Add keys for table personType

ALTER TABLE "personType" ADD CONSTRAINT "PK_personType" PRIMARY KEY ("personTypeID")
;

ALTER TABLE "personType" ADD CONSTRAINT "idPerson" UNIQUE ("personTypeID")
;

ALTER TABLE "personType" ADD CONSTRAINT "personType" UNIQUE ("personType")
;

ALTER TABLE "personType" ADD CONSTRAINT "typeName" UNIQUE ("typeName")
;

-- Table city

CREATE TABLE "city"(
 "cityID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "cityCode" Character varying(10) NOT NULL,
 "cityName" Character varying(200) NOT NULL,
 "cityDetail" Text,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone,
 "isActive" Boolean DEFAULT true NOT NULL,
 "provinceID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "city"."cityID" IS 'Unique autoincremental identification for a city'
;
COMMENT ON COLUMN "city"."cityCode" IS 'Code assigned for a city'
;
COMMENT ON COLUMN "city"."cityName" IS 'Name for the city, is the real name that identifies a city in the app'
;
COMMENT ON COLUMN "city"."dityDetail" IS 'Aditional details for the city'
;
COMMENT ON COLUMN "city"."registrationDate" IS 'Timestamp for registration date of the city'
;
COMMENT ON COLUMN "city"."unregisteredDate" IS 'Timestamp for date of unregistered city'
;
COMMENT ON COLUMN "city"."isActive" IS 'true: active
false: inactive'
;

-- Create indexes for table city

CREATE INDEX "city_province_ix" ON "city" ("provinceID")
;

-- Add keys for table city

ALTER TABLE "city" ADD CONSTRAINT "PK_city" PRIMARY KEY ("cityID")
;

ALTER TABLE "city" ADD CONSTRAINT "cityCode" UNIQUE ("cityCode")
;

-- Table province

CREATE TABLE "province"(
 "provinceID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "provinceCode" Character varying(10) NOT NULL,
 "provinceName" Character varying(200) NOT NULL,
 "details" Text,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone,
 "isActive" Boolean DEFAULT true NOT NULL,
 "countryID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "province"."provinceID" IS 'Unique autoincremental identification for a province'
;
COMMENT ON COLUMN "province"."provinceCode" IS 'Code for the province'
;
COMMENT ON COLUMN "province"."provinceName" IS 'Name of the province'
;
COMMENT ON COLUMN "province"."details" IS 'Aditional details or description for a province'
;
COMMENT ON COLUMN "province"."registeredDate" IS 'Timestamp for registered date of the provicen'
;
COMMENT ON COLUMN "province"."unregisteredDate" IS 'Timestamp for unregistered date of the provicen'
;
COMMENT ON COLUMN "province"."isActive" IS 'true: active
false: inactive'
;

-- Create indexes for table province

CREATE INDEX "province_country_ix" ON "province" ("countryID")
;

-- Add keys for table province

ALTER TABLE "province" ADD CONSTRAINT "PK_province" PRIMARY KEY ("provinceID")
;

ALTER TABLE "province" ADD CONSTRAINT "provinceName" UNIQUE ("provinceName")
;

ALTER TABLE "province" ADD CONSTRAINT "provinceCode" UNIQUE ("provinceCode")
;

-- Table country

CREATE TABLE "country"(
 "countryID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "countryCode" Character varying(10) NOT NULL,
 "countryName" Character varying(250) NOT NULL,
 "countryDetails" Text,
 "isActive" Boolean DEFAULT true NOT NULL,
 "callCode" Character varying(4) NOT NULL,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone,
 "currency" Character varying(100),
 "currencySymbol" Character varying(3),
 "longLanguage" Character varying(100),
 "shortLanguage" Character varying(5),
 "status" Smallint
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "country"."countryID" IS 'Unique autoincremental identification for a country'
;
COMMENT ON COLUMN "country"."countryCode" IS 'Unique code for international identification of a country'
;
COMMENT ON COLUMN "country"."countryName" IS 'Name of the country'
;
COMMENT ON COLUMN "country"."countryDetails" IS 'Description or aditional details for a country'
;
COMMENT ON COLUMN "country"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "country"."callCode" IS 'International code for cellphone calls'
;
COMMENT ON COLUMN "country"."registeredDate" IS 'Timestamp for registration date'
;
COMMENT ON COLUMN "country"."unregisteredDate" IS 'Timestamp for unregistered date'
;
COMMENT ON COLUMN "country"."currency" IS 'Name of the actual currency'
;
COMMENT ON COLUMN "country"."currencySymbol" IS 'Symbol of the currency'
;
COMMENT ON COLUMN "country"."longLanguage" IS 'Name of the mother langages'
;
COMMENT ON COLUMN "country"."shortLanguage" IS 'Short symbols for laguange(s)'
;
COMMENT ON COLUMN "country"."status" IS '0: Free, demo
1: Normal
2: Forbiden
3: Evaluation
4: Commercial
5: No Commercial'
;

-- Add keys for table country

ALTER TABLE "country" ADD CONSTRAINT "PK_country" PRIMARY KEY ("countryID")
;

ALTER TABLE "country" ADD CONSTRAINT "callCode" UNIQUE ("callCode")
;

ALTER TABLE "country" ADD CONSTRAINT "countryCode" UNIQUE ("countryCode")
;

ALTER TABLE "country" ADD CONSTRAINT "countryName" UNIQUE ("countryName")
;

-- Table address

CREATE TABLE "address"(
 "addressID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "addressName" Character varying(200),
 "mainStreet" Character varying(100) NOT NULL,
 "number" Character varying(5) NOT NULL DEFAULT 'N/A',
 "secondStreet" Character varying(100) NOT NULL,
 "references" Text,
 "zipCode" Character varying(8),
 "latitude" Double precision,
 "longitude" Double precision,
 "addressType" Smallint DEFAULT 10,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone,
 "isActive" Boolean DEFAULT true NOT NULL,
 "isFavourite" Boolean DEFAULT false,
 "cityID" Integer,
 "personID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "address"."addressID" IS 'Unique autoincremental identification for a person''s address'
;
COMMENT ON COLUMN "address"."addressName" IS 'Address name, for identification in the applications'
;
COMMENT ON COLUMN "address"."mainStreet" IS 'Name of the main street'
;
COMMENT ON COLUMN "address"."number" IS 'Number of house, also can be the identification'
;
COMMENT ON COLUMN "address"."secondStreet" IS 'Name of the secondary street'
;
COMMENT ON COLUMN "address"."references" IS 'Aditional information, or references that permits an easy identification of the house'
;
COMMENT ON COLUMN "address"."zipCode" IS 'Zip code if exists'
;
COMMENT ON COLUMN "address"."latitude" IS 'Latitude for GPS identification'
;
COMMENT ON COLUMN "address"."longitude" IS 'Longitude for GPS identification'
;
COMMENT ON COLUMN "address"."addressType" IS '1: Main address
2: Secondary address
3: Office or work place
4: Parent address
5: Grandparents address
6: Familiar address
7: Friend or relative address
8: Trusted Neighbor address
9: Trusted address
10: Other address'
;
COMMENT ON COLUMN "address"."registeredDate" IS 'Timestamp for date of registred address'
;
COMMENT ON COLUMN "address"."unregisteredDate" IS 'Timestamp for unregistration date'
;
COMMENT ON COLUMN "address"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "address"."isFavourite" IS 'true: favourite
false: is not favourite

Only one favourite address for a person'
;

-- Create indexes for table address

CREATE INDEX "address_city_ix" ON "address" ("cityID")
;

CREATE INDEX "address_person_ix" ON "address" ("personID")
;

-- Add keys for table address

ALTER TABLE "address" ADD CONSTRAINT "PK_address" PRIMARY KEY ("addressID")
;

-- Table role

CREATE TABLE "role"(
 "roleID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "roleCode" Character varying(10) NOT NULL,
 "roleName" Character varying(100) NOT NULL,
 "privileges" Smallint,
 "description" Text,
 "isActive" Boolean DEFAULT true NOT NULL,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "role"."roleID" IS 'Unique autogenerated role identification
'
;
COMMENT ON COLUMN "role"."roleCode" IS 'Code for the role, the code is not the same of the ID, it is generated for the application, and can be used for any institution to set all the parameters of their own configuration'
;
COMMENT ON COLUMN "role"."roleName" IS 'Name of the role'
;
COMMENT ON COLUMN "role"."privileges" IS 'If apply, the privileges must be setted in this value, while bigger the number, bigger the grans in the application'
;
COMMENT ON COLUMN "role"."description" IS 'Open field to store details of the role'
;
COMMENT ON COLUMN "role"."isActive" IS 'true: active
false: inactive

This rows can not be deleted because constraints'
;
COMMENT ON COLUMN "role"."registeredDate" IS 'Timestamp for registration date'
;
COMMENT ON COLUMN "role"."unregisteredDate" IS 'Timestamp for unregistration date'
;

-- Add keys for table role

ALTER TABLE "role" ADD CONSTRAINT "PK_role" PRIMARY KEY ("roleID")
;

ALTER TABLE "role" ADD CONSTRAINT "roleName" UNIQUE ("roleName")
;

ALTER TABLE "role" ADD CONSTRAINT "roleCode" UNIQUE ("roleCode")
;

-- Table student

CREATE TABLE "student"(
 "studentID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "studentCode" Character varying(10) NOT NULL,
 "status" Smallint DEFAULT 1 NOT NULL,
 "isActive" Boolean DEFAULT true NOT NULL,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone,
 "previousCourse" Integer,
 "actualCourse" Integer,
 "grade" Character varying(10),
 "details" Text,
 "ratting" Smallint DEFAULT 3 NOT NULL,
 "bio" Text,
 "personID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "student"."studentID" IS 'Unique autoincremental identification for a student'
;
COMMENT ON COLUMN "student"."studentCode" IS 'Unique student code for applications'
;
COMMENT ON COLUMN "student"."status" IS '1: Active
2:. Paid out
3: Unpaid
4: Suspending
5: Retired
6: Canceled'
;
COMMENT ON COLUMN "student"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "student"."registeredDate" IS 'Timestamp for registered date'
;
COMMENT ON COLUMN "student"."unregisteredDate" IS 'Timestamp for unregistered date'
;
COMMENT ON COLUMN "student"."previousCourse" IS 'If this field is null, means that the student is a new student in the system, if this field is equal to the actual course, means that the student is taking the course again'
;
COMMENT ON COLUMN "student"."actualCourse" IS 'Actual course of the student'
;
COMMENT ON COLUMN "student"."grade" IS 'Grade for a student'
;
COMMENT ON COLUMN "student"."details" IS 'Details to identify the student, this field is only for college or academic institution purpouse'
;
COMMENT ON COLUMN "student"."ratting" IS 'Evaluation or rating for a student

1: Very bad
2: Bad
3: Normal
4: Good
5: Very Good'
;
COMMENT ON COLUMN "student"."bio" IS 'Bio information of the student, contains achievements, goals, and so on'
;

-- Create indexes for table student

CREATE INDEX "student_person_ix" ON "student" ("personID")
;

-- Add keys for table student

ALTER TABLE "student" ADD CONSTRAINT "PK_student" PRIMARY KEY ("studentID")
;

ALTER TABLE "student" ADD CONSTRAINT "studentCode" UNIQUE ("studentCode")
;

-- Table teacher

CREATE TABLE "teacher"(
 "teacherID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "teacherCode" Character varying(10) NOT NULL,
 "status" Smallint,
 "isActive" Boolean DEFAULT true NOT NULL,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone,
 "details" Text,
 "bio" Text,
 "ratting" Smallint,
 "personID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "teacher"."teacherID" IS 'Unique autoincremental identification for a teacher'
;
COMMENT ON COLUMN "teacher"."teacherCode" IS 'Unique code for a teacher in the application'
;
COMMENT ON COLUMN "teacher"."status" IS '0: Without status
1: Normal status
2: Alert status
3: No access status (for teachers that don''t have interaction with the application)
4: With actions for review
5: With delayed work
6: Banned
7: Good ratted
8: Normal ratted
9: Bad ratted'
;
COMMENT ON COLUMN "teacher"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "teacher"."registeredDate" IS 'Timestamp for registration date'
;
COMMENT ON COLUMN "teacher"."unregisteredDate" IS 'Timestamp for unregistration date'
;
COMMENT ON COLUMN "teacher"."details" IS 'Details for the teachers review'
;
COMMENT ON COLUMN "teacher"."bio" IS 'Bio of the teachear, that explains goals, curriculum, achievements, and any information to describe to the teacher'
;
COMMENT ON COLUMN "teacher"."ratting" IS '1: Very poor
2: Poor
3: Medium
4: Good
5: Very good'
;

-- Create indexes for table teacher

CREATE INDEX "teacher_person_ix" ON "teacher" ("personID")
;

-- Add keys for table teacher

ALTER TABLE "teacher" ADD CONSTRAINT "PK_teacher" PRIMARY KEY ("teacherID")
;

ALTER TABLE "teacher" ADD CONSTRAINT "teacherCode" UNIQUE ("teacherCode")
;

-- Table enrrollment

CREATE TABLE "enrrollment"(
 "enrollmentID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "enrollmentCode" Character varying(10),
 "registrationDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "isActive" Boolean DEFAULT true NOT NULL,
 "statusChangeDate" Timestamp with time zone,
 "statusID" Integer,
 "studentID" Integer,
 "userID" Integer,
 "periodID" Integer,
 "courseID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "enrrollment"."enrollmentID" IS 'Unique autoincremental identification for a teacher'
;
COMMENT ON COLUMN "enrrollment"."enrollmentCode" IS 'Code for the enrrollment of a student'
;
COMMENT ON COLUMN "enrrollment"."registrationDate" IS 'Timestamp for registration date of an enrrollment'
;
COMMENT ON COLUMN "enrrollment"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "enrrollment"."statusChangeDate" IS 'Timestamp for status change '
;

-- Create indexes for table enrrollment

CREATE INDEX "enrrollment_status_ix" ON "enrrollment" ("statusID")
;

CREATE INDEX "enrrollment_student_ix" ON "enrrollment" ("studentID")
;

CREATE INDEX "enrrollment_user_is" ON "enrrollment" ("userID")
;

CREATE INDEX "enrrollment_academicPeriod_ix" ON "enrrollment" ("periodID")
;

CREATE INDEX "enrrollment_course_ix" ON "enrrollment" ("courseID")
;

-- Add keys for table enrrollment

ALTER TABLE "enrrollment" ADD CONSTRAINT "PK_enrrollment" PRIMARY KEY ("enrollmentID")
;

-- Table enrrollmentStatus

CREATE TABLE "enrrollmentStatus"(
 "statusID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "code" Smallint NOT NULL,
 "description" Character varying(150) NOT NULL,
 "isActive" Boolean DEFAULT true NOT NULL,
 "detail" Text
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "enrrollmentStatus"."statusID" IS 'Unique autoincremental identification for the status of enrrollment'
;
COMMENT ON COLUMN "enrrollmentStatus"."code" IS '1: Application
2: Registered
3: Wating pay confirmation
4: Paid
5: Waiting Legalization
6: Legalized
7: Rejected
8: Pay confirmation expired
9: Legalization confirmation expired
10: Applicant canceled
11: System canceled
12: Administration user canceled'
;
COMMENT ON COLUMN "enrrollmentStatus"."description" IS 'Description for the enrrollment status, it''s the field that will see the user in the application'
;
COMMENT ON COLUMN "enrrollmentStatus"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "enrrollmentStatus"."detail" IS 'Aditional information for the enrrollment process'
;

-- Add keys for table enrrollmentStatus

ALTER TABLE "enrrollmentStatus" ADD CONSTRAINT "PK_enrrollmentStatus" PRIMARY KEY ("statusID")
;

ALTER TABLE "enrrollmentStatus" ADD CONSTRAINT "description" UNIQUE ("description")
;

-- Table academicPeriod

CREATE TABLE "academicPeriod"(
 "periodID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "startPeriod" Date,
 "endPeriod" Date,
 "periodName" Character varying(150) NOT NULL,
 "isActive" Boolean DEFAULT true NOT NULL,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone,
 "detail" Text
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "academicPeriod"."periodID" IS 'Unique autoincremental identification for an academic period'
;
COMMENT ON COLUMN "academicPeriod"."startPeriod" IS 'Date to the start academic period'
;
COMMENT ON COLUMN "academicPeriod"."endPeriod" IS 'Date to the end of the academic perdiod
'
;
COMMENT ON COLUMN "academicPeriod"."periodName" IS 'Name to the academic period'
;
COMMENT ON COLUMN "academicPeriod"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "academicPeriod"."registeredDate" IS 'Timestamp for registration of academic period'
;
COMMENT ON COLUMN "academicPeriod"."unregisteredDate" IS 'Timestamp for the unregistration date'
;
COMMENT ON COLUMN "academicPeriod"."detail" IS 'Details or aditional information for the period'
;

-- Add keys for table academicPeriod

ALTER TABLE "academicPeriod" ADD CONSTRAINT "PK_academicPeriod" PRIMARY KEY ("periodID")
;

ALTER TABLE "academicPeriod" ADD CONSTRAINT "periodName" UNIQUE ("periodName")
;

-- Table course

CREATE TABLE "course"(
 "courseID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "courseCode" Character varying(10) NOT NULL,
 "courseName" Character varying(500) NOT NULL,
 "description" Text,
 "registratedDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregistratedDate" Timestamp with time zone
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "course"."courseID" IS 'Unique autoincremental identification for a course'
;
COMMENT ON COLUMN "course"."courseCode" IS 'Code for a course'
;
COMMENT ON COLUMN "course"."courseName" IS 'Name for the course'
;
COMMENT ON COLUMN "course"."description" IS 'Description or aditional information for the course'
;
COMMENT ON COLUMN "course"."registratedDate" IS 'Timestamp for registered date'
;
COMMENT ON COLUMN "course"."unregistratedDate" IS 'Timestamp for unregistered date'
;

-- Add keys for table course

ALTER TABLE "course" ADD CONSTRAINT "PK_course" PRIMARY KEY ("courseID")
;

ALTER TABLE "course" ADD CONSTRAINT "courseCode" UNIQUE ("courseCode")
;

-- Table subject

CREATE TABLE "subject"(
 "subjectID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "subjectCode" Character varying(10) NOT NULL,
 "subjectName" Character varying(250) NOT NULL,
 "description" Text NOT NULL,
 "details" Text,
 "registrationDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregistrationDate" Timestamp with time zone,
 "isActive" Boolean DEFAULT true NOT NULL,
 "gradeNeeded" Smallint,
 "gradeHomologation" Character varying(2),
 "gradeMinimun" Smallint NOT NULL,
 "gradeMaximun" Smallint NOT NULL,
 "teacherID" Integer,
 "contentID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "subject"."subjectID" IS 'Unique autoincremental identification for a subject'
;
COMMENT ON COLUMN "subject"."subjectCode" IS 'Unique coude for a subject'
;
COMMENT ON COLUMN "subject"."subjectName" IS 'Name for the subject'
;
COMMENT ON COLUMN "subject"."description" IS 'Description and details'
;
COMMENT ON COLUMN "subject"."details" IS 'Aditional details for academic regulations or administration'
;
COMMENT ON COLUMN "subject"."registrationDate" IS 'Timestamp for registration date'
;
COMMENT ON COLUMN "subject"."unregistrationDate" IS 'Timestamp for unregistration date'
;
COMMENT ON COLUMN "subject"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "subject"."gradeNeeded" IS 'Grate or note needet to approve the subject'
;
COMMENT ON COLUMN "subject"."gradeHomologation" IS 'Grade homologation'
;
COMMENT ON COLUMN "subject"."gradeMinimun" IS 'Minimun value allowed'
;
COMMENT ON COLUMN "subject"."gradeMaximun" IS 'Maximun grade value allowed'
;

-- Create indexes for table subject

CREATE INDEX "subject_teacher_ix" ON "subject" ("teacherID")
;

CREATE INDEX "subject_contenct_ix" ON "subject" ("contentID")
;

-- Add keys for table subject

ALTER TABLE "subject" ADD CONSTRAINT "PK_subject" PRIMARY KEY ("subjectID")
;

-- Table college

CREATE TABLE "college"(
 "collegeID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "collegeName" Character varying(500) NOT NULL,
 "collegeShowName" Text,
 "collegeCode" Character varying(10) NOT NULL,
 --"registeredDate" Timestamp DEFAULT current_timestamp NOT NULL,
 "detail" Text,
 "flag" Character varying(500),
 "mainColour" Character varying(20),
 "secondaryColour" Character varying(20),
 "status" Smallint NOT NULL,
 "isActive" Boolean DEFAULT true NOT NULL,
 "image" Character varying(500),
 "logo" Character varying(500),
 "description" Text,
 "registratedDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregistratedDate" Timestamp with time zone,
 "lastChangeDate" Timestamp with time zone,
 "changeDetail" Text NOT NULL,
 "lastChangeUser" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "college"."collegeID" IS 'Unique autoincremental identification for a college or academic institution'
;
COMMENT ON COLUMN "college"."collegeName" IS 'Name for the college or academic institution'
;
COMMENT ON COLUMN "college"."collegeShowName" IS 'Show name for the college or academic institution (in case of acronyms, sucursal, or long names)'
;
COMMENT ON COLUMN "college"."collegeCode" IS 'Code for a college or academic institution'
;
--COMMENT ON COLUMN "college"."registeredDate" IS 'Timestamp for registration date'
--;
COMMENT ON COLUMN "college"."detail" IS 'Tescription or detail for the college'
;
COMMENT ON COLUMN "college"."flag" IS 'Selection for a flag file'
;
COMMENT ON COLUMN "college"."mainColour" IS 'Main html colour code for the college'
;
COMMENT ON COLUMN "college"."secondaryColour" IS 'Secondary colour code'
;
COMMENT ON COLUMN "college"."status" IS '0: Free access
1: Restrictered Access
2: Normal Access
3: Pay Confirmation Alert
4: Pay Confirmation Request
5: Pay Confirmation Received
6: Access Denied
7: Alert in Access'
;
COMMENT ON COLUMN "college"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "college"."image" IS 'Picture for the college, could be buildings, students, intitutional images, etc.'
;
COMMENT ON COLUMN "college"."logo" IS 'Logo, shield or visual identifier for the institution'
;
COMMENT ON COLUMN "college"."description" IS 'Bio or description for college'
;
COMMENT ON COLUMN "college"."registratedDate" IS 'Timestamp for registration date'
;
COMMENT ON COLUMN "college"."unregistratedDate" IS 'Timestamp for unregistration date'
;
COMMENT ON COLUMN "college"."lastChangeDate" IS 'Timestamp for registration of changes to a college'
;
COMMENT ON COLUMN "college"."changeDetail" IS 'Detail for the changes, this field is mandatory if an user is registering changes to this table'
;
COMMENT ON COLUMN "college"."lastChangeUser" IS 'ID for the user that register changes in the college configuration'
;

-- Add keys for table college

ALTER TABLE "college" ADD CONSTRAINT "PK_college" PRIMARY KEY ("collegeID")
;

ALTER TABLE "college" ADD CONSTRAINT "collegeCode" UNIQUE ("collegeCode")
;

-- Table content

CREATE TABLE "content"(
 "contentID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "contedCode" Character varying(10) NOT NULL,
 "contendDetail" Text,
 "registratedDate" Timestamp with time zone NOT NULL,
 "unregisteradDate" Timestamp with time zone,
 "status" Boolean DEFAULT true NOT NULL,
 "image" Character varying(500)
)
WITH (
 autovacuum_enabled=true)
;

-- Add keys for table content

ALTER TABLE "content" ADD CONSTRAINT "PK_content" PRIMARY KEY ("contentID")
;

ALTER TABLE "content" ADD CONSTRAINT "contedCode" UNIQUE ("contedCode")
;

-- Table assistenceRegister

CREATE TABLE "assistenceRegister"(
 "AssistanceRegisterID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "date" Date DEFAULT current_date NOT NULL,
 "time" Time DEFAULT current_time NOT NULL,
 "period" Character varying(20),
 "detail" Text,
 "present" Boolean NOT NULL,
 "registrationDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "studentDetail" Text,
 "agentDetail" Text,
 "isJustified" Boolean DEFAULT false NOT NULL,
 "requiereAgentNotification" Boolean,
 "justifiedDate" Timestamp with time zone,
 "editedDate" Timestamp with time zone,
 "editedUser" Integer,
 "subjectID" Integer,
 "studentID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "assistenceRegister"."AssistanceRegisterID" IS 'Unique autoincremental identification for a register of assistance'
;
COMMENT ON COLUMN "assistenceRegister"."date" IS 'Date of register'
;
COMMENT ON COLUMN "assistenceRegister"."time" IS 'Hour of register'
;
COMMENT ON COLUMN "assistenceRegister"."period" IS 'Period time or enumeration, name or similar'
;
COMMENT ON COLUMN "assistenceRegister"."detail" IS 'If the registration needs aditional details'
;
COMMENT ON COLUMN "assistenceRegister"."present" IS 'true: strudent is present
false: studen is absent'
;
COMMENT ON COLUMN "assistenceRegister"."registrationDate" IS 'Timestamp for registration date'
;
COMMENT ON COLUMN "assistenceRegister"."studentDetail" IS 'Information for the student'
;
COMMENT ON COLUMN "assistenceRegister"."agentDetail" IS 'Information for parents or agent of an student'
;
COMMENT ON COLUMN "assistenceRegister"."isJustified" IS 'true: absent justified
false: absent not justified'
;
COMMENT ON COLUMN "assistenceRegister"."requiereAgentNotification" IS 'true: If the absent requieres a notification for parentes or agent
false if the absent not requieres a notification for parents or agent'
;
COMMENT ON COLUMN "assistenceRegister"."justifiedDate" IS 'Timestamp for justification date'
;
COMMENT ON COLUMN "assistenceRegister"."editedDate" IS 'Timestamp for edition in the register'
;
COMMENT ON COLUMN "assistenceRegister"."editedUser" IS 'ID for user tha edits the information of assistence register'
;

-- Create indexes for table assistenceRegister

CREATE INDEX "assistance_subject_ix" ON "assistenceRegister" ("subjectID")
;

CREATE INDEX "assistance_student_ix" ON "assistenceRegister" ("studentID")
;

-- Add keys for table assistenceRegister

ALTER TABLE "assistenceRegister" ADD CONSTRAINT "PK_assistenceRegister" PRIMARY KEY ("AssistanceRegisterID")
;

-- Table task

CREATE TABLE "task"(
 "taskID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "taskCode" Character varying(10) NOT NULL,
 "startDate" Timestamp with time zone NOT NULL,
 "endDate" Timestamp with time zone NOT NULL,
 "taskName" Character varying(300) NOT NULL,
 "taskDetail" Text NOT NULL,
 "isActive" Boolean DEFAULT true NOT NULL,
 "permitsDelay" Boolean,
 "maxDelay" Timestamp with time zone,
 "image" Character varying(500),
 "subjectID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "task"."taskID" IS 'Unique autoincremental identification for a task'
;
COMMENT ON COLUMN "task"."taskCode" IS 'Unique code for a task'
;
COMMENT ON COLUMN "task"."startDate" IS 'Timestamp for start date'
;
COMMENT ON COLUMN "task"."endDate" IS 'Timestamp for end date'
;
COMMENT ON COLUMN "task"."taskName" IS 'Name for the task'
;
COMMENT ON COLUMN "task"."taskDetail" IS 'Detail or information for the task'
;
COMMENT ON COLUMN "task"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "task"."permitsDelay" IS 'true: permits delay in delivery date
false: not permits delay in delivery date'
;
COMMENT ON COLUMN "task"."maxDelay" IS 'Timestamp for delay date'
;
COMMENT ON COLUMN "task"."image" IS 'Url for an image for the task (if it''s needed)'
;

-- Create indexes for table task

CREATE INDEX "task_subject_ix" ON "task" ("subjectID")
;

-- Add keys for table task

ALTER TABLE "task" ADD CONSTRAINT "PK_task" PRIMARY KEY ("taskID")
;

ALTER TABLE "task" ADD CONSTRAINT "taskCode" UNIQUE ("taskCode")
;

-- Table taskEvaluation

CREATE TABLE "taskEvaluation"(
 "taskEvaluationID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "taskScore" Double precision NOT NULL,
 "scoreHomolation" Character varying(5),
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "taskEvaluationDate" Timestamp with time zone NOT NULL,
 "studentDetail" Text,
 "isActive" Boolean DEFAULT true,
 "agentDetail" Text,
 "taskID" Integer,
 "studentID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "taskEvaluation"."taskEvaluationID" IS 'Unique autoincremental identification for an evaluation of a task'
;
COMMENT ON COLUMN "taskEvaluation"."taskScore" IS 'Score value'
;
COMMENT ON COLUMN "taskEvaluation"."scoreHomolation" IS 'Score homologated for the value'
;
COMMENT ON COLUMN "taskEvaluation"."registeredDate" IS 'Timestamp for registration'
;
COMMENT ON COLUMN "taskEvaluation"."taskEvaluationDate" IS 'Timestamp for the date that corresponds the registration'
;
COMMENT ON COLUMN "taskEvaluation"."studentDetail" IS 'Detail for the student (filled by teacher)'
;
COMMENT ON COLUMN "taskEvaluation"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "taskEvaluation"."agentDetail" IS 'Detail for the parents or agents (filled by the teacher)'
;

-- Create indexes for table taskEvaluation

CREATE INDEX "evaluation_task_ix" ON "taskEvaluation" ("taskID")
;

CREATE INDEX "evaluation_student_ix" ON "taskEvaluation" ("studentID")
;

-- Add keys for table taskEvaluation

ALTER TABLE "taskEvaluation" ADD CONSTRAINT "PK_taskEvaluation" PRIMARY KEY ("taskEvaluationID")
;

-- Table taskResource

CREATE TABLE "taskResource"(
 "taskResourceID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "resourceName" Character varying(250) NOT NULL,
 "resourceType" Character varying(500),
 "resourceDetail" Text NOT NULL,
 "image" Character varying(500),
 "isActive" Boolean,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone,
 "taskID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "taskResource"."taskResourceID" IS 'Unique autoincremental identification for a task resource'
;
COMMENT ON COLUMN "taskResource"."resourceName" IS 'Name for the resource'
;
COMMENT ON COLUMN "taskResource"."resourceType" IS 'Kind of resource, for example: URL, Page of a Book, Reading, Paper, Image, etc.'
;
COMMENT ON COLUMN "taskResource"."resourceDetail" IS 'Details for the resource'
;
COMMENT ON COLUMN "taskResource"."image" IS 'URL of the image if applies'
;
COMMENT ON COLUMN "taskResource"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "taskResource"."registeredDate" IS 'Timestamp for registration'
;
COMMENT ON COLUMN "taskResource"."unregisteredDate" IS 'Timestamp for unregistration'
;

-- Create indexes for table taskResource

CREATE INDEX "resource_task_is" ON "taskResource" ("taskID")
;

-- Add keys for table taskResource

ALTER TABLE "taskResource" ADD CONSTRAINT "PK_taskResource" PRIMARY KEY ("taskResourceID")
;

-- Table exam

CREATE TABLE "exam"(
 "examID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "startDate" Date NOT NULL,
 "startHour" Time NOT NULL,
 "endDate" Date NOT NULL,
 "endHour" Time NOT NULL,
 "minGrade" Smallint NOT NULL,
 "maxGrade" Smallint NOT NULL,
 "status" Smallint,
 "isDelayed" Boolean,
 "minDelayed" Smallint,
 "maxDelayed" Smallint,
 "delayedDate" Timestamp with time zone,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisterdDate" Timestamp with time zone,
 "isPartial" Boolean,
 "isFinal" Boolean,
 "isActive" Boolean DEFAULT true NOT NULL,
 "subjectID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "exam"."examID" IS 'Unique autoincremental identification for an exam'
;
COMMENT ON COLUMN "exam"."startDate" IS 'Start date'
;
COMMENT ON COLUMN "exam"."startHour" IS 'Start time'
;
COMMENT ON COLUMN "exam"."endDate" IS 'End date'
;
COMMENT ON COLUMN "exam"."endHour" IS 'End hour'
;
COMMENT ON COLUMN "exam"."minGrade" IS 'Max value for grade'
;
COMMENT ON COLUMN "exam"."maxGrade" IS 'Min value for grade'
;
COMMENT ON COLUMN "exam"."status" IS '0: Invalid
1: Valid
2: Test
4: Rapid Evaluaton
5: Formal Evaluation
6: Final Evaluation'
;
COMMENT ON COLUMN "exam"."isDelayed" IS 'true: delay allowed
false delay not allowed'
;
COMMENT ON COLUMN "exam"."minDelayed" IS 'Min value for delayed exam'
;
COMMENT ON COLUMN "exam"."maxDelayed" IS 'Max value for delayed exam'
;
COMMENT ON COLUMN "exam"."delayedDate" IS 'Timestamp for max delay allowed'
;
COMMENT ON COLUMN "exam"."registeredDate" IS 'Timestamp for registered date
'
;
COMMENT ON COLUMN "exam"."unregisterdDate" IS 'Timestamp for unregistered date'
;
COMMENT ON COLUMN "exam"."isPartial" IS 'true: is Partial
false: is not partial'
;
COMMENT ON COLUMN "exam"."isFinal" IS 'true: is final
false: is not final'
;
COMMENT ON COLUMN "exam"."isActive" IS 'true: active
false inactive'
;

-- Create indexes for table exam

CREATE INDEX "exam_subject_ix" ON "exam" ("subjectID")
;

-- Add keys for table exam

ALTER TABLE "exam" ADD CONSTRAINT "PK_exam" PRIMARY KEY ("examID")
;

-- Table examGrade

CREATE TABLE "examGrade"(
 "examGradeID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "grade" Smallint DEFAULT 0 NOT NULL,
 "homologatedGrade" Character varying(5),
 "gadeDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "gradeDetail" Text,
 "isGraded" Boolean DEFAULT false NOT NULL,
 "isModified" Boolean,
 "modificationDate" Timestamp with time zone,
 "modificacionUser" Integer,
 "previousGrade" Smallint,
 "studentID" Integer,
 "examID" Integer,
 "teacherID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "examGrade"."examGradeID" IS 'Unique autoincremental identification for an exam grade'
;
COMMENT ON COLUMN "examGrade"."grade" IS 'Grade value'
;
COMMENT ON COLUMN "examGrade"."homologatedGrade" IS 'Grade homologation'
;
COMMENT ON COLUMN "examGrade"."gadeDate" IS 'Timestamp for registration of grade'
;
COMMENT ON COLUMN "examGrade"."gradeDetail" IS 'Detail for the grade'
;
COMMENT ON COLUMN "examGrade"."isGraded" IS 'true: Approved
false: Rejected'
;
COMMENT ON COLUMN "examGrade"."isModified" IS 'true: is modified
false: is not modified'
;
COMMENT ON COLUMN "examGrade"."modificationDate" IS 'Timestamp for modification'
;
COMMENT ON COLUMN "examGrade"."modificacionUser" IS 'User ID for modification'
;
COMMENT ON COLUMN "examGrade"."previousGrade" IS 'Value after modification'
;

-- Create indexes for table examGrade

CREATE INDEX "examGrade_student_ix" ON "examGrade" ("studentID")
;

CREATE INDEX "examGrade_exam_ix" ON "examGrade" ("examID")
;

CREATE INDEX "examGrade_teacher_ix" ON "examGrade" ("teacherID")
;

-- Add keys for table examGrade

ALTER TABLE "examGrade" ADD CONSTRAINT "PK_examGrade" PRIMARY KEY ("examGradeID")
;

-- Table examRegister

CREATE TABLE "examRegister"(
 "registerID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "registeredUser" Integer NOT NULL,
 "status" Smallint NOT NULL,
 "reviewNumber" Smallint NOT NULL,
 "isReviewed" Boolean DEFAULT false NOT NULL,
 "lastStatus" Smallint,
 "lastStatusDate" Timestamp with time zone,
 "lastStatusUser" Integer,
 "reviewDetail" Text,
 "generalDetail" Text,
 "isRegistered" Boolean DEFAULT false NOT NULL,
 "studentID" Integer,
 "examID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "examRegister"."registerID" IS 'Unique autoincremental identification for a registration of an exam'
;
COMMENT ON COLUMN "examRegister"."registeredDate" IS 'Timestamp for registration of an exam'
;
COMMENT ON COLUMN "examRegister"."registeredUser" IS 'User ID for regsitration'
;
COMMENT ON COLUMN "examRegister"."status" IS '0: Not valid
1: Valid
2: Review
3; For modificaion
4: Saved
5: Sended
6: Final'
;
COMMENT ON COLUMN "examRegister"."reviewNumber" IS 'Number of reviews for exam register'
;
COMMENT ON COLUMN "examRegister"."isReviewed" IS 'true: is reviewed
false: is not reviewed'
;
COMMENT ON COLUMN "examRegister"."lastStatus" IS 'Value of last status'
;
COMMENT ON COLUMN "examRegister"."lastStatusDate" IS 'Timestamp for last status date'
;
COMMENT ON COLUMN "examRegister"."lastStatusUser" IS 'User ID for last status change'
;
COMMENT ON COLUMN "examRegister"."reviewDetail" IS 'Detail or information for a review'
;
COMMENT ON COLUMN "examRegister"."generalDetail" IS 'General details for the registration'
;
COMMENT ON COLUMN "examRegister"."isRegistered" IS 'true: is registered
false: is not registered'
;

-- Create indexes for table examRegister

CREATE INDEX "examRegister_student_ix" ON "examRegister" ("studentID")
;

CREATE INDEX "examRegister_exam_ix" ON "examRegister" ("examID")
;

-- Add keys for table examRegister

ALTER TABLE "examRegister" ADD CONSTRAINT "PK_examRegister" PRIMARY KEY ("registerID")
;

-- Table examQuestion

CREATE TABLE "examQuestion"(
 "questionID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "question" Text NOT NULL,
 "minGrade" Smallint,
 "maxGrade" Smallint,
 "image" Character varying(500),
 "registratedDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "status" Smallint NOT NULL,
 "isActive" Boolean DEFAULT true NOT NULL,
 "examID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "examQuestion"."questionID" IS 'Unique autoincremental identification for a question of an exam'
;
COMMENT ON COLUMN "examQuestion"."question" IS 'Question'
;
COMMENT ON COLUMN "examQuestion"."minGrade" IS 'Min value for the question'
;
COMMENT ON COLUMN "examQuestion"."maxGrade" IS 'Max value grade for the question'
;
COMMENT ON COLUMN "examQuestion"."image" IS 'If its needed, URL for an image'
;
COMMENT ON COLUMN "examQuestion"."registratedDate" IS 'Timestamp for registration'
;
COMMENT ON COLUMN "examQuestion"."status" IS '0: Invalid
1: Valid
2: Draft
3: Optional
4: Mandatory
5: Extra'
;
COMMENT ON COLUMN "examQuestion"."isActive" IS 'true: active
false: inactive'
;

-- Create indexes for table examQuestion

CREATE INDEX "question_exam_ix" ON "examQuestion" ("examID")
;

-- Add keys for table examQuestion

ALTER TABLE "examQuestion" ADD CONSTRAINT "PK_examQuestion" PRIMARY KEY ("questionID")
;

-- Table examAnswers

CREATE TABLE "examAnswers"(
 "answerID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "answer" Text NOT NULL,
 "grade" Smallint NOT NULL,
 "homologatedGrade" Character varying(5),
 "isCorrect" Boolean DEFAULT false NOT NULL,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "isActive" Boolean DEFAULT true NOT NULL,
 "status" Smallint,
 "detail" Text,
 "questionID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "examAnswers"."answerID" IS 'Unique autoincremental identification for a question answer'
;
COMMENT ON COLUMN "examAnswers"."answer" IS 'Answer for the question'
;
COMMENT ON COLUMN "examAnswers"."grade" IS 'Grade value'
;
COMMENT ON COLUMN "examAnswers"."homologatedGrade" IS 'Homologated grade value'
;
COMMENT ON COLUMN "examAnswers"."isCorrect" IS 'true: is correct answer
false: is incorrect answer'
;
COMMENT ON COLUMN "examAnswers"."registeredDate" IS 'Timestamp for registration'
;
COMMENT ON COLUMN "examAnswers"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "examAnswers"."status" IS '0: Invalid
1: Valid
2: Draft
3: Mandatory
4: Extra'
;
COMMENT ON COLUMN "examAnswers"."detail" IS 'Aditional detail'
;

-- Create indexes for table examAnswers

CREATE INDEX "answer_question_ix" ON "examAnswers" ("questionID")
;

-- Add keys for table examAnswers

ALTER TABLE "examAnswers" ADD CONSTRAINT "PK_examAnswers" PRIMARY KEY ("answerID")
;

-- Table studentAnswer

CREATE TABLE "studentAnswer"(
 "studentAnswerID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "selectedDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "grade" Smallint,
 "teacherDetails" Text,
 "agentDetails" Text,
 "studentDetails" Text,
 "isReviewed" Boolean DEFAULT false NOT NULL,
 "isActive" Boolean DEFAULT true NOT NULL,
 "answerID" Integer,
 "studentID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "studentAnswer"."studentAnswerID" IS 'Unique autoincremental identification for an answer that an studen choices'
;
COMMENT ON COLUMN "studentAnswer"."selectedDate" IS 'Timestamp for registration date'
;
COMMENT ON COLUMN "studentAnswer"."grade" IS 'Grade value'
;
COMMENT ON COLUMN "studentAnswer"."teacherDetails" IS 'Details for the teacher (student filled)'
;
COMMENT ON COLUMN "studentAnswer"."agentDetails" IS 'Details for parents and agents (filled by the teacher)'
;
COMMENT ON COLUMN "studentAnswer"."studentDetails" IS 'Details for the student (filled by the teacher)'
;
COMMENT ON COLUMN "studentAnswer"."isReviewed" IS 'true: is reviewed
false: is not reviewed'
;
COMMENT ON COLUMN "studentAnswer"."isActive" IS 'ture: active
false: inactive'
;

-- Create indexes for table studentAnswer

CREATE INDEX "studentAnswer_answer_ix" ON "studentAnswer" ("answerID")
;

CREATE INDEX "studentAnswer_student_ix" ON "studentAnswer" ("studentID")
;

-- Add keys for table studentAnswer

ALTER TABLE "studentAnswer" ADD CONSTRAINT "PK_studentAnswer" PRIMARY KEY ("studentAnswerID")
;

-- Table calificationAverange

CREATE TABLE "calificationAverange"(
 "averangeID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "averangeCalification" Double precision NOT NULL,
 "calificationHomologated" Character varying(5),
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "status" Smallint NOT NULL,
 "isActive" Boolean DEFAULT true NOT NULL,
 "isModified" Boolean DEFAULT false,
 "lastModified" Timestamp with time zone DEFAULT current_timestamp,
 "lastCalification" Double precision,
 "userModifies" Integer,
 "modificationDate" Timestamp with time zone,
 "studentDetail" Text,
 "agentDetail" Text,
 "averangelDetail" Text,
 "isFinal" Boolean DEFAULT false NOT NULL,
 "subjectID" Integer NOT NULL,
 "studentID" Integer NOT NULL,
 "teacherID" Integer NOT NULL
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "calificationAverange"."averangeID" IS 'Unique autoincremental identification for averange of califications for a student'
;
COMMENT ON COLUMN "calificationAverange"."averangeCalification" IS 'Value of the averange calification or score'
;
COMMENT ON COLUMN "calificationAverange"."calificationHomologated" IS 'Homologated value'
;
COMMENT ON COLUMN "calificationAverange"."registeredDate" IS 'Timestamp for registration date'
;
COMMENT ON COLUMN "calificationAverange"."status" IS 'Value for the status of calification
0: Inactive
1: Draft
2: Reviewed
3: In analysis
4: Approved
5: Published
6: Final
7: Rejected
8: At Issue'
;
COMMENT ON COLUMN "calificationAverange"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "calificationAverange"."isModified" IS 'true: if the calification was modified
false: if the calification wasn''t modified'
;
COMMENT ON COLUMN "calificationAverange"."lastModified" IS 'Timestamp for las modification'
;
COMMENT ON COLUMN "calificationAverange"."lastCalification" IS 'Last value of calification'
;
COMMENT ON COLUMN "calificationAverange"."userModifies" IS 'User ID that modifies the calification'
;
COMMENT ON COLUMN "calificationAverange"."modificationDate" IS 'Timestamp for modification'
;
COMMENT ON COLUMN "calificationAverange"."studentDetail" IS 'Detail for students (filled by the teacher)'
;
COMMENT ON COLUMN "calificationAverange"."agentDetail" IS 'Detail for parents or agents (filled by the teacher)'
;
COMMENT ON COLUMN "calificationAverange"."averangelDetail" IS 'General detail, for administration of college (filled by the teacher or administration)'
;

-- Create indexes for table calificationAverange

CREATE INDEX "averange_subject_ix" ON "calificationAverange" ("subjectID")
;

CREATE INDEX "avergange_student_ix" ON "calificationAverange" ("studentID")
;

CREATE INDEX "averange_teacher_ix" ON "calificationAverange" ("teacherID")
;

-- Add keys for table calificationAverange

ALTER TABLE "calificationAverange" ADD CONSTRAINT "PK_calificationAverange" PRIMARY KEY ("averangeID")
;

-- Table partial

CREATE TABLE "partial"(
 "patialID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "partialDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "isReview" Boolean DEFAULT false,
 "isActive" Boolean DEFAULT true NOT NULL,
 "isModified" Boolean DEFAULT false,
 "partialScore" Double precision NOT NULL,
 "valueHomologated" Character varying(5),
 "description" Text,
 "studentDetail" Text,
 "agentDetail" Text,
 "subjectID" Integer,
 "studentID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "partial"."patialID" IS 'Unique autoincremental identification for a partial exam'
;
COMMENT ON COLUMN "partial"."partialDate" IS 'Timestamp for the partial'
;
COMMENT ON COLUMN "partial"."isReview" IS 'true: is reviewed by the teacher
false: is not review by the teacher'
;
COMMENT ON COLUMN "partial"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "partial"."isModified" IS 'true: is Modified
false: is not modified'
;
COMMENT ON COLUMN "partial"."partialScore" IS 'Value for the score'
;
COMMENT ON COLUMN "partial"."valueHomologated" IS 'Homologated value'
;
COMMENT ON COLUMN "partial"."description" IS 'Description for the score (this field is filled by the teacher)'
;
COMMENT ON COLUMN "partial"."studentDetail" IS 'Details for the student''s reading (this field is filled by the teacher)'
;
COMMENT ON COLUMN "partial"."agentDetail" IS 'Details for the parent or agent (this field is filled by the teacher)'
;

-- Create indexes for table partial

CREATE INDEX "partial_subject_ix" ON "partial" ("subjectID")
;

CREATE INDEX "partial_student_ix" ON "partial" ("studentID")
;

-- Add keys for table partial

ALTER TABLE "partial" ADD CONSTRAINT "PK_partial" PRIMARY KEY ("patialID")
;

-- Table telephone

CREATE TABLE "telephone"(
 "telephoneID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "number" Character varying(10) NOT NULL,
 "phoneName" Character varying(100) NOT NULL,
 "detail" Text,
 "isFavourite" Boolean DEFAULT false NOT NULL,
 "isWork" Boolean,
 "phoneType" Smallint,
 "registerdDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone,
 "isActive" Boolean DEFAULT true NOT NULL,
 "operatorID" Integer,
 "personID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "telephone"."telephoneID" IS 'Unique autoincremental identification for a person''s telephone number'
;
COMMENT ON COLUMN "telephone"."number" IS 'Person''s telephone number'
;
COMMENT ON COLUMN "telephone"."phoneName" IS 'Name or alias for identification of the number in the list of numbers of a person'
;
COMMENT ON COLUMN "telephone"."detail" IS 'Aditional details for a person''s number, for example: ''Contact only weekends'''
;
COMMENT ON COLUMN "telephone"."isFavourite" IS 'true: is favourite number
false: is not favourite number

Only one favourite number for a person'
;
COMMENT ON COLUMN "telephone"."isWork" IS 'true: is a number for office or work place
false: is nota a number for office or work place'
;
COMMENT ON COLUMN "telephone"."phoneType" IS '1: Home
2: Cellphone
3: Office or Work place
4: Parent of family name
5: Friend of related to the family
6: Contact number
7: Backup number'
;
COMMENT ON COLUMN "telephone"."registerdDate" IS 'Timestamp for registration date'
;
COMMENT ON COLUMN "telephone"."unregisteredDate" IS 'Timestamp of the unregistration date'
;
COMMENT ON COLUMN "telephone"."isActive" IS 'true: active
false: inactive'
;

-- Create indexes for table telephone

CREATE INDEX "telephone_operator_ix" ON "telephone" ("operatorID")
;

CREATE INDEX "telephone_person_ix" ON "telephone" ("personID")
;

-- Add keys for table telephone

ALTER TABLE "telephone" ADD CONSTRAINT "PK_telephone" PRIMARY KEY ("telephoneID")
;

ALTER TABLE "telephone" ADD CONSTRAINT "number" UNIQUE ("number")
;

-- Table phoneOperator

CREATE TABLE "phoneOperator"(
 "operatorID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "operatorName" Character varying(50) NOT NULL,
 "detail" Text,
 "smsNumber" Character varying(15),
 "cost" Double precision,
 "observations" Text,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone,
 "isActive" Boolean NOT NULL
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "phoneOperator"."operatorID" IS 'Unique autoincremental identification for a cellphone operator'
;
COMMENT ON COLUMN "phoneOperator"."operatorName" IS 'Operator name'
;
COMMENT ON COLUMN "phoneOperator"."detail" IS 'Observations, details and more information'
;
COMMENT ON COLUMN "phoneOperator"."smsNumber" IS 'Number of SMS services'
;
COMMENT ON COLUMN "phoneOperator"."cost" IS 'Cost of one SMS '
;
COMMENT ON COLUMN "phoneOperator"."observations" IS 'Observations relative to the costs'
;
COMMENT ON COLUMN "phoneOperator"."registeredDate" IS 'Timestamp for registered date'
;
COMMENT ON COLUMN "phoneOperator"."unregisteredDate" IS 'Timestamp for unregistered or cancelation date'
;
COMMENT ON COLUMN "phoneOperator"."isActive" IS 'true: active
false: inactive'
;

-- Add keys for table phoneOperator

ALTER TABLE "phoneOperator" ADD CONSTRAINT "PK_phoneOperator" PRIMARY KEY ("operatorID")
;

ALTER TABLE "phoneOperator" ADD CONSTRAINT "operatorName" UNIQUE ("operatorName")
;

-- Table rating

CREATE TABLE "rating"(
 "ratingID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "rate" Smallint DEFAULT 3 NOT NULL,
 "comment" Text,
 "ratingDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "ratedStudentID" Integer,
 "ratedTeacherID" Integer,
 "studentRatesID" Integer,
 "teacherRatesID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "rating"."ratingID" IS 'Unique autoincremental identification for a rating'
;
COMMENT ON COLUMN "rating"."rate" IS '1: Very Bad
2: Bad
3: Normal
4: Good
5: Very Good
'
;
COMMENT ON COLUMN "rating"."comment" IS 'If needs more information for rating'
;
COMMENT ON COLUMN "rating"."ratingDate" IS 'Timestamp for rating date'
;

-- Create indexes for table rating

CREATE INDEX "ratedStudent_rate_ix" ON "rating" ("ratedStudentID")
;

CREATE INDEX "ratedTeacher_rate_ix" ON "rating" ("ratedTeacherID")
;

CREATE INDEX "studenRates_rate_ix" ON "rating" ("studentRatesID")
;

CREATE INDEX "teacherRates_rate_ix" ON "rating" ("teacherRatesID")
;

-- Add keys for table rating

ALTER TABLE "rating" ADD CONSTRAINT "PK_rating" PRIMARY KEY ("ratingID")
;

-- Table payment

CREATE TABLE "payment"(
 "paymentID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "value" Double precision NOT NULL,
 "currency" Character varying(10),
 "paymentDate" Timestamp with time zone NOT NULL,
 "paymentMaxDate" Timestamp with time zone,
 "status" Smallint DEFAULT 1 NOT NULL,
 "isActive" Boolean DEFAULT true,
 "isDelayed" Boolean,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "details" Text,
 "isWithTaxes" Boolean,
 "idPaymentMethod" Integer,
 "studentID" Integer,
 "personID" Integer,
 "userID" Integer,
 "paymentTypeID" Integer,
 "collegeID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "payment"."paymentID" IS 'Unique autoincremental identification for a payment'
;
COMMENT ON COLUMN "payment"."value" IS 'Valule for the payment'
;
COMMENT ON COLUMN "payment"."currency" IS 'Actual currency for the payment'
;
COMMENT ON COLUMN "payment"."paymentDate" IS 'Timestamp for normal payment date'
;
COMMENT ON COLUMN "payment"."paymentMaxDate" IS 'Timestamp for maximun payment date'
;
COMMENT ON COLUMN "payment"."status" IS '0: Invalid
1: Emmited
2: Notified
3: Accepted
4: Verification Proccess
5: Payment verified
6: Rejected
7: Rejected notified
8: Anulated
9: Rollback
10: Delayed
11: Delayed notification
12: Delayed payed
13: Delayed accepted
14: Delayed rejected
15: Unpaid'
;
COMMENT ON COLUMN "payment"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "payment"."isDelayed" IS 'true: delay allowed
false: delay allowed'
;
COMMENT ON COLUMN "payment"."registeredDate" IS 'Timestamp for registration date'
;
COMMENT ON COLUMN "payment"."details" IS 'Information for payment'
;
COMMENT ON COLUMN "payment"."isWithTaxes" IS 'true: The paymet applies taxes
false: the paymend does not applies taxe'
;

-- Create indexes for table payment

CREATE INDEX "payment_method_ix" ON "payment" ("idPaymentMethod")
;

CREATE INDEX "payment_student_ix" ON "payment" ("studentID")
;

CREATE INDEX "payment_person_ix" ON "payment" ("personID")
;

CREATE INDEX "payment_user_ix" ON "payment" ("userID")
;

CREATE INDEX "payment_type_ix" ON "payment" ("paymentTypeID")
;

CREATE INDEX "payment_college_ix" ON "payment" ("collegeID")
;

-- Add keys for table payment

ALTER TABLE "payment" ADD CONSTRAINT "PK_payment" PRIMARY KEY ("paymentID")
;

-- Table paymentMethod

CREATE TABLE "paymentMethod"(
 "idPaymentMethod" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "code" Character varying(10) NOT NULL,
 "methodName" Character varying(100) NOT NULL,
 "detail" Text,
 "isActive" Boolean DEFAULT true NOT NULL,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "paymentMethod"."idPaymentMethod" IS 'Unique autoincremental identification for a payment method'
;
COMMENT ON COLUMN "paymentMethod"."code" IS 'Unique coude for a payment'
;
COMMENT ON COLUMN "paymentMethod"."methodName" IS 'Payment Method name'
;
COMMENT ON COLUMN "paymentMethod"."detail" IS 'Payment description or details'
;
COMMENT ON COLUMN "paymentMethod"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "paymentMethod"."registeredDate" IS 'Timestamp for registration date'
;
COMMENT ON COLUMN "paymentMethod"."unregisteredDate" IS 'Timestamp for unregistration date'
;

-- Add keys for table paymentMethod

ALTER TABLE "paymentMethod" ADD CONSTRAINT "PK_paymentMethod" PRIMARY KEY ("idPaymentMethod")
;

ALTER TABLE "paymentMethod" ADD CONSTRAINT "code" UNIQUE ("code")
;

-- Table paymentDetail

CREATE TABLE "paymentDetail"(
 "idDetail" Integer NOT NULL,
 "quantity" Smallint NOT NULL,
 "cost" Double precision NOT NULL,
 "detail" Text,
 "registrationDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "isActive" Boolean DEFAULT true NOT NULL,
 "isModified" Boolean,
 "unregisteredDate" Timestamp with time zone,
 "paymentID" Integer
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "paymentDetail"."idDetail" IS 'Unique autoincremental identification for a payment detail'
;
COMMENT ON COLUMN "paymentDetail"."quantity" IS 'Quantity of products for this item'
;
COMMENT ON COLUMN "paymentDetail"."cost" IS 'Value of the product'
;
COMMENT ON COLUMN "paymentDetail"."detail" IS 'Description or detail for the item'
;
COMMENT ON COLUMN "paymentDetail"."registrationDate" IS 'Timestamp for registration Item
'
;
COMMENT ON COLUMN "paymentDetail"."isActive" IS 'true: is active
false: is not active
'
;
COMMENT ON COLUMN "paymentDetail"."isModified" IS 'true: is modified
false: is not modified
'
;
COMMENT ON COLUMN "paymentDetail"."unregisteredDate" IS 'Timestamp for unregistered date
'
;

-- Create indexes for table paymentDetail

CREATE INDEX "detail_payment_ix" ON "paymentDetail" ("paymentID")
;

-- Add keys for table paymentDetail

ALTER TABLE "paymentDetail" ADD CONSTRAINT "PK_paymentDetail" PRIMARY KEY ("idDetail")
;

-- Table paymentType

CREATE TABLE "paymentType"(
 "paymentTypeID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
  (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
 "paymentCode" Character varying(10) NOT NULL,
 "paymentTypeName" Character varying(100) NOT NULL,
 "detail" Text,
 "costValue" Double precision NOT NULL,
 "taxValue" Double precision,
 "isTaxed" Boolean DEFAULT false NOT NULL,
 "isActive" Boolean DEFAULT true NOT NULL,
 "observation" Text,
 "registeredDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
 "unregisteredDate" Timestamp with time zone,
 "isRecurrent" Boolean DEFAULT false NOT NULL,
 "recurrentType" Smallint DEFAULT 0
)
WITH (
 autovacuum_enabled=true)
;
COMMENT ON COLUMN "paymentType"."paymentTypeID" IS 'Unique autoincremental identification for a payment Type
'
;
COMMENT ON COLUMN "paymentType"."paymentCode" IS 'Unique code for the pay type'
;
COMMENT ON COLUMN "paymentType"."paymentTypeName" IS 'Name to describe the payment type'
;
COMMENT ON COLUMN "paymentType"."detail" IS 'Details to describe the payment type'
;
COMMENT ON COLUMN "paymentType"."costValue" IS 'Value of the unitary cost'
;
COMMENT ON COLUMN "paymentType"."taxValue" IS 'Value or percent of taxes'
;
COMMENT ON COLUMN "paymentType"."isTaxed" IS 'true: applies taxes
false: does not applies taxes'
;
COMMENT ON COLUMN "paymentType"."isActive" IS 'true: active
false: inactive'
;
COMMENT ON COLUMN "paymentType"."observation" IS 'Observations for additional information of payment type'
;
COMMENT ON COLUMN "paymentType"."registeredDate" IS 'Timestamp for creation date'
;
COMMENT ON COLUMN "paymentType"."unregisteredDate" IS 'Timestamp for delete date'
;
COMMENT ON COLUMN "paymentType"."isRecurrent" IS 'true: is a recurrent pay'
;
COMMENT ON COLUMN "paymentType"."recurrentType" IS '0: No recurrent
1: Daily
2: Weekly
3: Monthly
4: Bimonthly
5: Quarterly
6: Semester
7: Anual
'
;

-- Add keys for table paymentType

ALTER TABLE "paymentType" ADD CONSTRAINT "PK_paymentType" PRIMARY KEY ("paymentTypeID")
;

ALTER TABLE "paymentType" ADD CONSTRAINT "paymentCode" UNIQUE ("paymentCode")
;

ALTER TABLE "paymentType" ADD CONSTRAINT "paymentTypeName" UNIQUE ("paymentTypeName")
;
-- Create foreign keys (relationships) section ------------------------------------------------- 

ALTER TABLE "person" ADD CONSTRAINT "per_has_typ_fk" FOREIGN KEY ("personTypeID") REFERENCES "personType" ("personTypeID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "user" ADD CONSTRAINT "usr_is_per_fk" FOREIGN KEY ("personID") REFERENCES "person" ("personID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "address" ADD CONSTRAINT "add_isIn_cit_fk" FOREIGN KEY ("cityID") REFERENCES "city" ("cityID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "user" ADD CONSTRAINT "urs_has_rol_fk" FOREIGN KEY ("roleID") REFERENCES "role" ("roleID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "city" ADD CONSTRAINT "cit_isIn_prv_fk" FOREIGN KEY ("provinceID") REFERENCES "province" ("provinceID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "province" ADD CONSTRAINT "prv_isIn_cit_fk" FOREIGN KEY ("countryID") REFERENCES "country" ("countryID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "student" ADD CONSTRAINT "std_is_per_fk" FOREIGN KEY ("personID") REFERENCES "person" ("personID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "teacher" ADD CONSTRAINT "tch_is_per_fk" FOREIGN KEY ("personID") REFERENCES "person" ("personID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "enrrollment" ADD CONSTRAINT "enr_has_sta_fk" FOREIGN KEY ("statusID") REFERENCES "enrrollmentStatus" ("statusID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "enrrollment" ADD CONSTRAINT "stu_req_enr_fk" FOREIGN KEY ("studentID") REFERENCES "student" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "enrrollment" ADD CONSTRAINT "usr_reg_enr_fk" FOREIGN KEY ("userID") REFERENCES "user" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "enrrollment" ADD CONSTRAINT "enr_has_per_fk" FOREIGN KEY ("periodID") REFERENCES "academicPeriod" ("periodID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "enrrollment" ADD CONSTRAINT "cou_needs_enr_fk" FOREIGN KEY ("courseID") REFERENCES "course" ("courseID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "subject" ADD CONSTRAINT "tch_teachs_sub_fk" FOREIGN KEY ("teacherID") REFERENCES "teacher" ("teacherID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "user" ADD CONSTRAINT "usr_belongs_col_fk" FOREIGN KEY ("collegeID") REFERENCES "college" ("collegeID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "subject" ADD CONSTRAINT "sub_has_cnt_fk" FOREIGN KEY ("contentID") REFERENCES "content" ("contentID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "assistenceRegister" ADD CONSTRAINT "sub_has_asr_fk" FOREIGN KEY ("subjectID") REFERENCES "subject" ("subjectID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "assistenceRegister" ADD CONSTRAINT "std_reg_asr_fk" FOREIGN KEY ("studentID") REFERENCES "student" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "taskEvaluation" ADD CONSTRAINT "tsk_has_eva_fk" FOREIGN KEY ("taskID") REFERENCES "task" ("taskID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "taskEvaluation" ADD CONSTRAINT "std_has_tse_fk" FOREIGN KEY ("studentID") REFERENCES "student" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "exam" ADD CONSTRAINT "sub_take_exa_fk" FOREIGN KEY ("subjectID") REFERENCES "subject" ("subjectID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "examRegister" ADD CONSTRAINT "stu_reg_exa_fk" FOREIGN KEY ("studentID") REFERENCES "student" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "examGrade" ADD CONSTRAINT "std_has_grd_fk" FOREIGN KEY ("studentID") REFERENCES "student" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "examGrade" ADD CONSTRAINT "exm_has_grd_fk" FOREIGN KEY ("examID") REFERENCES "exam" ("examID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "examGrade" ADD CONSTRAINT "tch_gives_grd_fk" FOREIGN KEY ("teacherID") REFERENCES "teacher" ("teacherID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "examQuestion" ADD CONSTRAINT "exm_has_qst_fk" FOREIGN KEY ("examID") REFERENCES "exam" ("examID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "examAnswers" ADD CONSTRAINT "qst_has_ans_fk" FOREIGN KEY ("questionID") REFERENCES "examQuestion" ("questionID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "studentAnswer" ADD CONSTRAINT "asw_isRegistered_std_fk" FOREIGN KEY ("answerID") REFERENCES "examAnswers" ("answerID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "studentAnswer" ADD CONSTRAINT "std_choices_ans_fk" FOREIGN KEY ("studentID") REFERENCES "student" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "partial" ADD CONSTRAINT "sub_has_par_fk" FOREIGN KEY ("subjectID") REFERENCES "subject" ("subjectID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "partial" ADD CONSTRAINT "std_has_par_fk" FOREIGN KEY ("studentID") REFERENCES "student" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "calificationAverange" ADD CONSTRAINT "sbj_has_avg_fk" FOREIGN KEY ("subjectID") REFERENCES "subject" ("subjectID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "calificationAverange" ADD CONSTRAINT "std_has_avg_fk" FOREIGN KEY ("studentID") REFERENCES "student" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "calificationAverange" ADD CONSTRAINT "tch_reg_avg_fk" FOREIGN KEY ("teacherID") REFERENCES "teacher" ("teacherID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "telephone" ADD CONSTRAINT "tlf_has_ope_fk" FOREIGN KEY ("operatorID") REFERENCES "phoneOperator" ("operatorID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "rating" ADD CONSTRAINT "std_has_rat_fk" FOREIGN KEY ("ratedStudentID") REFERENCES "student" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "rating" ADD CONSTRAINT "tch_has_rat_fk" FOREIGN KEY ("ratedTeacherID") REFERENCES "teacher" ("teacherID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "rating" ADD CONSTRAINT "std_rates_rat_fk" FOREIGN KEY ("studentRatesID") REFERENCES "student" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "rating" ADD CONSTRAINT "tch_rates_rat_fk" FOREIGN KEY ("teacherRatesID") REFERENCES "teacher" ("teacherID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "task" ADD CONSTRAINT "sub_has_tsk_fk" FOREIGN KEY ("subjectID") REFERENCES "subject" ("subjectID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "taskResource" ADD CONSTRAINT "tsk_has_rsc_fk" FOREIGN KEY ("taskID") REFERENCES "task" ("taskID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "examRegister" ADD CONSTRAINT "exm_has_reg_fk" FOREIGN KEY ("examID") REFERENCES "exam" ("examID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "address" ADD CONSTRAINT "per_has_add_fk" FOREIGN KEY ("personID") REFERENCES "person" ("personID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "telephone" ADD CONSTRAINT "per_has_tel_fk" FOREIGN KEY ("personID") REFERENCES "person" ("personID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "payment" ADD CONSTRAINT "pay_has_met_fk" FOREIGN KEY ("idPaymentMethod") REFERENCES "paymentMethod" ("idPaymentMethod") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "payment" ADD CONSTRAINT "strd_generates_pay_fk" FOREIGN KEY ("studentID") REFERENCES "student" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "payment" ADD CONSTRAINT "prs_makes_pay_fk" FOREIGN KEY ("personID") REFERENCES "person" ("personID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "payment" ADD CONSTRAINT "usr_register_pay_fk" FOREIGN KEY ("userID") REFERENCES "user" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "paymentDetail" ADD CONSTRAINT "pay_has_det_fk" FOREIGN KEY ("paymentID") REFERENCES "payment" ("paymentID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "payment" ADD CONSTRAINT "pay_has_typ_fk" FOREIGN KEY ("paymentTypeID") REFERENCES "paymentType" ("paymentTypeID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "payment" ADD CONSTRAINT "col_reg_pay_fk" FOREIGN KEY ("collegeID") REFERENCES "college" ("collegeID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

 CREATE TABLE "errorLog"
(
    "errorLogID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
    "errorDate" Timestamp with time zone DEFAULT current_timestamp NOT NULL,
    "errorDetail" json NOT NULL,
    "errorModule" character varying(100) NOT NULL,
    CONSTRAINT "PK_errorLog" PRIMARY KEY ("errorLogID")
);

ALTER TABLE "errorLog"
    OWNER to postgres;
COMMENT ON TABLE public."errorLog"
    IS 'Table to store information about errors in NoNe SGA';
	
COMMENT ON COLUMN "errorLog"."errorLogID" IS 'Unique autoincremental ID for an error log registration';

COMMENT ON COLUMN "errorLog"."errorDate" IS 'Timestamp for the date and time of the error';

COMMENT ON COLUMN "errorLog"."errorDetail" IS 'Error detail and technical information for some error';

COMMENT ON COLUMN "errorLog"."errorModule" IS 'Module that has the error';

-- Table Session
CREATE TABLE "session"
(
    "sessionID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
    "sessionRoom" integer,
    "sessionDate" timestamp with time zone DEFAULT current_timestamp,
    "sessionToken" text,
    "sessionExpiration" character varying(50),
    "sessionIP" character varying(20),
    "sessionDevice" character varying(20),
    "sessionCode" character varying(50),
    "userID" integer NOT NULL,
    CONSTRAINT "session_PK" PRIMARY KEY ("sessionID")
);

COMMENT ON TABLE "session"
    IS 'Table for store the information for active users in a session of NoNe SGA';

COMMENT ON COLUMN "session"."sessionID" IS 'Unique autoincremental ID for a session registration';

COMMENT ON COLUMN "session"."sessionRoom" IS 'Rooms for manage of sessions';

COMMENT ON COLUMN "session"."sessionDate" IS 'Timestamp for the date of session';

COMMENT ON COLUMN "session"."sessionToken" IS 'Information of generated token for the session';

COMMENT ON COLUMN "session"."sessionExpiration" IS 'Information for the expiration of session';

COMMENT ON COLUMN "session"."sessionDevice" IS 'Name or identifyer for the device of the conection';

COMMENT ON COLUMN "session"."sessionCode" IS 'Unique code formed by date anda userID';

ALTER TABLE "session" ADD CONSTRAINT "userID" UNIQUE ("userID")
;

ALTER TABLE "session" ADD CONSTRAINT "ses_has_usr_fk" FOREIGN KEY ("userID") REFERENCES "user" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

CREATE INDEX "session_user_ix" ON "session" ("userID")
;

-- Table Audit Session
CREATE TABLE "auditSession"
(
    "auditID" Integer NOT NULL GENERATED ALWAYS AS IDENTITY 
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1 ),
    "sessionID" integer NOT NULL,
    "sessionRoom" integer,
    "sessionDate" timestamp with time zone DEFAULT current_timestamp,
    "sessionToken" text,
    "sessionExpiration" character varying(50),
    "sessionIP" character varying(20),
    "sessionDevice" character varying(20),
    "sessionCode" character varying(50),
    "sessionDetail" text,
    "userID" integer NOT NULL,
    CONSTRAINT "auditSession_PK" PRIMARY KEY ("auditID")
);

COMMENT ON TABLE "auditSession"
    IS 'Table for store the historical information for users that register a Login in NoNe SGA';

COMMENT ON COLUMN "auditSession"."auditID" IS 'Unique autoincremental ID for a session registration';

COMMENT ON COLUMN "auditSession"."sessionID" IS 'Value of sessionID to store in the audit table';

COMMENT ON COLUMN "auditSession"."sessionRoom" IS 'Rooms for manage of sessions';

COMMENT ON COLUMN "auditSession"."sessionDate" IS 'Timestamp for the date of session';

COMMENT ON COLUMN "auditSession"."sessionToken" IS 'Information of generated token for the session';

COMMENT ON COLUMN "auditSession"."sessionExpiration" IS 'Information for the expiration of session';

COMMENT ON COLUMN "auditSession"."sessionDevice" IS 'Name or identifyer for the device of the conection';

COMMENT ON COLUMN "auditSession"."sessionDetail" IS 'Detail or description of the operation in execution';

COMMENT ON COLUMN "auditSession"."sessionCode" IS 'Unique code formed by date anda userID';

ALTER TABLE "auditSession" ADD CONSTRAINT "aud_has_usr_fk" FOREIGN KEY ("userID") REFERENCES "user" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
;

CREATE INDEX "auditSession_user_ix" ON "auditSession" ("userID")
;