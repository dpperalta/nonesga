/*
	Database: 	PostgreSQL 10
	Project:	NoNeSGA
	Model:		NoNeSGA
	Created:	25/06/2020
	Modified:	02/07/2020
*/

-- Section for table creation

--
-- TOC entry 204 (class 1259 OID 16642)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    "userID" integer NOT NULL,
    nick character varying(100),
    pass character varying(400) NOT NULL,
    email character varying(80) NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status smallint,
    "unregisteredDate" timestamp with time zone,
    "lastLogin" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "personID" integer,
    "roleID" integer,
    "collegeID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 4502 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user"."userID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user"."userID" IS 'Unique autoincremental ID for a user';


--
-- TOC entry 4503 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user".nick; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".nick IS 'Nickname used to authenticate a user (in case of no mail convention)';


--
-- TOC entry 4504 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user".pass; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".pass IS 'Stores the password of the user';


--
-- TOC entry 4505 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user".email; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".email IS 'Unique email addres to acces into application';


--
-- TOC entry 4506 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user"."registeredDate" IS 'Similar as creationDate, stores registration date timestamp';


--
-- TOC entry 4507 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user".status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".status IS 'Stores a status code, the status is defined by API

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
10. Need admin verification';


--
-- TOC entry 4508 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user"."unregisteredDate" IS 'In case of cancellation, this field stores the timestamp of cancellation';


--
-- TOC entry 4509 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user"."lastLogin"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user"."lastLogin" IS 'Timestamp for the last loggin in the application';


--
-- TOC entry 4510 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user"."isActive" IS 'true: for active users
false:: for active users';


--
-- TOC entry 203 (class 1259 OID 16640)
-- Name: user_userID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."user" ALTER COLUMN "userID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."user_userID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 206 (class 1259 OID 16663)
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    "personID" integer NOT NULL,
    dni character varying(13) NOT NULL,
    birthdate date,
    names character varying(100) NOT NULL,
    "lastNames" character varying(100) NOT NULL,
    "completeName" character varying(200),
    image character varying(500),
    details text,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    "isActive" boolean DEFAULT true,
    bio text,
    votes integer,
	sex character varying(50) NOT NULL,
    "personTypeID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.person OWNER TO postgres;

--
-- TOC entry 4322 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person."personID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person."personID" IS 'Unique autoincremental identification for a person';


--
-- TOC entry 4323 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.dni; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person.dni IS 'Document National of Identification, is the unique number for a natural o juridic person';


--
-- TOC entry 4324 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.birthdate; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person.birthdate IS 'Date of birth of the person registered';


--
-- TOC entry 4325 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.names; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person.names IS 'Name or names of the person';


--
-- TOC entry 4326 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person."lastNames"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person."lastNames" IS 'Last names of the person
';


--
-- TOC entry 4327 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person."completeName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person."completeName" IS 'names + " " + lastNames are the complete name of a person';


--
-- TOC entry 4328 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.image; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person.image IS 'Stores the file than contain pictures If the person upload an photo or imagen of himself';


--
-- TOC entry 4329 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.details; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person.details IS 'Aditional details to describe the person';


--
-- TOC entry 4330 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person."registeredDate" IS 'Timestamp for the registration date';


--
-- TOC entry 4331 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person."unregisteredDate" IS 'Timestamp for the cancelation or unregistered time
';


--
-- TOC entry 4332 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person."isActive" IS 'true: active
false: inactive

A person shouldn''t deleted from the database';


--
-- TOC entry 4333 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.bio; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person.bio IS 'The bio that''s writed by the person, to show in his profile';


--
-- TOC entry 4334 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.votes; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person.votes IS 'A simply evaluation field to set a popularity level for a person';

--
-- TOC entry 4334 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.sex; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.person.sex IS 'Selection fot the sex of the person';

--
-- TOC entry 208 (class 1259 OID 16678)
-- Name: personType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."personType" (
    "personTypeID" integer NOT NULL,
    "personType" smallint NOT NULL,
    "typeName" character varying(50) NOT NULL,
    details character varying(500),
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    "isActive" boolean DEFAULT true NOT NULL
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."personType" OWNER TO postgres;

--
-- TOC entry 4335 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType"."personTypeID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."personType"."personTypeID" IS 'Unique autoincremental identification for a person type
';


--
-- TOC entry 4336 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType"."personType"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."personType"."personType" IS 'Types of person
1: Natural
2: Juridic
3: Agent
4: Father
5: Mother
6: Relative
7: Grandfather
8: Grandmother';


--
-- TOC entry 4337 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType"."typeName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."personType"."typeName" IS 'Name or description to the type of person';


--
-- TOC entry 4338 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType".details; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."personType".details IS 'Contain aditional details for the type of person';


--
-- TOC entry 4339 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."personType"."registeredDate" IS 'Timestamp for the registration date';


--
-- TOC entry 4340 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."personType"."unregisteredDate" IS 'Timestamp for the unregistration date';


--
-- TOC entry 4341 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."personType"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 207 (class 1259 OID 16676)
-- Name: personType_personTypeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."personType" ALTER COLUMN "personTypeID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."personType_personTypeID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 205 (class 1259 OID 16661)
-- Name: person_personID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.person ALTER COLUMN "personID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."person_personID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 210 (class 1259 OID 16696)
-- Name: city; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.city (
    "cityID" integer NOT NULL,
    "cityCode" character varying(10) NOT NULL,
    "cityName" character varying(200) NOT NULL,
    "cityDetail" text,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "provinceID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.city OWNER TO postgres;

--
-- TOC entry 4068 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."cityID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.city."cityID" IS 'Unique autoincremental identification for a city';


--
-- TOC entry 4069 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."cityCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.city."cityCode" IS 'Code assigned for a city';


--
-- TOC entry 4070 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."cityName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.city."cityName" IS 'Name for the city, is the real name that identifies a city in the app';


--
-- TOC entry 4071 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."cityDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.city."cityDetail" IS 'Aditional details for the city';


--
-- TOC entry 4072 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.city."registeredDate" IS 'Timestamp for registration date of the city';


--
-- TOC entry 4073 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.city."unregisteredDate" IS 'Timestamp for date of unregistered city';


--
-- TOC entry 4074 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.city."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 209 (class 1259 OID 16694)
-- Name: city_cityID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.city ALTER COLUMN "cityID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."city_cityID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 212 (class 1259 OID 16711)
-- Name: province; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.province (
    "provinceID" integer NOT NULL,
    "provinceCode" character varying(10) NOT NULL,
    "provinceName" character varying(200) NOT NULL,
    details text,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "countryID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.province OWNER TO postgres;

--
-- TOC entry 4351 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province."provinceID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.province."provinceID" IS 'Unique autoincremental identification for a province';


--
-- TOC entry 4352 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province."provinceCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.province."provinceCode" IS 'Code for the province';


--
-- TOC entry 4353 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province."provinceName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.province."provinceName" IS 'Name of the province';


--
-- TOC entry 4354 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province.details; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.province.details IS 'Aditional details or description for a province';


--
-- TOC entry 4355 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.province."registeredDate" IS 'Timestamp for registered date of the provicen';


--
-- TOC entry 4356 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.province."unregisteredDate" IS 'Timestamp for unregistered date of the provicen';


--
-- TOC entry 4357 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.province."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 211 (class 1259 OID 16709)
-- Name: province_provinceID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.province ALTER COLUMN "provinceID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."province_provinceID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 214 (class 1259 OID 16728)
-- Name: country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country (
    "countryID" integer NOT NULL,
    "countryCode" character varying(10) NOT NULL,
    "countryName" character varying(250) NOT NULL,
    "countryDetails" text,
    "isActive" boolean DEFAULT true NOT NULL,
    "callCode" character varying(4) NOT NULL,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    currency character varying(100),
    "currencySymbol" character varying(3),
    "longLanguage" character varying(100),
    "shortLanguage" character varying(5),
    status smallint
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.country OWNER TO postgres;

--
-- TOC entry 4108 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."countryID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.country."countryID" IS 'Unique autoincremental identification for a country';


--
-- TOC entry 4109 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."countryCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.country."countryCode" IS 'Unique code for international identification of a country';


--
-- TOC entry 4110 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."countryName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.country."countryName" IS 'Name of the country';


--
-- TOC entry 4111 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."countryDetails"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.country."countryDetails" IS 'Description or aditional details for a country';


--
-- TOC entry 4112 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.country."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4113 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."callCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.country."callCode" IS 'International code for cellphone calls';


--
-- TOC entry 4114 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.country."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 4115 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.country."unregisteredDate" IS 'Timestamp for unregistered date';


--
-- TOC entry 4116 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country.currency; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.country.currency IS 'Name of the actual currency';


--
-- TOC entry 4117 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."currencySymbol"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.country."currencySymbol" IS 'Symbol of the currency';


--
-- TOC entry 4118 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."longLanguage"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.country."longLanguage" IS 'Name of the mother langages';


--
-- TOC entry 4119 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."shortLanguage"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.country."shortLanguage" IS 'Short symbols for laguange(s)';


--
-- TOC entry 4120 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country.status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.country.status IS '0: Free, demo
1: Normal
2: Forbiden
3: Evaluation
4: Commercial
5: No Commercial';


--
-- TOC entry 213 (class 1259 OID 16726)
-- Name: country_countryID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.country ALTER COLUMN "countryID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."country_countryID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 216 (class 1259 OID 16746)
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    "addressID" integer NOT NULL,
    "addressName" character varying(200),
    "mainStreet" character varying(100) NOT NULL,
    number character varying(5) DEFAULT 'N/A'::character varying NOT NULL,
    "secondStreet" character varying(100) NOT NULL,
    "references" text,
    "zipCode" character varying(8),
    latitude double precision,
    longitude double precision,
    "addressType" smallint,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "isFavourite" boolean DEFAULT false,
    "cityID" integer,
    "personID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.address OWNER TO postgres;

--
-- TOC entry 4016 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."addressID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address."addressID" IS 'Unique autoincremental identification for a person''s address';


--
-- TOC entry 4017 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."addressName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address."addressName" IS 'Address name, for identification in the applications';


--
-- TOC entry 4018 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."mainStreet"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address."mainStreet" IS 'Name of the main street';


--
-- TOC entry 4019 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address.number; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address.number IS 'Number of house, also can be the identification';


--
-- TOC entry 4020 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."secondStreet"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address."secondStreet" IS 'Name of the secondary street';


--
-- TOC entry 4021 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."references"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address."references" IS 'Aditional information, or references that permits an easy identification of the house';


--
-- TOC entry 4022 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."zipCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address."zipCode" IS 'Zip code if exists';


--
-- TOC entry 4023 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address.latitude; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address.latitude IS 'Latitude for GPS identification';


--
-- TOC entry 4024 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address.longitude; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address.longitude IS 'Longitude for GPS identification';


--
-- TOC entry 4025 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."addressType"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address."addressType" IS '1: Main address
2: Secondary address
3: Office or work place
4: Parent address
5: Grandparents address
6: Familiar address
7: Friend or relative address
8: Trusted Neighbor address
9: Trusted address
10: Other address';


--
-- TOC entry 4026 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address."registeredDate" IS 'Timestamp for date of registred address';


--
-- TOC entry 4027 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 4028 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4029 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."isFavourite"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.address."isFavourite" IS 'true: favourite
false: is not favourite

Only one favourite address for a person';


--
-- TOC entry 215 (class 1259 OID 16744)
-- Name: address_addressID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.address ALTER COLUMN "addressID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."address_addressID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 218 (class 1259 OID 16759)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    "roleID" integer NOT NULL,
    "roleCode" character varying(10) NOT NULL,
    "roleName" character varying(100) NOT NULL,
    privileges smallint,
    description text,
    "isActive" boolean DEFAULT true NOT NULL,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 4389 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role."roleID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.role."roleID" IS 'Unique autogenerated role identification
';


--
-- TOC entry 4390 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role."roleCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.role."roleCode" IS 'Code for the role, the code is not the same of the ID, it is generated for the application, and can be used for any institution to set all the parameters of their own configuration';


--
-- TOC entry 4391 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role."roleName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.role."roleName" IS 'Name of the role';


--
-- TOC entry 4392 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role.privileges; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.role.privileges IS 'If apply, the privileges must be setted in this value, while bigger the number, bigger the grans in the application';


--
-- TOC entry 4393 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role.description; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.role.description IS 'Open field to store details of the role';


--
-- TOC entry 4394 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.role."isActive" IS 'true: active
false: inactive

This rows can not be deleted because constraints';


--
-- TOC entry 4395 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.role."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 4396 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.role."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 217 (class 1259 OID 16757)
-- Name: role_roleID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.role ALTER COLUMN "roleID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."role_roleID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 220 (class 1259 OID 16775)
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    "studentID" integer NOT NULL,
    "studentCode" character varying(10) NOT NULL,
    status smallint DEFAULT 1 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    "previousCourse" integer,
    "actualCourse" integer,
    grade character varying(10),
    details text,
    ratting smallint DEFAULT 3 NOT NULL,
    bio text,
    "personID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.student OWNER TO postgres;

--
-- TOC entry 4413 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."studentID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.student."studentID" IS 'Unique autoincremental identification for a student';


--
-- TOC entry 4414 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."studentCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.student."studentCode" IS 'Unique student code for applications';


--
-- TOC entry 4415 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student.status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.student.status IS '1: Active
2:. Paid out
3: Unpaid
4: Suspending
5: Retired
6: Canceled';


--
-- TOC entry 4416 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.student."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4417 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.student."registeredDate" IS 'Timestamp for registered date';


--
-- TOC entry 4418 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.student."unregisteredDate" IS 'Timestamp for unregistered date';


--
-- TOC entry 4419 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."previousCourse"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.student."previousCourse" IS 'If this field is null, means that the student is a new student in the system, if this field is equal to the actual course, means that the student is taking the course again';


--
-- TOC entry 4420 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."actualCourse"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.student."actualCourse" IS 'Actual course of the student';


--
-- TOC entry 4421 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student.grade; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.student.grade IS 'Grade for a student';


--
-- TOC entry 4422 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student.details; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.student.details IS 'Details to identify the student, this field is only for college or academic institution purpouse';


--
-- TOC entry 4423 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student.ratting; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.student.ratting IS 'Evaluation or rating for a student

1: Very bad
2: Bad
3: Normal
4: Good
5: Very Good';


--
-- TOC entry 4424 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student.bio; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.student.bio IS 'Bio information of the student, contains achievements, goals, and so on';


--
-- TOC entry 222 (class 1259 OID 16792)
-- Name: teacher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher (
    "teacherID" integer NOT NULL,
    "teacherCode" character varying(10) NOT NULL,
    status smallint,
    "isActive" boolean DEFAULT true NOT NULL,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    details text,
    bio text,
    ratting smallint,
    "personID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.teacher OWNER TO postgres;

--
-- TOC entry 4483 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher."teacherID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.teacher."teacherID" IS 'Unique autoincremental identification for a teacher';


--
-- TOC entry 4484 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher."teacherCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.teacher."teacherCode" IS 'Unique code for a teacher in the application';


--
-- TOC entry 4485 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher.status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.teacher.status IS '0: Without status
1: Normal status
2: Alert status
3: No access status (for teachers that don''t have interaction with the application)
4: With actions for review
5: With delayed work
6: Banned
7: Good ratted
8: Normal ratted
9: Bad ratted';


--
-- TOC entry 4486 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.teacher."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4487 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.teacher."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 4488 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.teacher."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 4489 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher.details; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.teacher.details IS 'Details for the teachers review';


--
-- TOC entry 4490 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher.bio; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.teacher.bio IS 'Bio of the teachear, that explains goals, curriculum, achievements, and any information to describe to the teacher';


--
-- TOC entry 4491 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher.ratting; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.teacher.ratting IS '1: Very poor
2: Poor
3: Medium
4: Good
5: Very good';


--
-- TOC entry 221 (class 1259 OID 16790)
-- Name: teacher_teacherID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.teacher ALTER COLUMN "teacherID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."teacher_teacherID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 224 (class 1259 OID 16807)
-- Name: enrollment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrollment (
    "enrollmentID" integer NOT NULL,
    "enrollmentCode" character varying(10),
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "statusChangeDate" timestamp with time zone,
    "statusID" integer,
    "studentID" integer,
    "userID" integer,
    "periodID" integer,
    "courseID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.enrollment OWNER TO postgres;

--
-- TOC entry 4128 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN enrollment."enrollmentID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.enrollment."enrollmentID" IS 'Unique autoincremental identification for a teacher';


--
-- TOC entry 4129 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN enrollment."enrollmentCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.enrollment."enrollmentCode" IS 'Code for the enrrollment of a student';


--
-- TOC entry 4130 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN enrollment."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.enrollment."registeredDate" IS 'Timestamp for registration date of an enrrollment';


--
-- TOC entry 4131 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN enrollment."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.enrollment."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4132 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN enrollment."statusChangeDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.enrollment."statusChangeDate" IS 'Timestamp for status change ';


--
-- TOC entry 4133 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN enrollment."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.enrollment."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 226 (class 1259 OID 16821)
-- Name: enrollmentStatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."enrollmentStatus" (
    "statusID" integer NOT NULL,
    code smallint NOT NULL,
    description character varying(150) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
	"unregisteredDate" timestamp with time zone,
    detail text
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."enrollmentStatus" OWNER TO postgres;

--
-- TOC entry 4134 (class 0 OID 0)
-- Dependencies: 226
-- Name: COLUMN "enrollmentStatus"."statusID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."enrollmentStatus"."statusID" IS 'Unique autoincremental identification for the status of enrrollment';


--
-- TOC entry 4135 (class 0 OID 0)
-- Dependencies: 226
-- Name: COLUMN "enrollmentStatus".code; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."enrollmentStatus".code IS '1: Application
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
12: Administration user canceled';


--
-- TOC entry 4136 (class 0 OID 0)
-- Dependencies: 226
-- Name: COLUMN "enrollmentStatus".description; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."enrollmentStatus".description IS 'Description for the enrrollment status, it''s the field that will see the user in the application';


--
-- TOC entry 4137 (class 0 OID 0)
-- Dependencies: 226
-- Name: COLUMN "enrollmentStatus"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."enrollmentStatus"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4138 (class 0 OID 0)
-- Dependencies: 226
-- Name: COLUMN "enrollmentStatus".detail; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."enrollmentStatus".detail IS 'Aditional information for the enrrollment process';


--
-- TOC entry 225 (class 1259 OID 16819)
-- Name: enrrollmentStatus_statusID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."enrollmentStatus" ALTER COLUMN "statusID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."enrrollmentStatus_statusID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 16805)
-- Name: enrrollment_enrollmentID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.enrollment ALTER COLUMN "enrollmentID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."enrrollment_enrollmentID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 228 (class 1259 OID 16834)
-- Name: academicPeriod; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."academicPeriod" (
    "periodID" integer NOT NULL,
    "startPeriod" date,
    "endPeriod" date,
    "periodName" character varying(150) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    detail text
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."academicPeriod" OWNER TO postgres;

--
-- TOC entry 4008 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."periodID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."academicPeriod"."periodID" IS 'Unique autoincremental identification for an academic period';


--
-- TOC entry 4009 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."startPeriod"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."academicPeriod"."startPeriod" IS 'Date to the start academic period';


--
-- TOC entry 4010 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."endPeriod"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."academicPeriod"."endPeriod" IS 'Date to the end of the academic perdiod
';


--
-- TOC entry 4011 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."periodName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."academicPeriod"."periodName" IS 'Name to the academic period';


--
-- TOC entry 4012 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."academicPeriod"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4013 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."academicPeriod"."registeredDate" IS 'Timestamp for registration of academic period';


--
-- TOC entry 4014 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."academicPeriod"."unregisteredDate" IS 'Timestamp for the unregistration date';


--
-- TOC entry 4015 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod".detail; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."academicPeriod".detail IS 'Details or aditional information for the period';


--
-- TOC entry 227 (class 1259 OID 16832)
-- Name: academicPeriod_periodID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."academicPeriod" ALTER COLUMN "periodID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."academicPeriod_periodID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 230 (class 1259 OID 16848)
-- Name: course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course (
    "courseID" integer NOT NULL,
    "courseCode" character varying(10) NOT NULL,
    "courseName" character varying(500) NOT NULL,
    description text,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.course OWNER TO postgres;

--
-- TOC entry 4121 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course."courseID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.course."courseID" IS 'Unique autoincremental identification for a course';


--
-- TOC entry 4122 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course."courseCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.course."courseCode" IS 'Code for a course';


--
-- TOC entry 4123 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course."courseName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.course."courseName" IS 'Name for the course';


--
-- TOC entry 4124 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course.description; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.course.description IS 'Description or aditional information for the course';


--
-- TOC entry 4125 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.course."registeredDate" IS 'Timestamp for registered date';


--
-- TOC entry 4126 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.course."unregisteredDate" IS 'Timestamp for unregistered date';


--
-- TOC entry 4127 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.course."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 229 (class 1259 OID 16846)
-- Name: course_courseID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.course ALTER COLUMN "courseID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."course_courseID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 232 (class 1259 OID 16861)
-- Name: subject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subject (
    "subjectID" integer NOT NULL,
    "subjectCode" character varying(10) NOT NULL,
    "subjectName" character varying(250) NOT NULL,
    description text NOT NULL,
    details text,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "gradeNeeded" smallint,
    "gradeHomologation" character varying(2),
    "gradeMinimun" smallint NOT NULL,
    "gradeMaximun" smallint NOT NULL,
    "teacherID" integer,
    "courseID" integer NOT NULL
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.subject OWNER TO postgres;

--
-- TOC entry 4438 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."subjectID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subject."subjectID" IS 'Unique autoincremental identification for a subject';


--
-- TOC entry 4439 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."subjectCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subject."subjectCode" IS 'Unique coude for a subject';


--
-- TOC entry 4440 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."subjectName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subject."subjectName" IS 'Name for the subject';


--
-- TOC entry 4441 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject.description; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subject.description IS 'Description and details';


--
-- TOC entry 4442 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject.details; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subject.details IS 'Aditional details for academic regulations or administration';


--
-- TOC entry 4443 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subject."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 4444 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subject."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 4445 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subject."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4446 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."gradeNeeded"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subject."gradeNeeded" IS 'Grate or note needet to approve the subject';


--
-- TOC entry 4447 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."gradeHomologation"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subject."gradeHomologation" IS 'Grade homologation';


--
-- TOC entry 4448 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."gradeMinimun"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subject."gradeMinimun" IS 'Minimun value allowed';


--
-- TOC entry 4449 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."gradeMaximun"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.subject."gradeMaximun" IS 'Maximun grade value allowed';


--
-- TOC entry 231 (class 1259 OID 16859)
-- Name: subject_subjectID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.subject ALTER COLUMN "subjectID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."subject_subjectID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 234 (class 1259 OID 16875)
-- Name: college; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.college (
    "collegeID" integer NOT NULL,
    "collegeName" character varying(500) NOT NULL,
    "collegeShowName" text,
    "collegeCode" character varying(10) NOT NULL,
    detail text,
    flag character varying(500),
    "mainColour" character varying(20),
    "secondaryColour" character varying(20),
    status smallint NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    image character varying(500),
    logo character varying(500),
    description text,
    "registratedDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregistratedDate" timestamp without time zone,
    "lastChangeDate" timestamp without time zone,
    "changeDetail" text NOT NULL,
    "lastChangeUser" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.college OWNER TO postgres;

--
-- TOC entry 4089 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."collegeID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college."collegeID" IS 'Unique autoincremental identification for a college or academic institution';


--
-- TOC entry 4090 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."collegeName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college."collegeName" IS 'Name for the college or academic institution';


--
-- TOC entry 4091 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."collegeShowName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college."collegeShowName" IS 'Show name for the college or academic institution (in case of acronyms, sucursal, or long names)';


--
-- TOC entry 4092 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."collegeCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college."collegeCode" IS 'Code for a college or academic institution';


--
-- TOC entry 4093 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college.detail; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college.detail IS 'Tescription or detail for the college';


--
-- TOC entry 4094 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college.flag; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college.flag IS 'Selection for a flag file';


--
-- TOC entry 4095 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."mainColour"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college."mainColour" IS 'Main html colour code for the college';


--
-- TOC entry 4096 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."secondaryColour"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college."secondaryColour" IS 'Secondary colour code';


--
-- TOC entry 4097 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college.status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college.status IS '0: Free access
1: Restrictered Access
2: Normal Access
3: Pay Confirmation Alert
4: Pay Confirmation Request
5: Pay Confirmation Received
6: Access Denied
7: Alert in Access';


--
-- TOC entry 4098 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4099 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college.image; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college.image IS 'Picture for the college, could be buildings, students, intitutional images, etc.';


--
-- TOC entry 4100 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college.logo; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college.logo IS 'Logo, shield or visual identifier for the institution';


--
-- TOC entry 4101 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college.description; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college.description IS 'Bio or description for college';


--
-- TOC entry 4102 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."registratedDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college."registratedDate" IS 'Timestamp for registration date';


--
-- TOC entry 4103 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."unregistratedDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college."unregistratedDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 4104 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."lastChangeDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college."lastChangeDate" IS 'Timestamp for registration of changes to a college';


--
-- TOC entry 4105 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."changeDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college."changeDetail" IS 'Detail for the changes, this field is mandatory if an user is registering changes to this table';


--
-- TOC entry 4106 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."lastChangeUser"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.college."lastChangeUser" IS 'ID for the user that register changes in the college configuration';


--
-- TOC entry 233 (class 1259 OID 16873)
-- Name: college_collegeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.college ALTER COLUMN "collegeID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."college_collegeID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 236 (class 1259 OID 16889)
-- Name: content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content (
    "contentID" integer NOT NULL,
    "contentCode" character varying(10) NOT NULL,
	"contentTitle" character varying(50) NOT NULL,
    "contentDetail" text,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    image character varying(500),
    "subjectID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.content OWNER TO postgres;

--
-- TOC entry 4107 (class 0 OID 0)
-- Dependencies: 236
-- Name: COLUMN content."contentTitle"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.content."contentTitle" IS 'Title for the content';


--
-- TOC entry 235 (class 1259 OID 16887)
-- Name: content_contentID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.content ALTER COLUMN "contentID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."content_contentID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 238 (class 1259 OID 16902)
-- Name: assistenceRegister; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."assistenceRegister" (
    "assistanceRegisterID" integer NOT NULL,
    "date" date DEFAULT CURRENT_DATE NOT NULL,
    "time" time without time zone DEFAULT CURRENT_TIME NOT NULL,
    period character varying(20),
    detail text,
	"justification" Text,
    present boolean NOT NULL,
    "registrationDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "studentDetail" text,
    "agentDetail" text,
    "isJustified" boolean DEFAULT false NOT NULL,
    "requiereAgentNotification" boolean,
    "justifiedDate" timestamp without time zone,
    "editedDate" timestamp without time zone,
    "editedUser" integer,
    "subjectID" integer,
    "studentID" integer,
    "classScheduleID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."assistenceRegister" OWNER TO postgres;

--
-- TOC entry 4030 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."AssistanceRegisterID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister"."AssistanceRegisterID" IS 'Unique autoincremental identification for a register of assistance';


--
-- TOC entry 4031 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister".date; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister".date IS 'Date of register';


--
-- TOC entry 4032 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."time"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister"."time" IS 'Hour of register';


--
-- TOC entry 4033 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister".period; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister".period IS 'Period time or enumeration, name or similar';


--
-- TOC entry 4034 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister".detail; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister".detail IS 'If the registration needs aditional details';


--
-- TOC entry 4035 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister".present; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister".present IS 'true: strudent is present
false: studen is absent';


--
-- TOC entry 4036 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."registrationDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister"."registrationDate" IS 'Timestamp for registration date';


--
-- TOC entry 4037 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."studentDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister"."studentDetail" IS 'Information for the student';


--
-- TOC entry 4038 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."agentDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister"."agentDetail" IS 'Information for parents or agent of an student';


--
-- TOC entry 4039 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."isJustified"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister"."isJustified" IS 'true: absent justified
false: absent not justified';


--
-- TOC entry 4040 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."requiereAgentNotification"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister"."requiereAgentNotification" IS 'true: If the absent requieres a notification for parentes or agent
false if the absent not requieres a notification for parents or agent';


--
-- TOC entry 4041 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."justifiedDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister"."justifiedDate" IS 'Timestamp for justification date';


--
-- TOC entry 4042 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."editedDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister"."editedDate" IS 'Timestamp for edition in the register';


--
-- TOC entry 4043 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."editedUser"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."assistenceRegister"."editedUser" IS 'ID for user tha edits the information of assistence register';


--
-- TOC entry 237 (class 1259 OID 16900)
-- Name: assistenceRegister_AssistanceRegisterID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."assistenceRegister" ALTER COLUMN "AssistanceRegisterID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."assistenceRegister_AssistanceRegisterID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 240 (class 1259 OID 16918)
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    "taskID" integer NOT NULL,
    "taskCode" character varying(10) NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    "taskName" character varying(300) NOT NULL,
    "taskDetail" text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "permitsDelay" boolean,
    "maxDelay" timestamp with time zone,
    image character varying(500),
    "subjectID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.task OWNER TO postgres;

--
-- TOC entry 4450 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."taskID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task."taskID" IS 'Unique autoincremental identification for a task';


--
-- TOC entry 4451 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."taskCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task."taskCode" IS 'Unique code for a task';


--
-- TOC entry 4452 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."startDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task."startDate" IS 'Timestamp for start date';


--
-- TOC entry 4453 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."endDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task."endDate" IS 'Timestamp for end date';


--
-- TOC entry 4454 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."taskName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task."taskName" IS 'Name for the task';


--
-- TOC entry 4455 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."taskDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task."taskDetail" IS 'Detail or information for the task';


--
-- TOC entry 4456 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4457 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."permitsDelay"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task."permitsDelay" IS 'true: permits delay in delivery date
false: not permits delay in delivery date';


--
-- TOC entry 4458 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."maxDelay"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task."maxDelay" IS 'Timestamp for delay date';


--
-- TOC entry 4459 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task.image; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.task.image IS 'Url for an image for the task (if it''s needed)';


--
-- TOC entry 242 (class 1259 OID 16932)
-- Name: taskEvaluation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."taskEvaluation" (
    "taskEvaluationID" integer NOT NULL,
    "taskScore" double precision NOT NULL,
    "scoreHomologation" character varying(5),
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"unregisteredDate" timestamp with time zone,
    "taskEvaluationDate" timestamp with time zone NOT NULL,
    "studentDetail" text,
    "isActive" boolean DEFAULT true,
    "agentDetail" text,
    "taskID" integer,
    "studentID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."taskEvaluation" OWNER TO postgres;

--
-- TOC entry 4460 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."taskEvaluationID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskEvaluation"."taskEvaluationID" IS 'Unique autoincremental identification for an evaluation of a task';


--
-- TOC entry 4461 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."taskScore"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskEvaluation"."taskScore" IS 'Score value';


--
-- TOC entry 4462 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."scoreHomologation"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskEvaluation"."scoreHomologation" IS 'Score homologated for the value';


--
-- TOC entry 4463 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskEvaluation"."registeredDate" IS 'Timestamp for registration';


--
-- TOC entry 4464 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."taskEvaluationDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskEvaluation"."taskEvaluationDate" IS 'Timestamp for the date that corresponds the registration';


--
-- TOC entry 4465 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."studentDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskEvaluation"."studentDetail" IS 'Detail for the student (filled by teacher)';


--
-- TOC entry 4466 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskEvaluation"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4467 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."agentDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskEvaluation"."agentDetail" IS 'Detail for the parents or agents (filled by the teacher)';


--
-- TOC entry 241 (class 1259 OID 16930)
-- Name: taskEvaluation_taskEvaluationID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."taskEvaluation" ALTER COLUMN "taskEvaluationID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."taskEvaluation_taskEvaluationID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 244 (class 1259 OID 16946)
-- Name: taskResource; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."taskResource" (
    "taskResourceID" integer NOT NULL,
    "resourceName" character varying(250) NOT NULL,
    "resourceType" character varying(500),
    "resourceDetail" text NOT NULL,
    "resource" character varying(500),
    "isActive" boolean DEFAULT true,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "taskID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."taskResource" OWNER TO postgres;

--
-- TOC entry 4475 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."taskResourceID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResource"."taskResourceID" IS 'Unique autoincremental identification for a task resource';


--
-- TOC entry 4476 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."resourceName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResource"."resourceName" IS 'Name for the resource';


--
-- TOC entry 4477 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."resourceType"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResource"."resourceType" IS 'Kind of resource, for example: URL, Page of a Book, Reading, Paper, Image, etc.';


--
-- TOC entry 4478 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."resourceDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResource"."resourceDetail" IS 'Details for the resource';


--
-- TOC entry 4479 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource".resource; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResource".resource IS 'URL of the resource (image, url, doc, etc.) if applies';


--
-- TOC entry 4480 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResource"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4481 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResource"."registeredDate" IS 'Timestamp for registration';


--
-- TOC entry 4482 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResource"."unregisteredDate" IS 'Timestamp for unregistration';


--
-- TOC entry 243 (class 1259 OID 16944)
-- Name: taskResource_taskResourceID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."taskResource" ALTER COLUMN "taskResourceID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."taskResource_taskResourceID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 246 (class 1259 OID 16958)
-- Name: exam; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exam (
    "examID" integer NOT NULL,
    "startDate" date NOT NULL,
    "startHour" time with time zone NOT NULL,
    "endDate" date NOT NULL,
    "endHour" time with time zone NOT NULL,
    "minGrade" smallint NOT NULL,
    "maxGrade" smallint NOT NULL,
    status smallint,
	topic text,
    "isDelayed" boolean,
    "minDelayed" smallint,
    "maxDelayed" smallint,
    "delayedDate" timestamp with time zone,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isPartial" boolean,
    "isFinal" boolean,
    "isActive" boolean DEFAULT true NOT NULL,
    "subjectID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.exam OWNER TO postgres;

--
-- TOC entry 4144 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."examID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."examID" IS 'Unique autoincremental identification for an exam';


--
-- TOC entry 4145 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."startDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."startDate" IS 'Start date';


--
-- TOC entry 4146 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."startHour"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."startHour" IS 'Start time';


--
-- TOC entry 4147 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."endDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."endDate" IS 'End date';


--
-- TOC entry 4148 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."endHour"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."endHour" IS 'End hour';


--
-- TOC entry 4149 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."minGrade"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."minGrade" IS 'Max value for grade';


--
-- TOC entry 4150 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."maxGrade"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."maxGrade" IS 'Min value for grade';


--
-- TOC entry 4151 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam.status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam.status IS '0: Invalid
1: Valid
2: Test
4: Rapid Evaluaton
5: Formal Evaluation
6: Final Evaluation';


--
-- TOC entry 4152 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."isDelayed"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."isDelayed" IS 'true: delay allowed
false delay not allowed';


--
-- TOC entry 4153 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."minDelayed"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."minDelayed" IS 'Min value for delayed exam';


--
-- TOC entry 4154 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."maxDelayed"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."maxDelayed" IS 'Max value for delayed exam';


--
-- TOC entry 4155 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."delayedDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."delayedDate" IS 'Timestamp for max delay allowed';


--
-- TOC entry 4156 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."registeredDate" IS 'Timestamp for registered date
';


--
-- TOC entry 4157 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."unregisteredDate" IS 'Timestamp for unregistered date';


--
-- TOC entry 4158 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."isPartial"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."isPartial" IS 'true: is Partial
false: is not partial';


--
-- TOC entry 4159 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."isFinal"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."isFinal" IS 'true: is final
false: is not final';


--
-- TOC entry 4160 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam."isActive" IS 'true: active
false inactive';


--
-- TOC entry 4161 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam.topic; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exam.topic IS 'Theme or topic about exam';

--
-- TOC entry 248 (class 1259 OID 16968)
-- Name: examGrade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."examGrade" (
    "examGradeID" integer NOT NULL,
    grade smallint DEFAULT 0 NOT NULL,
    "homologatedGrade" character varying(5),
    "gadeDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "gradeDetail" text,
    "isGraded" boolean DEFAULT false NOT NULL,
    "isModified" boolean,
    "modificationDate" timestamp with time zone,
    "modificacionUser" integer,
    "previousGrade" smallint,
    "studentID" integer,
    "examID" integer,
    "teacherID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."examGrade" OWNER TO postgres;

--
-- TOC entry 4172 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."examGradeID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examGrade"."examGradeID" IS 'Unique autoincremental identification for an exam grade';


--
-- TOC entry 4173 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade".grade; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examGrade".grade IS 'Grade value';


--
-- TOC entry 4174 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."homologatedGrade"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examGrade"."homologatedGrade" IS 'Grade homologation';


--
-- TOC entry 4175 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."gadeDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examGrade"."gadeDate" IS 'Timestamp for registration of grade';


--
-- TOC entry 4176 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."gradeDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examGrade"."gradeDetail" IS 'Detail for the grade';


--
-- TOC entry 4177 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."isGraded"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examGrade"."isGraded" IS 'true: Approved
false: Rejected';


--
-- TOC entry 4178 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."isModified"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examGrade"."isModified" IS 'true: is modified
false: is not modified';


--
-- TOC entry 4179 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."modificationDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examGrade"."modificationDate" IS 'Timestamp for modification';


--
-- TOC entry 4180 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."modificacionUser"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examGrade"."modificacionUser" IS 'User ID for modification';


--
-- TOC entry 4181 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."previousGrade"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examGrade"."previousGrade" IS 'Value after modification';


--
-- TOC entry 247 (class 1259 OID 16966)
-- Name: examGrade_examGradeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."examGrade" ALTER COLUMN "examGradeID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."examGrade_examGradeID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 250 (class 1259 OID 16984)
-- Name: examRegister; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."examRegister" (
    "registerID" integer NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"unregistereDate" timestamp with time zone,
    "userID" integer NOT NULL,
    status smallint NOT NULL,
    "reviewNumber" smallint NOT NULL,
    "isReviewed" boolean DEFAULT false NOT NULL,
    "lastStatus" smallint,
    "lastStatusDate" timestamp with time zone,
    "lastStatusUser" integer,
    "reviewDetail" text,
    "generalDetail" text,
	"isActive" boolean DEFAULT true NOT NULL,
    "isRegistered" boolean DEFAULT false NOT NULL,
    "studentID" integer,
    "examID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."examRegister" OWNER TO postgres;

--
-- TOC entry 4190 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."registerID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examRegister"."registerID" IS 'Unique autoincremental identification for a registration of an exam';


--
-- TOC entry 4191 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examRegister"."registeredDate" IS 'Timestamp for registration of an exam';


--
-- TOC entry 4192 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."userID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examRegister"."userID" IS 'User ID for regsitration';


--
-- TOC entry 4193 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister".status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examRegister".status IS '0: Not valid
1: Valid
2: Review
3; For modificaion
4: Saved
5: Sended
6: Final';


--
-- TOC entry 4194 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."reviewNumber"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examRegister"."reviewNumber" IS 'Number of reviews for exam register';


--
-- TOC entry 4195 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."isReviewed"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examRegister"."isReviewed" IS 'true: is reviewed
false: is not reviewed';


--
-- TOC entry 4196 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."lastStatus"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examRegister"."lastStatus" IS 'Value of last status';


--
-- TOC entry 4197 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."lastStatusDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examRegister"."lastStatusDate" IS 'Timestamp for last status date';


--
-- TOC entry 4198 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."lastStatusUser"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examRegister"."lastStatusUser" IS 'User ID for last status change';


--
-- TOC entry 4199 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."reviewDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examRegister"."reviewDetail" IS 'Detail or information for a review';


--
-- TOC entry 4200 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."generalDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examRegister"."generalDetail" IS 'General details for the registration';


--
-- TOC entry 4201 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."isRegistered"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examRegister"."isRegistered" IS 'true: is registered
false: is not registered';


--
-- TOC entry 249 (class 1259 OID 16982)
-- Name: examRegister_registerID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."examRegister" ALTER COLUMN "registerID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."examRegister_registerID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 252 (class 1259 OID 16999)
-- Name: examQuestion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."examQuestion" (
    "questionID" integer NOT NULL,
    question text NOT NULL,
    "minGrade" smallint,
    "maxGrade" smallint,
    image character varying(500),
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"unregisteredDate" timestamp with time zone,
    status smallint NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "examID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."examQuestion" OWNER TO postgres;

--
-- TOC entry 4182 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion"."questionID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examQuestion"."questionID" IS 'Unique autoincremental identification for a question of an exam';


--
-- TOC entry 4183 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion".question; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examQuestion".question IS 'Question';


--
-- TOC entry 4184 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion"."minGrade"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examQuestion"."minGrade" IS 'Min value for the question';


--
-- TOC entry 4185 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion"."maxGrade"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examQuestion"."maxGrade" IS 'Max value grade for the question';


--
-- TOC entry 4186 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion".image; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examQuestion".image IS 'If its needed, URL for an image';


--
-- TOC entry 4187 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examQuestion"."registeredDate" IS 'Timestamp for registration';


--
-- TOC entry 4188 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion".status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examQuestion".status IS '0: Invalid
1: Valid
2: Draft
3: Optional
4: Mandatory
5: Extra';


--
-- TOC entry 4189 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examQuestion"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 251 (class 1259 OID 16997)
-- Name: examQuestion_questionID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."examQuestion" ALTER COLUMN "questionID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."examQuestion_questionID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 254 (class 1259 OID 17012)
-- Name: examAnswer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."examAnswer" (
    "answerID" integer NOT NULL,
    answer text NOT NULL,
    grade smallint NOT NULL,
    "homologatedGrade" character varying(5),
    "isCorrect" boolean DEFAULT false NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    status smallint,
    detail text,
    "questionID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."examAnswer" OWNER TO postgres;

--
-- TOC entry 4162 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer"."answerID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examAnswer"."answerID" IS 'Unique autoincremental identification for a question answer';


--
-- TOC entry 4163 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer".answer; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examAnswer".answer IS 'Answer for the question';


--
-- TOC entry 4164 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer".grade; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examAnswer".grade IS 'Grade value';


--
-- TOC entry 4165 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer"."homologatedGrade"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examAnswer"."homologatedGrade" IS 'Homologated grade value';


--
-- TOC entry 4166 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer"."isCorrect"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examAnswer"."isCorrect" IS 'true: is correct answer
false: is incorrect answer';


--
-- TOC entry 4167 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examAnswer"."registeredDate" IS 'Timestamp for registration';


--
-- TOC entry 4168 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examAnswer"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4169 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer".status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examAnswer".status IS '0: Invalid
1: Valid
2: Draft
3: Mandatory
4: Extra';


--
-- TOC entry 4170 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer".detail; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examAnswer".detail IS 'Aditional detail';


--
-- TOC entry 4171 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."examAnswer"."unregisteredDate" IS 'Timestamp for unregistered date';


--
-- TOC entry 253 (class 1259 OID 17010)
-- Name: examAnswers_answerID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."examAnswer" ALTER COLUMN "answerID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."examAnswers_answerID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 245 (class 1259 OID 16956)
-- Name: exam_examID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.exam ALTER COLUMN "examID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."exam_examID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 256 (class 1259 OID 17026)
-- Name: studentAnswer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."studentAnswer" (
    "studentAnswerID" integer NOT NULL,
    "selectedDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    grade double precision,
    "teacherDetails" text,
    "agentDetails" text,
    "studentDetails" text,
    "isReviewed" boolean DEFAULT false NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
	"isPublished" boolean DEFAULT false NOT NULL,
    "publishedDate" timestamp with time zone,
    "studentAnswer" text,
    "tryNumber" smallint DEFAULT 1 NOT NULL,
    "teacherUpdates" timestamp with time zone,
    "studentUpdates" timestamp with time zone,
    "agentUpdates" timestamp with time zone,
    "answerID" integer,
    "studentID" integer,
    "questionID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."studentAnswer" OWNER TO postgres;

--
-- TOC entry 4425 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."studentAnswerID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."studentAnswer"."studentAnswerID" IS 'Unique autoincremental identification for an answer that an studen choices';


--
-- TOC entry 4426 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."selectedDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."studentAnswer"."selectedDate" IS 'Timestamp for registration date';


--
-- TOC entry 4427 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer".grade; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."studentAnswer".grade IS 'Grade value';


--
-- TOC entry 4428 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."teacherDetails"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."studentAnswer"."teacherDetails" IS 'Details for the teacher (student filled)';


--
-- TOC entry 4429 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."agentDetails"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."studentAnswer"."agentDetails" IS 'Details for parents and agents (filled by the teacher)';


--
-- TOC entry 4430 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."studentDetails"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."studentAnswer"."studentDetails" IS 'Details for the student (filled by the teacher)';


--
-- TOC entry 4431 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."isReviewed"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."studentAnswer"."isReviewed" IS 'true: is reviewed
false: is not reviewed';


--
-- TOC entry 4432 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."studentAnswer"."isActive" IS 'ture: active
false: inactive';


--
-- TOC entry 4433 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."studentAnswer"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."studentAnswer"."studentAnswer" IS 'If the answer is not a selection, this field is filled with the answer of the student';


--
-- TOC entry 4434 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."tryNumber"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."studentAnswer"."tryNumber" IS 'Number of attempts or editions for the answer';


--
-- TOC entry 4435 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."teacherUpdates"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."studentAnswer"."teacherUpdates" IS 'Timestamps for teacher updates';


--
-- TOC entry 4436 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."studentUpdates"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."studentAnswer"."studentUpdates" IS 'Timestamp for student updates';


--
-- TOC entry 4437 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."agentUpdates"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."studentAnswer"."agentUpdates" IS 'Timestamp for agent updates';


--
-- TOC entry 255 (class 1259 OID 17024)
-- Name: studentAnswer_studentAnswerID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."studentAnswer" ALTER COLUMN "studentAnswerID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."studentAnswer_studentAnswerID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 258 (class 1259 OID 17041)
-- Name: calificationAverange; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."calificationAverange" (
    "averangeID" integer NOT NULL,
    "averangeCalification" double precision NOT NULL,
    "calificationHomologated" character varying(5),
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"unregisteredDate" timestamp with time zone,
    status smallint NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "isModified" boolean DEFAULT false,
    "lastModified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "lastCalification" double precision,
    "userModifies" integer,
    "modificationDate" timestamp with time zone,
    "studentDetail" text,
    "agentDetail" text,
    "averangelDetail" text,
    "isFinal" boolean DEFAULT false NOT NULL,
    "subjectID" integer NOT NULL,
    "studentID" integer NOT NULL,
    "teacherID" integer NOT NULL
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."calificationAverange" OWNER TO postgres;

--
-- TOC entry 4054 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."averangeID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange"."averangeID" IS 'Unique autoincremental identification for averange of califications for a student';


--
-- TOC entry 4055 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."averangeCalification"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange"."averangeCalification" IS 'Value of the averange calification or score';


--
-- TOC entry 4056 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."calificationHomologated"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange"."calificationHomologated" IS 'Homologated value';


--
-- TOC entry 4057 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange"."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 4058 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange".status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange".status IS 'Value for the status of calification
0: Inactive
1: Draft
2: Reviewed
3: In analysis
4: Approved
5: Published
6: Final
7: Rejected
8: At Issue';


--
-- TOC entry 4059 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4060 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."isModified"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange"."isModified" IS 'true: if the calification was modified
false: if the calification wasn''t modified';


--
-- TOC entry 4061 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."lastModified"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange"."lastModified" IS 'Timestamp for las modification';


--
-- TOC entry 4062 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."lastCalification"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange"."lastCalification" IS 'Last value of calification';


--
-- TOC entry 4063 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."userModifies"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange"."userModifies" IS 'User ID that modifies the calification';


--
-- TOC entry 4064 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."modificationDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange"."modificationDate" IS 'Timestamp for modification';


--
-- TOC entry 4065 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."studentDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange"."studentDetail" IS 'Detail for students (filled by the teacher)';


--
-- TOC entry 4066 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."agentDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange"."agentDetail" IS 'Detail for parents or agents (filled by the teacher)';


--
-- TOC entry 4067 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."averangelDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."calificationAverange"."averangelDetail" IS 'General detail, for administration of college (filled by the teacher or administration)';


--
-- TOC entry 257 (class 1259 OID 17039)
-- Name: calificationAverange_averangeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."calificationAverange" ALTER COLUMN "averangeID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."calificationAverange_averangeID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 260 (class 1259 OID 17059)
-- Name: partial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partial (
    "patialID" integer NOT NULL,
    "partialDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isReview" boolean DEFAULT false,
    "isActive" boolean DEFAULT true NOT NULL,
    "isModified" boolean DEFAULT false,
    "partialScore" double precision NOT NULL,
    "valueHomologated" character varying(5),
    description text,
    "studentDetail" text,
    "agentDetail" text,
	"registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"unregisteredDate" timestamp with time zone,
    "subjectID" integer,
    "studentID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.partial OWNER TO postgres;

--
-- TOC entry 4267 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."patialID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.partial."patialID" IS 'Unique autoincremental identification for a partial exam';


--
-- TOC entry 4268 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."partialDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.partial."partialDate" IS 'Timestamp for the partial';


--
-- TOC entry 4269 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."isReview"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.partial."isReview" IS 'true: is reviewed by the teacher
false: is not review by the teacher';


--
-- TOC entry 4270 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.partial."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4271 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."isModified"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.partial."isModified" IS 'true: is Modified
false: is not modified';


--
-- TOC entry 4272 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."partialScore"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.partial."partialScore" IS 'Value for the score';


--
-- TOC entry 4273 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."valueHomologated"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.partial."valueHomologated" IS 'Homologated value';


--
-- TOC entry 4274 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial.description; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.partial.description IS 'Description for the score (this field is filled by the teacher)';


--
-- TOC entry 4275 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."studentDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.partial."studentDetail" IS 'Details for the student''s reading (this field is filled by the teacher)';


--
-- TOC entry 4276 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."agentDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.partial."agentDetail" IS 'Details for the parent or agent (this field is filled by the teacher)';


--
-- TOC entry 259 (class 1259 OID 17057)
-- Name: partial_patialID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.partial ALTER COLUMN "patialID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."partial_patialID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 262 (class 1259 OID 17075)
-- Name: telephone; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.telephone (
    "telephoneID" integer NOT NULL,
    number character varying(10) NOT NULL,
    "phoneName" character varying(100) NOT NULL,
    detail text,
    "isFavourite" boolean DEFAULT false NOT NULL,
    "isWork" boolean,
    "phoneType" smallint,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "operatorID" integer,
    "personID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.telephone OWNER TO postgres;

--
-- TOC entry 4492 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."telephoneID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.telephone."telephoneID" IS 'Unique autoincremental identification for a person''s telephone number';


--
-- TOC entry 4493 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone.number; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.telephone.number IS 'Person''s telephone number';


--
-- TOC entry 4494 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."phoneName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.telephone."phoneName" IS 'Name or alias for identification of the number in the list of numbers of a person';


--
-- TOC entry 4495 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone.detail; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.telephone.detail IS 'Aditional details for a person''s number, for example: ''Contact only weekends''';


--
-- TOC entry 4496 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."isFavourite"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.telephone."isFavourite" IS 'true: is favourite number
false: is not favourite number

Only one favourite number for a person';


--
-- TOC entry 4497 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."isWork"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.telephone."isWork" IS 'true: is a number for office or work place
false: is nota a number for office or work place';


--
-- TOC entry 4498 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."phoneType"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.telephone."phoneType" IS '1: Home
2: Cellphone
3: Office or Work place
4: Parent of family name
5: Friend of related to the family
6: Contact number
7: Backup number';


--
-- TOC entry 4499 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.telephone."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 4500 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.telephone."unregisteredDate" IS 'Timestamp of the unregistration date';


--
-- TOC entry 4501 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.telephone."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 261 (class 1259 OID 17073)
-- Name: telephone_telephoneID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.telephone ALTER COLUMN "telephoneID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."telephone_telephoneID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 264 (class 1259 OID 17092)
-- Name: phoneOperator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."phoneOperator" (
    "operatorID" integer NOT NULL,
    "operatorName" character varying(50) NOT NULL,
    detail text,
    "smsNumber" character varying(15),
    cost double precision,
    observations text,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    "isActive" boolean DEFAULT true NOT NULL
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."phoneOperator" OWNER TO postgres;

--
-- TOC entry 4342 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator"."operatorID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."phoneOperator"."operatorID" IS 'Unique autoincremental identification for a cellphone operator';


--
-- TOC entry 4343 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator"."operatorName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."phoneOperator"."operatorName" IS 'Operator name';


--
-- TOC entry 4344 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator".detail; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."phoneOperator".detail IS 'Observations, details and more information';


--
-- TOC entry 4345 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator"."smsNumber"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."phoneOperator"."smsNumber" IS 'Number of SMS services';


--
-- TOC entry 4346 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator".cost; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."phoneOperator".cost IS 'Cost of one SMS ';


--
-- TOC entry 4347 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator".observations; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."phoneOperator".observations IS 'Observations relative to the costs';


--
-- TOC entry 4348 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."phoneOperator"."registeredDate" IS 'Timestamp for registered date';


--
-- TOC entry 4349 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."phoneOperator"."unregisteredDate" IS 'Timestamp for unregistered or cancelation date';


--
-- TOC entry 4350 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."phoneOperator"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 263 (class 1259 OID 17090)
-- Name: phoneOperator_operatorID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."phoneOperator" ALTER COLUMN "operatorID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."phoneOperator_operatorID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 266 (class 1259 OID 17105)
-- Name: rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rating (
    "ratingID" integer NOT NULL,
    rate smallint DEFAULT 3 NOT NULL,
    comment text,
    "ratingDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "ratedStudentID" integer,
    "ratedTeacherID" integer,
    "studentRatesID" integer,
    "teacherRatesID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.rating OWNER TO postgres;

--
-- TOC entry 4358 (class 0 OID 0)
-- Dependencies: 266
-- Name: COLUMN rating."ratingID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.rating."ratingID" IS 'Unique autoincremental identification for a rating';


--
-- TOC entry 4359 (class 0 OID 0)
-- Dependencies: 266
-- Name: COLUMN rating.rate; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.rating.rate IS '1: Very Bad
2: Bad
3: Normal
4: Good
5: Very Good
';


--
-- TOC entry 4360 (class 0 OID 0)
-- Dependencies: 266
-- Name: COLUMN rating.comment; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.rating.comment IS 'If needs more information for rating';


--
-- TOC entry 4361 (class 0 OID 0)
-- Dependencies: 266
-- Name: COLUMN rating."ratingDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.rating."ratingDate" IS 'Timestamp for rating date';


--
-- TOC entry 265 (class 1259 OID 17103)
-- Name: rating_ratingID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.rating ALTER COLUMN "ratingID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."rating_ratingID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 268 (class 1259 OID 17121)
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment (
    "paymentID" integer NOT NULL,
    value double precision NOT NULL,
    currency character varying(10),
    "paymentDate" timestamp with time zone NOT NULL,
    "paymentMaxDate" timestamp with time zone,
    status smallint DEFAULT 1 NOT NULL,
    "isActive" boolean DEFAULT true,
    "isDelayed" boolean,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"unregistered" timestamp with time zone,
    details text,
    "isWithTaxes" boolean,
    "idPaymentMethod" integer,
    "studentID" integer,
    "personID" integer,
    "userID" integer,
    "paymentTypeID" integer,
    "collegeID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.payment OWNER TO postgres;

--
-- TOC entry 4277 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."paymentID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.payment."paymentID" IS 'Unique autoincremental identification for a payment';


--
-- TOC entry 4278 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment.value; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.payment.value IS 'Valule for the payment';


--
-- TOC entry 4279 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment.currency; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.payment.currency IS 'Actual currency for the payment';


--
-- TOC entry 4280 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."paymentDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.payment."paymentDate" IS 'Timestamp for normal payment date';


--
-- TOC entry 4281 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."paymentMaxDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.payment."paymentMaxDate" IS 'Timestamp for maximun payment date';


--
-- TOC entry 4282 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment.status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.payment.status IS '0: Invalid
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
15: Unpaid';


--
-- TOC entry 4283 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.payment."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4284 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."isDelayed"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.payment."isDelayed" IS 'true: delay allowed
false: delay allowed';


--
-- TOC entry 4285 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.payment."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 4286 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment.details; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.payment.details IS 'Information for payment';


--
-- TOC entry 4287 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."isWithTaxes"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.payment."isWithTaxes" IS 'true: The paymet applies taxes
false: the paymend does not applies taxe';

--
-- TOC entry 270 (class 1259 OID 17140)
-- Name: paymentMethod; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."paymentMethod" (
    "idPaymentMethod" integer NOT NULL,
    code character varying(10) NOT NULL,
    "methodName" character varying(100) NOT NULL,
    detail text,
    "isActive" boolean DEFAULT true NOT NULL,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."paymentMethod" OWNER TO postgres;

--
-- TOC entry 4296 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod"."idPaymentMethod"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentMethod"."idPaymentMethod" IS 'Unique autoincremental identification for a payment method';


--
-- TOC entry 4297 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod".code; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentMethod".code IS 'Unique coude for a payment';


--
-- TOC entry 4298 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod"."methodName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentMethod"."methodName" IS 'Payment Method name';


--
-- TOC entry 4299 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod".detail; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentMethod".detail IS 'Payment description or details';


--
-- TOC entry 4300 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentMethod"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4301 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentMethod"."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 4302 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentMethod"."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 269 (class 1259 OID 17138)
-- Name: paymentMethod_idPaymentMethod_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."paymentMethod" ALTER COLUMN "idPaymentMethod" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."paymentMethod_idPaymentMethod_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 271 (class 1259 OID 17152)
-- Name: paymentDetail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."paymentDetail" (
    "idDetail" integer NOT NULL,
    quantity smallint NOT NULL,
    cost double precision NOT NULL,
    detail text,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "isModified" boolean,
    "unregisteredDate" timestamp with time zone,
    "paymentID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."paymentDetail" OWNER TO postgres;

--
-- TOC entry 4288 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail"."idDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentDetail"."idDetail" IS 'Unique autoincremental identification for a payment detail';


--
-- TOC entry 4289 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail".quantity; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentDetail".quantity IS 'Quantity of products for this item';


--
-- TOC entry 4290 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail".cost; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentDetail".cost IS 'Value of the product';


--
-- TOC entry 4291 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail".detail; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentDetail".detail IS 'Description or detail for the item';


--
-- TOC entry 4292 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail"."registrationDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentDetail"."registrationDate" IS 'Timestamp for registration Item
';


--
-- TOC entry 4293 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentDetail"."isActive" IS 'true: is active
false: is not active
';


--
-- TOC entry 4294 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail"."isModified"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentDetail"."isModified" IS 'true: is modified
false: is not modified
';


--
-- TOC entry 4295 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentDetail"."unregisteredDate" IS 'Timestamp for unregistered date
';


--
-- TOC entry 273 (class 1259 OID 17165)
-- Name: paymentType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."paymentType" (
    "paymentTypeID" integer NOT NULL,
    "paymentCode" character varying(10) NOT NULL,
    "paymentTypeName" character varying(100) NOT NULL,
    detail text,
    "costValue" double precision NOT NULL,
    "taxValue" double precision,
    "isTaxed" boolean DEFAULT false NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    observation text,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    "isRecurrent" boolean DEFAULT false NOT NULL,
    "recurrentType" smallint DEFAULT 0
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."paymentType" OWNER TO postgres;

--
-- TOC entry 4309 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."paymentTypeID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentType"."paymentTypeID" IS 'Unique autoincremental identification for a payment Type
';


--
-- TOC entry 4310 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."paymentCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentType"."paymentCode" IS 'Unique code for the pay type';


--
-- TOC entry 4311 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."paymentTypeName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentType"."paymentTypeName" IS 'Name to describe the payment type';


--
-- TOC entry 4312 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType".detail; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentType".detail IS 'Details to describe the payment type';


--
-- TOC entry 4313 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."costValue"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentType"."costValue" IS 'Value of the unitary cost';


--
-- TOC entry 4314 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."taxValue"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentType"."taxValue" IS 'Value or percent of taxes';


--
-- TOC entry 4315 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."isTaxed"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentType"."isTaxed" IS 'true: applies taxes
false: does not applies taxes';


--
-- TOC entry 4316 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentType"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4317 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType".observation; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentType".observation IS 'Observations for additional information of payment type';


--
-- TOC entry 4318 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentType"."registeredDate" IS 'Timestamp for creation date';


--
-- TOC entry 4319 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentType"."unregisteredDate" IS 'Timestamp for delete date';


--
-- TOC entry 4320 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."isRecurrent"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentType"."isRecurrent" IS 'true: is a recurrent pay';


--
-- TOC entry 4321 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."recurrentType"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentType"."recurrentType" IS '0: No recurrent
1: Daily
2: Weekly
3: Monthly
4: Bimonthly
5: Quarterly
6: Semester
7: Anual
';


--
-- TOC entry 272 (class 1259 OID 17163)
-- Name: paymentType_paymentTypeID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."paymentType" ALTER COLUMN "paymentTypeID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."paymentType_paymentTypeID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 370 (class 1259 OID 27079)
-- Name: group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."group" (
    "groupID" integer NOT NULL,
    "groupName" character varying(100) NOT NULL,
    "groupDescription" text,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true,
    "groupRoom" text,
    "teacherID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."group" OWNER TO postgres;

--
-- TOC entry 4231 (class 0 OID 0)
-- Dependencies: 370
-- Name: COLUMN "group"."groupID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."group"."groupID" IS 'Unique identificator for a group';


--
-- TOC entry 4232 (class 0 OID 0)
-- Dependencies: 370
-- Name: COLUMN "group"."groupName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."group"."groupName" IS 'Name for the group';


--
-- TOC entry 4233 (class 0 OID 0)
-- Dependencies: 370
-- Name: COLUMN "group"."groupDescription"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."group"."groupDescription" IS 'Description for the group';


--
-- TOC entry 4234 (class 0 OID 0)
-- Dependencies: 370
-- Name: COLUMN "group"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."group"."registeredDate" IS 'Timestamp for date of creation of the group';


--
-- TOC entry 4235 (class 0 OID 0)
-- Dependencies: 370
-- Name: COLUMN "group"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."group"."unregisteredDate" IS 'Timestamp for date of logical erease for the group';


--
-- TOC entry 4236 (class 0 OID 0)
-- Dependencies: 370
-- Name: COLUMN "group"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."group"."isActive" IS 'true: group active
false: group inactive';


--
-- TOC entry 4237 (class 0 OID 0)
-- Dependencies: 370
-- Name: COLUMN "group"."groupRoom"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."group"."groupRoom" IS 'Socket room for the group';

--
-- TOC entry 372 (class 1259 OID 27094)
-- Name: groupUser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."groupUser" (
    "groupUserID" integer NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "isAdministrator" boolean,
    "isBlocked" boolean,
    "isMuted" boolean,
    "groupID" integer,
    "userID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."groupUser" OWNER TO postgres;

--
-- TOC entry 4249 (class 0 OID 0)
-- Dependencies: 372
-- Name: COLUMN "groupUser"."groupUserID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupUser"."groupUserID" IS 'Unique identificator for a user in a group';


--
-- TOC entry 4250 (class 0 OID 0)
-- Dependencies: 372
-- Name: COLUMN "groupUser"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupUser"."registeredDate" IS 'Timestamp for the date were the user was registered
';


--
-- TOC entry 4251 (class 0 OID 0)
-- Dependencies: 372
-- Name: COLUMN "groupUser"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupUser"."unregisteredDate" IS 'Timestamp for the date of unregister of an user';


--
-- TOC entry 4252 (class 0 OID 0)
-- Dependencies: 372
-- Name: COLUMN "groupUser"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupUser"."isActive" IS 'true: user is active in group
false: user is inactive in group';


--
-- TOC entry 4253 (class 0 OID 0)
-- Dependencies: 372
-- Name: COLUMN "groupUser"."isAdministrator"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupUser"."isAdministrator" IS 'true: user is administrator of the group
false: user is a particpant only';


--
-- TOC entry 4254 (class 0 OID 0)
-- Dependencies: 372
-- Name: COLUMN "groupUser"."isBlocked"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupUser"."isBlocked" IS 'true: user blocked to read and write in group
false: user not blocked';


--
-- TOC entry 4255 (class 0 OID 0)
-- Dependencies: 372
-- Name: COLUMN "groupUser"."isMuted"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupUser"."isMuted" IS 'true: user muted
false: user not muted';


--
-- TOC entry 371 (class 1259 OID 27092)
-- Name: groupUser_groupUserID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."groupUser" ALTER COLUMN "groupUserID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."groupUser_groupUserID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 374 (class 1259 OID 27107)
-- Name: groupMessage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."groupMessage" (
    "groupMessageID" integer NOT NULL,
    message text NOT NULL,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    "sendDated" timestamp without time zone,
    "receivedDate" timestamp without time zone,
    "readDate" timestamp without time zone,
    "isSended" boolean,
    "isReaded" boolean,
    "isUrgent" boolean,
    "isDirectMessage" boolean DEFAULT false,
    "groupID" integer,
    "sentUserID" integer,
    "receivedUserID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."groupMessage" OWNER TO postgres;

--
-- TOC entry 4238 (class 0 OID 0)
-- Dependencies: 374
-- Name: COLUMN "groupMessage"."groupMessageID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupMessage"."groupMessageID" IS 'Unique identificator for a message';


--
-- TOC entry 4239 (class 0 OID 0)
-- Dependencies: 374
-- Name: COLUMN "groupMessage".message; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupMessage".message IS 'Text or content for the message';


--
-- TOC entry 4240 (class 0 OID 0)
-- Dependencies: 374
-- Name: COLUMN "groupMessage"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupMessage"."registeredDate" IS 'Timestamp for the date of the message';


--
-- TOC entry 4241 (class 0 OID 0)
-- Dependencies: 374
-- Name: COLUMN "groupMessage"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupMessage"."unregisteredDate" IS 'Timestamp for register the date If the messege was deleted';


--
-- TOC entry 4242 (class 0 OID 0)
-- Dependencies: 374
-- Name: COLUMN "groupMessage"."sendDated"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupMessage"."sendDated" IS 'Timestapo for register the date when the message was sended';


--
-- TOC entry 4243 (class 0 OID 0)
-- Dependencies: 374
-- Name: COLUMN "groupMessage"."receivedDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupMessage"."receivedDate" IS 'Timestapo for register the date when the message was received';


--
-- TOC entry 4244 (class 0 OID 0)
-- Dependencies: 374
-- Name: COLUMN "groupMessage"."readDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupMessage"."readDate" IS 'Timestapo for register the date when the message was readed';


--
-- TOC entry 4245 (class 0 OID 0)
-- Dependencies: 374
-- Name: COLUMN "groupMessage"."isSended"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupMessage"."isSended" IS 'true: sended
false not sended';


--
-- TOC entry 4246 (class 0 OID 0)
-- Dependencies: 374
-- Name: COLUMN "groupMessage"."isReaded"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupMessage"."isReaded" IS 'true: readed
false: not readed';


--
-- TOC entry 4247 (class 0 OID 0)
-- Dependencies: 374
-- Name: COLUMN "groupMessage"."isUrgent"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupMessage"."isUrgent" IS 'true: urgent
false: not urgent';


--
-- TOC entry 4248 (class 0 OID 0)
-- Dependencies: 374
-- Name: COLUMN "groupMessage"."isDirectMessage"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."groupMessage"."isDirectMessage" IS 'true: dirrect Message
false: broadcast';


--
-- TOC entry 373 (class 1259 OID 27105)
-- Name: groupMessage_groupMessageID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."groupMessage" ALTER COLUMN "groupMessageID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."groupMessage_groupMessageID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 369 (class 1259 OID 27077)
-- Name: group_groupID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."group" ALTER COLUMN "groupID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."group_groupID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 376 (class 1259 OID 27124)
-- Name: forum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forum (
    "forumID" integer NOT NULL,
    "forumName" character varying(100) NOT NULL,
    "forumDetails" text,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "isAcademic" boolean,
    "isQualified" boolean,
    "teacherID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.forum OWNER TO postgres;

--
-- TOC entry 4202 (class 0 OID 0)
-- Dependencies: 376
-- Name: COLUMN forum."forumID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.forum."forumID" IS 'Unique identificator for a forum';


--
-- TOC entry 4203 (class 0 OID 0)
-- Dependencies: 376
-- Name: COLUMN forum."forumName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.forum."forumName" IS 'Name for the forum';


--
-- TOC entry 4204 (class 0 OID 0)
-- Dependencies: 376
-- Name: COLUMN forum."forumDetails"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.forum."forumDetails" IS 'Details for describe a forum';


--
-- TOC entry 4205 (class 0 OID 0)
-- Dependencies: 376
-- Name: COLUMN forum."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.forum."registeredDate" IS 'Timestamp for the date of creation of the forum';


--
-- TOC entry 4206 (class 0 OID 0)
-- Dependencies: 376
-- Name: COLUMN forum."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.forum."unregisteredDate" IS 'Timestamp for the elimination date of the forum';


--
-- TOC entry 4207 (class 0 OID 0)
-- Dependencies: 376
-- Name: COLUMN forum."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.forum."isActive" IS 'true: is active
false: is inactive';


--
-- TOC entry 4208 (class 0 OID 0)
-- Dependencies: 376
-- Name: COLUMN forum."isAcademic"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.forum."isAcademic" IS 'true: academic content
false: any content';


--
-- TOC entry 4209 (class 0 OID 0)
-- Dependencies: 376
-- Name: COLUMN forum."isQualified"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.forum."isQualified" IS 'true: have qualification
false: don''t have qualificationm';

--
-- TOC entry 378 (class 1259 OID 27139)
-- Name: forumMember; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."forumMember" (
    "idForumMember" integer NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "isAdministrator" boolean,
    "forumID" integer,
    "userID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."forumMember" OWNER TO postgres;

--
-- TOC entry 4216 (class 0 OID 0)
-- Dependencies: 378
-- Name: COLUMN "forumMember"."idForumMember"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumMember"."idForumMember" IS 'Unique identificator for a forum member';


--
-- TOC entry 4217 (class 0 OID 0)
-- Dependencies: 378
-- Name: COLUMN "forumMember"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumMember"."registeredDate" IS 'Timestamp for register of a member';


--
-- TOC entry 4218 (class 0 OID 0)
-- Dependencies: 378
-- Name: COLUMN "forumMember"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumMember"."unregisteredDate" IS 'Timestamp fot the date of delete of a member';


--
-- TOC entry 4219 (class 0 OID 0)
-- Dependencies: 378
-- Name: COLUMN "forumMember"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumMember"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4220 (class 0 OID 0)
-- Dependencies: 378
-- Name: COLUMN "forumMember"."isAdministrator"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumMember"."isAdministrator" IS 'true: is administrator
false: not administrator';


--
-- TOC entry 377 (class 1259 OID 27137)
-- Name: forumMember_idForumMember_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."forumMember" ALTER COLUMN "idForumMember" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."forumMember_idForumMember_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 380 (class 1259 OID 27152)
-- Name: forumContent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."forumContent" (
    "forumContentID" integer NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean,
    "forumContent" text NOT NULL,
    details text,
    "forumID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."forumContent" OWNER TO postgres;

--
-- TOC entry 4210 (class 0 OID 0)
-- Dependencies: 380
-- Name: COLUMN "forumContent"."forumContentID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumContent"."forumContentID" IS 'Unique identificator for forum content';


--
-- TOC entry 4211 (class 0 OID 0)
-- Dependencies: 380
-- Name: COLUMN "forumContent"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumContent"."registeredDate" IS 'Timestamp for registered content';


--
-- TOC entry 4212 (class 0 OID 0)
-- Dependencies: 380
-- Name: COLUMN "forumContent"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumContent"."unregisteredDate" IS 'Timestamp for unregistered content';


--
-- TOC entry 4213 (class 0 OID 0)
-- Dependencies: 380
-- Name: COLUMN "forumContent"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumContent"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4214 (class 0 OID 0)
-- Dependencies: 380
-- Name: COLUMN "forumContent"."forumContent"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumContent"."forumContent" IS 'Content for the forum';


--
-- TOC entry 4215 (class 0 OID 0)
-- Dependencies: 380
-- Name: COLUMN "forumContent".details; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumContent".details IS 'Aditional details';


--
-- TOC entry 379 (class 1259 OID 27150)
-- Name: forumContent_forumContentID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."forumContent" ALTER COLUMN "forumContentID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."forumContent_forumContentID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 382 (class 1259 OID 27164)
-- Name: forumReply; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."forumReply" (
    "replyID" integer NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "replyText" text NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isDraft" boolean,
    "replayObservation" text,
    qualification double precision,
    "isReviewed" boolean,
    "isQualified" boolean,
    "qualificationDate" timestamp with time zone,
    "forumID" integer,
    "forumContentID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."forumReply" OWNER TO postgres;

--
-- TOC entry 4221 (class 0 OID 0)
-- Dependencies: 382
-- Name: COLUMN "forumReply"."replyID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumReply"."replyID" IS 'Unique identificator for a reply';


--
-- TOC entry 4222 (class 0 OID 0)
-- Dependencies: 382
-- Name: COLUMN "forumReply"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumReply"."registeredDate" IS 'Timestamp for registered reply';


--
-- TOC entry 4223 (class 0 OID 0)
-- Dependencies: 382
-- Name: COLUMN "forumReply"."replyText"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumReply"."replyText" IS 'Text or content for the replay';


--
-- TOC entry 4224 (class 0 OID 0)
-- Dependencies: 382
-- Name: COLUMN "forumReply"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumReply"."unregisteredDate" IS 'Timestamp for unregistered reply';


--
-- TOC entry 4225 (class 0 OID 0)
-- Dependencies: 382
-- Name: COLUMN "forumReply"."isDraft"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumReply"."isDraft" IS 'true: draft
false: published';


--
-- TOC entry 4226 (class 0 OID 0)
-- Dependencies: 382
-- Name: COLUMN "forumReply"."replayObservation"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumReply"."replayObservation" IS 'Teacher details for the replay';


--
-- TOC entry 4227 (class 0 OID 0)
-- Dependencies: 382
-- Name: COLUMN "forumReply".qualification; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumReply".qualification IS 'Qualification for the replay';


--
-- TOC entry 4228 (class 0 OID 0)
-- Dependencies: 382
-- Name: COLUMN "forumReply"."isReviewed"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumReply"."isReviewed" IS 'true: reviewd
false: not reviewed';


--
-- TOC entry 4229 (class 0 OID 0)
-- Dependencies: 382
-- Name: COLUMN "forumReply"."isQualified"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumReply"."isQualified" IS 'true: qualified
false: not qualified';


--
-- TOC entry 4230 (class 0 OID 0)
-- Dependencies: 382
-- Name: COLUMN "forumReply"."qualificationDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."forumReply"."qualificationDate" IS 'Timestamp for the qualification';


--
-- TOC entry 381 (class 1259 OID 27162)
-- Name: forumReply_replyID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."forumReply" ALTER COLUMN "replyID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."forumReply_replyID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 375 (class 1259 OID 27122)
-- Name: forum_forumID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.forum ALTER COLUMN "forumID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."forum_forumID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 384 (class 1259 OID 27179)
-- Name: paymentStatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."paymentStatus" (
    "statusID" integer NOT NULL,
    "statusName" character varying(100) NOT NULL,
    "statusDetail" text,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."paymentStatus" OWNER TO postgres;

--
-- TOC entry 4303 (class 0 OID 0)
-- Dependencies: 384
-- Name: COLUMN "paymentStatus"."statusID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentStatus"."statusID" IS 'Unique identificator for the status';


--
-- TOC entry 4304 (class 0 OID 0)
-- Dependencies: 384
-- Name: COLUMN "paymentStatus"."statusName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentStatus"."statusName" IS 'Name for the status';


--
-- TOC entry 4305 (class 0 OID 0)
-- Dependencies: 384
-- Name: COLUMN "paymentStatus"."statusDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentStatus"."statusDetail" IS 'Status details';


--
-- TOC entry 4306 (class 0 OID 0)
-- Dependencies: 384
-- Name: COLUMN "paymentStatus"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentStatus"."registeredDate" IS 'Timestamp for the date of registration of the status';


--
-- TOC entry 4307 (class 0 OID 0)
-- Dependencies: 384
-- Name: COLUMN "paymentStatus"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentStatus"."unregisteredDate" IS 'Timestamp for the date when the status was deleted';


--
-- TOC entry 4308 (class 0 OID 0)
-- Dependencies: 384
-- Name: COLUMN "paymentStatus"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."paymentStatus"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 383 (class 1259 OID 27177)
-- Name: paymentStatus_statusID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."paymentStatus" ALTER COLUMN "statusID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."paymentStatus_statusID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 267 (class 1259 OID 17119)
-- Name: payment_paymentID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.payment ALTER COLUMN "paymentID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."payment_paymentID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 386 (class 1259 OID 27193)
-- Name: schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule (
    "scheduleID" integer NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    details text,
    "isAutomatic" boolean,
    "startDate" date NOT NULL,
    "endDate" date NOT NULL,
    "collegeID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.schedule OWNER TO postgres;

--
-- TOC entry 4397 (class 0 OID 0)
-- Dependencies: 386
-- Name: COLUMN schedule."scheduleID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.schedule."scheduleID" IS 'Unique identificator for a schedule';


--
-- TOC entry 4398 (class 0 OID 0)
-- Dependencies: 386
-- Name: COLUMN schedule."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.schedule."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 4399 (class 0 OID 0)
-- Dependencies: 386
-- Name: COLUMN schedule."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.schedule."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 4400 (class 0 OID 0)
-- Dependencies: 386
-- Name: COLUMN schedule."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.schedule."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4401 (class 0 OID 0)
-- Dependencies: 386
-- Name: COLUMN schedule.details; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.schedule.details IS 'Details for the schedule';


--
-- TOC entry 4402 (class 0 OID 0)
-- Dependencies: 386
-- Name: COLUMN schedule."isAutomatic"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.schedule."isAutomatic" IS 'true: Automatic generation
false: Manual generation';


--
-- TOC entry 4403 (class 0 OID 0)
-- Dependencies: 386
-- Name: COLUMN schedule."startDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.schedule."startDate" IS 'Date to start of the use of the shcedule';


--
-- TOC entry 4404 (class 0 OID 0)
-- Dependencies: 386
-- Name: COLUMN schedule."endDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.schedule."endDate" IS 'Date to the end of the schedule';


--
-- TOC entry 385 (class 1259 OID 27191)
-- Name: schedule_scheduleID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.schedule ALTER COLUMN "scheduleID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."schedule_scheduleID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 366 (class 1259 OID 26988)
-- Name: classSchedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."classSchedule" (
    "classScheduleID" integer NOT NULL,
    "nameHour" character varying(50),
    "startHour" time with time zone NOT NULL,
    "endHour" time with time zone NOT NULL,
    "startDate" date NOT NULL,
    "endDate" date NOT NULL,
    "numberHour" smallint,
    "reigsteredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "isDelayer" boolean,
    "isCancelled" boolean DEFAULT false,
    "isReprogramed" boolean DEFAULT false,
    "isRecurrent" boolean DEFAULT true NOT NULL,
    "scheduleID" integer,
    "subjectID" integer,
    "holidayID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."classSchedule" OWNER TO postgres;

--
-- TOC entry 4075 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."classScheduleID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."classScheduleID" IS 'Unique identification of an class hour
';


--
-- TOC entry 4076 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."nameHour"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."nameHour" IS 'Name of the class hour';


--
-- TOC entry 4077 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."startHour"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."startHour" IS 'Start time';


--
-- TOC entry 4078 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."endHour"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."endHour" IS 'End time';


--
-- TOC entry 4079 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."startDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."startDate" IS 'Start date';


--
-- TOC entry 4080 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."endDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."endDate" IS 'End date';


--
-- TOC entry 4081 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."numberHour"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."numberHour" IS 'Number of the hour';


--
-- TOC entry 4082 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."reigsteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."reigsteredDate" IS 'Timestamp for regristration of the hour';


--
-- TOC entry 4083 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."unregisteredDate" IS 'Timestamp for unregistration of the class hour';


--
-- TOC entry 4084 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4085 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."isDelayer"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."isDelayer" IS 'true: delayed
false: not delayed';


--
-- TOC entry 4086 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."isCancelled"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."isCancelled" IS 'Register for cancell notifications

true: cancelled
false: not cancelled ';


--
-- TOC entry 4087 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."isReprogramed"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."isReprogramed" IS 'Register for reprogramation notifications

true: reprogramed
false: not reprogramed';


--
-- TOC entry 4088 (class 0 OID 0)
-- Dependencies: 366
-- Name: COLUMN "classSchedule"."isRecurrent"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."classSchedule"."isRecurrent" IS 'true: recurrent
false: not recurrent

For automatic programation';


--
-- TOC entry 365 (class 1259 OID 26986)
-- Name: classSchedule_classScheduleID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."classSchedule" ALTER COLUMN "classScheduleID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."classSchedule_classScheduleID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 368 (class 1259 OID 27005)
-- Name: holiday; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.holiday (
    "holidayID" integer NOT NULL,
    name character varying(100) NOT NULL,
    date time without time zone NOT NULL,
    details text,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "isNational" boolean,
    "isOptional" boolean,
    "isReprogramed" boolean DEFAULT false,
    "reprogramedDate" date,
    "countryID" integer,
    "provinceID" integer,
    "cityID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.holiday OWNER TO postgres;

--
-- TOC entry 4256 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN holiday."holidayID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.holiday."holidayID" IS 'Unique identificator for a holiday';


--
-- TOC entry 4257 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN holiday.name; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.holiday.name IS 'Name for the holiday';


--
-- TOC entry 4258 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN holiday.date; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.holiday.date IS 'Date for the holiday';


--
-- TOC entry 4259 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN holiday.details; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.holiday.details IS 'Detaild to give more information about the holiday';


--
-- TOC entry 4260 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN holiday."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.holiday."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 4261 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN holiday."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.holiday."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 4262 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN holiday."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.holiday."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4263 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN holiday."isNational"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.holiday."isNational" IS 'true: national holiday
false: local holiday';


--
-- TOC entry 4264 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN holiday."isOptional"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.holiday."isOptional" IS 'true: optional holiday
false: mandatory holiday';


--
-- TOC entry 4265 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN holiday."isReprogramed"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.holiday."isReprogramed" IS 'true: reprogroamed to another date
false: not reprogramed to another date';


--
-- TOC entry 4266 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN holiday."reprogramedDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.holiday."reprogramedDate" IS 'Reprogramed date for the holiday';


--
-- TOC entry 367 (class 1259 OID 27003)
-- Name: holiday_holidayID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.holiday ALTER COLUMN "holidayID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."holiday_holidayID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 388 (class 1259 OID 27212)
-- Name: recalification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recalification (
    "recalificationID" integer NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    detail text,
    "previousCalification" double precision,
    "newCalification" double precision NOT NULL,
    reason text NOT NULL,
    "isPublished" boolean,
    "isAuthorizade" boolean,
    "patialID" integer,
    "averangeID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public.recalification OWNER TO postgres;

--
-- TOC entry 4362 (class 0 OID 0)
-- Dependencies: 388
-- Name: COLUMN recalification."recalificationID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.recalification."recalificationID" IS 'Unique identificator for a recalification';


--
-- TOC entry 4363 (class 0 OID 0)
-- Dependencies: 388
-- Name: COLUMN recalification."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.recalification."registeredDate" IS 'Timestamp for recalification date';


--
-- TOC entry 4364 (class 0 OID 0)
-- Dependencies: 388
-- Name: COLUMN recalification."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.recalification."unregisteredDate" IS 'Timestamp for unregistration of a calification';


--
-- TOC entry 4365 (class 0 OID 0)
-- Dependencies: 388
-- Name: COLUMN recalification."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.recalification."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4366 (class 0 OID 0)
-- Dependencies: 388
-- Name: COLUMN recalification.detail; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.recalification.detail IS 'Aditional details for recalification';


--
-- TOC entry 4367 (class 0 OID 0)
-- Dependencies: 388
-- Name: COLUMN recalification."previousCalification"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.recalification."previousCalification" IS 'Calification before recalification';


--
-- TOC entry 4368 (class 0 OID 0)
-- Dependencies: 388
-- Name: COLUMN recalification."newCalification"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.recalification."newCalification" IS 'Calification after recalification';


--
-- TOC entry 4369 (class 0 OID 0)
-- Dependencies: 388
-- Name: COLUMN recalification.reason; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.recalification.reason IS 'Justification for the recalification';


--
-- TOC entry 4370 (class 0 OID 0)
-- Dependencies: 388
-- Name: COLUMN recalification."isPublished"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.recalification."isPublished" IS 'true: published
false: not published yet';


--
-- TOC entry 4371 (class 0 OID 0)
-- Dependencies: 388
-- Name: COLUMN recalification."isAuthorizade"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.recalification."isAuthorizade" IS 'true: authorized
false: not authorized';


--
-- TOC entry 387 (class 1259 OID 27210)
-- Name: recalification_recalificationID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.recalification ALTER COLUMN "recalificationID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."recalification_recalificationID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 390 (class 1259 OID 27228)
-- Name: reviewApplication; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."reviewApplication" (
    "applicationID" integer NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "applicantDetail" text,
    "teacherDetail" text,
    "approverDetail" text,
    "isApproved" boolean DEFAULT false NOT NULL,
    reason text,
    "decitionDate" timestamp without time zone,
    "recalificationID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."reviewApplication" OWNER TO postgres;

--
-- TOC entry 4379 (class 0 OID 0)
-- Dependencies: 390
-- Name: COLUMN "reviewApplication"."applicationID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."reviewApplication"."applicationID" IS 'Unique identificator for an approvation review form';


--
-- TOC entry 4380 (class 0 OID 0)
-- Dependencies: 390
-- Name: COLUMN "reviewApplication"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."reviewApplication"."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 4381 (class 0 OID 0)
-- Dependencies: 390
-- Name: COLUMN "reviewApplication"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."reviewApplication"."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 4382 (class 0 OID 0)
-- Dependencies: 390
-- Name: COLUMN "reviewApplication"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."reviewApplication"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4383 (class 0 OID 0)
-- Dependencies: 390
-- Name: COLUMN "reviewApplication"."applicantDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."reviewApplication"."applicantDetail" IS 'Details for the application, reasons or motivations to the request';


--
-- TOC entry 4384 (class 0 OID 0)
-- Dependencies: 390
-- Name: COLUMN "reviewApplication"."teacherDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."reviewApplication"."teacherDetail" IS 'Details for the teacher, justification for approvation or negation to the request';


--
-- TOC entry 4385 (class 0 OID 0)
-- Dependencies: 390
-- Name: COLUMN "reviewApplication"."approverDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."reviewApplication"."approverDetail" IS 'Details provided by the approvation instance';


--
-- TOC entry 4386 (class 0 OID 0)
-- Dependencies: 390
-- Name: COLUMN "reviewApplication"."isApproved"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."reviewApplication"."isApproved" IS 'true: approved
false: rejected';


--
-- TOC entry 4387 (class 0 OID 0)
-- Dependencies: 390
-- Name: COLUMN "reviewApplication".reason; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."reviewApplication".reason IS 'Reason for approve or reject the application';


--
-- TOC entry 4388 (class 0 OID 0)
-- Dependencies: 390
-- Name: COLUMN "reviewApplication"."decitionDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."reviewApplication"."decitionDate" IS 'Timestamp for approvation or negation ';


--
-- TOC entry 389 (class 1259 OID 27226)
-- Name: reviewApplication_applicationID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."reviewApplication" ALTER COLUMN "applicationID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."reviewApplication_applicationID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 281 (class 1259 OID 25900)
-- Name: taskResolution; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."taskResolution" (
    "resolutionID" integer NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    detail text,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "updatedDate" timestamp with time zone,
    "isPublished" boolean DEFAULT false NOT NULL,
	"publishedDate" timestamp with time zone,
    "taskID" integer,
    "studentID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."taskResolution" OWNER TO postgres;

--
-- TOC entry 4468 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution"."resolutionID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolution"."resolutionID" IS 'Unique identificator for a task resolution';


--
-- TOC entry 4469 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolution"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4470 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution".detail; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolution".detail IS 'Aditional details for the task resolution';


--
-- TOC entry 4471 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolution"."registeredDate" IS 'Timestamp for date of creation
';


--
-- TOC entry 4472 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolution"."unregisteredDate" IS 'Timestamp for date of unregistration';


--
-- TOC entry 4473 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution"."updatedDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolution"."updatedDate" IS 'Timestamp for date of registration of updates';


--
-- TOC entry 4474 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution"."isPublished"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolution"."isPublished" IS 'false: not published yet (draft)
true: published';


--
-- TOC entry 280 (class 1259 OID 25898)
-- Name: taskResolution_resolutionID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."taskResolution" ALTER COLUMN "resolutionID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."taskResolution_resolutionID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



--
-- TOC entry 239 (class 1259 OID 16916)
-- Name: task_taskID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.task ALTER COLUMN "taskID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."task_taskID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 219 (class 1259 OID 16773)
-- Name: student_studentID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.student ALTER COLUMN "studentID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."student_studentID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 283 (class 1259 OID 25915)
-- Name: taskResolutionResource; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."taskResolutionResource" (
    "resourceID" integer NOT NULL,
    "resourceName" text,
	"resource" character varying(500),
    details text,
    "isActive" boolean DEFAULT true NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "updatedDate" timestamp with time zone,
    "resolutionID" integer,
)
WITH (autovacuum_enabled='true');


ALTER TABLE public."taskResolutionResource" OWNER TO postgres;

--
-- TOC entry 4372 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource"."resourceID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolutionResource"."resourceID" IS 'Unique identificator for a task resolution resource';


--
-- TOC entry 4373 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource"."resourceName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolutionResource"."resourceName" IS 'Name for the resource';


--
-- TOC entry 4374 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource".details; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolutionResource".details IS 'Aditional details if its needed';


--
-- TOC entry 4375 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolutionResource"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 4376 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource"."registeredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolutionResource"."registeredDate" IS 'Timestamp for date of registration of task resource';


--
-- TOC entry 4377 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource"."unregisteredDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolutionResource"."unregisteredDate" IS 'Timestamp for date of unregistration of the task resolution resource';


--
-- TOC entry 4378 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource"."updatedDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."taskResolutionResource"."updatedDate" IS 'Timestamp for date of udapte to the task resolution resource';


--
-- TOC entry 282 (class 1259 OID 25913)
-- Name: resolutionResource_resourceID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."taskResolutionResource" ALTER COLUMN "resourceID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."resolutionResource_resourceID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


-- System Tables
--
-- TOC entry 277 (class 1259 OID 17451)
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    "sessionID" integer NOT NULL,
    "sessionRoom" integer,
    "sessionDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "sessionToken" text,
    "sessionExpiration" character varying(50),
    "sessionIP" character varying(20),
    "sessionDevice" character varying(20),
    "sessionCode" character varying(50),
    "userID" integer NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- TOC entry 4405 (class 0 OID 0)
-- Dependencies: 277
-- Name: TABLE session; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.session IS 'Table for store the information for active users in a session of NoNe SGA';


--
-- TOC entry 4406 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.session."sessionID" IS 'Unique autoincremental ID for a session registration';


--
-- TOC entry 4407 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionRoom"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.session."sessionRoom" IS 'Rooms for manage of sessions';


--
-- TOC entry 4408 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.session."sessionDate" IS 'Timestamp for the date of session';


--
-- TOC entry 4409 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionToken"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.session."sessionToken" IS 'Information of generated token for the session';


--
-- TOC entry 4410 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionExpiration"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.session."sessionExpiration" IS 'Information for the expiration of session';


--
-- TOC entry 4411 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionDevice"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.session."sessionDevice" IS 'Name or identifyer for the device of the conection';


--
-- TOC entry 4412 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.session."sessionCode" IS 'Unique code formed by date anda userID';


--
-- TOC entry 276 (class 1259 OID 17449)
-- Name: session_sessionID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.session ALTER COLUMN "sessionID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."session_sessionID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 275 (class 1259 OID 17439)
-- Name: errorLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."errorLog" (
    "errorLogID" integer NOT NULL,
    "errorDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "errorDetail" json NOT NULL,
    "errorModule" character varying(100) NOT NULL
);


ALTER TABLE public."errorLog" OWNER TO postgres;

--
-- TOC entry 4139 (class 0 OID 0)
-- Dependencies: 275
-- Name: TABLE "errorLog"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."errorLog" IS 'Table to store information about errors in NoNe SGA';


--
-- TOC entry 4140 (class 0 OID 0)
-- Dependencies: 275
-- Name: COLUMN "errorLog"."errorLogID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."errorLog"."errorLogID" IS 'Unique autoincremental ID for an error log registration';


--
-- TOC entry 4141 (class 0 OID 0)
-- Dependencies: 275
-- Name: COLUMN "errorLog"."errorDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."errorLog"."errorDate" IS 'Timestamp for the date and time of the error';


--
-- TOC entry 4142 (class 0 OID 0)
-- Dependencies: 275
-- Name: COLUMN "errorLog"."errorDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."errorLog"."errorDetail" IS 'Error detail and technical information for some error';


--
-- TOC entry 4143 (class 0 OID 0)
-- Dependencies: 275
-- Name: COLUMN "errorLog"."errorModule"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."errorLog"."errorModule" IS 'Module that has the error';


--
-- TOC entry 274 (class 1259 OID 17437)
-- Name: errorLog_errorLogID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."errorLog" ALTER COLUMN "errorLogID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."errorLog_errorLogID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- TOC entry 279 (class 1259 OID 17470)
-- Name: auditSession; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."auditSession" (
    "auditID" integer NOT NULL,
    "sessionID" integer NOT NULL,
    "sessionRoom" integer,
    "sessionDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "sessionToken" text,
    "sessionExpiration" character varying(50),
    "sessionIP" character varying(20),
    "sessionDevice" character varying(20),
    "sessionCode" character varying(50),
    "sessionDetail" text,
    "userID" integer NOT NULL
);


ALTER TABLE public."auditSession" OWNER TO postgres;

--
-- TOC entry 4044 (class 0 OID 0)
-- Dependencies: 279
-- Name: TABLE "auditSession"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."auditSession" IS 'Table for store the historical information for users that register a Login in NoNe SGA';


--
-- TOC entry 4045 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."auditID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."auditSession"."auditID" IS 'Unique autoincremental ID for a session registration';


--
-- TOC entry 4046 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionID"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."auditSession"."sessionID" IS 'Value of sessionID to store in the audit table';


--
-- TOC entry 4047 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionRoom"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."auditSession"."sessionRoom" IS 'Rooms for manage of sessions';


--
-- TOC entry 4048 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionDate"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."auditSession"."sessionDate" IS 'Timestamp for the date of session';


--
-- TOC entry 4049 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionToken"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."auditSession"."sessionToken" IS 'Information of generated token for the session';


--
-- TOC entry 4050 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionExpiration"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."auditSession"."sessionExpiration" IS 'Information for the expiration of session';


--
-- TOC entry 4051 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionDevice"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."auditSession"."sessionDevice" IS 'Name or identifyer for the device of the conection';


--
-- TOC entry 4052 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionCode"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."auditSession"."sessionCode" IS 'Unique code formed by date anda userID';


--
-- TOC entry 4053 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionDetail"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."auditSession"."sessionDetail" IS 'Detail or description of the operation in execution';


--
-- TOC entry 278 (class 1259 OID 17468)
-- Name: auditSession_auditID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."auditSession" ALTER COLUMN "auditID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."auditSession_auditID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

-- CONSTRAINTS

--
-- TOC entry 3510 (class 2606 OID 16843)
-- Name: academicPeriod PK_academicPeriod; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."academicPeriod"
    ADD CONSTRAINT "PK_academicPeriod" PRIMARY KEY ("periodID");


--
-- TOC entry 3479 (class 2606 OID 16756)
-- Name: address PK_address; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT "PK_address" PRIMARY KEY ("addressID");


--
-- TOC entry 3529 (class 2606 OID 16915)
-- Name: assistenceRegister PK_assistenceRegister; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."assistenceRegister"
    ADD CONSTRAINT "PK_assistenceRegister" PRIMARY KEY ("AssistanceRegisterID");


--
-- TOC entry 3571 (class 2606 OID 17056)
-- Name: calificationAverange PK_calificationAverange; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."calificationAverange"
    ADD CONSTRAINT "PK_calificationAverange" PRIMARY KEY ("averangeID");


--
-- TOC entry 3459 (class 2606 OID 16706)
-- Name: city PK_city; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT "PK_city" PRIMARY KEY ("cityID");


--
-- TOC entry 3634 (class 2606 OID 27000)
-- Name: classSchedule PK_classSchedule; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."classSchedule"
    ADD CONSTRAINT "PK_classSchedule" PRIMARY KEY ("classScheduleID");


--
-- TOC entry 3520 (class 2606 OID 16884)
-- Name: college PK_college; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.college
    ADD CONSTRAINT "PK_college" PRIMARY KEY ("collegeID");


--
-- TOC entry 3524 (class 2606 OID 16897)
-- Name: content PK_content; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT "PK_content" PRIMARY KEY ("contentID");


--
-- TOC entry 3471 (class 2606 OID 16737)
-- Name: country PK_country; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT "PK_country" PRIMARY KEY ("countryID");


--
-- TOC entry 3512 (class 2606 OID 16856)
-- Name: course PK_course; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "PK_course" PRIMARY KEY ("courseID");


--
-- TOC entry 3499 (class 2606 OID 16818)
-- Name: Fent PK_enrrollment; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT "PK_enrrollment" PRIMARY KEY ("enrollmentID");


--
-- TOC entry 3506 (class 2606 OID 16829)
-- Name: enrollmentStatus PK_enrrollmentStatus; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."enrollmentStatus"
    ADD CONSTRAINT "PK_enrrollmentStatus" PRIMARY KEY ("statusID");


--
-- TOC entry 3617 (class 2606 OID 17447)
-- Name: errorLog PK_errorLog; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."errorLog"
    ADD CONSTRAINT "PK_errorLog" PRIMARY KEY ("errorLogID");


--
-- TOC entry 3545 (class 2606 OID 16965)
-- Name: exam PK_exam; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exam
    ADD CONSTRAINT "PK_exam" PRIMARY KEY ("examID");


--
-- TOC entry 3561 (class 2606 OID 17023)
-- Name: examAnswer PK_examAnswers; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."examAnswer"
    ADD CONSTRAINT "PK_examAnswers" PRIMARY KEY ("answerID");


--
-- TOC entry 3548 (class 2606 OID 16981)
-- Name: examGrade PK_examGrade; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."examGrade"
    ADD CONSTRAINT "PK_examGrade" PRIMARY KEY ("examGradeID");


--
-- TOC entry 3558 (class 2606 OID 17009)
-- Name: examQuestion PK_examQuestion; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."examQuestion"
    ADD CONSTRAINT "PK_examQuestion" PRIMARY KEY ("questionID");


--
-- TOC entry 3553 (class 2606 OID 16996)
-- Name: examRegister PK_examRegister; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."examRegister"
    ADD CONSTRAINT "PK_examRegister" PRIMARY KEY ("registerID");


--
-- TOC entry 3666 (class 2606 OID 27134)
-- Name: forum PK_forum; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forum
    ADD CONSTRAINT "PK_forum" PRIMARY KEY ("forumID");


--
-- TOC entry 3677 (class 2606 OID 27161)
-- Name: forumContent PK_forumContent; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."forumContent"
    ADD CONSTRAINT "PK_forumContent" PRIMARY KEY ("forumContentID");


--
-- TOC entry 3671 (class 2606 OID 27147)
-- Name: forumMember PK_forumMember; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."forumMember"
    ADD CONSTRAINT "PK_forumMember" PRIMARY KEY ("idForumMember");


--
-- TOC entry 3680 (class 2606 OID 27174)
-- Name: forumReply PK_forumReply; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."forumReply"
    ADD CONSTRAINT "PK_forumReply" PRIMARY KEY ("replyID");


--
-- TOC entry 3648 (class 2606 OID 27089)
-- Name: group PK_group; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT "PK_group" PRIMARY KEY ("groupID");


--
-- TOC entry 3659 (class 2606 OID 27119)
-- Name: groupMessage PK_groupMessage; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupMessage"
    ADD CONSTRAINT "PK_groupMessage" PRIMARY KEY ("groupMessageID");


--
-- TOC entry 3653 (class 2606 OID 27102)
-- Name: groupUser PK_groupUser; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupUser"
    ADD CONSTRAINT "PK_groupUser" PRIMARY KEY ("groupUserID");


--
-- TOC entry 3641 (class 2606 OID 27018)
-- Name: holiday PK_holiday; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holiday
    ADD CONSTRAINT "PK_holiday" PRIMARY KEY ("holidayID");


--
-- TOC entry 3576 (class 2606 OID 17072)
-- Name: partial PK_partial; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partial
    ADD CONSTRAINT "PK_partial" PRIMARY KEY ("patialID");


--
-- TOC entry 3596 (class 2606 OID 17137)
-- Name: payment PK_payment; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "PK_payment" PRIMARY KEY ("paymentID");


--
-- TOC entry 3608 (class 2606 OID 17162)
-- Name: paymentDetail PK_paymentDetail; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."paymentDetail"
    ADD CONSTRAINT "PK_paymentDetail" PRIMARY KEY ("idDetail");


--
-- TOC entry 3604 (class 2606 OID 17149)
-- Name: paymentMethod PK_paymentMethod; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."paymentMethod"
    ADD CONSTRAINT "PK_paymentMethod" PRIMARY KEY ("idPaymentMethod");


--
-- TOC entry 3686 (class 2606 OID 27188)
-- Name: paymentStatus PK_paymentStatus; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."paymentStatus"
    ADD CONSTRAINT "PK_paymentStatus" PRIMARY KEY ("statusID");


--
-- TOC entry 3611 (class 2606 OID 17177)
-- Name: paymentType PK_paymentType; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."paymentType"
    ADD CONSTRAINT "PK_paymentType" PRIMARY KEY ("paymentTypeID");


--
-- TOC entry 3446 (class 2606 OID 16673)
-- Name: person PK_person; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "PK_person" PRIMARY KEY ("personID");


--
-- TOC entry 3451 (class 2606 OID 16687)
-- Name: personType PK_personType; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."personType"
    ADD CONSTRAINT "PK_personType" PRIMARY KEY ("personTypeID");


--
-- TOC entry 3586 (class 2606 OID 17100)
-- Name: phoneOperator PK_phoneOperator; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."phoneOperator"
    ADD CONSTRAINT "PK_phoneOperator" PRIMARY KEY ("operatorID");


--
-- TOC entry 3464 (class 2606 OID 16721)
-- Name: province PK_province; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.province
    ADD CONSTRAINT "PK_province" PRIMARY KEY ("provinceID");


--
-- TOC entry 3590 (class 2606 OID 17118)
-- Name: rating PK_rating; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT "PK_rating" PRIMARY KEY ("ratingID");


--
-- TOC entry 3695 (class 2606 OID 27223)
-- Name: recalification PK_recalification; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recalification
    ADD CONSTRAINT "PK_recalification" PRIMARY KEY ("recalificationID");


--
-- TOC entry 3631 (class 2606 OID 25925)
-- Name: taskResolutionResource PK_resolutionResource; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taskResolutionResource"
    ADD CONSTRAINT "PK_resolutionResource" PRIMARY KEY ("resourceID");


--
-- TOC entry 3701 (class 2606 OID 27239)
-- Name: reviewApplication PK_reviewApplication; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reviewApplication"
    ADD CONSTRAINT "PK_reviewApplication" PRIMARY KEY ("applicationID");


--
-- TOC entry 3483 (class 2606 OID 16768)
-- Name: role PK_role; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_role" PRIMARY KEY ("roleID");


--
-- TOC entry 3690 (class 2606 OID 27203)
-- Name: schedule PK_schedule; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "PK_schedule" PRIMARY KEY ("scheduleID");


--
-- TOC entry 3489 (class 2606 OID 16787)
-- Name: student PK_student; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT "PK_student" PRIMARY KEY ("studentID");


--
-- TOC entry 3564 (class 2606 OID 17038)
-- Name: studentAnswer PK_studentAnswer; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."studentAnswer"
    ADD CONSTRAINT "PK_studentAnswer" PRIMARY KEY ("studentAnswerID");


--
-- TOC entry 3516 (class 2606 OID 16872)
-- Name: subject PK_subject; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT "PK_subject" PRIMARY KEY ("subjectID");


--
-- TOC entry 3533 (class 2606 OID 16927)
-- Name: task PK_task; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "PK_task" PRIMARY KEY ("taskID");


--
-- TOC entry 3538 (class 2606 OID 16943)
-- Name: taskEvaluation PK_taskEvaluation; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taskEvaluation"
    ADD CONSTRAINT "PK_taskEvaluation" PRIMARY KEY ("taskEvaluationID");


--
-- TOC entry 3627 (class 2606 OID 25912)
-- Name: taskResolution PK_taskResolution; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taskResolution"
    ADD CONSTRAINT "PK_taskResolution" PRIMARY KEY ("resolutionID");


--
-- TOC entry 3542 (class 2606 OID 16955)
-- Name: taskResource PK_taskResource; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taskResource"
    ADD CONSTRAINT "PK_taskResource" PRIMARY KEY ("taskResourceID");


--
-- TOC entry 3494 (class 2606 OID 16802)
-- Name: teacher PK_teacher; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT "PK_teacher" PRIMARY KEY ("teacherID");


--
-- TOC entry 3580 (class 2606 OID 17087)
-- Name: telephone PK_telephone; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.telephone
    ADD CONSTRAINT "PK_telephone" PRIMARY KEY ("telephoneID");


--
-- TOC entry 3435 (class 2606 OID 16654)
-- Name: user PK_user; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_user" PRIMARY KEY ("userID");


--
-- TOC entry 3703 (class 2606 OID 27241)
-- Name: reviewApplication applicationID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reviewApplication"
    ADD CONSTRAINT "applicationID" UNIQUE ("applicationID");


--
-- TOC entry 3624 (class 2606 OID 17478)
-- Name: auditSession auditSession_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."auditSession"
    ADD CONSTRAINT "auditSession_PK" PRIMARY KEY ("auditID");


--
-- TOC entry 3473 (class 2606 OID 16739)
-- Name: country callCode; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT "callCode" UNIQUE ("callCode");


--
-- TOC entry 3461 (class 2606 OID 16708)
-- Name: city cityCode; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT "cityCode" UNIQUE ("cityCode");


--
-- TOC entry 3636 (class 2606 OID 27002)
-- Name: classSchedule classScheduleID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."classSchedule"
    ADD CONSTRAINT "classScheduleID" UNIQUE ("classScheduleID");


--
-- TOC entry 3606 (class 2606 OID 17151)
-- Name: paymentMethod code; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."paymentMethod"
    ADD CONSTRAINT code UNIQUE (code);


--
-- TOC entry 3522 (class 2606 OID 16886)
-- Name: college collegeCode; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.college
    ADD CONSTRAINT "collegeCode" UNIQUE ("collegeCode");


--
-- TOC entry 3526 (class 2606 OID 16899)
-- Name: content contedCode; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT "contedCode" UNIQUE ("contentCode");


--
-- TOC entry 3475 (class 2606 OID 16741)
-- Name: country countryCode; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT "countryCode" UNIQUE ("countryCode");


--
-- TOC entry 3477 (class 2606 OID 16743)
-- Name: country countryName; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT "countryName" UNIQUE ("countryName");


--
-- TOC entry 3514 (class 2606 OID 16858)
-- Name: course courseCode; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "courseCode" UNIQUE ("courseCode");


--
-- TOC entry 3643 (class 2606 OID 27020)
-- Name: holiday date; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.holiday
    ADD CONSTRAINT date UNIQUE (date);


--
-- TOC entry 3508 (class 2606 OID 16831)
-- Name: enrollmentStatus description; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."enrollmentStatus"
    ADD CONSTRAINT description UNIQUE (description);


--
-- TOC entry 3448 (class 2606 OID 16675)
-- Name: person dni; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT dni UNIQUE (dni);


--
-- TOC entry 3437 (class 2606 OID 16658)
-- Name: user email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email UNIQUE (email);


--
-- TOC entry 3668 (class 2606 OID 27136)
-- Name: forum forumID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forum
    ADD CONSTRAINT "forumID" UNIQUE ("forumID");


--
-- TOC entry 3650 (class 2606 OID 27091)
-- Name: group groupID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT "groupID" UNIQUE ("groupID");


--
-- TOC entry 3661 (class 2606 OID 27121)
-- Name: groupMessage groupMessageID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupMessage"
    ADD CONSTRAINT "groupMessageID" UNIQUE ("groupMessageID");


--
-- TOC entry 3655 (class 2606 OID 27104)
-- Name: groupUser groupUserID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."groupUser"
    ADD CONSTRAINT "groupUserID" UNIQUE ("groupUserID");


--
-- TOC entry 3675 (class 2606 OID 27149)
-- Name: forumMember idForumMember; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."forumMember"
    ADD CONSTRAINT "idForumMember" UNIQUE ("idForumMember");


--
-- TOC entry 3453 (class 2606 OID 16689)
-- Name: personType idPerson; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."personType"
    ADD CONSTRAINT "idPerson" UNIQUE ("personTypeID");


--
-- TOC entry 3439 (class 2606 OID 16656)
-- Name: user idUser; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "idUser" UNIQUE ("userID");


--
-- TOC entry 3441 (class 2606 OID 16660)
-- Name: user nick; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT nick UNIQUE (nick);


--
-- TOC entry 3582 (class 2606 OID 17089)
-- Name: telephone number; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.telephone
    ADD CONSTRAINT number UNIQUE (number);


--
-- TOC entry 3588 (class 2606 OID 17102)
-- Name: phoneOperator operatorName; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."phoneOperator"
    ADD CONSTRAINT "operatorName" UNIQUE ("operatorName");


--
-- TOC entry 3613 (class 2606 OID 17179)
-- Name: paymentType paymentCode; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."paymentType"
    ADD CONSTRAINT "paymentCode" UNIQUE ("paymentCode");


--
-- TOC entry 3615 (class 2606 OID 17181)
-- Name: paymentType paymentTypeName; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."paymentType"
    ADD CONSTRAINT "paymentTypeName" UNIQUE ("paymentTypeName");


--
-- TOC entry 3466 (class 2606 OID 16725)
-- Name: province provinceCode; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.province
    ADD CONSTRAINT "provinceCode" UNIQUE ("provinceCode");


--
-- TOC entry 3468 (class 2606 OID 16723)
-- Name: province provinceName; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.province
    ADD CONSTRAINT "provinceName" UNIQUE ("provinceName");


--
-- TOC entry 3697 (class 2606 OID 27225)
-- Name: recalification recalificationID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recalification
    ADD CONSTRAINT "recalificationID" UNIQUE ("recalificationID");


--
-- TOC entry 3684 (class 2606 OID 27176)
-- Name: forumReply replyID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."forumReply"
    ADD CONSTRAINT "replyID" UNIQUE ("replyID");


--
-- TOC entry 3485 (class 2606 OID 16772)
-- Name: role roleCode; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "roleCode" UNIQUE ("roleCode");


--
-- TOC entry 3487 (class 2606 OID 16770)
-- Name: role roleName; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "roleName" UNIQUE ("roleName");


--
-- TOC entry 3692 (class 2606 OID 27205)
-- Name: schedule scheduleID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "scheduleID" UNIQUE ("scheduleID");


--
-- TOC entry 3619 (class 2606 OID 17459)
-- Name: session session_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "session_PK" PRIMARY KEY ("sessionID");


--
-- TOC entry 3688 (class 2606 OID 27190)
-- Name: paymentStatus statusID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."paymentStatus"
    ADD CONSTRAINT "statusID" UNIQUE ("statusID");


--
-- TOC entry 3491 (class 2606 OID 16789)
-- Name: student studentCode; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT "studentCode" UNIQUE ("studentCode");


--
-- TOC entry 3535 (class 2606 OID 16929)
-- Name: task taskCode; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "taskCode" UNIQUE ("taskCode");


--
-- TOC entry 3496 (class 2606 OID 16804)
-- Name: teacher teacherCode; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT "teacherCode" UNIQUE ("teacherCode");


--
-- TOC entry 3455 (class 2606 OID 16691)
-- Name: personType type; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."personType"
    ADD CONSTRAINT type UNIQUE ("personType");


--
-- TOC entry 3457 (class 2606 OID 16693)
-- Name: personType typeName; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."personType"
    ADD CONSTRAINT "typeName" UNIQUE ("typeName");


--
-- TOC entry 3569 (class 2606 OID 26951)
-- Name: studentAnswer uniqueAnswer; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."studentAnswer"
    ADD CONSTRAINT "uniqueAnswer" UNIQUE ("questionID", "studentID");


--
-- TOC entry 3622 (class 2606 OID 17461)
-- Name: session userID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "userID" UNIQUE ("userID");


--
-- TOC entry 3480 (class 1259 OID 16753)
-- Name: address_city_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX address_city_ix ON public.address USING btree ("cityID");


--
-- TOC entry 3481 (class 1259 OID 16754)
-- Name: address_person_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX address_person_ix ON public.address USING btree ("personID");


--
-- TOC entry 3562 (class 1259 OID 17021)
-- Name: answer_question_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX answer_question_ix ON public."examAnswer" USING btree ("questionID");


--
-- TOC entry 3530 (class 1259 OID 16913)
-- Name: assistance_student_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX assistance_student_ix ON public."assistenceRegister" USING btree ("studentID");


--
-- TOC entry 3531 (class 1259 OID 16912)
-- Name: assistance_subject_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX assistance_subject_ix ON public."assistenceRegister" USING btree ("subjectID");


--
-- TOC entry 3625 (class 1259 OID 17484)
-- Name: auditSession_user_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "auditSession_user_ix" ON public."auditSession" USING btree ("userID");


--
-- TOC entry 3572 (class 1259 OID 17052)
-- Name: averange_subject_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX averange_subject_ix ON public."calificationAverange" USING btree ("subjectID");


--
-- TOC entry 3573 (class 1259 OID 17054)
-- Name: averange_teacher_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX averange_teacher_ix ON public."calificationAverange" USING btree ("teacherID");


--
-- TOC entry 3574 (class 1259 OID 17053)
-- Name: avergange_student_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX avergange_student_ix ON public."calificationAverange" USING btree ("studentID");


--
-- TOC entry 3462 (class 1259 OID 16704)
-- Name: city_province_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX city_province_ix ON public.city USING btree ("provinceID");


--
-- TOC entry 3637 (class 1259 OID 26998)
-- Name: classSchedule_holiday_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "classSchedule_holiday_ix" ON public."classSchedule" USING btree ("holidayID");


--
-- TOC entry 3638 (class 1259 OID 26996)
-- Name: classSchedule_schedule_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "classSchedule_schedule_ix" ON public."classSchedule" USING btree ("scheduleID");


--
-- TOC entry 3639 (class 1259 OID 26997)
-- Name: classSchedule_subject_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "classSchedule_subject_ix" ON public."classSchedule" USING btree ("subjectID");


--
-- TOC entry 3527 (class 1259 OID 17640)
-- Name: content_subject_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX content_subject_ix ON public.content USING btree ("subjectID");


--
-- TOC entry 3609 (class 1259 OID 17160)
-- Name: detail_payment_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX detail_payment_ix ON public."paymentDetail" USING btree ("paymentID");


--
-- TOC entry 3500 (class 1259 OID 16815)
-- Name: enrrollment_academicPeriod_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "enrrollment_academicPeriod_ix" ON public.enrollment USING btree ("periodID");


--
-- TOC entry 3501 (class 1259 OID 16816)
-- Name: enrrollment_course_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX enrrollment_course_ix ON public.enrollment USING btree ("courseID");


--
-- TOC entry 3502 (class 1259 OID 16812)
-- Name: enrrollment_status_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX enrrollment_status_ix ON public.enrollment USING btree ("statusID");


--
-- TOC entry 3503 (class 1259 OID 16813)
-- Name: enrrollment_student_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX enrrollment_student_ix ON public.enrollment USING btree ("studentID");


--
-- TOC entry 3504 (class 1259 OID 16814)
-- Name: enrrollment_user_is; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX enrrollment_user_is ON public.enrollment USING btree ("userID");


--
-- TOC entry 3539 (class 1259 OID 16941)
-- Name: evaluation_student_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX evaluation_student_ix ON public."taskEvaluation" USING btree ("studentID");


--
-- TOC entry 3540 (class 1259 OID 16940)
-- Name: evaluation_task_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX evaluation_task_ix ON public."taskEvaluation" USING btree ("taskID");


--
-- TOC entry 3549 (class 1259 OID 16978)
-- Name: examGrade_exam_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "examGrade_exam_ix" ON public."examGrade" USING btree ("examID");


--
-- TOC entry 3550 (class 1259 OID 16977)
-- Name: examGrade_student_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "examGrade_student_ix" ON public."examGrade" USING btree ("studentID");


--
-- TOC entry 3551 (class 1259 OID 16979)
-- Name: examGrade_teacher_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "examGrade_teacher_ix" ON public."examGrade" USING btree ("teacherID");


--
-- TOC entry 3554 (class 1259 OID 16994)
-- Name: examRegister_exam_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "examRegister_exam_ix" ON public."examRegister" USING btree ("examID");


--
-- TOC entry 3555 (class 1259 OID 16993)
-- Name: examRegister_student_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "examRegister_student_ix" ON public."examRegister" USING btree ("studentID");


--
-- TOC entry 3546 (class 1259 OID 16963)
-- Name: exam_subject_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX exam_subject_ix ON public.exam USING btree ("subjectID");


--
-- TOC entry 3565 (class 1259 OID 26949)
-- Name: fki_std_hasAn_que_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_std_hasAn_que_fk" ON public."studentAnswer" USING btree ("questionID");


--
-- TOC entry 3517 (class 1259 OID 17664)
-- Name: fki_sub_belongs_cou_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_sub_belongs_cou_fk ON public.subject USING btree ("courseID");


--
-- TOC entry 3556 (class 1259 OID 26976)
-- Name: fki_usr_reg_exa_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_usr_reg_exa_fk ON public."examRegister" USING btree ("userID");


--
-- TOC entry 3678 (class 1259 OID 27159)
-- Name: forumContent_forum_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "forumContent_forum_ix" ON public."forumContent" USING btree ("forumID");


--
-- TOC entry 3672 (class 1259 OID 27144)
-- Name: forumMember_forum_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "forumMember_forum_ix" ON public."forumMember" USING btree ("forumID");


--
-- TOC entry 3673 (class 1259 OID 27145)
-- Name: forumMember_user_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "forumMember_user_ix" ON public."forumMember" USING btree ("userID");


--
-- TOC entry 3681 (class 1259 OID 27171)
-- Name: forumReply_forum_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "forumReply_forum_ix" ON public."forumReply" USING btree ("forumID");


--
-- TOC entry 3682 (class 1259 OID 27172)
-- Name: forumReply_member_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "forumReply_member_ix" ON public."forumReply" USING btree ("forumContentID");


--
-- TOC entry 3669 (class 1259 OID 27132)
-- Name: forum_teacher_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX forum_teacher_ix ON public.forum USING btree ("teacherID");


--
-- TOC entry 3656 (class 1259 OID 27099)
-- Name: groupUser_group_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "groupUser_group_ix" ON public."groupUser" USING btree ("groupID");


--
-- TOC entry 3657 (class 1259 OID 27100)
-- Name: groupUser_user_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "groupUser_user_ix" ON public."groupUser" USING btree ("userID");


--
-- TOC entry 3651 (class 1259 OID 27087)
-- Name: group_teacher_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX group_teacher_ix ON public."group" USING btree ("teacherID");


--
-- TOC entry 3644 (class 1259 OID 27016)
-- Name: holiday_city_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX holiday_city_ix ON public.holiday USING btree ("cityID");


--
-- TOC entry 3645 (class 1259 OID 27014)
-- Name: holiday_country_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX holiday_country_ix ON public.holiday USING btree ("countryID");


--
-- TOC entry 3646 (class 1259 OID 27015)
-- Name: holiday_province_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX holiday_province_ix ON public.holiday USING btree ("provinceID");


--
-- TOC entry 3662 (class 1259 OID 27115)
-- Name: message_group_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX message_group_ix ON public."groupMessage" USING btree ("groupID");


--
-- TOC entry 3663 (class 1259 OID 27117)
-- Name: message_receivedUser_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "message_receivedUser_ix" ON public."groupMessage" USING btree ("receivedUserID");


--
-- TOC entry 3664 (class 1259 OID 27116)
-- Name: message_sentUser_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "message_sentUser_ix" ON public."groupMessage" USING btree ("sentUserID");


--
-- TOC entry 3577 (class 1259 OID 17070)
-- Name: partial_student_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX partial_student_ix ON public.partial USING btree ("studentID");


--
-- TOC entry 3578 (class 1259 OID 17069)
-- Name: partial_subject_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX partial_subject_ix ON public.partial USING btree ("subjectID");


--
-- TOC entry 3597 (class 1259 OID 17135)
-- Name: payment_college_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payment_college_ix ON public.payment USING btree ("collegeID");


--
-- TOC entry 3598 (class 1259 OID 17130)
-- Name: payment_method_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payment_method_ix ON public.payment USING btree ("idPaymentMethod");


--
-- TOC entry 3599 (class 1259 OID 17132)
-- Name: payment_person_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payment_person_ix ON public.payment USING btree ("personID");


--
-- TOC entry 3600 (class 1259 OID 17131)
-- Name: payment_student_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payment_student_ix ON public.payment USING btree ("studentID");


--
-- TOC entry 3601 (class 1259 OID 17134)
-- Name: payment_type_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payment_type_ix ON public.payment USING btree ("paymentTypeID");


--
-- TOC entry 3602 (class 1259 OID 17133)
-- Name: payment_user_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX payment_user_ix ON public.payment USING btree ("userID");


--
-- TOC entry 3449 (class 1259 OID 16671)
-- Name: person_personType_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "person_personType_ix" ON public.person USING btree ("personTypeID");


--
-- TOC entry 3469 (class 1259 OID 16719)
-- Name: province_country_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX province_country_ix ON public.province USING btree ("countryID");


--
-- TOC entry 3559 (class 1259 OID 17007)
-- Name: question_exam_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX question_exam_ix ON public."examQuestion" USING btree ("examID");


--
-- TOC entry 3591 (class 1259 OID 17113)
-- Name: ratedStudent_rate_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ratedStudent_rate_ix" ON public.rating USING btree ("ratedStudentID");


--
-- TOC entry 3592 (class 1259 OID 17114)
-- Name: ratedTeacher_rate_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ratedTeacher_rate_ix" ON public.rating USING btree ("ratedTeacherID");


--
-- TOC entry 3698 (class 1259 OID 27221)
-- Name: recalification_average_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX recalification_average_ix ON public.recalification USING btree ("averangeID");


--
-- TOC entry 3699 (class 1259 OID 27220)
-- Name: recalification_partial_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX recalification_partial_ix ON public.recalification USING btree ("patialID");


--
-- TOC entry 3632 (class 1259 OID 25923)
-- Name: resolution_resours_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX resolution_resours_ix ON public."taskResolutionResource" USING btree ("resolutionID");


--
-- TOC entry 3628 (class 1259 OID 25910)
-- Name: resolution_student_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX resolution_student_ix ON public."taskResolution" USING btree ("studentID");


--
-- TOC entry 3629 (class 1259 OID 25909)
-- Name: resolution_task_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX resolution_task_ix ON public."taskResolution" USING btree ("taskID");


--
-- TOC entry 3543 (class 1259 OID 16953)
-- Name: resource_task_is; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX resource_task_is ON public."taskResource" USING btree ("taskID");


--
-- TOC entry 3704 (class 1259 OID 27237)
-- Name: review_application_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX review_application_ix ON public."reviewApplication" USING btree ("recalificationID");


--
-- TOC entry 3693 (class 1259 OID 27201)
-- Name: schedule_college_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX schedule_college_ix ON public.schedule USING btree ("collegeID");


--
-- TOC entry 3620 (class 1259 OID 17467)
-- Name: session_user_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX session_user_ix ON public.session USING btree ("userID");


--
-- TOC entry 3593 (class 1259 OID 17115)
-- Name: studenRates_rate_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "studenRates_rate_ix" ON public.rating USING btree ("studentRatesID");


--
-- TOC entry 3566 (class 1259 OID 17035)
-- Name: studentAnswer_answer_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "studentAnswer_answer_ix" ON public."studentAnswer" USING btree ("answerID");


--
-- TOC entry 3567 (class 1259 OID 17036)
-- Name: studentAnswer_student_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "studentAnswer_student_ix" ON public."studentAnswer" USING btree ("studentID");


--
-- TOC entry 3492 (class 1259 OID 16785)
-- Name: student_person_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX student_person_ix ON public.student USING btree ("personID");


--
-- TOC entry 3518 (class 1259 OID 16869)
-- Name: subject_teacher_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX subject_teacher_ix ON public.subject USING btree ("teacherID");


--
-- TOC entry 3536 (class 1259 OID 16925)
-- Name: task_subject_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX task_subject_ix ON public.task USING btree ("subjectID");


--
-- TOC entry 3594 (class 1259 OID 17116)
-- Name: teacherRates_rate_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "teacherRates_rate_ix" ON public.rating USING btree ("teacherRatesID");


--
-- TOC entry 3497 (class 1259 OID 16800)
-- Name: teacher_person_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX teacher_person_ix ON public.teacher USING btree ("personID");


--
-- TOC entry 3583 (class 1259 OID 17084)
-- Name: telephone_operator_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX telephone_operator_ix ON public.telephone USING btree ("operatorID");


--
-- TOC entry 3584 (class 1259 OID 17085)
-- Name: telephone_person_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX telephone_person_ix ON public.telephone USING btree ("personID");


--
-- TOC entry 3442 (class 1259 OID 16652)
-- Name: user_college_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_college_ix ON public."user" USING btree ("collegeID");


--
-- TOC entry 3443 (class 1259 OID 16650)
-- Name: user_person_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_person_ix ON public."user" USING btree ("personID");


--
-- TOC entry 3444 (class 1259 OID 16651)
-- Name: user_role_ix; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_role_ix ON public."user" USING btree ("roleID");


--
-- TOC entry 3766 (class 2620 OID 17489)
-- Name: session deleteauditsessiontrigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER deleteauditsessiontrigger AFTER DELETE ON public.session FOR EACH ROW EXECUTE FUNCTION public.fndeleteauditsession();


--
-- TOC entry 3768 (class 2620 OID 17536)
-- Name: session deleteinactivesessions; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER deleteinactivesessions AFTER INSERT OR DELETE OR UPDATE ON public.session FOR EACH ROW EXECUTE FUNCTION public.fndeleteoldusers();


--
-- TOC entry 3765 (class 2620 OID 17488)
-- Name: session insertauditsessiontrigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER insertauditsessiontrigger BEFORE INSERT ON public.session FOR EACH ROW EXECUTE FUNCTION public.fninsertauditsession();


--
-- TOC entry 3767 (class 2620 OID 17490)
-- Name: session updateauditsessiontrigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER updateauditsessiontrigger BEFORE UPDATE ON public.session FOR EACH ROW EXECUTE FUNCTION public.fnupdateauditsession();


--
-- TOC entry 3711 (class 2606 OID 17192)
-- Name: address add_isIn_cit_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT "add_isIn_cit_fk" FOREIGN KEY ("cityID") REFERENCES public.city("cityID");


--
-- TOC entry 3725 (class 2606 OID 27021)
-- Name: assistenceRegister asi_has_sch_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."assistenceRegister"
    ADD CONSTRAINT asi_has_sch_fk FOREIGN KEY ("classScheduleID") REFERENCES public."classSchedule"("classScheduleID");


--
-- TOC entry 3739 (class 2606 OID 17317)
-- Name: studentAnswer asw_isRegistered_std_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."studentAnswer"
    ADD CONSTRAINT "asw_isRegistered_std_fk" FOREIGN KEY ("answerID") REFERENCES public."examAnswer"("answerID");


--
-- TOC entry 3761 (class 2606 OID 17479)
-- Name: auditSession aud_has_usr_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."auditSession"
    ADD CONSTRAINT aud_has_usr_fk FOREIGN KEY ("userID") REFERENCES public."user"("userID");


--
-- TOC entry 3709 (class 2606 OID 17202)
-- Name: city cit_isIn_prv_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT "cit_isIn_prv_fk" FOREIGN KEY ("provinceID") REFERENCES public.province("provinceID");


--
-- TOC entry 3758 (class 2606 OID 17432)
-- Name: payment col_reg_pay_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT col_reg_pay_fk FOREIGN KEY ("collegeID") REFERENCES public.college("collegeID");


--
-- TOC entry 3719 (class 2606 OID 17242)
-- Name: enrollment cou_needs_enr_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT cou_needs_enr_fk FOREIGN KEY ("courseID") REFERENCES public.course("courseID");


--
-- TOC entry 3718 (class 2606 OID 17237)
-- Name: enrollment enr_has_per_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enr_has_per_fk FOREIGN KEY ("periodID") REFERENCES public."academicPeriod"("periodID");


--
-- TOC entry 3715 (class 2606 OID 17222)
-- Name: enrollment enr_has_sta_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enr_has_sta_fk FOREIGN KEY ("statusID") REFERENCES public."enrollmentStatus"("statusID");


--
-- TOC entry 3732 (class 2606 OID 17297)
-- Name: examGrade exm_has_grd_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."examGrade"
    ADD CONSTRAINT exm_has_grd_fk FOREIGN KEY ("examID") REFERENCES public.exam("examID");


--
-- TOC entry 3737 (class 2606 OID 17307)
-- Name: examQuestion exm_has_qst_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."examQuestion"
    ADD CONSTRAINT exm_has_qst_fk FOREIGN KEY ("examID") REFERENCES public.exam("examID");


--
-- TOC entry 3735 (class 2606 OID 17387)
-- Name: examRegister exm_has_reg_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."examRegister"
    ADD CONSTRAINT exm_has_reg_fk FOREIGN KEY ("examID") REFERENCES public.exam("examID");


--
-- TOC entry 3759 (class 2606 OID 17422)
-- Name: paymentDetail pay_has_det_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."paymentDetail"
    ADD CONSTRAINT pay_has_det_fk FOREIGN KEY ("paymentID") REFERENCES public.payment("paymentID");


--
-- TOC entry 3753 (class 2606 OID 17402)
-- Name: payment pay_has_met_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT pay_has_met_fk FOREIGN KEY ("idPaymentMethod") REFERENCES public."paymentMethod"("idPaymentMethod");


--
-- TOC entry 3757 (class 2606 OID 17427)
-- Name: payment pay_has_typ_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT pay_has_typ_fk FOREIGN KEY ("paymentTypeID") REFERENCES public."paymentType"("paymentTypeID");


--
-- TOC entry 3712 (class 2606 OID 17392)
-- Name: address per_has_add_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT per_has_add_fk FOREIGN KEY ("personID") REFERENCES public.person("personID");


--
-- TOC entry 3748 (class 2606 OID 17397)
-- Name: telephone per_has_tel_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.telephone
    ADD CONSTRAINT per_has_tel_fk FOREIGN KEY ("personID") REFERENCES public.person("personID");


--
-- TOC entry 3708 (class 2606 OID 17182)
-- Name: person per_has_typ_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT per_has_typ_fk FOREIGN KEY ("personTypeID") REFERENCES public."personType"("personTypeID");


--
-- TOC entry 3755 (class 2606 OID 17412)
-- Name: payment prs_makes_pay_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT prs_makes_pay_fk FOREIGN KEY ("personID") REFERENCES public.person("personID");


--
-- TOC entry 3710 (class 2606 OID 17207)
-- Name: province prv_isIn_cit_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.province
    ADD CONSTRAINT "prv_isIn_cit_fk" FOREIGN KEY ("countryID") REFERENCES public.country("countryID");


--
-- TOC entry 3738 (class 2606 OID 17312)
-- Name: examAnswer qst_has_ans_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."examAnswer"
    ADD CONSTRAINT qst_has_ans_fk FOREIGN KEY ("questionID") REFERENCES public."examQuestion"("questionID");


--
-- TOC entry 3764 (class 2606 OID 25936)
-- Name: taskResolutionResource res_has_src_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taskResolutionResource"
    ADD CONSTRAINT res_has_src_fk FOREIGN KEY ("resolutionID") REFERENCES public."taskResolution"("resolutionID");


--
-- TOC entry 3742 (class 2606 OID 17337)
-- Name: calificationAverange sbj_has_avg_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."calificationAverange"
    ADD CONSTRAINT sbj_has_avg_fk FOREIGN KEY ("subjectID") REFERENCES public.subject("subjectID");


--
-- TOC entry 3760 (class 2606 OID 17462)
-- Name: session ses_has_usr_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT ses_has_usr_fk FOREIGN KEY ("userID") REFERENCES public."user"("userID");


--
-- TOC entry 3740 (class 2606 OID 17322)
-- Name: studentAnswer std_choices_ans_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."studentAnswer"
    ADD CONSTRAINT std_choices_ans_fk FOREIGN KEY ("studentID") REFERENCES public.student("studentID");


--
-- TOC entry 3741 (class 2606 OID 26944)
-- Name: studentAnswer std_hasAn_que_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."studentAnswer"
    ADD CONSTRAINT "std_hasAn_que_fk" FOREIGN KEY ("questionID") REFERENCES public."examQuestion"("questionID");


--
-- TOC entry 3743 (class 2606 OID 17342)
-- Name: calificationAverange std_has_avg_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."calificationAverange"
    ADD CONSTRAINT std_has_avg_fk FOREIGN KEY ("studentID") REFERENCES public.student("studentID");


--
-- TOC entry 3731 (class 2606 OID 17292)
-- Name: examGrade std_has_grd_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."examGrade"
    ADD CONSTRAINT std_has_grd_fk FOREIGN KEY ("studentID") REFERENCES public.student("studentID");


--
-- TOC entry 3746 (class 2606 OID 17332)
-- Name: partial std_has_par_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partial
    ADD CONSTRAINT std_has_par_fk FOREIGN KEY ("studentID") REFERENCES public.student("studentID");


--
-- TOC entry 3749 (class 2606 OID 17357)
-- Name: rating std_has_rat_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT std_has_rat_fk FOREIGN KEY ("ratedStudentID") REFERENCES public.student("studentID");


--
-- TOC entry 3728 (class 2606 OID 17277)
-- Name: taskEvaluation std_has_tse_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taskEvaluation"
    ADD CONSTRAINT std_has_tse_fk FOREIGN KEY ("studentID") REFERENCES public.student("studentID");


--
-- TOC entry 3713 (class 2606 OID 17212)
-- Name: student std_is_per_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT std_is_per_fk FOREIGN KEY ("personID") REFERENCES public.person("personID");


--
-- TOC entry 3751 (class 2606 OID 17367)
-- Name: rating std_rates_rat_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT std_rates_rat_fk FOREIGN KEY ("studentRatesID") REFERENCES public.student("studentID");


--
-- TOC entry 3763 (class 2606 OID 25931)
-- Name: taskResolution std_records_res_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taskResolution"
    ADD CONSTRAINT std_records_res_fk FOREIGN KEY ("studentID") REFERENCES public.student("studentID");


--
-- TOC entry 3724 (class 2606 OID 17267)
-- Name: assistenceRegister std_reg_asr_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."assistenceRegister"
    ADD CONSTRAINT std_reg_asr_fk FOREIGN KEY ("studentID") REFERENCES public.student("studentID");


--
-- TOC entry 3754 (class 2606 OID 17407)
-- Name: payment strd_generates_pay_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT strd_generates_pay_fk FOREIGN KEY ("studentID") REFERENCES public.student("studentID");


--
-- TOC entry 3734 (class 2606 OID 17287)
-- Name: examRegister stu_reg_exa_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."examRegister"
    ADD CONSTRAINT stu_reg_exa_fk FOREIGN KEY ("studentID") REFERENCES public.student("studentID");


--
-- TOC entry 3716 (class 2606 OID 17227)
-- Name: enrollment stu_req_enr_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT stu_req_enr_fk FOREIGN KEY ("studentID") REFERENCES public.student("studentID");


--
-- TOC entry 3721 (class 2606 OID 17659)
-- Name: subject sub_belongs_cou_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT sub_belongs_cou_fk FOREIGN KEY ("courseID") REFERENCES public.course("courseID");


--
-- TOC entry 3723 (class 2606 OID 17262)
-- Name: assistenceRegister sub_has_asr_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."assistenceRegister"
    ADD CONSTRAINT sub_has_asr_fk FOREIGN KEY ("subjectID") REFERENCES public.subject("subjectID");


--
-- TOC entry 3722 (class 2606 OID 17665)
-- Name: content sub_has_cnt_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT sub_has_cnt_fk FOREIGN KEY ("subjectID") REFERENCES public.subject("subjectID");


--
-- TOC entry 3745 (class 2606 OID 17327)
-- Name: partial sub_has_par_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partial
    ADD CONSTRAINT sub_has_par_fk FOREIGN KEY ("subjectID") REFERENCES public.subject("subjectID");


--
-- TOC entry 3726 (class 2606 OID 17377)
-- Name: task sub_has_tsk_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT sub_has_tsk_fk FOREIGN KEY ("subjectID") REFERENCES public.subject("subjectID");


--
-- TOC entry 3730 (class 2606 OID 17282)
-- Name: exam sub_take_exa_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exam
    ADD CONSTRAINT sub_take_exa_fk FOREIGN KEY ("subjectID") REFERENCES public.subject("subjectID");


--
-- TOC entry 3733 (class 2606 OID 17302)
-- Name: examGrade tch_gives_grd_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."examGrade"
    ADD CONSTRAINT tch_gives_grd_fk FOREIGN KEY ("teacherID") REFERENCES public.teacher("teacherID");


--
-- TOC entry 3750 (class 2606 OID 17362)
-- Name: rating tch_has_rat_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT tch_has_rat_fk FOREIGN KEY ("ratedTeacherID") REFERENCES public.teacher("teacherID");


--
-- TOC entry 3714 (class 2606 OID 17217)
-- Name: teacher tch_is_per_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT tch_is_per_fk FOREIGN KEY ("personID") REFERENCES public.person("personID");


--
-- TOC entry 3752 (class 2606 OID 17372)
-- Name: rating tch_rates_rat_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT tch_rates_rat_fk FOREIGN KEY ("teacherRatesID") REFERENCES public.teacher("teacherID");


--
-- TOC entry 3744 (class 2606 OID 17347)
-- Name: calificationAverange tch_reg_avg_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."calificationAverange"
    ADD CONSTRAINT tch_reg_avg_fk FOREIGN KEY ("teacherID") REFERENCES public.teacher("teacherID");


--
-- TOC entry 3720 (class 2606 OID 17247)
-- Name: subject tch_teachs_sub_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT tch_teachs_sub_fk FOREIGN KEY ("teacherID") REFERENCES public.teacher("teacherID");


--
-- TOC entry 3747 (class 2606 OID 17352)
-- Name: telephone tlf_has_ope_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.telephone
    ADD CONSTRAINT tlf_has_ope_fk FOREIGN KEY ("operatorID") REFERENCES public."phoneOperator"("operatorID");


--
-- TOC entry 3727 (class 2606 OID 17272)
-- Name: taskEvaluation tsk_has_eva_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taskEvaluation"
    ADD CONSTRAINT tsk_has_eva_fk FOREIGN KEY ("taskID") REFERENCES public.task("taskID");


--
-- TOC entry 3762 (class 2606 OID 25926)
-- Name: taskResolution tsk_has_res_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taskResolution"
    ADD CONSTRAINT tsk_has_res_fk FOREIGN KEY ("taskID") REFERENCES public.task("taskID");


--
-- TOC entry 3729 (class 2606 OID 17382)
-- Name: taskResource tsk_has_rsc_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."taskResource"
    ADD CONSTRAINT tsk_has_rsc_fk FOREIGN KEY ("taskID") REFERENCES public.task("taskID");


--
-- TOC entry 3706 (class 2606 OID 17197)
-- Name: user urs_has_rol_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT urs_has_rol_fk FOREIGN KEY ("roleID") REFERENCES public.role("roleID");


--
-- TOC entry 3707 (class 2606 OID 17252)
-- Name: user usr_belongs_col_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT usr_belongs_col_fk FOREIGN KEY ("collegeID") REFERENCES public.college("collegeID");


--
-- TOC entry 3705 (class 2606 OID 17187)
-- Name: user usr_is_per_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT usr_is_per_fk FOREIGN KEY ("personID") REFERENCES public.person("personID");


--
-- TOC entry 3717 (class 2606 OID 17232)
-- Name: enrollment usr_reg_enr_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT usr_reg_enr_fk FOREIGN KEY ("userID") REFERENCES public."user"("userID");


--
-- TOC entry 3736 (class 2606 OID 26971)
-- Name: examRegister usr_reg_exa_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."examRegister"
    ADD CONSTRAINT usr_reg_exa_fk FOREIGN KEY ("userID") REFERENCES public."user"("userID");


--
-- TOC entry 3756 (class 2606 OID 17417)
-- Name: payment usr_register_pay_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT usr_register_pay_fk FOREIGN KEY ("userID") REFERENCES public."user"("userID");


/*
	TRIGGERS FUNCTIONS AND PROCEDURES
*/

--
-- TOC entry 392 (class 1255 OID 17486)
-- Name: fndeleteauditsession(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fndeleteauditsession() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
	insert into "auditSession"("sessionID", 
							   "sessionRoom",
							   "sessionDate",
							   "sessionToken",
							   "sessionExpiration",
							   "sessionIP",
							   "sessionDevice",
							   "sessionCode",
							   "sessionDetail",
							   "userID")
	values (
		old."sessionID",
		old."sessionRoom",
		current_timestamp,
		old."sessionToken",
		old."sessionExpiration",
		old."sessionIP",
		old."sessionDevice",
		old."sessionCode",
		'Logged out',
		old."userID"
	);
	return new;
end;
$$;


ALTER FUNCTION public.fndeleteauditsession() OWNER TO postgres;

--
-- TOC entry 394 (class 1255 OID 17535)
-- Name: fndeleteoldusers(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fndeleteoldusers() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
	delete from "session" 
	where "sessionDate" < now() - interval '4 hours';
	return new;
end;
$$;


ALTER FUNCTION public.fndeleteoldusers() OWNER TO postgres;

--
-- TOC entry 391 (class 1255 OID 17485)
-- Name: fninsertauditsession(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fninsertauditsession() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
	insert into "auditSession" ("sessionID", 
							   "sessionRoom",
							   "sessionDate",
							   "sessionToken",
							   "sessionExpiration",
							   "sessionIP",
							   "sessionDevice",
							   "sessionCode",
							   "sessionDetail",
							   "userID")
	values (
		new."sessionID",
		new."sessionRoom",
		new."sessionDate",
		new."sessionToken",
		new."sessionExpiration",
		new."sessionIP",
		new."sessionDevice",
		new."sessionCode",
		'Logged in',
		new."userID"
	);
	return new;
end;
$$;


ALTER FUNCTION public.fninsertauditsession() OWNER TO postgres;

--
-- TOC entry 393 (class 1255 OID 17487)
-- Name: fnupdateauditsession(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fnupdateauditsession() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
	insert into "auditSession" ("sessionID", 
							   "sessionRoom",
							   "sessionDate",
							   "sessionToken",
							   "sessionExpiration",
							   "sessionIP",
							   "sessionDevice",
							   "sessionCode",
							   "sessionDetail",
							   "userID")
	values (
		old."sessionID",
		new."sessionRoom",
		current_timestamp,
		new."sessionToken",
		new."sessionExpiration",
		new."sessionIP",
		new."sessionDevice",
		old."sessionCode",
		'Renew session',
		old."userID"
	);
	return new;
end;
$$;


ALTER FUNCTION public.fnupdateauditsession() OWNER TO postgres;