#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 -U $POSTGRES_USER -d $POSTGRES_DB <<-EOSQL
 BEGIN;
    CREATE SEQUENCE article_id_seq INCREMENT BY 1 MINVALUE 1 START 1;
    CREATE TABLE article (id  SERIAL, title VARCHAR(255) NOT NULL, content TEXT NOT NULL, PRIMARY KEY(id));
    INSERT INTO article ( title, "content") VALUES( 'title1', 'content1'),( 'title2', 'content2'),( 'title3', 'content3'),( 'title4', 'content4'),( 'title5', 'content5');
  COMMIT;
 
EOSQL
