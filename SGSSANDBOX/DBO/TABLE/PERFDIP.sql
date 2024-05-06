create or replace TABLE "DBO".PERFDIP (
	DEPARTMENT_ID NUMBER(38,0) NOT NULL autoincrement start 1 increment 1 order,
	DEPARTMENT_NAME VARCHAR(50),
	primary key (DEPARTMENT_ID)
);