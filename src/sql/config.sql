SHOW TIMEZONE;
SELECT NOW()::TIMESTAMP;

SELECT * FROM pg_timezone_names
WHERE name LIKE '%Guayaquil%';

SET TIMEZONE='America/Guayaquil';