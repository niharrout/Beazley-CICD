CREATE OR REPLACE PROCEDURE FDA.DEV_INSERTINTOSCENARIO_TS21003("P_HEXKEYDEPARTMENT" VARCHAR(16777216), "P_DEPARTMENTNUMBER" VARCHAR(16777216), "P_DEPARTMENTTEXT" VARCHAR(16777216))
RETURNS VARCHAR(16777216)
LANGUAGE SQL
EXECUTE AS OWNER
AS '
BEGIN
    -- Insert the new row into the table
    INSERT INTO FDA."DEV_Scenario_TS21003" ("HEXKeyDepartment", "DepartmentNumber", "DepartmentText")
    VALUES (p_HEXKeyDepartment, p_DepartmentNumber, p_DepartmentText);
    
    -- Return a success message
    RETURN ''Row inserted........ successfully'';
END;
';