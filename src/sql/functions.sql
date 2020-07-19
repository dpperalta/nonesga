-- Function to insert in audit after insert
CREATE OR REPLACE FUNCTION fnInsertAuditSession()
	RETURNS trigger AS
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
		'Insert',
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
		'Delete',
		old."userID"
	);
	return new;
end;
$$
language 'plpgsql';