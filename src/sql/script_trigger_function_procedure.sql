-- Function to insert in audit after insert
create or replace function fnInsertAuditSession()
	returns trigger as
$$
begin
	insert into nonesga."auditSession" ("sessionID", 
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
$$
language 'plpgsql';

--Function to insert in audit before delete
CREATE OR REPLACE FUNCTION fnDeleteAuditSession()
	RETURNS trigger AS
$$
begin
	insert into nonesga."auditSession"("sessionID", 
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
$$
language 'plpgsql';

-- Function to insert in audit after update or renew the token
create or replace function fnUpdateAuditSession()
	returns trigger as
$$
begin
	insert into nonesga."auditSession" ("sessionID", 
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
$$
language 'plpgsql';

-- Trigger to delete old or inactive users
create or replace function fnDeleteOldUsers() 
	returns trigger as
$$
begin
	delete from "session" 
	where nonesga."sessionDate" < now() - interval '4 hours';
	return new;
end;
$$
language 'plpgsql';

CREATE OR REPLACE PROCEDURE nonesga."updateLoginAudit"(IN "ID" integer, IN room integer, IN "currentDate" timestamp without time zone, IN "auditToken" text, IN expiration character varying, IN "IP" character varying, IN device character varying, IN code character varying, IN "auditDetail" text, IN "user" integer)
LANGUAGE 'sql'
AS $BODY$
 INSERT into nonesga."auditSession" (
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

-- Trigger to insert values into audit session logged in
create trigger insertAuditSessionTrigger
	before insert
	on nonesga."session"
	for each row
	execute procedure fnInsertAuditSession();

-- Trigger to insert values into audit session when user is logged out
create trigger deleteAuditSessionTrigger
	after delete
	on nonesga."session"
	for each row
	execute procedure fnDeleteAuditSession();

-- Trigger to insert values into audit session when user is renewing the login
create trigger updateAuditSessionTrigger
	before update
	on nonesga."session"
	for each row
	execute procedure fnUpdateAuditSession();

-- Trigger to delete all inactive users from session table
create trigger deleteInactiveSessions
	after insert or update or delete
	on nonesga."session"
	for each row
	execute procedure fnDeleteOldUsers();

