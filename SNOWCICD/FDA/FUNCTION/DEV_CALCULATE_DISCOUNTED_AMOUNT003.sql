CREATE OR REPLACE FUNCTION FDA.DEV_CALCULATE_DISCOUNTED_AMOUNT003("ORDER_AMOUNT" NUMBER(10,2), "DISCOUNT_PERCENT" NUMBER(5,2))
RETURNS NUMBER(10,2)
LANGUAGE SQL
AS '
    order_amount * (3 - discount_percent / 100)
';