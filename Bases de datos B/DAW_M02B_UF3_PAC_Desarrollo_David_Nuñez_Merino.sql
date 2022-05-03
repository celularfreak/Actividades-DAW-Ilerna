ALTER SESSION SET "_ORACLE_SCRIPT" = true;
SET SERVEROUTPUT ON; 
alter SESSION set NLS_DATE_FORMAT = 'DD-MM-YYYY HH24:MI:SS'; -- modificamos el formato de salida para el punto 6.4
set verify off -- para solo mostrar el resultado en el punto 6.4
---------------------------------------------------------------
-- 1)   GESTIÓN DE USUARIOS Y TABLAS --------------------------
---------------------------------------------------------------

-- 1. Usuario "GESTOR"
-- creamos usuarios, definimos privilegios y modificamos tablas
CREATE USER GESTOR IDENTIFIED BY 1234;
GRANT CREATE SESSION TO GESTOR;
GRANT ALTER, INSERT, DELETE ON ALUMNOS_PAC TO GESTOR;
GRANT ALTER, INSERT, DELETE ON ASIGNATURAS_PAC TO GESTOR;

ALTER TABLE ILERNA_PAC.ALUMNOS_PAC ADD CIUDAD VARCHAR(30);
ALTER TABLE ILERNA_PAC.ASIGNATURAS_PAC MODIFY nombre_profesor VARCHAR(50);
ALTER TABLE ILERNA_PAC.ASIGNATURAS_PAC DROP column creditos;
ALTER TABLE ILERNA_PAC.ASIGNATURAS_PAC ADD CICLO VARCHAR(3);

-- 2. Usuario "DIRECTOR"

CREATE ROLE ROL_DIRECTOR;
CREATE USER DIRECTOR IDENTIFIED BY 1234;
GRANT CREATE SESION TO DIRECTOR;

GRANT SELECT,INSERT,UPDATE,DELETE ON ALUMNOS_PAC TO ROL_DIRECTOR;
GRANT SELECT,INSERT,UPDATE,DELETE ON ASIGNATURAS_PAC TO ROL_DIRECTOR;
GRANT ALTER ON ALUMNOS_PAC TO ROL_DIRECTOR;
GRANT ALTER ON ASIGNATURAS_PAC TO ROL_DIRECTOR;
GRANT ROL_DIRECTOR TO DIRECTOR;

INSERT INTO ILERNA_PAC.ALUMNOS_PAC VALUES ('DANUME', 'DAVID', 'NU�EZ MERINO', '42', 'BARCELONA');
INSERT INTO ILERNA_PAC.ASIGNATURAS_PAC VALUES ('DAX_M02B', 'MP2 Bases de datos B', 'Guillem Mauri', 'DAX');
UPDATE ILERNA_PAC.ASIGNATURAS_PAC SET CICLO='DAM';
/
---------------------------------------------------------------
-- 2)	BLOQUES ANONIMOS -------------------------------------- 
---------------------------------------------------------------

--  PUNTOS ACTUALES

set SERVEROUTPUT on size 1000000;

DECLARE -- declaramos variable para acumular puntos y variable para contador del bucle
    puntos_actuales NUMBER(10,2):= 1000; 
    contador NUMBER := 0;
    
BEGIN
    WHILE contador<=3 LOOP --  recorremos las condiciones 3 veces en bucle para imprimir los resultados
        IF puntos_actuales BETWEEN 1 AND 1000 THEN
        DBMS_OUTPUT.PUT_LINE('Puntos actuales: ' ||puntos_actuales);
        DBMS_OUTPUT.PUT_LINE('Ranking: Bronce ');
        puntos_actuales := puntos_actuales + 300;
        DBMS_OUTPUT.PUT_LINE('Incremento de 300: '|| puntos_actuales);
        DBMS_OUTPUT.PUT_LINE(' ');
        ELSIF puntos_actuales BETWEEN 1001 AND 1400 THEN
        DBMS_OUTPUT.PUT_LINE('Puntos actuales: ' ||puntos_actuales);
        DBMS_OUTPUT.PUT_LINE('Ranking: Plata ');
        puntos_actuales := puntos_actuales + 300;
        DBMS_OUTPUT.PUT_LINE('Incremento de 300: '|| puntos_actuales);
        DBMS_OUTPUT.PUT_LINE(' ');
        ELSIF puntos_actuales BETWEEN 1401 AND 1800 THEN
        DBMS_OUTPUT.PUT_LINE('Puntos actuales: ' ||puntos_actuales);
        DBMS_OUTPUT.PUT_LINE('Ranking: Oro ');
        puntos_actuales := puntos_actuales + 300;
        DBMS_OUTPUT.PUT_LINE('Incremento de 300: '|| puntos_actuales);
        DBMS_OUTPUT.PUT_LINE(' ');
        ELSIF puntos_actuales BETWEEN 1801 AND 2200 THEN
        DBMS_OUTPUT.PUT_LINE('Puntos actuales: ' ||puntos_actuales);
        DBMS_OUTPUT.PUT_LINE('Ranking: Platino ');
        puntos_actuales := puntos_actuales + 300;
        DBMS_OUTPUT.PUT_LINE('Incremento de 300: '|| puntos_actuales);
        END IF;
        contador := contador + 1;
        END LOOP;
        END;
/
---------------------------------------------------------------
-- 3)	PROCEDIMIENTOS Y FUNCIONES SIMPLES -------------------- 
---------------------------------------------------------------

--  NUMERO MAYOR

CREATE OR REPLACE FUNCTION NUMERO_MAYOR -- creamos funicion y definimos variables
(primerNumero number, segundoNumero number, tercerNumero number)
RETURN number
IS
mayor number; -- la variable resultado

BEGIN

IF primerNumero = segundoNumero -- comprobamos si hay numeros repetidos
    THEN
        IF segundoNumero = tercerNumero
            THEN
                RAISE_APPLICATION_ERROR(-2000,'No se pueden repetir n�meros en la secuencia');
        END IF;
END IF;

IF primerNumero >= segundoNumero -- comparamos 2 numeros y guadamos el mayor
    THEN
        mayor := primerNumero;
    ELSE
        mayor := segundoNumero;
END IF;

IF mayor >= tercerNumero -- comparamos el mayor con el numero que falta
    THEN
        mayor := mayor;
    ELSE
        mayor := tercerNumero;
END IF;

RETURN mayor; -- devolvemos resultado

END;
/
---------------------------------------------------------------
-- 4)	PROCEDIMIENTOS Y FUNCIONES COMPLEJAS ------------------ 
---------------------------------------------------------------

--  NUMERO DE JUGADORES POR RANKING

CREATE OR REPLACE FUNCTION JUGADORES_POR_RANKING --creamos funcion y definimos variable
(nombre_ranking VARCHAR2)
RETURN number
IS
total_jugadores number; -- variable resultado

BEGIN -- contamos las coincidencias 
SELECT COUNT(*) INTO total_jugadores FROM JUGADORES_PAC WHERE ranking = nombre_ranking;
RETURN total_jugadores; -- devolvemos el numero de coincidencias
END;
/
---------------------------------------------------------------
-- 5)	GESTIÓN DE TRIGGERS ----------------------------------- 
---------------------------------------------------------------

--  CAMBIO DE RANKING DEL JUGADOR

CREATE OR REPLACE TRIGGER CAMBIO_RANKING_JUGADOR -- creamos el trigger
BEFORE UPDATE OF PUNTOS ON JUGADORES_PAC -- se ejecutara despues de actualizar la tabla
FOR EACH ROW WHEN (new.puntos != old.puntos) -- cada vez que varien los puntos

BEGIN -- con condiciones cambiamos el valor de la tabla
    IF :new.puntos BETWEEN 0 AND 1000 THEN
        :new.ranking := 'Bronce';
    ELSIF :new.puntos BETWEEN 1001 AND 1400 THEN
        :new.ranking := 'Plata';
    ELSIF :new.puntos BETWEEN 1401 AND 1800 THEN
        :new.ranking := 'Oro';
    ELSIF :new.puntos BETWEEN 1801 AND 2200 THEN
        :new.ranking := 'Platino';
    ELSIF :new.puntos BETWEEN 2201 AND 9999 THEN
        :new.ranking := 'Diamante';
    END IF;
END; 
/
---------------------------------------------------------------
-- 6)   BLOQUES ANÓNIMOS PARA PRUEBAS DE CÓDIGO --------------- 
---------------------------------------------------------------

-- 1.	COMPROBACIÓN REGISTROS DE TABLAS
/
EXECUTE dbms_output.put_line('-- 1.	COMPROBACIÓN REGISTROS DE TABLAS');
-- mostramos el contenido de las tablas
SELECT * FROM ILERNA_PAC.ALUMNOS_PAC;
SELECT * FROM ILERNA_PAC.ASIGNATURAS_PAC;

-- 2.	COMPROBACIÓN DE LA FUNCION “NUMERO_MAYOR�?
/
EXECUTE dbms_output.put_line('-- 2.	COMPROBACIÓN DE LA FUNCION “NUMERO_MAYOR�?');

DECLARE -- declaramos variables
primerNumero NUMBER(2);
segundoNumero NUMBER(2);
tercerNumero NUMBER(2);
mayor NUMBER(2);

BEGIN --les damos valor
primerNumero := 23;
segundoNumero := 37;
tercerNumero := 32;

mayor := NUMERO_MAYOR (primerNumero, segundoNumero, tercerNumero); -- ejecutamos la funcion y mostramos el resultado por pantalla
DBMS_OUTPUT.PUT_LINE('El mayor entre ('||primerNumero||','||segundoNumero||','||tercerNumero||') es: '||mayor||'');
END;
/

-- 3.	COMPROBACIÓN DE LA FUNCION “JUGADORES_POR_RANKING�?
/
EXECUTE dbms_output.put_line('-- 3.	COMPROBACIÓN DE LA FUNCION “JUGADORES_POR_RANKING�?');

DECLARE --declaramos variables
nombre_ranking VARCHAR(20);
total_jugadores NUMBER(2);

BEGIN
nombre_ranking := 'Plata'; --definimos el parametro a buscar y sacamos el resultado por pantalla
total_jugadores := JUGADORES_POR_RANKING (nombre_ranking);
DBMS_OUTPUT.PUT_LINE('En el ranking '||nombre_ranking||' tenemos a '||total_jugadores||' jugadores.');
END;
/

-- 4.	COMPROBACIÓN DE LOS TRIGGERS
/
EXECUTE dbms_output.put_line('-- 4.	COMPROBACIÓN DE LOS TRIGGERS');

DECLARE --declaramos las variables
id_jug NUMBER(2);
nueva_puntuacion NUMBER(20);
antiguo_ranking VARCHAR(20);    --necesitamos almacenar el antiguo ranking
nuevo_ranking VARCHAR(20);      -- el nuevo ranking
nombre2 VARCHAR(20);           -- y el nombre de usuario

BEGIN
id_jug := &id_jug; --entrada de valores a modificar por pantalla
nueva_puntuacion := &nueva_puntuacion;

SELECT NOMBRE INTO nombre2 -- guardamos el nombre del jugador que modificamos
FROM JUGADORES_PAC
WHERE ID_JUGADOR = id_jug;

SELECT RANKING INTO antiguo_ranking -- guardamos antiguo ranking
FROM JUGADORES_PAC
WHERE ID_JUGADOR = id_jug;

UPDATE JUGADORES_PAC -- actualizamos con la nueva puntacion
SET PUNTOS = NUEVA_PUNTUACION
WHERE ID_JUGADOR = id_jug;

SELECT RANKING INTO nuevo_ranking   -- cogemos el nuevo ranking despues de la 
FROM JUGADORES_PAC                  -- ejecucion del trigger
WHERE ID_JUGADOR = id_jug;
-- mostramos resultado por pantalla
DBMS_OUTPUT.PUT_LINE('El ranking del jugador '||nombre2||' se ha modificado el dia '||sysdate||' , antes era '||antiguo_ranking||' y ahora es '||nuevo_ranking||'');
END;
/