create or replace task FDA."DEV_daily_sales_tsk003"
	warehouse=COMPUTE_WH
	schedule='USING CRON 0 0 * * * UTC'
	as INSERT INTO DEV_DAILY_SALES_SUMMARY (sales_date, total_sales)
SELECT 
    CURRENT_DATE - 2, 
    SUM(amount)
FROM 
    "FDA".DEV_SALES003
WHERE 
    sale_date = CURRENT_DATE - 2;