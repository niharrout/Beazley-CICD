create or replace TABLE "DBO".TEST (
	A1 VARCHAR(10),
	B1 BINARY(8388608),
	C1 DATE DEFAULT (2013 - 5) - 17,
	D1 VARCHAR(10) DEFAULT '10ac',
	primary key (B1, C1)
);