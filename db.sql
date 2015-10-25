CREATE TABLE measurements
(
  id bigserial NOT NULL,
  measurementid integer,
  val character varying(5000),
  ts timestamp with time zone NOT NULL DEFAULT now(),
  inserted timestamp with time zone NOT NULL DEFAULT now(),
  name character varying(50),
  "position" character varying(50),
  CONSTRAINT pk_measurements PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
