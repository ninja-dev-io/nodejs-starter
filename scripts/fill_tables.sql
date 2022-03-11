-- Set params
set session my.number_of_users = '200';

-- load the pgcrypto extension to gen_random_uuid ()
CREATE EXTENSION pgcrypto;


-- Filling of users
INSERT INTO users
select id
	, concat('User ', id)
FROM GENERATE_SERIES(1, current_setting('my.number_of_users')::int) as id;