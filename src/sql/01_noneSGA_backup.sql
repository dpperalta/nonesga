CREATE SCHEMA nonesga;


ALTER SCHEMA nonesga OWNER TO postgres;

--
-- TOC entry 3456 (class 0 OID 0)e
-- Dependencies: 3
-- Name: SCHEMA nonesga; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA nonesga IS 'standard nonesga schema';


--
-- TOC entry 285 (class 1255 OID 17486)
-- Name: fndeleteauditsession(); Type: FUNCTION; Schema: nonesga; Owner: postgres
--

CREATE FUNCTION nonesga.fndeleteauditsession() RETURNS trigger
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


ALTER FUNCTION nonesga.fndeleteauditsession() OWNER TO postgres;

--
-- TOC entry 287 (class 1255 OID 17535)
-- Name: fndeleteoldusers(); Type: FUNCTION; Schema: nonesga; Owner: postgres
--

CREATE FUNCTION nonesga.fndeleteoldusers() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
	delete from "session" 
	where "sessionDate" < now() - interval '4 hours';
	return new;
end;
$$;


ALTER FUNCTION nonesga.fndeleteoldusers() OWNER TO postgres;

--
-- TOC entry 284 (class 1255 OID 17485)
-- Name: fninsertauditsession(); Type: FUNCTION; Schema: nonesga; Owner: postgres
--

CREATE FUNCTION nonesga.fninsertauditsession() RETURNS trigger
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


ALTER FUNCTION nonesga.fninsertauditsession() OWNER TO postgres;

--
-- TOC entry 286 (class 1255 OID 17487)
-- Name: fnupdateauditsession(); Type: FUNCTION; Schema: nonesga; Owner: postgres
--

CREATE FUNCTION nonesga.fnupdateauditsession() RETURNS trigger
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


ALTER FUNCTION nonesga.fnupdateauditsession() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 16834)
-- Name: academicPeriod; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."academicPeriod" (
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


ALTER TABLE nonesga."academicPeriod" OWNER TO postgres;

--
-- TOC entry 3457 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."periodID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."academicPeriod"."periodID" IS 'Unique autoincremental identification for an academic period';


--
-- TOC entry 3458 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."startPeriod"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."academicPeriod"."startPeriod" IS 'Date to the start academic period';


--
-- TOC entry 3459 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."endPeriod"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."academicPeriod"."endPeriod" IS 'Date to the end of the academic perdiod
';


--
-- TOC entry 3460 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."periodName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."academicPeriod"."periodName" IS 'Name to the academic period';


--
-- TOC entry 3461 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."academicPeriod"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3462 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."academicPeriod"."registeredDate" IS 'Timestamp for registration of academic period';


--
-- TOC entry 3463 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod"."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."academicPeriod"."unregisteredDate" IS 'Timestamp for the unregistration date';


--
-- TOC entry 3464 (class 0 OID 0)
-- Dependencies: 228
-- Name: COLUMN "academicPeriod".detail; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."academicPeriod".detail IS 'Details or aditional information for the period';


--
-- TOC entry 227 (class 1259 OID 16832)
-- Name: academicPeriod_periodID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."academicPeriod" ALTER COLUMN "periodID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."academicPeriod_periodID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16746)
-- Name: address; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.address (
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


ALTER TABLE nonesga.address OWNER TO postgres;

--
-- TOC entry 3465 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."addressID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address."addressID" IS 'Unique autoincremental identification for a person''s address';


--
-- TOC entry 3466 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."addressName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address."addressName" IS 'Address name, for identification in the applications';


--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."mainStreet"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address."mainStreet" IS 'Name of the main street';


--
-- TOC entry 3468 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address.number; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address.number IS 'Number of house, also can be the identification';


--
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."secondStreet"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address."secondStreet" IS 'Name of the secondary street';


--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."references"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address."references" IS 'Aditional information, or references that permits an easy identification of the house';


--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."zipCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address."zipCode" IS 'Zip code if exists';


--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address.latitude; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address.latitude IS 'Latitude for GPS identification';


--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address.longitude; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address.longitude IS 'Longitude for GPS identification';


--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."addressType"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address."addressType" IS '1: Main address
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
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address."registeredDate" IS 'Timestamp for date of registred address';


--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN address."isFavourite"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.address."isFavourite" IS 'true: favourite
false: is not favourite

Only one favourite address for a person';


--
-- TOC entry 215 (class 1259 OID 16744)
-- Name: address_addressID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.address ALTER COLUMN "addressID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."address_addressID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 238 (class 1259 OID 16902)
-- Name: assistenceRegister; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."assistenceRegister" (
    "AssistanceRegisterID" integer NOT NULL,
    date date DEFAULT CURRENT_DATE NOT NULL,
    "time" time without time zone DEFAULT CURRENT_TIME NOT NULL,
    period character varying(20),
    detail text,
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
    "studentID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."assistenceRegister" OWNER TO postgres;

--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."AssistanceRegisterID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister"."AssistanceRegisterID" IS 'Unique autoincremental identification for a register of assistance';


--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister".date; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister".date IS 'Date of register';


--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."time"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister"."time" IS 'Hour of register';


--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister".period; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister".period IS 'Period time or enumeration, name or similar';


--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister".detail; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister".detail IS 'If the registration needs aditional details';


--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister".present; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister".present IS 'true: strudent is present
false: studen is absent';


--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."registrationDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister"."registrationDate" IS 'Timestamp for registration date';


--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."studentDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister"."studentDetail" IS 'Information for the student';


--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."agentDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister"."agentDetail" IS 'Information for parents or agent of an student';


--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."isJustified"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister"."isJustified" IS 'true: absent justified
false: absent not justified';


--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."requiereAgentNotification"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister"."requiereAgentNotification" IS 'true: If the absent requieres a notification for parentes or agent
false if the absent not requieres a notification for parents or agent';


--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."justifiedDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister"."justifiedDate" IS 'Timestamp for justification date';


--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."editedDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister"."editedDate" IS 'Timestamp for edition in the register';


--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 238
-- Name: COLUMN "assistenceRegister"."editedUser"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."assistenceRegister"."editedUser" IS 'ID for user tha edits the information of assistence register';


--
-- TOC entry 237 (class 1259 OID 16900)
-- Name: assistenceRegister_AssistanceRegisterID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."assistenceRegister" ALTER COLUMN "AssistanceRegisterID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."assistenceRegister_AssistanceRegisterID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 279 (class 1259 OID 17470)
-- Name: auditSession; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."auditSession" (
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


ALTER TABLE nonesga."auditSession" OWNER TO postgres;

--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 279
-- Name: TABLE "auditSession"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON TABLE nonesga."auditSession" IS 'Table for store the historical information for users that register a Login in NoNe SGA';


--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."auditID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."auditSession"."auditID" IS 'Unique autoincremental ID for a session registration';


--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."auditSession"."sessionID" IS 'Value of sessionID to store in the audit table';


--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionRoom"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."auditSession"."sessionRoom" IS 'Rooms for manage of sessions';


--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."auditSession"."sessionDate" IS 'Timestamp for the date of session';


--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionToken"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."auditSession"."sessionToken" IS 'Information of generated token for the session';


--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionExpiration"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."auditSession"."sessionExpiration" IS 'Information for the expiration of session';


--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionDevice"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."auditSession"."sessionDevice" IS 'Name or identifyer for the device of the conection';


--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."auditSession"."sessionCode" IS 'Unique code formed by date anda userID';


--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 279
-- Name: COLUMN "auditSession"."sessionDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."auditSession"."sessionDetail" IS 'Detail or description of the operation in execution';


--
-- TOC entry 278 (class 1259 OID 17468)
-- Name: auditSession_auditID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."auditSession" ALTER COLUMN "auditID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."auditSession_auditID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 258 (class 1259 OID 17041)
-- Name: calificationAverange; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."calificationAverange" (
    "averangeID" integer NOT NULL,
    "averangeCalification" double precision NOT NULL,
    "calificationHomologated" character varying(5),
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status smallint NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "isModified" boolean DEFAULT false,
    "lastModified" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "lastCalification" double precision,
    "userModifies" integer,
    "modificationDate" timestamp without time zone,
    "studentDetail" text,
    "agentDetail" text,
    "averangelDetail" text,
    "isFinal" boolean DEFAULT false NOT NULL,
    "subjectID" integer NOT NULL,
    "studentID" integer NOT NULL,
    "teacherID" integer NOT NULL
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."calificationAverange" OWNER TO postgres;

--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."averangeID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange"."averangeID" IS 'Unique autoincremental identification for averange of califications for a student';


--
-- TOC entry 3504 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."averangeCalification"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange"."averangeCalification" IS 'Value of the averange calification or score';


--
-- TOC entry 3505 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."calificationHomologated"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange"."calificationHomologated" IS 'Homologated value';


--
-- TOC entry 3506 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange"."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 3507 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange".status; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange".status IS 'Value for the status of calification
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
-- TOC entry 3508 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3509 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."isModified"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange"."isModified" IS 'true: if the calification was modified
false: if the calification wasn''t modified';


--
-- TOC entry 3510 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."lastModified"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange"."lastModified" IS 'Timestamp for las modification';


--
-- TOC entry 3511 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."lastCalification"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange"."lastCalification" IS 'Last value of calification';


--
-- TOC entry 3512 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."userModifies"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange"."userModifies" IS 'User ID that modifies the calification';


--
-- TOC entry 3513 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."modificationDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange"."modificationDate" IS 'Timestamp for modification';


--
-- TOC entry 3514 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."studentDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange"."studentDetail" IS 'Detail for students (filled by the teacher)';


--
-- TOC entry 3515 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."agentDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange"."agentDetail" IS 'Detail for parents or agents (filled by the teacher)';


--
-- TOC entry 3516 (class 0 OID 0)
-- Dependencies: 258
-- Name: COLUMN "calificationAverange"."averangelDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."calificationAverange"."averangelDetail" IS 'General detail, for administration of college (filled by the teacher or administration)';


--
-- TOC entry 257 (class 1259 OID 17039)
-- Name: calificationAverange_averangeID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."calificationAverange" ALTER COLUMN "averangeID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."calificationAverange_averangeID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 210 (class 1259 OID 16696)
-- Name: city; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.city (
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


ALTER TABLE nonesga.city OWNER TO postgres;

--
-- TOC entry 3517 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."cityID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.city."cityID" IS 'Unique autoincremental identification for a city';


--
-- TOC entry 3518 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."cityCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.city."cityCode" IS 'Code assigned for a city';


--
-- TOC entry 3519 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."cityName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.city."cityName" IS 'Name for the city, is the real name that identifies a city in the app';


--
-- TOC entry 3520 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."cityDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.city."cityDetail" IS 'Aditional details for the city';


--
-- TOC entry 3521 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.city."registeredDate" IS 'Timestamp for registration date of the city';


--
-- TOC entry 3522 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.city."unregisteredDate" IS 'Timestamp for date of unregistered city';


--
-- TOC entry 3523 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN city."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.city."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 209 (class 1259 OID 16694)
-- Name: city_cityID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.city ALTER COLUMN "cityID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."city_cityID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 234 (class 1259 OID 16875)
-- Name: college; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.college (
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


ALTER TABLE nonesga.college OWNER TO postgres;

--
-- TOC entry 3524 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."collegeID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college."collegeID" IS 'Unique autoincremental identification for a college or academic institution';


--
-- TOC entry 3525 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."collegeName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college."collegeName" IS 'Name for the college or academic institution';


--
-- TOC entry 3526 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."collegeShowName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college."collegeShowName" IS 'Show name for the college or academic institution (in case of acronyms, sucursal, or long names)';


--
-- TOC entry 3527 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."collegeCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college."collegeCode" IS 'Code for a college or academic institution';


--
-- TOC entry 3528 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college.detail; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college.detail IS 'Tescription or detail for the college';


--
-- TOC entry 3529 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college.flag; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college.flag IS 'Selection for a flag file';


--
-- TOC entry 3530 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."mainColour"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college."mainColour" IS 'Main html colour code for the college';


--
-- TOC entry 3531 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."secondaryColour"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college."secondaryColour" IS 'Secondary colour code';


--
-- TOC entry 3532 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college.status; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college.status IS '0: Free access
1: Restrictered Access
2: Normal Access
3: Pay Confirmation Alert
4: Pay Confirmation Request
5: Pay Confirmation Received
6: Access Denied
7: Alert in Access';


--
-- TOC entry 3533 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3534 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college.image; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college.image IS 'Picture for the college, could be buildings, students, intitutional images, etc.';


--
-- TOC entry 3535 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college.logo; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college.logo IS 'Logo, shield or visual identifier for the institution';


--
-- TOC entry 3536 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college.description; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college.description IS 'Bio or description for college';


--
-- TOC entry 3537 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."registratedDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college."registratedDate" IS 'Timestamp for registration date';


--
-- TOC entry 3538 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."unregistratedDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college."unregistratedDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 3539 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."lastChangeDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college."lastChangeDate" IS 'Timestamp for registration of changes to a college';


--
-- TOC entry 3540 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."changeDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college."changeDetail" IS 'Detail for the changes, this field is mandatory if an user is registering changes to this table';


--
-- TOC entry 3541 (class 0 OID 0)
-- Dependencies: 234
-- Name: COLUMN college."lastChangeUser"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.college."lastChangeUser" IS 'ID for the user that register changes in the college configuration';


--
-- TOC entry 233 (class 1259 OID 16873)
-- Name: college_collegeID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.college ALTER COLUMN "collegeID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."college_collegeID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 236 (class 1259 OID 16889)
-- Name: content; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.content (
    "contentID" integer NOT NULL,
    "contentCode" character varying(10) NOT NULL,
    "contentDetail" text,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    image character varying(500),
    "subjectID" integer,
    "contentTitle" character varying(50) NOT NULL
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga.content OWNER TO postgres;

--
-- TOC entry 3542 (class 0 OID 0)
-- Dependencies: 236
-- Name: COLUMN content."contentTitle"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.content."contentTitle" IS 'Title for the content';


--
-- TOC entry 235 (class 1259 OID 16887)
-- Name: content_contentID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.content ALTER COLUMN "contentID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."content_contentID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 214 (class 1259 OID 16728)
-- Name: country; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.country (
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


ALTER TABLE nonesga.country OWNER TO postgres;

--
-- TOC entry 3543 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."countryID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.country."countryID" IS 'Unique autoincremental identification for a country';


--
-- TOC entry 3544 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."countryCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.country."countryCode" IS 'Unique code for international identification of a country';


--
-- TOC entry 3545 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."countryName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.country."countryName" IS 'Name of the country';


--
-- TOC entry 3546 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."countryDetails"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.country."countryDetails" IS 'Description or aditional details for a country';


--
-- TOC entry 3547 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.country."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3548 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."callCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.country."callCode" IS 'International code for cellphone calls';


--
-- TOC entry 3549 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.country."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 3550 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.country."unregisteredDate" IS 'Timestamp for unregistered date';


--
-- TOC entry 3551 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country.currency; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.country.currency IS 'Name of the actual currency';


--
-- TOC entry 3552 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."currencySymbol"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.country."currencySymbol" IS 'Symbol of the currency';


--
-- TOC entry 3553 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."longLanguage"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.country."longLanguage" IS 'Name of the mother langages';


--
-- TOC entry 3554 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country."shortLanguage"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.country."shortLanguage" IS 'Short symbols for laguange(s)';


--
-- TOC entry 3555 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN country.status; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.country.status IS '0: Free, demo
1: Normal
2: Forbiden
3: Evaluation
4: Commercial
5: No Commercial';


--
-- TOC entry 213 (class 1259 OID 16726)
-- Name: country_countryID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.country ALTER COLUMN "countryID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."country_countryID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 230 (class 1259 OID 16848)
-- Name: course; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.course (
    "courseID" integer NOT NULL,
    "courseCode" character varying(10) NOT NULL,
    "courseName" character varying(500) NOT NULL,
    description text,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga.course OWNER TO postgres;

--
-- TOC entry 3556 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course."courseID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.course."courseID" IS 'Unique autoincremental identification for a course';


--
-- TOC entry 3557 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course."courseCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.course."courseCode" IS 'Code for a course';


--
-- TOC entry 3558 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course."courseName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.course."courseName" IS 'Name for the course';


--
-- TOC entry 3559 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course.description; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.course.description IS 'Description or aditional information for the course';


--
-- TOC entry 3560 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.course."registeredDate" IS 'Timestamp for registered date';


--
-- TOC entry 3561 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.course."unregisteredDate" IS 'Timestamp for unregistered date';


--
-- TOC entry 3562 (class 0 OID 0)
-- Dependencies: 230
-- Name: COLUMN course."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.course."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 229 (class 1259 OID 16846)
-- Name: course_courseID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.course ALTER COLUMN "courseID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."course_courseID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 16807)
-- Name: enrollment; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.enrollment (
    "enrollmentID" integer NOT NULL,
    "enrollmentCode" character varying(10),
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "statusChangeDate" timestamp with time zone,
    "statusID" integer,
    "studentID" integer,
    "userID" integer,
    "periodID" integer,
    "courseID" integer,
    "unregisteredDate" timestamp with time zone
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga.enrollment OWNER TO postgres;

--
-- TOC entry 3563 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN enrollment."enrollmentID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.enrollment."enrollmentID" IS 'Unique autoincremental identification for a teacher';


--
-- TOC entry 3564 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN enrollment."enrollmentCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.enrollment."enrollmentCode" IS 'Code for the enrrollment of a student';


--
-- TOC entry 3565 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN enrollment."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.enrollment."registeredDate" IS 'Timestamp for registration date of an enrrollment';


--
-- TOC entry 3566 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN enrollment."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.enrollment."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3567 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN enrollment."statusChangeDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.enrollment."statusChangeDate" IS 'Timestamp for status change ';


--
-- TOC entry 3568 (class 0 OID 0)
-- Dependencies: 224
-- Name: COLUMN enrollment."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.enrollment."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 226 (class 1259 OID 16821)
-- Name: enrollmentStatus; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."enrollmentStatus" (
    "statusID" integer NOT NULL,
    code smallint NOT NULL,
    description character varying(150) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    detail text,
    "unregisteredDate" timestamp with time zone
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."enrollmentStatus" OWNER TO postgres;

--
-- TOC entry 3569 (class 0 OID 0)
-- Dependencies: 226
-- Name: COLUMN "enrollmentStatus"."statusID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."enrollmentStatus"."statusID" IS 'Unique autoincremental identification for the status of enrrollment';


--
-- TOC entry 3570 (class 0 OID 0)
-- Dependencies: 226
-- Name: COLUMN "enrollmentStatus".code; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."enrollmentStatus".code IS '1: Application
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
-- TOC entry 3571 (class 0 OID 0)
-- Dependencies: 226
-- Name: COLUMN "enrollmentStatus".description; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."enrollmentStatus".description IS 'Description for the enrrollment status, it''s the field that will see the user in the application';


--
-- TOC entry 3572 (class 0 OID 0)
-- Dependencies: 226
-- Name: COLUMN "enrollmentStatus"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."enrollmentStatus"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3573 (class 0 OID 0)
-- Dependencies: 226
-- Name: COLUMN "enrollmentStatus".detail; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."enrollmentStatus".detail IS 'Aditional information for the enrrollment process';


--
-- TOC entry 225 (class 1259 OID 16819)
-- Name: enrrollmentStatus_statusID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."enrollmentStatus" ALTER COLUMN "statusID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."enrrollmentStatus_statusID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 16805)
-- Name: enrrollment_enrollmentID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.enrollment ALTER COLUMN "enrollmentID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."enrrollment_enrollmentID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 275 (class 1259 OID 17439)
-- Name: errorLog; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."errorLog" (
    "errorLogID" integer NOT NULL,
    "errorDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "errorDetail" json NOT NULL,
    "errorModule" character varying(100) NOT NULL
);


ALTER TABLE nonesga."errorLog" OWNER TO postgres;

--
-- TOC entry 3574 (class 0 OID 0)
-- Dependencies: 275
-- Name: TABLE "errorLog"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON TABLE nonesga."errorLog" IS 'Table to store information about errors in NoNe SGA';


--
-- TOC entry 3575 (class 0 OID 0)
-- Dependencies: 275
-- Name: COLUMN "errorLog"."errorLogID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."errorLog"."errorLogID" IS 'Unique autoincremental ID for an error log registration';


--
-- TOC entry 3576 (class 0 OID 0)
-- Dependencies: 275
-- Name: COLUMN "errorLog"."errorDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."errorLog"."errorDate" IS 'Timestamp for the date and time of the error';


--
-- TOC entry 3577 (class 0 OID 0)
-- Dependencies: 275
-- Name: COLUMN "errorLog"."errorDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."errorLog"."errorDetail" IS 'Error detail and technical information for some error';


--
-- TOC entry 3578 (class 0 OID 0)
-- Dependencies: 275
-- Name: COLUMN "errorLog"."errorModule"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."errorLog"."errorModule" IS 'Module that has the error';


--
-- TOC entry 274 (class 1259 OID 17437)
-- Name: errorLog_errorLogID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."errorLog" ALTER COLUMN "errorLogID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."errorLog_errorLogID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 246 (class 1259 OID 16958)
-- Name: exam; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.exam (
    "examID" integer NOT NULL,
    "startDate" date NOT NULL,
    "startHour" time without time zone NOT NULL,
    "endDate" date NOT NULL,
    "endHour" time without time zone NOT NULL,
    "minGrade" smallint NOT NULL,
    "maxGrade" smallint NOT NULL,
    "status" smallint,
    "topic" text,
    "isDelayed" boolean,
    "minDelayed" smallint,
    "maxDelayed" smallint,
    "delayedDate" timestamp without time zone,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    "isPartial" boolean,
    "isFinal" boolean,
    "isActive" boolean DEFAULT true NOT NULL,
    "subjectID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga.exam OWNER TO postgres;

--
-- TOC entry 3579 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."examID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."examID" IS 'Unique autoincremental identification for an exam';


--
-- TOC entry 3580 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."startDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."startDate" IS 'Start date';


--
-- TOC entry 3581 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."startHour"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."startHour" IS 'Start time';


--
-- TOC entry 3582 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."endDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."endDate" IS 'End date';


--
-- TOC entry 3583 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."endHour"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."endHour" IS 'End hour';


--
-- TOC entry 3584 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."minGrade"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."minGrade" IS 'Max value for grade';


--
-- TOC entry 3585 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."maxGrade"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."maxGrade" IS 'Min value for grade';


--
-- TOC entry 3586 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam.status; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam.status IS '0: Invalid
1: Valid
2: Test
4: Rapid Evaluaton
5: Formal Evaluation
6: Final Evaluation';



--
-- TOC entry 3580 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."topic"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."topic" IS 'Theme or topic about exam';


--
-- TOC entry 3587 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."isDelayed"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."isDelayed" IS 'true: delay allowed
false delay not allowed';


--
-- TOC entry 3588 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."minDelayed"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."minDelayed" IS 'Min value for delayed exam';


--
-- TOC entry 3589 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."maxDelayed"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."maxDelayed" IS 'Max value for delayed exam';


--
-- TOC entry 3590 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."delayedDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."delayedDate" IS 'Timestamp for max delay allowed';


--
-- TOC entry 3591 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."registeredDate" IS 'Timestamp for registered date
';


--
-- TOC entry 3592 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."unregisteredDate" IS 'Timestamp for unregistered date';


--
-- TOC entry 3593 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."isPartial"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."isPartial" IS 'true: is Partial
false: is not partial';


--
-- TOC entry 3594 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."isFinal"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."isFinal" IS 'true: is final
false: is not final';


--
-- TOC entry 3595 (class 0 OID 0)
-- Dependencies: 246
-- Name: COLUMN exam."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.exam."isActive" IS 'true: active
false inactive';


--
-- TOC entry 254 (class 1259 OID 17012)
-- Name: examAnswer; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."examAnswer" (
    "answerID" integer NOT NULL,
    answer text NOT NULL,
    grade smallint NOT NULL,
    "homologatedGrade" character varying(5),
    "isCorrect" boolean DEFAULT false NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDAte" timestamp with time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    status smallint,
    detail text,
    "questionID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."examAnswer" OWNER TO postgres;

--
-- TOC entry 3596 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer"."answerID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examAnswer"."answerID" IS 'Unique autoincremental identification for a question answer';


--
-- TOC entry 3597 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer".answer; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examAnswer".answer IS 'Answer for the question';


--
-- TOC entry 3598 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer".grade; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examAnswer".grade IS 'Grade value';


--
-- TOC entry 3599 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer"."homologatedGrade"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examAnswer"."homologatedGrade" IS 'Homologated grade value';


--
-- TOC entry 3600 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer"."isCorrect"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examAnswer"."isCorrect" IS 'true: is correct answer
false: is incorrect answer';


--
-- TOC entry 3601 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examAnswer"."registeredDate" IS 'Timestamp for registration';


--
-- TOC entry 3601 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer"."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examAnswer"."unregisteredDate" IS 'Timestamp for unregistration';



--
-- TOC entry 3602 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examAnswer"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3603 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer".status; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examAnswer".status IS '0: Invalid
1: Valid
2: Draft
3: Mandatory
4: Extra';


--
-- TOC entry 3604 (class 0 OID 0)
-- Dependencies: 254
-- Name: COLUMN "examAnswer".detail; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examAnswer".detail IS 'Aditional detail';


--
-- TOC entry 253 (class 1259 OID 17010)
-- Name: examAnswer_answerID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."examAnswer" ALTER COLUMN "answerID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."examAnswer_answerID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 248 (class 1259 OID 16968)
-- Name: examGrade; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."examGrade" (
    "examGradeID" integer NOT NULL,
    grade smallint DEFAULT 0 NOT NULL,
    "homologatedGrade" character varying(5),
    "gadeDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "gradeDetail" text,
    "isGraded" boolean DEFAULT false NOT NULL,
    "isModified" boolean,
    "modificationDate" timestamp without time zone,
    "modificacionUser" integer,
    "previousGrade" smallint,
    "studentID" integer,
    "examID" integer,
    "teacherID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."examGrade" OWNER TO postgres;

--
-- TOC entry 3605 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."examGradeID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examGrade"."examGradeID" IS 'Unique autoincremental identification for an exam grade';


--
-- TOC entry 3606 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade".grade; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examGrade".grade IS 'Grade value';


--
-- TOC entry 3607 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."homologatedGrade"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examGrade"."homologatedGrade" IS 'Grade homologation';


--
-- TOC entry 3608 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."gadeDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examGrade"."gadeDate" IS 'Timestamp for registration of grade';


--
-- TOC entry 3609 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."gradeDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examGrade"."gradeDetail" IS 'Detail for the grade';


--
-- TOC entry 3610 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."isGraded"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examGrade"."isGraded" IS 'true: Approved
false: Rejected';


--
-- TOC entry 3611 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."isModified"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examGrade"."isModified" IS 'true: is modified
false: is not modified';


--
-- TOC entry 3612 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."modificationDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examGrade"."modificationDate" IS 'Timestamp for modification';


--
-- TOC entry 3613 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."modificacionUser"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examGrade"."modificacionUser" IS 'User ID for modification';


--
-- TOC entry 3614 (class 0 OID 0)
-- Dependencies: 248
-- Name: COLUMN "examGrade"."previousGrade"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examGrade"."previousGrade" IS 'Value after modification';


--
-- TOC entry 247 (class 1259 OID 16966)
-- Name: examGrade_examGradeID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."examGrade" ALTER COLUMN "examGradeID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."examGrade_examGradeID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 252 (class 1259 OID 16999)
-- Name: examQuestion; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."examQuestion" (
    "questionID" integer NOT NULL,
    question text NOT NULL,
    "minGrade" smallint,
    "maxGrade" smallint,
    image character varying(500),
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    status smallint NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "examID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."examQuestion" OWNER TO postgres;

--
-- TOC entry 3615 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion"."questionID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examQuestion"."questionID" IS 'Unique autoincremental identification for a question of an exam';


--
-- TOC entry 3616 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion".question; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examQuestion".question IS 'Question';


--
-- TOC entry 3617 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion"."minGrade"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examQuestion"."minGrade" IS 'Min value for the question';


--
-- TOC entry 3618 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion"."maxGrade"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examQuestion"."maxGrade" IS 'Max value grade for the question';


--
-- TOC entry 3619 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion".image; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examQuestion".image IS 'If its needed, URL for an image';


--
-- TOC entry 3620 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examQuestion"."registeredDate" IS 'Timestamp for registration';


--
-- TOC entry 3620 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion"."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examQuestion"."unregisteredDate" IS 'Timestamp for unregistration';



--
-- TOC entry 3621 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion".status; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examQuestion".status IS '0: Invalid
1: Valid
2: Draft
3: Optional
4: Mandatory
5: Extra';


--
-- TOC entry 3622 (class 0 OID 0)
-- Dependencies: 252
-- Name: COLUMN "examQuestion"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examQuestion"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 251 (class 1259 OID 16997)
-- Name: examQuestion_questionID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."examQuestion" ALTER COLUMN "questionID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."examQuestion_questionID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 250 (class 1259 OID 16984)
-- Name: examRegister; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."examRegister" (
    "registerID" integer NOT NULL,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "registeredUser" integer NOT NULL,
    status smallint NOT NULL,
    "reviewNumber" smallint NOT NULL,
    "isReviewed" boolean DEFAULT false NOT NULL,
    "lastStatus" smallint,
    "lastStatusDate" timestamp without time zone,
    "lastStatusUser" integer,
    "reviewDetail" text,
    "generalDetail" text,
    "isRegistered" boolean DEFAULT false NOT NULL,
    "studentID" integer,
    "examID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."examRegister" OWNER TO postgres;

--
-- TOC entry 3623 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."registerID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examRegister"."registerID" IS 'Unique autoincremental identification for a registration of an exam';


--
-- TOC entry 3624 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examRegister"."registeredDate" IS 'Timestamp for registration of an exam';


--
-- TOC entry 3625 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."registeredUser"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examRegister"."registeredUser" IS 'User ID for regsitration';


--
-- TOC entry 3626 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister".status; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examRegister".status IS '0: Not valid
1: Valid
2: Review
3; For modificaion
4: Saved
5: Sended
6: Final';


--
-- TOC entry 3627 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."reviewNumber"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examRegister"."reviewNumber" IS 'Number of reviews for exam register';


--
-- TOC entry 3628 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."isReviewed"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examRegister"."isReviewed" IS 'true: is reviewed
false: is not reviewed';


--
-- TOC entry 3629 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."lastStatus"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examRegister"."lastStatus" IS 'Value of last status';


--
-- TOC entry 3630 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."lastStatusDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examRegister"."lastStatusDate" IS 'Timestamp for last status date';


--
-- TOC entry 3631 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."lastStatusUser"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examRegister"."lastStatusUser" IS 'User ID for last status change';


--
-- TOC entry 3632 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."reviewDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examRegister"."reviewDetail" IS 'Detail or information for a review';


--
-- TOC entry 3633 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."generalDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examRegister"."generalDetail" IS 'General details for the registration';


--
-- TOC entry 3634 (class 0 OID 0)
-- Dependencies: 250
-- Name: COLUMN "examRegister"."isRegistered"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."examRegister"."isRegistered" IS 'true: is registered
false: is not registered';


--
-- TOC entry 249 (class 1259 OID 16982)
-- Name: examRegister_registerID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."examRegister" ALTER COLUMN "registerID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."examRegister_registerID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 245 (class 1259 OID 16956)
-- Name: exam_examID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.exam ALTER COLUMN "examID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."exam_examID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 260 (class 1259 OID 17059)
-- Name: partial; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.partial (
    "patialID" integer NOT NULL,
    "partialDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isReview" boolean DEFAULT false,
    "isActive" boolean DEFAULT true NOT NULL,
    "isModified" boolean DEFAULT false,
    "partialScore" double precision NOT NULL,
    "valueHomologated" character varying(5),
    description text,
    "studentDetail" text,
    "agentDetail" text,
    "subjectID" integer,
    "studentID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga.partial OWNER TO postgres;

--
-- TOC entry 3635 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."patialID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.partial."patialID" IS 'Unique autoincremental identification for a partial exam';


--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."partialDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.partial."partialDate" IS 'Timestamp for the partial';


--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."isReview"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.partial."isReview" IS 'true: is reviewed by the teacher
false: is not review by the teacher';


--
-- TOC entry 3638 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.partial."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."isModified"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.partial."isModified" IS 'true: is Modified
false: is not modified';


--
-- TOC entry 3640 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."partialScore"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.partial."partialScore" IS 'Value for the score';


--
-- TOC entry 3641 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."valueHomologated"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.partial."valueHomologated" IS 'Homologated value';


--
-- TOC entry 3642 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial.description; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.partial.description IS 'Description for the score (this field is filled by the teacher)';


--
-- TOC entry 3643 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."studentDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.partial."studentDetail" IS 'Details for the student''s reading (this field is filled by the teacher)';


--
-- TOC entry 3644 (class 0 OID 0)
-- Dependencies: 260
-- Name: COLUMN partial."agentDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.partial."agentDetail" IS 'Details for the parent or agent (this field is filled by the teacher)';


--
-- TOC entry 259 (class 1259 OID 17057)
-- Name: partial_patialID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.partial ALTER COLUMN "patialID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."partial_patialID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 268 (class 1259 OID 17121)
-- Name: payment; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.payment (
    "paymentID" integer NOT NULL,
    value double precision NOT NULL,
    currency character varying(10),
    "paymentDate" timestamp without time zone NOT NULL,
    "paymentMaxDate" timestamp without time zone,
    status smallint DEFAULT 1 NOT NULL,
    "isActive" boolean DEFAULT true,
    "isDelayed" boolean,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
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


ALTER TABLE nonesga.payment OWNER TO postgres;

--
-- TOC entry 3645 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."paymentID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.payment."paymentID" IS 'Unique autoincremental identification for a payment';


--
-- TOC entry 3646 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment.value; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.payment.value IS 'Valule for the payment';


--
-- TOC entry 3647 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment.currency; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.payment.currency IS 'Actual currency for the payment';


--
-- TOC entry 3648 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."paymentDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.payment."paymentDate" IS 'Timestamp for normal payment date';


--
-- TOC entry 3649 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."paymentMaxDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.payment."paymentMaxDate" IS 'Timestamp for maximun payment date';


--
-- TOC entry 3650 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment.status; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.payment.status IS '0: Invalid
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
-- TOC entry 3651 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.payment."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3652 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."isDelayed"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.payment."isDelayed" IS 'true: delay allowed
false: delay allowed';


--
-- TOC entry 3653 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.payment."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 3654 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment.details; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.payment.details IS 'Information for payment';


--
-- TOC entry 3655 (class 0 OID 0)
-- Dependencies: 268
-- Name: COLUMN payment."isWithTaxes"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.payment."isWithTaxes" IS 'true: The paymet applies taxes
false: the paymend does not applies taxe';


--
-- TOC entry 271 (class 1259 OID 17152)
-- Name: paymentDetail; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."paymentDetail" (
    "idDetail" integer NOT NULL,
    quantity smallint NOT NULL,
    cost double precision NOT NULL,
    detail text,
    "registrationDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "isModified" boolean,
    "unregisteredDate" timestamp without time zone,
    "paymentID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."paymentDetail" OWNER TO postgres;

--
-- TOC entry 3656 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail"."idDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentDetail"."idDetail" IS 'Unique autoincremental identification for a payment detail';


--
-- TOC entry 3657 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail".quantity; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentDetail".quantity IS 'Quantity of products for this item';


--
-- TOC entry 3658 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail".cost; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentDetail".cost IS 'Value of the product';


--
-- TOC entry 3659 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail".detail; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentDetail".detail IS 'Description or detail for the item';


--
-- TOC entry 3660 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail"."registrationDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentDetail"."registrationDate" IS 'Timestamp for registration Item
';


--
-- TOC entry 3661 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentDetail"."isActive" IS 'true: is active
false: is not active
';


--
-- TOC entry 3662 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail"."isModified"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentDetail"."isModified" IS 'true: is modified
false: is not modified
';


--
-- TOC entry 3663 (class 0 OID 0)
-- Dependencies: 271
-- Name: COLUMN "paymentDetail"."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentDetail"."unregisteredDate" IS 'Timestamp for unregistered date
';


--
-- TOC entry 270 (class 1259 OID 17140)
-- Name: paymentMethod; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."paymentMethod" (
    "idPaymentMethod" integer NOT NULL,
    code character varying(10) NOT NULL,
    "methodName" character varying(100) NOT NULL,
    detail text,
    "isActive" boolean DEFAULT true NOT NULL,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."paymentMethod" OWNER TO postgres;

--
-- TOC entry 3664 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod"."idPaymentMethod"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentMethod"."idPaymentMethod" IS 'Unique autoincremental identification for a payment method';


--
-- TOC entry 3665 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod".code; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentMethod".code IS 'Unique coude for a payment';


--
-- TOC entry 3666 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod"."methodName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentMethod"."methodName" IS 'Payment Method name';


--
-- TOC entry 3667 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod".detail; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentMethod".detail IS 'Payment description or details';


--
-- TOC entry 3668 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentMethod"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3669 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentMethod"."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 3670 (class 0 OID 0)
-- Dependencies: 270
-- Name: COLUMN "paymentMethod"."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentMethod"."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 269 (class 1259 OID 17138)
-- Name: paymentMethod_idPaymentMethod_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."paymentMethod" ALTER COLUMN "idPaymentMethod" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."paymentMethod_idPaymentMethod_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 273 (class 1259 OID 17165)
-- Name: paymentType; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."paymentType" (
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


ALTER TABLE nonesga."paymentType" OWNER TO postgres;

--
-- TOC entry 3671 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."paymentTypeID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentType"."paymentTypeID" IS 'Unique autoincremental identification for a payment Type
';


--
-- TOC entry 3672 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."paymentCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentType"."paymentCode" IS 'Unique code for the pay type';


--
-- TOC entry 3673 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."paymentTypeName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentType"."paymentTypeName" IS 'Name to describe the payment type';


--
-- TOC entry 3674 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType".detail; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentType".detail IS 'Details to describe the payment type';


--
-- TOC entry 3675 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."costValue"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentType"."costValue" IS 'Value of the unitary cost';


--
-- TOC entry 3676 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."taxValue"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentType"."taxValue" IS 'Value or percent of taxes';


--
-- TOC entry 3677 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."isTaxed"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentType"."isTaxed" IS 'true: applies taxes
false: does not applies taxes';


--
-- TOC entry 3678 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentType"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3679 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType".observation; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentType".observation IS 'Observations for additional information of payment type';


--
-- TOC entry 3680 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentType"."registeredDate" IS 'Timestamp for creation date';


--
-- TOC entry 3681 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentType"."unregisteredDate" IS 'Timestamp for delete date';


--
-- TOC entry 3682 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."isRecurrent"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentType"."isRecurrent" IS 'true: is a recurrent pay';


--
-- TOC entry 3683 (class 0 OID 0)
-- Dependencies: 273
-- Name: COLUMN "paymentType"."recurrentType"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."paymentType"."recurrentType" IS '0: No recurrent
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
-- Name: paymentType_paymentTypeID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."paymentType" ALTER COLUMN "paymentTypeID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."paymentType_paymentTypeID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 267 (class 1259 OID 17119)
-- Name: payment_paymentID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.payment ALTER COLUMN "paymentID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."payment_paymentID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 206 (class 1259 OID 16663)
-- Name: person; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.person (
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
    "personTypeID" integer,
    sex character varying(50) NOT NULL
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga.person OWNER TO postgres;

--
-- TOC entry 3684 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person."personID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.person."personID" IS 'Unique autoincremental identification for a person';


--
-- TOC entry 3685 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.dni; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.person.dni IS 'Document National of Identification, is the unique number for a natural o juridic person';


--
-- TOC entry 3686 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.birthdate; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.person.birthdate IS 'Date of birth of the person registered';


--
-- TOC entry 3687 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.names; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.person.names IS 'Name or names of the person';


--
-- TOC entry 3688 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person."lastNames"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.person."lastNames" IS 'Last names of the person
';


--
-- TOC entry 3689 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person."completeName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.person."completeName" IS 'names + " " + lastNames are the complete name of a person';


--
-- TOC entry 3690 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.image; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.person.image IS 'Stores the file than contain pictures If the person upload an photo or imagen of himself';


--
-- TOC entry 3691 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.details; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.person.details IS 'Aditional details to describe the person';


--
-- TOC entry 3692 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.person."registeredDate" IS 'Timestamp for the registration date';


--
-- TOC entry 3693 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.person."unregisteredDate" IS 'Timestamp for the cancelation or unregistered time
';


--
-- TOC entry 3694 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.person."isActive" IS 'true: active
false: inactive

A person shouldn''t deleted from the database';


--
-- TOC entry 3695 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.bio; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.person.bio IS 'The bio that''s writed by the person, to show in his profile';


--
-- TOC entry 3696 (class 0 OID 0)
-- Dependencies: 206
-- Name: COLUMN person.votes; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.person.votes IS 'A simply evaluation field to set a popularity level for a person';


--
-- TOC entry 208 (class 1259 OID 16678)
-- Name: personType; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."personType" (
    "personTypeID" integer NOT NULL,
    "personType" smallint NOT NULL,
    "typeName" character varying(50) NOT NULL,
    details character varying(500),
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    "isActive" boolean DEFAULT true NOT NULL
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."personType" OWNER TO postgres;

--
-- TOC entry 3697 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType"."personTypeID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."personType"."personTypeID" IS 'Unique autoincremental identification for a person type
';


--
-- TOC entry 3698 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType"."personType"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."personType"."personType" IS 'Types of person
1: Natural
2: Juridic
3: Agent
4: Father
5: Mother
6: Relative
7: Grandfather
8: Grandmother';


--
-- TOC entry 3699 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType"."typeName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."personType"."typeName" IS 'Name or description to the type of person';


--
-- TOC entry 3700 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType".details; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."personType".details IS 'Contain aditional details for the type of person';


--
-- TOC entry 3701 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."personType"."registeredDate" IS 'Timestamp for the registration date';


--
-- TOC entry 3702 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType"."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."personType"."unregisteredDate" IS 'Timestamp for the unregistration date';


--
-- TOC entry 3703 (class 0 OID 0)
-- Dependencies: 208
-- Name: COLUMN "personType"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."personType"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 207 (class 1259 OID 16676)
-- Name: personType_personTypeID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."personType" ALTER COLUMN "personTypeID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."personType_personTypeID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 205 (class 1259 OID 16661)
-- Name: person_personID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.person ALTER COLUMN "personID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."person_personID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 264 (class 1259 OID 17092)
-- Name: phoneOperator; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."phoneOperator" (
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


ALTER TABLE nonesga."phoneOperator" OWNER TO postgres;

--
-- TOC entry 3704 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator"."operatorID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."phoneOperator"."operatorID" IS 'Unique autoincremental identification for a cellphone operator';


--
-- TOC entry 3705 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator"."operatorName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."phoneOperator"."operatorName" IS 'Operator name';


--
-- TOC entry 3706 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator".detail; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."phoneOperator".detail IS 'Observations, details and more information';


--
-- TOC entry 3707 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator"."smsNumber"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."phoneOperator"."smsNumber" IS 'Number of SMS services';


--
-- TOC entry 3708 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator".cost; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."phoneOperator".cost IS 'Cost of one SMS ';


--
-- TOC entry 3709 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator".observations; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."phoneOperator".observations IS 'Observations relative to the costs';


--
-- TOC entry 3710 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."phoneOperator"."registeredDate" IS 'Timestamp for registered date';


--
-- TOC entry 3711 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator"."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."phoneOperator"."unregisteredDate" IS 'Timestamp for unregistered or cancelation date';


--
-- TOC entry 3712 (class 0 OID 0)
-- Dependencies: 264
-- Name: COLUMN "phoneOperator"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."phoneOperator"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 263 (class 1259 OID 17090)
-- Name: phoneOperator_operatorID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."phoneOperator" ALTER COLUMN "operatorID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."phoneOperator_operatorID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 212 (class 1259 OID 16711)
-- Name: province; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.province (
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


ALTER TABLE nonesga.province OWNER TO postgres;

--
-- TOC entry 3713 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province."provinceID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.province."provinceID" IS 'Unique autoincremental identification for a province';


--
-- TOC entry 3714 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province."provinceCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.province."provinceCode" IS 'Code for the province';


--
-- TOC entry 3715 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province."provinceName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.province."provinceName" IS 'Name of the province';


--
-- TOC entry 3716 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province.details; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.province.details IS 'Aditional details or description for a province';


--
-- TOC entry 3717 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.province."registeredDate" IS 'Timestamp for registered date of the provicen';


--
-- TOC entry 3718 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.province."unregisteredDate" IS 'Timestamp for unregistered date of the provicen';


--
-- TOC entry 3719 (class 0 OID 0)
-- Dependencies: 212
-- Name: COLUMN province."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.province."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 211 (class 1259 OID 16709)
-- Name: province_provinceID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.province ALTER COLUMN "provinceID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."province_provinceID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 266 (class 1259 OID 17105)
-- Name: rating; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.rating (
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


ALTER TABLE nonesga.rating OWNER TO postgres;

--
-- TOC entry 3720 (class 0 OID 0)
-- Dependencies: 266
-- Name: COLUMN rating."ratingID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.rating."ratingID" IS 'Unique autoincremental identification for a rating';


--
-- TOC entry 3721 (class 0 OID 0)
-- Dependencies: 266
-- Name: COLUMN rating.rate; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.rating.rate IS '1: Very Bad
2: Bad
3: Normal
4: Good
5: Very Good
';


--
-- TOC entry 3722 (class 0 OID 0)
-- Dependencies: 266
-- Name: COLUMN rating.comment; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.rating.comment IS 'If needs more information for rating';


--
-- TOC entry 3723 (class 0 OID 0)
-- Dependencies: 266
-- Name: COLUMN rating."ratingDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.rating."ratingDate" IS 'Timestamp for rating date';


--
-- TOC entry 265 (class 1259 OID 17103)
-- Name: rating_ratingID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.rating ALTER COLUMN "ratingID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."rating_ratingID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 283 (class 1259 OID 25915)
-- Name: taskResolutionResource; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."taskResolutionResource" (
    "resourceID" integer NOT NULL,
    "resourceName" text,
    details text,
    "isActive" boolean DEFAULT true NOT NULL,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "updatedDate" timestamp with time zone,
    "resolutionID" integer,
    resource character varying(500)
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."taskResolutionResource" OWNER TO postgres;

--
-- TOC entry 3724 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource"."resourceID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolutionResource"."resourceID" IS 'Unique identificator for a task resolution resource';


--
-- TOC entry 3725 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource"."resourceName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolutionResource"."resourceName" IS 'Name for the resource';


--
-- TOC entry 3726 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource".details; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolutionResource".details IS 'Aditional details if its needed';


--
-- TOC entry 3727 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolutionResource"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3728 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolutionResource"."registeredDate" IS 'Timestamp for date of registration of task resource';


--
-- TOC entry 3729 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource"."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolutionResource"."unregisteredDate" IS 'Timestamp for date of unregistration of the task resolution resource';


--
-- TOC entry 3730 (class 0 OID 0)
-- Dependencies: 283
-- Name: COLUMN "taskResolutionResource"."updatedDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolutionResource"."updatedDate" IS 'Timestamp for date of udapte to the task resolution resource';


--
-- TOC entry 282 (class 1259 OID 25913)
-- Name: resolutionResource_resourceID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."taskResolutionResource" ALTER COLUMN "resourceID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."resolutionResource_resourceID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16759)
-- Name: role; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.role (
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


ALTER TABLE nonesga.role OWNER TO postgres;

--
-- TOC entry 3731 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role."roleID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.role."roleID" IS 'Unique autogenerated role identification
';


--
-- TOC entry 3732 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role."roleCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.role."roleCode" IS 'Code for the role, the code is not the same of the ID, it is generated for the application, and can be used for any institution to set all the parameters of their own configuration';


--
-- TOC entry 3733 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role."roleName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.role."roleName" IS 'Name of the role';


--
-- TOC entry 3734 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role.privileges; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.role.privileges IS 'If apply, the privileges must be setted in this value, while bigger the number, bigger the grans in the application';


--
-- TOC entry 3735 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role.description; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.role.description IS 'Open field to store details of the role';


--
-- TOC entry 3736 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.role."isActive" IS 'true: active
false: inactive

This rows can not be deleted because constraints';


--
-- TOC entry 3737 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.role."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 3738 (class 0 OID 0)
-- Dependencies: 218
-- Name: COLUMN role."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.role."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 217 (class 1259 OID 16757)
-- Name: role_roleID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.role ALTER COLUMN "roleID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."role_roleID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 277 (class 1259 OID 17451)
-- Name: session; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.session (
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


ALTER TABLE nonesga.session OWNER TO postgres;

--
-- TOC entry 3739 (class 0 OID 0)
-- Dependencies: 277
-- Name: TABLE session; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON TABLE nonesga.session IS 'Table for store the information for active users in a session of NoNe SGA';


--
-- TOC entry 3740 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.session."sessionID" IS 'Unique autoincremental ID for a session registration';


--
-- TOC entry 3741 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionRoom"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.session."sessionRoom" IS 'Rooms for manage of sessions';


--
-- TOC entry 3742 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.session."sessionDate" IS 'Timestamp for the date of session';


--
-- TOC entry 3743 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionToken"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.session."sessionToken" IS 'Information of generated token for the session';


--
-- TOC entry 3744 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionExpiration"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.session."sessionExpiration" IS 'Information for the expiration of session';


--
-- TOC entry 3745 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionDevice"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.session."sessionDevice" IS 'Name or identifyer for the device of the conection';


--
-- TOC entry 3746 (class 0 OID 0)
-- Dependencies: 277
-- Name: COLUMN session."sessionCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.session."sessionCode" IS 'Unique code formed by date anda userID';


--
-- TOC entry 276 (class 1259 OID 17449)
-- Name: session_sessionID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.session ALTER COLUMN "sessionID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."session_sessionID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16775)
-- Name: student; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.student (
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


ALTER TABLE nonesga.student OWNER TO postgres;

--
-- TOC entry 3747 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."studentID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.student."studentID" IS 'Unique autoincremental identification for a student';


--
-- TOC entry 3748 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."studentCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.student."studentCode" IS 'Unique student code for applications';


--
-- TOC entry 3749 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student.status; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.student.status IS '1: Active
2:. Paid out
3: Unpaid
4: Suspending
5: Retired
6: Canceled';


--
-- TOC entry 3750 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.student."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3751 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.student."registeredDate" IS 'Timestamp for registered date';


--
-- TOC entry 3752 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.student."unregisteredDate" IS 'Timestamp for unregistered date';


--
-- TOC entry 3753 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."previousCourse"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.student."previousCourse" IS 'If this field is null, means that the student is a new student in the system, if this field is equal to the actual course, means that the student is taking the course again';


--
-- TOC entry 3754 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student."actualCourse"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.student."actualCourse" IS 'Actual course of the student';


--
-- TOC entry 3755 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student.grade; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.student.grade IS 'Grade for a student';


--
-- TOC entry 3756 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student.details; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.student.details IS 'Details to identify the student, this field is only for college or academic institution purpouse';


--
-- TOC entry 3757 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student.ratting; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.student.ratting IS 'Evaluation or rating for a student

1: Very bad
2: Bad
3: Normal
4: Good
5: Very Good';


--
-- TOC entry 3758 (class 0 OID 0)
-- Dependencies: 220
-- Name: COLUMN student.bio; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.student.bio IS 'Bio information of the student, contains achievements, goals, and so on';


--
-- TOC entry 256 (class 1259 OID 17026)
-- Name: studentAnswer; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."studentAnswer" (
    "studentAnswerID" integer NOT NULL,
    "selectedDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    grade smallint,
    "teacherDetails" text,
    "agentDetails" text,
    "studentDetails" text,
    "isReviewed" boolean DEFAULT false NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "answerID" integer,
    "studentID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."studentAnswer" OWNER TO postgres;

--
-- TOC entry 3759 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."studentAnswerID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."studentAnswer"."studentAnswerID" IS 'Unique autoincremental identification for an answer that an studen choices';


--
-- TOC entry 3760 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."selectedDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."studentAnswer"."selectedDate" IS 'Timestamp for registration date';


--
-- TOC entry 3761 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer".grade; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."studentAnswer".grade IS 'Grade value';


--
-- TOC entry 3762 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."teacherDetails"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."studentAnswer"."teacherDetails" IS 'Details for the teacher (student filled)';


--
-- TOC entry 3763 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."agentDetails"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."studentAnswer"."agentDetails" IS 'Details for parents and agents (filled by the teacher)';


--
-- TOC entry 3764 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."studentDetails"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."studentAnswer"."studentDetails" IS 'Details for the student (filled by the teacher)';


--
-- TOC entry 3765 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."isReviewed"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."studentAnswer"."isReviewed" IS 'true: is reviewed
false: is not reviewed';


--
-- TOC entry 3766 (class 0 OID 0)
-- Dependencies: 256
-- Name: COLUMN "studentAnswer"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."studentAnswer"."isActive" IS 'ture: active
false: inactive';


--
-- TOC entry 255 (class 1259 OID 17024)
-- Name: studentAnswer_studentAnswerID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."studentAnswer" ALTER COLUMN "studentAnswerID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."studentAnswer_studentAnswerID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 16773)
-- Name: student_studentID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.student ALTER COLUMN "studentID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."student_studentID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 232 (class 1259 OID 16861)
-- Name: subject; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.subject (
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


ALTER TABLE nonesga.subject OWNER TO postgres;

--
-- TOC entry 3767 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."subjectID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.subject."subjectID" IS 'Unique autoincremental identification for a subject';


--
-- TOC entry 3768 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."subjectCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.subject."subjectCode" IS 'Unique coude for a subject';


--
-- TOC entry 3769 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."subjectName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.subject."subjectName" IS 'Name for the subject';


--
-- TOC entry 3770 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject.description; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.subject.description IS 'Description and details';


--
-- TOC entry 3771 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject.details; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.subject.details IS 'Aditional details for academic regulations or administration';


--
-- TOC entry 3772 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.subject."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 3773 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.subject."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 3774 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.subject."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3775 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."gradeNeeded"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.subject."gradeNeeded" IS 'Grate or note needet to approve the subject';


--
-- TOC entry 3776 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."gradeHomologation"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.subject."gradeHomologation" IS 'Grade homologation';


--
-- TOC entry 3777 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."gradeMinimun"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.subject."gradeMinimun" IS 'Minimun value allowed';


--
-- TOC entry 3778 (class 0 OID 0)
-- Dependencies: 232
-- Name: COLUMN subject."gradeMaximun"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.subject."gradeMaximun" IS 'Maximun grade value allowed';


--
-- TOC entry 231 (class 1259 OID 16859)
-- Name: subject_subjectID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.subject ALTER COLUMN "subjectID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."subject_subjectID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 240 (class 1259 OID 16918)
-- Name: task; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.task (
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


ALTER TABLE nonesga.task OWNER TO postgres;

--
-- TOC entry 3779 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."taskID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.task."taskID" IS 'Unique autoincremental identification for a task';


--
-- TOC entry 3780 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."taskCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.task."taskCode" IS 'Unique code for a task';


--
-- TOC entry 3781 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."startDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.task."startDate" IS 'Timestamp for start date';


--
-- TOC entry 3782 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."endDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.task."endDate" IS 'Timestamp for end date';


--
-- TOC entry 3783 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."taskName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.task."taskName" IS 'Name for the task';


--
-- TOC entry 3784 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."taskDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.task."taskDetail" IS 'Detail or information for the task';


--
-- TOC entry 3785 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.task."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3786 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."permitsDelay"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.task."permitsDelay" IS 'true: permits delay in delivery date
false: not permits delay in delivery date';


--
-- TOC entry 3787 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task."maxDelay"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.task."maxDelay" IS 'Timestamp for delay date';


--
-- TOC entry 3788 (class 0 OID 0)
-- Dependencies: 240
-- Name: COLUMN task.image; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.task.image IS 'Url for an image for the task (if it''s needed)';


--
-- TOC entry 242 (class 1259 OID 16932)
-- Name: taskEvaluation; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."taskEvaluation" (
    "taskEvaluationID" integer NOT NULL,
    "taskScore" double precision NOT NULL,
    "scoreHomologation" character varying(5),
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "taskEvaluationDate" timestamp without time zone NOT NULL,
    "studentDetail" text,
    "isActive" boolean DEFAULT true,
    "agentDetail" text,
    "taskID" integer,
    "studentID" integer,
    "unregisteredDate" timestamp with time zone
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."taskEvaluation" OWNER TO postgres;

--
-- TOC entry 3789 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."taskEvaluationID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskEvaluation"."taskEvaluationID" IS 'Unique autoincremental identification for an evaluation of a task';


--
-- TOC entry 3790 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."taskScore"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskEvaluation"."taskScore" IS 'Score value';


--
-- TOC entry 3791 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."scoreHomologation"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskEvaluation"."scoreHomologation" IS 'Score homologated for the value';


--
-- TOC entry 3792 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskEvaluation"."registeredDate" IS 'Timestamp for registration';


--
-- TOC entry 3793 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."taskEvaluationDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskEvaluation"."taskEvaluationDate" IS 'Timestamp for the date that corresponds the registration';


--
-- TOC entry 3794 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."studentDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskEvaluation"."studentDetail" IS 'Detail for the student (filled by teacher)';


--
-- TOC entry 3795 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskEvaluation"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3796 (class 0 OID 0)
-- Dependencies: 242
-- Name: COLUMN "taskEvaluation"."agentDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskEvaluation"."agentDetail" IS 'Detail for the parents or agents (filled by the teacher)';


--
-- TOC entry 241 (class 1259 OID 16930)
-- Name: taskEvaluation_taskEvaluationID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."taskEvaluation" ALTER COLUMN "taskEvaluationID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."taskEvaluation_taskEvaluationID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 281 (class 1259 OID 25900)
-- Name: taskResolution; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."taskResolution" (
    "resolutionID" integer NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    detail text,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "updatedDate" timestamp with time zone,
    "isPublished" boolean DEFAULT false NOT NULL,
    "taskID" integer,
    "studentID" integer,
    "publishedDate" timestamp with time zone
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."taskResolution" OWNER TO postgres;

--
-- TOC entry 3797 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution"."resolutionID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolution"."resolutionID" IS 'Unique identificator for a task resolution';


--
-- TOC entry 3798 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolution"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3799 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution".detail; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolution".detail IS 'Aditional details for the task resolution';


--
-- TOC entry 3800 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolution"."registeredDate" IS 'Timestamp for date of creation
';


--
-- TOC entry 3801 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution"."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolution"."unregisteredDate" IS 'Timestamp for date of unregistration';


--
-- TOC entry 3802 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution"."updatedDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolution"."updatedDate" IS 'Timestamp for date of registration of updates';


--
-- TOC entry 3803 (class 0 OID 0)
-- Dependencies: 281
-- Name: COLUMN "taskResolution"."isPublished"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResolution"."isPublished" IS 'false: not published yet (draft)
true: published';


--
-- TOC entry 280 (class 1259 OID 25898)
-- Name: taskResolution_resolutionID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."taskResolution" ALTER COLUMN "resolutionID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."taskResolution_resolutionID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 244 (class 1259 OID 16946)
-- Name: taskResource; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."taskResource" (
    "taskResourceID" integer NOT NULL,
    "resourceName" character varying(250) NOT NULL,
    "resourceType" character varying(500),
    "resourceDetail" text NOT NULL,
    resource character varying(500),
    "isActive" boolean DEFAULT true,
    "registeredDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp with time zone,
    "taskID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga."taskResource" OWNER TO postgres;

--
-- TOC entry 3804 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."taskResourceID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResource"."taskResourceID" IS 'Unique autoincremental identification for a task resource';


--
-- TOC entry 3805 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."resourceName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResource"."resourceName" IS 'Name for the resource';


--
-- TOC entry 3806 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."resourceType"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResource"."resourceType" IS 'Kind of resource, for example: URL, Page of a Book, Reading, Paper, Image, etc.';


--
-- TOC entry 3807 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."resourceDetail"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResource"."resourceDetail" IS 'Details for the resource';


--
-- TOC entry 3808 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource".resource; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResource".resource IS 'URL of the resource (image, url, doc, etc.) if applies';


--
-- TOC entry 3809 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResource"."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3810 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResource"."registeredDate" IS 'Timestamp for registration';


--
-- TOC entry 3811 (class 0 OID 0)
-- Dependencies: 244
-- Name: COLUMN "taskResource"."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."taskResource"."unregisteredDate" IS 'Timestamp for unregistration';


--
-- TOC entry 243 (class 1259 OID 16944)
-- Name: taskResource_taskResourceID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."taskResource" ALTER COLUMN "taskResourceID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."taskResource_taskResourceID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 239 (class 1259 OID 16916)
-- Name: task_taskID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.task ALTER COLUMN "taskID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."task_taskID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 16792)
-- Name: teacher; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.teacher (
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


ALTER TABLE nonesga.teacher OWNER TO postgres;

--
-- TOC entry 3812 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher."teacherID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.teacher."teacherID" IS 'Unique autoincremental identification for a teacher';


--
-- TOC entry 3813 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher."teacherCode"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.teacher."teacherCode" IS 'Unique code for a teacher in the application';


--
-- TOC entry 3814 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher.status; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.teacher.status IS '0: Without status
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
-- TOC entry 3815 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.teacher."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 3816 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.teacher."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 3817 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.teacher."unregisteredDate" IS 'Timestamp for unregistration date';


--
-- TOC entry 3818 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher.details; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.teacher.details IS 'Details for the teachers review';


--
-- TOC entry 3819 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher.bio; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.teacher.bio IS 'Bio of the teachear, that explains goals, curriculum, achievements, and any information to describe to the teacher';


--
-- TOC entry 3820 (class 0 OID 0)
-- Dependencies: 222
-- Name: COLUMN teacher.ratting; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.teacher.ratting IS '1: Very poor
2: Poor
3: Medium
4: Good
5: Very good';


--
-- TOC entry 221 (class 1259 OID 16790)
-- Name: teacher_teacherID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.teacher ALTER COLUMN "teacherID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."teacher_teacherID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 262 (class 1259 OID 17075)
-- Name: telephone; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga.telephone (
    "telephoneID" integer NOT NULL,
    number character varying(10) NOT NULL,
    "phoneName" character varying(100) NOT NULL,
    detail text,
    "isFavourite" boolean DEFAULT false NOT NULL,
    "isWork" boolean,
    "phoneType" smallint,
    "registeredDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unregisteredDate" timestamp without time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "operatorID" integer,
    "personID" integer
)
WITH (autovacuum_enabled='true');


ALTER TABLE nonesga.telephone OWNER TO postgres;

--
-- TOC entry 3821 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."telephoneID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.telephone."telephoneID" IS 'Unique autoincremental identification for a person''s telephone number';


--
-- TOC entry 3822 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone.number; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.telephone.number IS 'Person''s telephone number';


--
-- TOC entry 3823 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."phoneName"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.telephone."phoneName" IS 'Name or alias for identification of the number in the list of numbers of a person';


--
-- TOC entry 3824 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone.detail; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.telephone.detail IS 'Aditional details for a person''s number, for example: ''Contact only weekends''';


--
-- TOC entry 3825 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."isFavourite"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.telephone."isFavourite" IS 'true: is favourite number
false: is not favourite number

Only one favourite number for a person';


--
-- TOC entry 3826 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."isWork"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.telephone."isWork" IS 'true: is a number for office or work place
false: is nota a number for office or work place';


--
-- TOC entry 3827 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."phoneType"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.telephone."phoneType" IS '1: Home
2: Cellphone
3: Office or Work place
4: Parent of family name
5: Friend of related to the family
6: Contact number
7: Backup number';


--
-- TOC entry 3828 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.telephone."registeredDate" IS 'Timestamp for registration date';


--
-- TOC entry 3829 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.telephone."unregisteredDate" IS 'Timestamp of the unregistration date';


--
-- TOC entry 3830 (class 0 OID 0)
-- Dependencies: 262
-- Name: COLUMN telephone."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga.telephone."isActive" IS 'true: active
false: inactive';


--
-- TOC entry 261 (class 1259 OID 17073)
-- Name: telephone_telephoneID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga.telephone ALTER COLUMN "telephoneID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."telephone_telephoneID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 204 (class 1259 OID 16642)
-- Name: user; Type: TABLE; Schema: nonesga; Owner: postgres
--

CREATE TABLE nonesga."user" (
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


ALTER TABLE nonesga."user" OWNER TO postgres;

--
-- TOC entry 3831 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user"."userID"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."user"."userID" IS 'Unique autoincremental ID for a user';


--
-- TOC entry 3832 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user".nick; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."user".nick IS 'Nickname used to authenticate a user (in case of no mail convention)';


--
-- TOC entry 3833 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user".pass; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."user".pass IS 'Stores the password of the user';


--
-- TOC entry 3834 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user".email; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."user".email IS 'Unique email addres to acces into application';


--
-- TOC entry 3835 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user"."registeredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."user"."registeredDate" IS 'Similar as creationDate, stores registration date timestamp';


--
-- TOC entry 3836 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user".status; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."user".status IS 'Stores a status code, the status is defined by API

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
-- TOC entry 3837 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user"."unregisteredDate"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."user"."unregisteredDate" IS 'In case of cancellation, this field stores the timestamp of cancellation';


--
-- TOC entry 3838 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user"."lastLogin"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."user"."lastLogin" IS 'Timestamp for the last loggin in the application';


--
-- TOC entry 3839 (class 0 OID 0)
-- Dependencies: 204
-- Name: COLUMN "user"."isActive"; Type: COMMENT; Schema: nonesga; Owner: postgres
--

COMMENT ON COLUMN nonesga."user"."isActive" IS 'true: for active users
false:: for active users';


--
-- TOC entry 203 (class 1259 OID 16640)
-- Name: user_userID_seq; Type: SEQUENCE; Schema: nonesga; Owner: postgres
--

ALTER TABLE nonesga."user" ALTER COLUMN "userID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME nonesga."user_userID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3144 (class 2606 OID 16843)
-- Name: academicPeriod PK_academicPeriod; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."academicPeriod"
    ADD CONSTRAINT "PK_academicPeriod" PRIMARY KEY ("periodID");


--
-- TOC entry 3113 (class 2606 OID 16756)
-- Name: address PK_address; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.address
    ADD CONSTRAINT "PK_address" PRIMARY KEY ("addressID");


--
-- TOC entry 3163 (class 2606 OID 16915)
-- Name: assistenceRegister PK_assistenceRegister; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."assistenceRegister"
    ADD CONSTRAINT "PK_assistenceRegister" PRIMARY KEY ("AssistanceRegisterID");


--
-- TOC entry 3201 (class 2606 OID 17056)
-- Name: calificationAverange PK_calificationAverange; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."calificationAverange"
    ADD CONSTRAINT "PK_calificationAverange" PRIMARY KEY ("averangeID");


--
-- TOC entry 3093 (class 2606 OID 16706)
-- Name: city PK_city; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.city
    ADD CONSTRAINT "PK_city" PRIMARY KEY ("cityID");


--
-- TOC entry 3154 (class 2606 OID 16884)
-- Name: college PK_college; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.college
    ADD CONSTRAINT "PK_college" PRIMARY KEY ("collegeID");


--
-- TOC entry 3158 (class 2606 OID 16897)
-- Name: content PK_content; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.content
    ADD CONSTRAINT "PK_content" PRIMARY KEY ("contentID");


--
-- TOC entry 3105 (class 2606 OID 16737)
-- Name: country PK_country; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.country
    ADD CONSTRAINT "PK_country" PRIMARY KEY ("countryID");


--
-- TOC entry 3146 (class 2606 OID 16856)
-- Name: course PK_course; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.course
    ADD CONSTRAINT "PK_course" PRIMARY KEY ("courseID");


--
-- TOC entry 3133 (class 2606 OID 16818)
-- Name: enrollment PK_enrrollment; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.enrollment
    ADD CONSTRAINT "PK_enrrollment" PRIMARY KEY ("enrollmentID");


--
-- TOC entry 3140 (class 2606 OID 16829)
-- Name: enrollmentStatus PK_enrrollmentStatus; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."enrollmentStatus"
    ADD CONSTRAINT "PK_enrrollmentStatus" PRIMARY KEY ("statusID");


--
-- TOC entry 3247 (class 2606 OID 17447)
-- Name: errorLog PK_errorLog; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."errorLog"
    ADD CONSTRAINT "PK_errorLog" PRIMARY KEY ("errorLogID");


--
-- TOC entry 3179 (class 2606 OID 16965)
-- Name: exam PK_exam; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.exam
    ADD CONSTRAINT "PK_exam" PRIMARY KEY ("examID");


--
-- TOC entry 3194 (class 2606 OID 17023)
-- Name: examAnswer PK_examAnswer; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."examAnswer"
    ADD CONSTRAINT "PK_examAnswer" PRIMARY KEY ("answerID");


--
-- TOC entry 3182 (class 2606 OID 16981)
-- Name: examGrade PK_examGrade; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."examGrade"
    ADD CONSTRAINT "PK_examGrade" PRIMARY KEY ("examGradeID");


--
-- TOC entry 3191 (class 2606 OID 17009)
-- Name: examQuestion PK_examQuestion; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."examQuestion"
    ADD CONSTRAINT "PK_examQuestion" PRIMARY KEY ("questionID");


--
-- TOC entry 3187 (class 2606 OID 16996)
-- Name: examRegister PK_examRegister; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."examRegister"
    ADD CONSTRAINT "PK_examRegister" PRIMARY KEY ("registerID");


--
-- TOC entry 3206 (class 2606 OID 17072)
-- Name: partial PK_partial; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.partial
    ADD CONSTRAINT "PK_partial" PRIMARY KEY ("patialID");


--
-- TOC entry 3226 (class 2606 OID 17137)
-- Name: payment PK_payment; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.payment
    ADD CONSTRAINT "PK_payment" PRIMARY KEY ("paymentID");


--
-- TOC entry 3238 (class 2606 OID 17162)
-- Name: paymentDetail PK_paymentDetail; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."paymentDetail"
    ADD CONSTRAINT "PK_paymentDetail" PRIMARY KEY ("idDetail");


--
-- TOC entry 3234 (class 2606 OID 17149)
-- Name: paymentMethod PK_paymentMethod; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."paymentMethod"
    ADD CONSTRAINT "PK_paymentMethod" PRIMARY KEY ("idPaymentMethod");


--
-- TOC entry 3241 (class 2606 OID 17177)
-- Name: paymentType PK_paymentType; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."paymentType"
    ADD CONSTRAINT "PK_paymentType" PRIMARY KEY ("paymentTypeID");


--
-- TOC entry 3080 (class 2606 OID 16673)
-- Name: person PK_person; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.person
    ADD CONSTRAINT "PK_person" PRIMARY KEY ("personID");


--
-- TOC entry 3085 (class 2606 OID 16687)
-- Name: personType PK_personType; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."personType"
    ADD CONSTRAINT "PK_personType" PRIMARY KEY ("personTypeID");


--
-- TOC entry 3216 (class 2606 OID 17100)
-- Name: phoneOperator PK_phoneOperator; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."phoneOperator"
    ADD CONSTRAINT "PK_phoneOperator" PRIMARY KEY ("operatorID");


--
-- TOC entry 3098 (class 2606 OID 16721)
-- Name: province PK_province; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.province
    ADD CONSTRAINT "PK_province" PRIMARY KEY ("provinceID");


--
-- TOC entry 3220 (class 2606 OID 17118)
-- Name: rating PK_rating; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.rating
    ADD CONSTRAINT "PK_rating" PRIMARY KEY ("ratingID");


--
-- TOC entry 3261 (class 2606 OID 25925)
-- Name: taskResolutionResource PK_resolutionResource; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."taskResolutionResource"
    ADD CONSTRAINT "PK_resolutionResource" PRIMARY KEY ("resourceID");


--
-- TOC entry 3117 (class 2606 OID 16768)
-- Name: role PK_role; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.role
    ADD CONSTRAINT "PK_role" PRIMARY KEY ("roleID");


--
-- TOC entry 3123 (class 2606 OID 16787)
-- Name: student PK_student; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.student
    ADD CONSTRAINT "PK_student" PRIMARY KEY ("studentID");


--
-- TOC entry 3197 (class 2606 OID 17038)
-- Name: studentAnswer PK_studentAnswer; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."studentAnswer"
    ADD CONSTRAINT "PK_studentAnswer" PRIMARY KEY ("studentAnswerID");


--
-- TOC entry 3150 (class 2606 OID 16872)
-- Name: subject PK_subject; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.subject
    ADD CONSTRAINT "PK_subject" PRIMARY KEY ("subjectID");


--
-- TOC entry 3167 (class 2606 OID 16927)
-- Name: task PK_task; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.task
    ADD CONSTRAINT "PK_task" PRIMARY KEY ("taskID");


--
-- TOC entry 3172 (class 2606 OID 16943)
-- Name: taskEvaluation PK_taskEvaluation; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."taskEvaluation"
    ADD CONSTRAINT "PK_taskEvaluation" PRIMARY KEY ("taskEvaluationID");


--
-- TOC entry 3257 (class 2606 OID 25912)
-- Name: taskResolution PK_taskResolution; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."taskResolution"
    ADD CONSTRAINT "PK_taskResolution" PRIMARY KEY ("resolutionID");


--
-- TOC entry 3176 (class 2606 OID 16955)
-- Name: taskResource PK_taskResource; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."taskResource"
    ADD CONSTRAINT "PK_taskResource" PRIMARY KEY ("taskResourceID");


--
-- TOC entry 3128 (class 2606 OID 16802)
-- Name: teacher PK_teacher; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.teacher
    ADD CONSTRAINT "PK_teacher" PRIMARY KEY ("teacherID");


--
-- TOC entry 3210 (class 2606 OID 17087)
-- Name: telephone PK_telephone; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.telephone
    ADD CONSTRAINT "PK_telephone" PRIMARY KEY ("telephoneID");


--
-- TOC entry 3069 (class 2606 OID 16654)
-- Name: user PK_user; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."user"
    ADD CONSTRAINT "PK_user" PRIMARY KEY ("userID");


--
-- TOC entry 3254 (class 2606 OID 17478)
-- Name: auditSession auditSession_PK; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."auditSession"
    ADD CONSTRAINT "auditSession_PK" PRIMARY KEY ("auditID");


--
-- TOC entry 3107 (class 2606 OID 16739)
-- Name: country callCode; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.country
    ADD CONSTRAINT "callCode" UNIQUE ("callCode");


--
-- TOC entry 3095 (class 2606 OID 16708)
-- Name: city cityCode; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.city
    ADD CONSTRAINT "cityCode" UNIQUE ("cityCode");


--
-- TOC entry 3236 (class 2606 OID 17151)
-- Name: paymentMethod code; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."paymentMethod"
    ADD CONSTRAINT code UNIQUE (code);


--
-- TOC entry 3156 (class 2606 OID 16886)
-- Name: college collegeCode; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.college
    ADD CONSTRAINT "collegeCode" UNIQUE ("collegeCode");


--
-- TOC entry 3160 (class 2606 OID 16899)
-- Name: content contedCode; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.content
    ADD CONSTRAINT "contedCode" UNIQUE ("contentCode");


--
-- TOC entry 3109 (class 2606 OID 16741)
-- Name: country countryCode; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.country
    ADD CONSTRAINT "countryCode" UNIQUE ("countryCode");


--
-- TOC entry 3111 (class 2606 OID 16743)
-- Name: country countryName; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.country
    ADD CONSTRAINT "countryName" UNIQUE ("countryName");


--
-- TOC entry 3148 (class 2606 OID 16858)
-- Name: course courseCode; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.course
    ADD CONSTRAINT "courseCode" UNIQUE ("courseCode");


--
-- TOC entry 3142 (class 2606 OID 16831)
-- Name: enrollmentStatus description; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."enrollmentStatus"
    ADD CONSTRAINT description UNIQUE (description);


--
-- TOC entry 3082 (class 2606 OID 16675)
-- Name: person dni; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.person
    ADD CONSTRAINT dni UNIQUE (dni);


--
-- TOC entry 3071 (class 2606 OID 16658)
-- Name: user email; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."user"
    ADD CONSTRAINT email UNIQUE (email);


--
-- TOC entry 3087 (class 2606 OID 16689)
-- Name: personType idPerson; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."personType"
    ADD CONSTRAINT "idPerson" UNIQUE ("personTypeID");


--
-- TOC entry 3073 (class 2606 OID 16656)
-- Name: user idUser; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."user"
    ADD CONSTRAINT "idUser" UNIQUE ("userID");


--
-- TOC entry 3075 (class 2606 OID 16660)
-- Name: user nick; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."user"
    ADD CONSTRAINT nick UNIQUE (nick);


--
-- TOC entry 3212 (class 2606 OID 17089)
-- Name: telephone number; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.telephone
    ADD CONSTRAINT number UNIQUE (number);


--
-- TOC entry 3218 (class 2606 OID 17102)
-- Name: phoneOperator operatorName; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."phoneOperator"
    ADD CONSTRAINT "operatorName" UNIQUE ("operatorName");


--
-- TOC entry 3243 (class 2606 OID 17179)
-- Name: paymentType paymentCode; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."paymentType"
    ADD CONSTRAINT "paymentCode" UNIQUE ("paymentCode");


--
-- TOC entry 3245 (class 2606 OID 17181)
-- Name: paymentType paymentTypeName; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."paymentType"
    ADD CONSTRAINT "paymentTypeName" UNIQUE ("paymentTypeName");


--
-- TOC entry 3100 (class 2606 OID 16725)
-- Name: province provinceCode; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.province
    ADD CONSTRAINT "provinceCode" UNIQUE ("provinceCode");


--
-- TOC entry 3102 (class 2606 OID 16723)
-- Name: province provinceName; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.province
    ADD CONSTRAINT "provinceName" UNIQUE ("provinceName");


--
-- TOC entry 3119 (class 2606 OID 16772)
-- Name: role roleCode; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.role
    ADD CONSTRAINT "roleCode" UNIQUE ("roleCode");


--
-- TOC entry 3121 (class 2606 OID 16770)
-- Name: role roleName; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.role
    ADD CONSTRAINT "roleName" UNIQUE ("roleName");


--
-- TOC entry 3249 (class 2606 OID 17459)
-- Name: session session_PK; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.session
    ADD CONSTRAINT "session_PK" PRIMARY KEY ("sessionID");


--
-- TOC entry 3125 (class 2606 OID 16789)
-- Name: student studentCode; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.student
    ADD CONSTRAINT "studentCode" UNIQUE ("studentCode");


--
-- TOC entry 3169 (class 2606 OID 16929)
-- Name: task taskCode; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.task
    ADD CONSTRAINT "taskCode" UNIQUE ("taskCode");


--
-- TOC entry 3130 (class 2606 OID 16804)
-- Name: teacher teacherCode; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.teacher
    ADD CONSTRAINT "teacherCode" UNIQUE ("teacherCode");


--
-- TOC entry 3089 (class 2606 OID 16691)
-- Name: personType type; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."personType"
    ADD CONSTRAINT type UNIQUE ("personType");


--
-- TOC entry 3091 (class 2606 OID 16693)
-- Name: personType typeName; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."personType"
    ADD CONSTRAINT "typeName" UNIQUE ("typeName");


--
-- TOC entry 3252 (class 2606 OID 17461)
-- Name: session userID; Type: CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.session
    ADD CONSTRAINT "userID" UNIQUE ("userID");


--
-- TOC entry 3114 (class 1259 OID 16753)
-- Name: address_city_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX address_city_ix ON nonesga.address USING btree ("cityID");


--
-- TOC entry 3115 (class 1259 OID 16754)
-- Name: address_person_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX address_person_ix ON nonesga.address USING btree ("personID");


--
-- TOC entry 3195 (class 1259 OID 17021)
-- Name: answer_question_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX answer_question_ix ON nonesga."examAnswer" USING btree ("questionID");


--
-- TOC entry 3164 (class 1259 OID 16913)
-- Name: assistance_student_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX assistance_student_ix ON nonesga."assistenceRegister" USING btree ("studentID");


--
-- TOC entry 3165 (class 1259 OID 16912)
-- Name: assistance_subject_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX assistance_subject_ix ON nonesga."assistenceRegister" USING btree ("subjectID");


--
-- TOC entry 3255 (class 1259 OID 17484)
-- Name: auditSession_user_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "auditSession_user_ix" ON nonesga."auditSession" USING btree ("userID");


--
-- TOC entry 3202 (class 1259 OID 17052)
-- Name: averange_subject_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX averange_subject_ix ON nonesga."calificationAverange" USING btree ("subjectID");


--
-- TOC entry 3203 (class 1259 OID 17054)
-- Name: averange_teacher_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX averange_teacher_ix ON nonesga."calificationAverange" USING btree ("teacherID");


--
-- TOC entry 3204 (class 1259 OID 17053)
-- Name: avergange_student_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX avergange_student_ix ON nonesga."calificationAverange" USING btree ("studentID");


--
-- TOC entry 3096 (class 1259 OID 16704)
-- Name: city_province_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX city_province_ix ON nonesga.city USING btree ("provinceID");


--
-- TOC entry 3161 (class 1259 OID 17640)
-- Name: content_subject_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX content_subject_ix ON nonesga.content USING btree ("subjectID");


--
-- TOC entry 3239 (class 1259 OID 17160)
-- Name: detail_payment_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX detail_payment_ix ON nonesga."paymentDetail" USING btree ("paymentID");


--
-- TOC entry 3134 (class 1259 OID 16815)
-- Name: enrrollment_academicPeriod_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "enrrollment_academicPeriod_ix" ON nonesga.enrollment USING btree ("periodID");


--
-- TOC entry 3135 (class 1259 OID 16816)
-- Name: enrrollment_course_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX enrrollment_course_ix ON nonesga.enrollment USING btree ("courseID");


--
-- TOC entry 3136 (class 1259 OID 16812)
-- Name: enrrollment_status_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX enrrollment_status_ix ON nonesga.enrollment USING btree ("statusID");


--
-- TOC entry 3137 (class 1259 OID 16813)
-- Name: enrrollment_student_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX enrrollment_student_ix ON nonesga.enrollment USING btree ("studentID");


--
-- TOC entry 3138 (class 1259 OID 16814)
-- Name: enrrollment_user_is; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX enrrollment_user_is ON nonesga.enrollment USING btree ("userID");


--
-- TOC entry 3173 (class 1259 OID 16941)
-- Name: evaluation_student_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX evaluation_student_ix ON nonesga."taskEvaluation" USING btree ("studentID");


--
-- TOC entry 3174 (class 1259 OID 16940)
-- Name: evaluation_task_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX evaluation_task_ix ON nonesga."taskEvaluation" USING btree ("taskID");


--
-- TOC entry 3183 (class 1259 OID 16978)
-- Name: examGrade_exam_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "examGrade_exam_ix" ON nonesga."examGrade" USING btree ("examID");


--
-- TOC entry 3184 (class 1259 OID 16977)
-- Name: examGrade_student_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "examGrade_student_ix" ON nonesga."examGrade" USING btree ("studentID");


--
-- TOC entry 3185 (class 1259 OID 16979)
-- Name: examGrade_teacher_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "examGrade_teacher_ix" ON nonesga."examGrade" USING btree ("teacherID");


--
-- TOC entry 3188 (class 1259 OID 16994)
-- Name: examRegister_exam_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "examRegister_exam_ix" ON nonesga."examRegister" USING btree ("examID");


--
-- TOC entry 3189 (class 1259 OID 16993)
-- Name: examRegister_student_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "examRegister_student_ix" ON nonesga."examRegister" USING btree ("studentID");


--
-- TOC entry 3180 (class 1259 OID 16963)
-- Name: exam_subject_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX exam_subject_ix ON nonesga.exam USING btree ("subjectID");


--
-- TOC entry 3151 (class 1259 OID 17664)
-- Name: fki_sub_belongs_cou_fk; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX fki_sub_belongs_cou_fk ON nonesga.subject USING btree ("courseID");


--
-- TOC entry 3207 (class 1259 OID 17070)
-- Name: partial_student_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX partial_student_ix ON nonesga.partial USING btree ("studentID");


--
-- TOC entry 3208 (class 1259 OID 17069)
-- Name: partial_subject_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX partial_subject_ix ON nonesga.partial USING btree ("subjectID");


--
-- TOC entry 3227 (class 1259 OID 17135)
-- Name: payment_college_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX payment_college_ix ON nonesga.payment USING btree ("collegeID");


--
-- TOC entry 3228 (class 1259 OID 17130)
-- Name: payment_method_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX payment_method_ix ON nonesga.payment USING btree ("idPaymentMethod");


--
-- TOC entry 3229 (class 1259 OID 17132)
-- Name: payment_person_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX payment_person_ix ON nonesga.payment USING btree ("personID");


--
-- TOC entry 3230 (class 1259 OID 17131)
-- Name: payment_student_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX payment_student_ix ON nonesga.payment USING btree ("studentID");


--
-- TOC entry 3231 (class 1259 OID 17134)
-- Name: payment_type_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX payment_type_ix ON nonesga.payment USING btree ("paymentTypeID");


--
-- TOC entry 3232 (class 1259 OID 17133)
-- Name: payment_user_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX payment_user_ix ON nonesga.payment USING btree ("userID");


--
-- TOC entry 3083 (class 1259 OID 16671)
-- Name: person_personType_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "person_personType_ix" ON nonesga.person USING btree ("personTypeID");


--
-- TOC entry 3103 (class 1259 OID 16719)
-- Name: province_country_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX province_country_ix ON nonesga.province USING btree ("countryID");


--
-- TOC entry 3192 (class 1259 OID 17007)
-- Name: question_exam_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX question_exam_ix ON nonesga."examQuestion" USING btree ("examID");


--
-- TOC entry 3221 (class 1259 OID 17113)
-- Name: ratedStudent_rate_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "ratedStudent_rate_ix" ON nonesga.rating USING btree ("ratedStudentID");


--
-- TOC entry 3222 (class 1259 OID 17114)
-- Name: ratedTeacher_rate_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "ratedTeacher_rate_ix" ON nonesga.rating USING btree ("ratedTeacherID");


--
-- TOC entry 3262 (class 1259 OID 25923)
-- Name: resolution_resours_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX resolution_resours_ix ON nonesga."taskResolutionResource" USING btree ("resolutionID");


--
-- TOC entry 3258 (class 1259 OID 25910)
-- Name: resolution_student_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX resolution_student_ix ON nonesga."taskResolution" USING btree ("studentID");


--
-- TOC entry 3259 (class 1259 OID 25909)
-- Name: resolution_task_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX resolution_task_ix ON nonesga."taskResolution" USING btree ("taskID");


--
-- TOC entry 3177 (class 1259 OID 16953)
-- Name: resource_task_is; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX resource_task_is ON nonesga."taskResource" USING btree ("taskID");


--
-- TOC entry 3250 (class 1259 OID 17467)
-- Name: session_user_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX session_user_ix ON nonesga.session USING btree ("userID");


--
-- TOC entry 3223 (class 1259 OID 17115)
-- Name: studenRates_rate_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "studenRates_rate_ix" ON nonesga.rating USING btree ("studentRatesID");


--
-- TOC entry 3198 (class 1259 OID 17035)
-- Name: studentAnswer_answer_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "studentAnswer_answer_ix" ON nonesga."studentAnswer" USING btree ("answerID");


--
-- TOC entry 3199 (class 1259 OID 17036)
-- Name: studentAnswer_student_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "studentAnswer_student_ix" ON nonesga."studentAnswer" USING btree ("studentID");


--
-- TOC entry 3126 (class 1259 OID 16785)
-- Name: student_person_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX student_person_ix ON nonesga.student USING btree ("personID");


--
-- TOC entry 3152 (class 1259 OID 16869)
-- Name: subject_teacher_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX subject_teacher_ix ON nonesga.subject USING btree ("teacherID");


--
-- TOC entry 3170 (class 1259 OID 16925)
-- Name: task_subject_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX task_subject_ix ON nonesga.task USING btree ("subjectID");


--
-- TOC entry 3224 (class 1259 OID 17116)
-- Name: teacherRates_rate_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX "teacherRates_rate_ix" ON nonesga.rating USING btree ("teacherRatesID");


--
-- TOC entry 3131 (class 1259 OID 16800)
-- Name: teacher_person_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX teacher_person_ix ON nonesga.teacher USING btree ("personID");


--
-- TOC entry 3213 (class 1259 OID 17084)
-- Name: telephone_operator_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX telephone_operator_ix ON nonesga.telephone USING btree ("operatorID");


--
-- TOC entry 3214 (class 1259 OID 17085)
-- Name: telephone_person_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX telephone_person_ix ON nonesga.telephone USING btree ("personID");


--
-- TOC entry 3076 (class 1259 OID 16652)
-- Name: user_college_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX user_college_ix ON nonesga."user" USING btree ("collegeID");


--
-- TOC entry 3077 (class 1259 OID 16650)
-- Name: user_person_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX user_person_ix ON nonesga."user" USING btree ("personID");


--
-- TOC entry 3078 (class 1259 OID 16651)
-- Name: user_role_ix; Type: INDEX; Schema: nonesga; Owner: postgres
--

CREATE INDEX user_role_ix ON nonesga."user" USING btree ("roleID");


--
-- TOC entry 3321 (class 2620 OID 17489)
-- Name: session deleteauditsessiontrigger; Type: TRIGGER; Schema: nonesga; Owner: postgres
--

CREATE TRIGGER deleteauditsessiontrigger AFTER DELETE ON nonesga.session FOR EACH ROW EXECUTE FUNCTION nonesga.fndeleteauditsession();


--
-- TOC entry 3323 (class 2620 OID 17536)
-- Name: session deleteinactivesessions; Type: TRIGGER; Schema: nonesga; Owner: postgres
--

CREATE TRIGGER deleteinactivesessions AFTER INSERT OR DELETE OR UPDATE ON nonesga.session FOR EACH ROW EXECUTE FUNCTION nonesga.fndeleteoldusers();


--
-- TOC entry 3320 (class 2620 OID 17488)
-- Name: session insertauditsessiontrigger; Type: TRIGGER; Schema: nonesga; Owner: postgres
--

CREATE TRIGGER insertauditsessiontrigger BEFORE INSERT ON nonesga.session FOR EACH ROW EXECUTE FUNCTION nonesga.fninsertauditsession();


--
-- TOC entry 3322 (class 2620 OID 17490)
-- Name: session updateauditsessiontrigger; Type: TRIGGER; Schema: nonesga; Owner: postgres
--

CREATE TRIGGER updateauditsessiontrigger BEFORE UPDATE ON nonesga.session FOR EACH ROW EXECUTE FUNCTION nonesga.fnupdateauditsession();


--
-- TOC entry 3269 (class 2606 OID 17192)
-- Name: address add_isIn_cit_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.address
    ADD CONSTRAINT "add_isIn_cit_fk" FOREIGN KEY ("cityID") REFERENCES nonesga.city("cityID");


--
-- TOC entry 3295 (class 2606 OID 17317)
-- Name: studentAnswer asw_isRegistered_std_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."studentAnswer"
    ADD CONSTRAINT "asw_isRegistered_std_fk" FOREIGN KEY ("answerID") REFERENCES nonesga."examAnswer"("answerID");


--
-- TOC entry 3316 (class 2606 OID 17479)
-- Name: auditSession aud_has_usr_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."auditSession"
    ADD CONSTRAINT aud_has_usr_fk FOREIGN KEY ("userID") REFERENCES nonesga."user"("userID");


--
-- TOC entry 3267 (class 2606 OID 17202)
-- Name: city cit_isIn_prv_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.city
    ADD CONSTRAINT "cit_isIn_prv_fk" FOREIGN KEY ("provinceID") REFERENCES nonesga.province("provinceID");


--
-- TOC entry 3313 (class 2606 OID 17432)
-- Name: payment col_reg_pay_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.payment
    ADD CONSTRAINT col_reg_pay_fk FOREIGN KEY ("collegeID") REFERENCES nonesga.college("collegeID");


--
-- TOC entry 3277 (class 2606 OID 17242)
-- Name: enrollment cou_needs_enr_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.enrollment
    ADD CONSTRAINT cou_needs_enr_fk FOREIGN KEY ("courseID") REFERENCES nonesga.course("courseID");


--
-- TOC entry 3276 (class 2606 OID 17237)
-- Name: enrollment enr_has_per_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.enrollment
    ADD CONSTRAINT enr_has_per_fk FOREIGN KEY ("periodID") REFERENCES nonesga."academicPeriod"("periodID");


--
-- TOC entry 3273 (class 2606 OID 17222)
-- Name: enrollment enr_has_sta_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.enrollment
    ADD CONSTRAINT enr_has_sta_fk FOREIGN KEY ("statusID") REFERENCES nonesga."enrollmentStatus"("statusID");


--
-- TOC entry 3289 (class 2606 OID 17297)
-- Name: examGrade exm_has_grd_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."examGrade"
    ADD CONSTRAINT exm_has_grd_fk FOREIGN KEY ("examID") REFERENCES nonesga.exam("examID");


--
-- TOC entry 3293 (class 2606 OID 17307)
-- Name: examQuestion exm_has_qst_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."examQuestion"
    ADD CONSTRAINT exm_has_qst_fk FOREIGN KEY ("examID") REFERENCES nonesga.exam("examID");


--
-- TOC entry 3292 (class 2606 OID 17387)
-- Name: examRegister exm_has_reg_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."examRegister"
    ADD CONSTRAINT exm_has_reg_fk FOREIGN KEY ("examID") REFERENCES nonesga.exam("examID");


--
-- TOC entry 3314 (class 2606 OID 17422)
-- Name: paymentDetail pay_has_det_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."paymentDetail"
    ADD CONSTRAINT pay_has_det_fk FOREIGN KEY ("paymentID") REFERENCES nonesga.payment("paymentID");


--
-- TOC entry 3308 (class 2606 OID 17402)
-- Name: payment pay_has_met_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.payment
    ADD CONSTRAINT pay_has_met_fk FOREIGN KEY ("idPaymentMethod") REFERENCES nonesga."paymentMethod"("idPaymentMethod");


--
-- TOC entry 3312 (class 2606 OID 17427)
-- Name: payment pay_has_typ_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.payment
    ADD CONSTRAINT pay_has_typ_fk FOREIGN KEY ("paymentTypeID") REFERENCES nonesga."paymentType"("paymentTypeID");


--
-- TOC entry 3270 (class 2606 OID 17392)
-- Name: address per_has_add_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.address
    ADD CONSTRAINT per_has_add_fk FOREIGN KEY ("personID") REFERENCES nonesga.person("personID");


--
-- TOC entry 3303 (class 2606 OID 17397)
-- Name: telephone per_has_tel_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.telephone
    ADD CONSTRAINT per_has_tel_fk FOREIGN KEY ("personID") REFERENCES nonesga.person("personID");


--
-- TOC entry 3266 (class 2606 OID 17182)
-- Name: person per_has_typ_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.person
    ADD CONSTRAINT per_has_typ_fk FOREIGN KEY ("personTypeID") REFERENCES nonesga."personType"("personTypeID");


--
-- TOC entry 3310 (class 2606 OID 17412)
-- Name: payment prs_makes_pay_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.payment
    ADD CONSTRAINT prs_makes_pay_fk FOREIGN KEY ("personID") REFERENCES nonesga.person("personID");


--
-- TOC entry 3268 (class 2606 OID 17207)
-- Name: province prv_isIn_cit_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.province
    ADD CONSTRAINT "prv_isIn_cit_fk" FOREIGN KEY ("countryID") REFERENCES nonesga.country("countryID");


--
-- TOC entry 3294 (class 2606 OID 17312)
-- Name: examAnswer qst_has_ans_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."examAnswer"
    ADD CONSTRAINT qst_has_ans_fk FOREIGN KEY ("questionID") REFERENCES nonesga."examQuestion"("questionID");


--
-- TOC entry 3319 (class 2606 OID 25936)
-- Name: taskResolutionResource res_has_src_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."taskResolutionResource"
    ADD CONSTRAINT res_has_src_fk FOREIGN KEY ("resolutionID") REFERENCES nonesga."taskResolution"("resolutionID");


--
-- TOC entry 3297 (class 2606 OID 17337)
-- Name: calificationAverange sbj_has_avg_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."calificationAverange"
    ADD CONSTRAINT sbj_has_avg_fk FOREIGN KEY ("subjectID") REFERENCES nonesga.subject("subjectID");


--
-- TOC entry 3315 (class 2606 OID 17462)
-- Name: session ses_has_usr_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.session
    ADD CONSTRAINT ses_has_usr_fk FOREIGN KEY ("userID") REFERENCES nonesga."user"("userID");


--
-- TOC entry 3296 (class 2606 OID 17322)
-- Name: studentAnswer std_choices_ans_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."studentAnswer"
    ADD CONSTRAINT std_choices_ans_fk FOREIGN KEY ("studentID") REFERENCES nonesga.student("studentID");


--
-- TOC entry 3298 (class 2606 OID 17342)
-- Name: calificationAverange std_has_avg_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."calificationAverange"
    ADD CONSTRAINT std_has_avg_fk FOREIGN KEY ("studentID") REFERENCES nonesga.student("studentID");


--
-- TOC entry 3288 (class 2606 OID 17292)
-- Name: examGrade std_has_grd_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."examGrade"
    ADD CONSTRAINT std_has_grd_fk FOREIGN KEY ("studentID") REFERENCES nonesga.student("studentID");


--
-- TOC entry 3301 (class 2606 OID 17332)
-- Name: partial std_has_par_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.partial
    ADD CONSTRAINT std_has_par_fk FOREIGN KEY ("studentID") REFERENCES nonesga.student("studentID");


--
-- TOC entry 3304 (class 2606 OID 17357)
-- Name: rating std_has_rat_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.rating
    ADD CONSTRAINT std_has_rat_fk FOREIGN KEY ("ratedStudentID") REFERENCES nonesga.student("studentID");


--
-- TOC entry 3285 (class 2606 OID 17277)
-- Name: taskEvaluation std_has_tse_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."taskEvaluation"
    ADD CONSTRAINT std_has_tse_fk FOREIGN KEY ("studentID") REFERENCES nonesga.student("studentID");


--
-- TOC entry 3271 (class 2606 OID 17212)
-- Name: student std_is_per_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.student
    ADD CONSTRAINT std_is_per_fk FOREIGN KEY ("personID") REFERENCES nonesga.person("personID");


--
-- TOC entry 3306 (class 2606 OID 17367)
-- Name: rating std_rates_rat_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.rating
    ADD CONSTRAINT std_rates_rat_fk FOREIGN KEY ("studentRatesID") REFERENCES nonesga.student("studentID");


--
-- TOC entry 3318 (class 2606 OID 25931)
-- Name: taskResolution std_records_res_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."taskResolution"
    ADD CONSTRAINT std_records_res_fk FOREIGN KEY ("studentID") REFERENCES nonesga.student("studentID");


--
-- TOC entry 3282 (class 2606 OID 17267)
-- Name: assistenceRegister std_reg_asr_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."assistenceRegister"
    ADD CONSTRAINT std_reg_asr_fk FOREIGN KEY ("studentID") REFERENCES nonesga.student("studentID");


--
-- TOC entry 3309 (class 2606 OID 17407)
-- Name: payment strd_generates_pay_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.payment
    ADD CONSTRAINT strd_generates_pay_fk FOREIGN KEY ("studentID") REFERENCES nonesga.student("studentID");


--
-- TOC entry 3291 (class 2606 OID 17287)
-- Name: examRegister stu_reg_exa_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."examRegister"
    ADD CONSTRAINT stu_reg_exa_fk FOREIGN KEY ("studentID") REFERENCES nonesga.student("studentID");


--
-- TOC entry 3274 (class 2606 OID 17227)
-- Name: enrollment stu_req_enr_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.enrollment
    ADD CONSTRAINT stu_req_enr_fk FOREIGN KEY ("studentID") REFERENCES nonesga.student("studentID");


--
-- TOC entry 3279 (class 2606 OID 17659)
-- Name: subject sub_belongs_cou_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.subject
    ADD CONSTRAINT sub_belongs_cou_fk FOREIGN KEY ("courseID") REFERENCES nonesga.course("courseID");


--
-- TOC entry 3281 (class 2606 OID 17262)
-- Name: assistenceRegister sub_has_asr_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."assistenceRegister"
    ADD CONSTRAINT sub_has_asr_fk FOREIGN KEY ("subjectID") REFERENCES nonesga.subject("subjectID");


--
-- TOC entry 3280 (class 2606 OID 17665)
-- Name: content sub_has_cnt_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.content
    ADD CONSTRAINT sub_has_cnt_fk FOREIGN KEY ("subjectID") REFERENCES nonesga.subject("subjectID");


--
-- TOC entry 3300 (class 2606 OID 17327)
-- Name: partial sub_has_par_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.partial
    ADD CONSTRAINT sub_has_par_fk FOREIGN KEY ("subjectID") REFERENCES nonesga.subject("subjectID");


--
-- TOC entry 3283 (class 2606 OID 17377)
-- Name: task sub_has_tsk_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.task
    ADD CONSTRAINT sub_has_tsk_fk FOREIGN KEY ("subjectID") REFERENCES nonesga.subject("subjectID");


--
-- TOC entry 3287 (class 2606 OID 17282)
-- Name: exam sub_take_exa_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.exam
    ADD CONSTRAINT sub_take_exa_fk FOREIGN KEY ("subjectID") REFERENCES nonesga.subject("subjectID");


--
-- TOC entry 3290 (class 2606 OID 17302)
-- Name: examGrade tch_gives_grd_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."examGrade"
    ADD CONSTRAINT tch_gives_grd_fk FOREIGN KEY ("teacherID") REFERENCES nonesga.teacher("teacherID");


--
-- TOC entry 3305 (class 2606 OID 17362)
-- Name: rating tch_has_rat_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.rating
    ADD CONSTRAINT tch_has_rat_fk FOREIGN KEY ("ratedTeacherID") REFERENCES nonesga.teacher("teacherID");


--
-- TOC entry 3272 (class 2606 OID 17217)
-- Name: teacher tch_is_per_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.teacher
    ADD CONSTRAINT tch_is_per_fk FOREIGN KEY ("personID") REFERENCES nonesga.person("personID");


--
-- TOC entry 3307 (class 2606 OID 17372)
-- Name: rating tch_rates_rat_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.rating
    ADD CONSTRAINT tch_rates_rat_fk FOREIGN KEY ("teacherRatesID") REFERENCES nonesga.teacher("teacherID");


--
-- TOC entry 3299 (class 2606 OID 17347)
-- Name: calificationAverange tch_reg_avg_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."calificationAverange"
    ADD CONSTRAINT tch_reg_avg_fk FOREIGN KEY ("teacherID") REFERENCES nonesga.teacher("teacherID");


--
-- TOC entry 3278 (class 2606 OID 17247)
-- Name: subject tch_teachs_sub_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.subject
    ADD CONSTRAINT tch_teachs_sub_fk FOREIGN KEY ("teacherID") REFERENCES nonesga.teacher("teacherID");


--
-- TOC entry 3302 (class 2606 OID 17352)
-- Name: telephone tlf_has_ope_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.telephone
    ADD CONSTRAINT tlf_has_ope_fk FOREIGN KEY ("operatorID") REFERENCES nonesga."phoneOperator"("operatorID");


--
-- TOC entry 3284 (class 2606 OID 17272)
-- Name: taskEvaluation tsk_has_eva_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."taskEvaluation"
    ADD CONSTRAINT tsk_has_eva_fk FOREIGN KEY ("taskID") REFERENCES nonesga.task("taskID");


--
-- TOC entry 3317 (class 2606 OID 25926)
-- Name: taskResolution tsk_has_res_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."taskResolution"
    ADD CONSTRAINT tsk_has_res_fk FOREIGN KEY ("taskID") REFERENCES nonesga.task("taskID");


--
-- TOC entry 3286 (class 2606 OID 17382)
-- Name: taskResource tsk_has_rsc_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."taskResource"
    ADD CONSTRAINT tsk_has_rsc_fk FOREIGN KEY ("taskID") REFERENCES nonesga.task("taskID");


--
-- TOC entry 3264 (class 2606 OID 17197)
-- Name: user urs_has_rol_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."user"
    ADD CONSTRAINT urs_has_rol_fk FOREIGN KEY ("roleID") REFERENCES nonesga.role("roleID");


--
-- TOC entry 3265 (class 2606 OID 17252)
-- Name: user usr_belongs_col_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."user"
    ADD CONSTRAINT usr_belongs_col_fk FOREIGN KEY ("collegeID") REFERENCES nonesga.college("collegeID");


--
-- TOC entry 3263 (class 2606 OID 17187)
-- Name: user usr_is_per_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga."user"
    ADD CONSTRAINT usr_is_per_fk FOREIGN KEY ("personID") REFERENCES nonesga.person("personID");


--
-- TOC entry 3275 (class 2606 OID 17232)
-- Name: enrollment usr_reg_enr_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.enrollment
    ADD CONSTRAINT usr_reg_enr_fk FOREIGN KEY ("userID") REFERENCES nonesga."user"("userID");


--
-- TOC entry 3311 (class 2606 OID 17417)
-- Name: payment usr_register_pay_fk; Type: FK CONSTRAINT; Schema: nonesga; Owner: postgres
--

ALTER TABLE ONLY nonesga.payment
    ADD CONSTRAINT usr_register_pay_fk FOREIGN KEY ("userID") REFERENCES nonesga."user"("userID");


-- Completed on 2020-10-07 11:34:44

--
-- PostgreSQL database dump complete
--

