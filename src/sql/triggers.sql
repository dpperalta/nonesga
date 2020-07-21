-- Trigger to insert values into audit session logged in
create trigger insertAuditSessionTrigger
	before insert
	on "session"
	for each row
	execute procedure fnInsertAuditSession();

-- Trigger to insert values into audit session when user is logged out
create trigger deleteAuditSessionTrigger
	after delete
	on "session"
	for each row
	execute procedure fnDeleteAuditSession();

-- Trigger to insert values into audit session when user is renewing the login
create trigger updateAuditSessionTrigger
	before update
	on "session"
	for each row
	execute procedure fnUpdateAuditSession();