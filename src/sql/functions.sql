-- Function to insert in audit after insert
create or replace function fnInsertAuditSession()
	returns trigger as
$$
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
$$
language 'plpgsql';

--Function to insert in audit before delete
CREATE OR REPLACE FUNCTION fnDeleteAuditSession()
	RETURNS trigger AS
$$
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
$$
language 'plpgsql';

-- Function to insert in audit after update or renew the token
create or replace function fnUpdateAuditSession()
	returns trigger as
$$
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
$$
language 'plpgsql';

-- Trigger to delete old or inactive users
create or replace function fnDeleteOldUsers() 
	returns trigger as
$$
begin
	delete from "session" 
	where "sessionDate" < now() - interval '4 hours';
	return new;
end;
$$
language 'plpgsql';