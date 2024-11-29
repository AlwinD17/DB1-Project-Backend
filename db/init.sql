-- Create the database if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'tourkitdb') THEN
        PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE tourkitdb');
    END IF;
END
$$;