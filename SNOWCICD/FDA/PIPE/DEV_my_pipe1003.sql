create or replace pipe SOURCE.FDA."DEV_my_pipe1003" auto_ingest=false as COPY INTO FDA."DEV_Scenario_TS21003"
FROM @"Stage_FDA_Source"
FILE_FORMAT = (FORMAT_NAME = "FDA"."DEV_File003")
ON_ERROR = 'CONTINUE';