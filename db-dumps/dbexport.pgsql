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
    username text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    password text NOT NULL
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
chiropractic	Chiropractic	<p>Chiropractic care focuses on restoring and maintaining the health of your joints, muscles and nerves through the use of an adjustment. A spinal adjustment can restore normal movement, relieve pain and stimulate higher function of your brain and nervous system resulting in a renewed sense of vitality.\r\n\r\n<h3>Will the chiropractor give me a spinal adjustment on the first visit?</h3>\r\n<p>Whether the patient receives an adjustment on the first visit is left to the discretion of the examining chiropractor. It depends on the examination findings and the patient's previous experience with chiropractic. There is always some form of treatment given if you are in severe pain.\r\n\r\n<h3>Is chiropractic care covered by OHIP?</h3>\r\n<p>Chiropractic services are not covered under OHIP. However many extended health plans do cover a portion of chiropractic services.\r\n\r\n<h3>What is the "cracking" noise I hear during an adjustment?</h3>\r\n<p>When a chiropractor adjusts or physically moves a bone, a pressure difference is created within the synovial joint. Gases released cause an audible sound to be heard. The bones themselves are not breaking or cracking!\r\n\r\n<h3>Will I need X-rays?</h3>\r\n<p>Most chiropractors do require X-rays to be taken so that the actual bones can be visualized. X-rays can help confirm a chiropractor's diagnosis and can also rule out possible fractures.\r\n\r\n<h3>Do chiropractors do massage therapy?</h3>\r\n<p>No. Chiropractors may do some soft tissue work on tight muscles but their main focus is on spinal adjustments. Chiropractors do work closely with some registered massage therapists. (RMTs).\r\n\r\n<h3>Does chiropractic care hurt?</h3>\r\n<p>Yes and no. There may be some discomfort because of an injury to the muscle, Inflamed and strained muscles may feel sore after or during a treatment. The overall effect though, is to help you feel more relaxed and pain free!\r\n\r\n<h3>Do I need a prescription or a referral from my medical doctor in order to see a chiropractor?</h3>\r\n<p>No! And since chiropractic is a drugless practice, we do not prescribe either. We do, however, carry health products such as vitamins and mineral supplements. Every Ontario resident is entitled to chiropractic care without a medical prescription.\r\n\r\n<h3>How long will I need chiropractic care?</h3>\r\n<p>The length of time you are under chiropractic care varies among individuals. After the chiropractor completes your physical assessment and reads your X-rays, your diagnosis and Treatment Plan will be recommended to you in your Report of Findings.\r\n\r\n<h3>Will the chiropractor recommend exercises for me?</h3>\r\n<p>Along with your Treatment Plan, your chiropractor will recommend alternatives to care, exercises and changes to your present lifestyle during your Report of Findings.\r\n\r\n<h3>How long do the adjustments take?</h3>\r\n<p>The first visit lasts approximately 45 minutes. This allows time for the history taking and chiropractic examination. Each subsequent visit lasts approximately 10 - 15 minutes.\r\n\r\n<h3>Do neck adjustments cause stroke?</h3>\r\n<p>There are reported cases of stroke associated with visits to medical doctors and chiropractors. Research and scientific evidence does not establish a cause and effect relationship between chiropractic treatment and the occurrence of stroke rather, recent studies indicate that patients may be consulting medical doctors and chiropractors when they are in the early stages of a stroke. In essence, there is a stroke already in progress. However, you are being informed of this reported association because stroke may cause serious neurological impairment or even death. The possibility of such injuries occurring in association with upper cervical adjustment is extremely remote.\r\n\r\n<h3>What is the Activator Technique?</h3>\r\n<p>Activator Methods is a specific chiropractic adjusting technique involving a low-force adjusting instrument. It works on the principle of balancing leg-lengths. By restoring motion to the key subluxated (restricted) joints in the body, Activator adjustment decrease neurological stress, increase joint range-of-motion and decrease pain. Drs. Chan & Lyons are one of eight Activator practitioners in Toronto with the Advanced Proficiency designation.\r\n	2016-07-27 12:26:46.982+00	2016-07-27 12:26:46.982+00
foot-orthotics	Foot Orthotics	<p>Custom-cast orthotics (inserts, shoes and sandals) can be constructed specifically to correct your foot mechanics. Orthotics can relieve arch and heel pain while properly aligning your body from the feet up.\r\n\r\n<h3>How do you make the orthotics?</h3>\r\n<p>The chiropractors at King West Chiropractic will use either a computerized gait scan and/or a foam cast to diagnose foot problems. The orthotics are produced by either The Orthotic Group or ChiroPods. To check the complete catalogue for orthotic shoes/sandals please visit www.theorthoticgroup.com.\r\n\r\n<h3>Why are orthotics so expensive?</h3>\r\n<p>Orthotics are custom made for your feet and any problems you have. The castings are analyzed by a computer technician and made accordingly. The materials used are strong and durable, therefore, your orthotics can last for up to 4 years before they need to be replaced.\r\n\r\n<h3>Will orthotics help my lower back pain?</h3>\r\n<p>Yes, orthotics may help. If your arches have dropped, or the biomechanics of your feet are altered, it can cause a change in how you walk and put pressure on your ankles, knees and hips resulting in lower back pain.\r\n\r\n<h3>How long will a pair last?</h3>\r\n<p>It depends on how often you wear your orthotics They should be worn everyday, however if you have multiple pairs, they can last anywhere from 2-5 years.\r\n\r\n<h3>Why should I wear orthotics?</h3>\r\n<p>People should wear orthotics for various reasons including: flat feet / fallen arches, heel spurs, plantar fascitis, pronation (over rotation of the foot inwards) and supination (walking on the outside of the foot).\r\n\r\n<h3>Will OHIP cover orthotics?</h3>\r\n<p>No. Extended health care benefits may cover the cost of the orthotics. Each insurance company's terms are different.\r\n\r\n<h3>What should I ask my insurance company regarding orthotic coverage?</h3>\r\n<ol> \r\n\t<li>Are you covered for custom foot orthotics?\r\n\t<li>Do you need a referral from a medical doctor or will a chiropractic referral be sufficient?\r\n\t<li>Can a Chiropractor dispense the orthotics?\r\n\t<li>Does your insurance company require a 3D/Laser Scan as a specific casting method or will a Gait Scan suffice?\r\n</ol>	2016-07-28 01:08:14.266+00	2016-07-28 01:08:14.266+00
massage-therapy	Massage Therapy	<p>Massage therapists employ a variety of hands-on techniques to assess and treat the soft tissues and joints of the body. Improved circulation of blood and lymph, decreased pain and inflammation, improved mobility, relaxation and stress reduction are all positive effects of therapeutic massage.</p>\r\n\r\n<h3>What type of massage is offered at your clinic?</h3>\r\n<p>Our massage therapists are trained in Swedish Massage. Using this technique our RMTs can succesfully treat sports injuries, postural strain, repetitive strain injuries as well as providing relaxation massage.</p>\r\n\r\n<h3>Does it hurt?</h3>\r\n<p>Yes and no. There may be some discomfort because of an injury to the muscle, Inflamed and strained muscles may feel sore after or during a treatment. The overall effect though, is to help you feel more relaxed and pain free!</p>\r\n\r\n<h3>Is massage therapy covered by OHIP?</h3>\r\n<p>No. However, if you have extended health care coverage, you may be reimbursed.</p>\r\n\r\n<h3>Are your therapists registered?</h3>\r\n<p>Yes, all of our massage therapists are registered. They have a registration number which is included on the receipt that is submitted to your insurance company.</p>\r\n\r\n<h3>Do I have to be in pain to have a massage?</h3>\r\n<p>No, massage therapy can be used for relaxation and stress relief.</p>\r\n\r\n<h3>Do I have to get undressed?</h3>\r\n<p>Yes, but you do not take off all your clothes. You are covered by a sheet and blanket. You may keep areas that are not being worked on clothed.</p>\r\n\r\n<h3>Do I need a Doctor's prescription?</h3>\r\n<p>Some insurance companies may require a note from your physician and/ or chiropractor explaining why massage has been recommended.</p>\r\n\r\n<h3>How long does a massage last?</h3>\r\n<p>We offer visits ranging from 30 minutes to 90 minute massages. For your first visit at KWC we require you to schedule a 45 minute (or longer) massage.</p>\r\n\r\n<h3>If I am pregnant, can I still have a massage?</h3>\r\n<p>Yes, with some pregnancies, some women suffer from lower back pain, neck pain or sciatica. Massage can help relax the muscles that support the spine.</p>	2016-07-28 00:58:06.702+00	2016-07-28 00:58:06.702+00
treatments-available	Treatments Avilable	<h3>Triton DTS</h3>\r\n<iframe width="100%" height="480" src="https://www.youtube.com/embed/2rA6BwA0vAo" frameborder="0" allowfullscreen></iframe>\r\n<div class="spacer"></div>\r\n<h3>Theralase 3D 660 nm</h3>\r\n<iframe width="100%4" height="480" src="https://www.youtube.com/embed/e6kkOf0hK9c" frameborder="0" allowfullscreen></iframe>	2016-07-28 01:19:14.205+00	2016-07-28 01:19:14.205+00
sample-title	Sample Title	content	2016-08-16 12:10:16.885+00	2016-08-16 12:10:16.885+00
test3	test3	test3	2016-08-16 13:15:29.335+00	2016-08-16 13:15:29.335+00
test4	test4	test4	2016-08-16 13:16:30.827+00	2016-08-16 13:16:30.827+00
sdfsd	sdf	sdfsdf	2016-08-16 13:16:47.516+00	2016-08-16 13:16:47.516+00
sree	ewtee	sdfsfs	2016-08-16 13:22:11.078+00	2016-08-16 13:22:11.078+00
sfdsd	asda	sdfsdf	2016-08-16 13:25:02.522+00	2016-08-16 13:25:02.522+00
sdfd	sfwe	sfdsf	2016-08-16 13:27:53.551+00	2016-08-16 13:27:53.551+00
sdfs	xdf	sdfds	2016-08-16 13:30:32.503+00	2016-08-16 13:30:32.503+00
adas	asd	adas	2016-08-16 13:31:20.103+00	2016-08-16 13:31:20.103+00
dfgdf	dfg	dfg	2016-08-16 13:37:19.881+00	2016-08-16 13:37:19.881+00
sf	sdfds	sdfsdf	2016-08-16 13:39:00.527+00	2016-08-16 13:39:00.527+00
zxcz	zxc	zxcz	2016-08-16 13:39:54.558+00	2016-08-16 13:39:54.558+00
asd	zsd	asdsa	2016-08-16 13:42:18.645+00	2016-08-16 13:42:18.645+00
asdsa	zsdf	asdas	2016-08-16 14:03:21.446+00	2016-08-16 14:03:21.446+00
sfsd	Fsd	sdfsdf	2016-08-17 02:00:54.346+00	2016-08-17 02:00:54.346+00
sdf	zsz	sdfsd	2016-08-17 02:02:21.573+00	2016-08-17 02:02:21.573+00
fhfd	Fghdfh	dfgdf	2016-08-17 02:13:50.815+00	2016-08-17 02:13:50.815+00
asds	zc	asdasd	2016-08-17 02:17:04.963+00	2016-08-17 02:17:04.963+00
asdasd	sda	asdasdasdada	2016-08-17 02:18:39.129+00	2016-08-17 02:18:39.129+00
dgfg	dg	sdfsdf	2016-08-17 02:20:10.474+00	2016-08-17 02:20:10.474+00
abds	sad	bsdfgfdsg	2016-08-17 02:29:05.184+00	2016-08-17 02:29:05.184+00
asdas	saas	asfasfasfsa	2016-08-17 02:30:47.528+00	2016-08-17 02:30:47.528+00
jhljkluii	hjjkl	ghkhkhj	2016-08-17 02:33:29.129+00	2016-08-17 02:33:29.129+00
jljklkjljl	k	jklkjlj	2016-08-17 02:34:31.694+00	2016-08-17 02:34:31.694+00
sfsfsdf	sadf	sfsdfds	2016-08-17 02:36:22.204+00	2016-08-17 02:36:22.204+00
sfsdfds	dsfgsdf	sfsdfsdfdsf	2016-08-17 02:38:04.83+00	2016-08-17 02:38:04.83+00
zxczxczxczx	fgf	zcxzcx	2016-08-17 02:40:17.61+00	2016-08-17 02:40:17.61+00
fghgfhgfhgfhfghgfhgf	fghfghgh	fhfhfghg	2016-08-17 02:40:53.861+00	2016-08-17 02:40:53.861+00
adadEVB	asdasdasd	SDFDFSD	2016-08-17 02:44:45.934+00	2016-08-17 02:44:45.934+00
one	another	sdfsdfsd	2016-08-17 09:42:59.898+00	2016-08-17 09:42:59.898+00
safsdfdsfsdc	asdf	sdf	2016-08-17 11:10:28.468+00	2016-08-17 11:10:28.468+00
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

COPY "Users" (id, username, "createdAt", "updatedAt", password) FROM stdin;
36	test	2016-08-17 11:30:57.225+00	2016-08-17 11:30:57.225+00	$2a$08$sKJIVXgdLsrpZEBG1Sr13u5LnYE1iqQRV39nVVlCFArf9xl1H5vAm
37	test	2016-08-17 11:31:16.882+00	2016-08-17 11:31:16.882+00	$2a$08$7yl6Yn5/ok.Xww7oNRx4A.hJqC7R1PY1E6RKUgHliXSHn25SHgJ4S
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Users_id_seq"', 37, true);


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

