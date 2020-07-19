CREATE OR REPLACE PROCEDURE public."updateLoginAudit"(IN "ID" integer, IN room integer, IN "currentDate" timestamp without time zone, IN "auditToken" text, IN expiration character varying, IN "IP" character varying, IN device character varying, IN code character varying, IN "auditDetail" text, IN "user" integer)
LANGUAGE 'sql'
AS $BODY$
 INSERT into "auditSession" (
		"sessionID",
		"sessionRoom",
		"sessionDate",
		"sessionToken",
		"sessionExpiration",
		"sessionIP",
		"sessionDevice",
		"sessionCode",
		"sessionDetail",
		"userID"
 ) VALUES (
	"ID",
	room,
	"currentDate",
	"auditToken",
	expiration,
	"IP",
	device,
	code,
	"auditDetail",
	"user"
 );
 $BODY$;