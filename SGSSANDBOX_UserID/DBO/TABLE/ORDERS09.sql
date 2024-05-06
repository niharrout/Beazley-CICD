create or replace TABLE "DBO".ORDERS09 (
	ORDER_ID NUMBER(38,0) NOT NULL autoincrement start 1 increment 1 order,
	CUSTOMER_ID NUMBER(38,0),
	ORDER_DATE DATE,
	TOTAL_AMOUNT NUMBER(10,2),
	primary key (ORDER_ID),
	foreign key (CUSTOMER_ID) references SGSSANDBOX.DBO.CUSTOMERS09(CUSTOMER_ID)
);