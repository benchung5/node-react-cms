--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Articles; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE "Articles" (
    slug character varying(255) NOT NULL,
    title character varying(255),
    body text DEFAULT 'Coming soon...'::text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Articles" OWNER TO postgres;

--
-- Name: Tasks; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE "Tasks" (
    id integer NOT NULL,
    title character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer NOT NULL
);


ALTER TABLE "Tasks" OWNER TO postgres;

--
-- Name: Tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Tasks_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Tasks_id_seq" OWNER TO postgres;

--
-- Name: Tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Tasks_id_seq" OWNED BY "Tasks".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE "Users" (
    id integer NOT NULL,
    username text,
    password text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Tasks" ALTER COLUMN id SET DEFAULT nextval('"Tasks_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- Data for Name: Articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "Articles" (slug, title, body, "createdAt", "updatedAt") FROM stdin;
demo-title	demo title	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nascetur ridiculus mus. Blandit augue, at blandit dui.	2016-08-18 02:28:46.354+00	2016-08-18 02:28:46.354+00
\.


--
-- Data for Name: Tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "Tasks" (id, title, "createdAt", "updatedAt", "UserId") FROM stdin;
\.


--
-- Name: Tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Tasks_id_seq"', 1, false);


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "Users" (id, username, password, "createdAt", "updatedAt") FROM stdin;
8	John	$2a$08$iPvA16pdF3OvRy8IeBu3C.KKT5tlbjg2QHt9u9d/t6ifo.9Uag2ha	2016-08-18 02:28:46.396+00	2016-08-18 02:28:46.396+00
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Users_id_seq"', 17, true);


--
-- Name: Articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Articles"
    ADD CONSTRAINT "Articles_pkey" PRIMARY KEY (slug);


--
-- Name: Articles_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Articles"
    ADD CONSTRAINT "Articles_title_key" UNIQUE (title);


--
-- Name: Tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Tasks"
    ADD CONSTRAINT "Tasks_pkey" PRIMARY KEY (id);


--
-- Name: Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: Tasks_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "Tasks"
    ADD CONSTRAINT "Tasks_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

