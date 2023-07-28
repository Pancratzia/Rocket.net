PGDMP     /                    {            Rocket    15.3    15.3 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    25318    Rocket    DATABASE     �   CREATE DATABASE "Rocket" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Latin America.1252';
    DROP DATABASE "Rocket";
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    5            �            1259    25319    Anuncio    TABLE     �   CREATE TABLE public."Anuncio" (
    id_anuncio integer NOT NULL,
    anuncio character varying(255),
    fecha_inicio date,
    fecha_fin date,
    id_usuario integer
);
    DROP TABLE public."Anuncio";
       public         heap    postgres    false    5            �            1259    25322    Anuncio_id_anuncio_seq    SEQUENCE     �   CREATE SEQUENCE public."Anuncio_id_anuncio_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."Anuncio_id_anuncio_seq";
       public          postgres    false    214    5            �           0    0    Anuncio_id_anuncio_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Anuncio_id_anuncio_seq" OWNED BY public."Anuncio".id_anuncio;
          public          postgres    false    215            �            1259    25323 	   Auditoria    TABLE     �   CREATE TABLE public."Auditoria" (
    id_auditoria integer NOT NULL,
    operacion character varying(100),
    id_usuario integer,
    fecha date,
    hora time without time zone
);
    DROP TABLE public."Auditoria";
       public         heap    postgres    false    5            �            1259    25326    Auditoria_id_auditoria_seq    SEQUENCE     �   CREATE SEQUENCE public."Auditoria_id_auditoria_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."Auditoria_id_auditoria_seq";
       public          postgres    false    5    216            �           0    0    Auditoria_id_auditoria_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Auditoria_id_auditoria_seq" OWNED BY public."Auditoria".id_auditoria;
          public          postgres    false    217            �            1259    25327    Cliente    TABLE     0  CREATE TABLE public."Cliente" (
    id_cliente integer NOT NULL,
    nombre character varying(50),
    ubicacion character varying(100),
    telefono character varying(20),
    correo character varying(255),
    id_plan integer,
    id_usuario integer,
    estado_usuario integer,
    borrado boolean
);
    DROP TABLE public."Cliente";
       public         heap    postgres    false    5            �            1259    25332    Cliente_id_cliente_seq    SEQUENCE     �   CREATE SEQUENCE public."Cliente_id_cliente_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."Cliente_id_cliente_seq";
       public          postgres    false    5    218            �           0    0    Cliente_id_cliente_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Cliente_id_cliente_seq" OWNED BY public."Cliente".id_cliente;
          public          postgres    false    219            �            1259    25333    Departamento    TABLE     �   CREATE TABLE public."Departamento" (
    id_departamento integer NOT NULL,
    nombre_departamento character varying(50),
    borrado boolean
);
 "   DROP TABLE public."Departamento";
       public         heap    postgres    false    5            �            1259    25336     Departamento_id_departamento_seq    SEQUENCE     �   CREATE SEQUENCE public."Departamento_id_departamento_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public."Departamento_id_departamento_seq";
       public          postgres    false    5    220            �           0    0     Departamento_id_departamento_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."Departamento_id_departamento_seq" OWNED BY public."Departamento".id_departamento;
          public          postgres    false    221            �            1259    25337 
   Documentos    TABLE       CREATE TABLE public."Documentos" (
    id_documento integer NOT NULL,
    titulo character varying(50),
    descripcion character varying(255),
    id_usuario integer,
    hora_subida timestamp without time zone,
    fecha_subida date,
    permiso integer,
    borrado boolean
);
     DROP TABLE public."Documentos";
       public         heap    postgres    false    5            �            1259    25342    Documentos_id_documento_seq    SEQUENCE     �   CREATE SEQUENCE public."Documentos_id_documento_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Documentos_id_documento_seq";
       public          postgres    false    222    5            �           0    0    Documentos_id_documento_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."Documentos_id_documento_seq" OWNED BY public."Documentos".id_documento;
          public          postgres    false    223            �            1259    25343    Mensaje    TABLE     �   CREATE TABLE public."Mensaje" (
    id_mensaje integer NOT NULL,
    contenido character varying(255),
    usuario_emisor integer,
    usuario_receptor integer,
    fecha date,
    hora time without time zone
);
    DROP TABLE public."Mensaje";
       public         heap    postgres    false    5            �            1259    25346    Mensaje_id_mensaje_seq    SEQUENCE     �   CREATE SEQUENCE public."Mensaje_id_mensaje_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."Mensaje_id_mensaje_seq";
       public          postgres    false    224    5            �           0    0    Mensaje_id_mensaje_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Mensaje_id_mensaje_seq" OWNED BY public."Mensaje".id_mensaje;
          public          postgres    false    225            �            1259    25347    Planes    TABLE     �   CREATE TABLE public."Planes" (
    id_plan integer NOT NULL,
    nombre_plan character varying(50),
    descripcion character varying(255),
    precio double precision,
    estado_plan integer,
    borrado boolean
);
    DROP TABLE public."Planes";
       public         heap    postgres    false    5            �            1259    25352    Planes_id_Plan_seq    SEQUENCE     �   CREATE SEQUENCE public."Planes_id_Plan_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Planes_id_Plan_seq";
       public          postgres    false    226    5            �           0    0    Planes_id_Plan_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Planes_id_Plan_seq" OWNED BY public."Planes".id_plan;
          public          postgres    false    227            �            1259    25353    Puntos    TABLE     �   CREATE TABLE public."Puntos" (
    id_punto integer NOT NULL,
    id_zona integer,
    latitud character varying(255),
    longitud character varying(255)
);
    DROP TABLE public."Puntos";
       public         heap    postgres    false    5            �            1259    25358    Puntos_id_punto_seq    SEQUENCE     �   CREATE SEQUENCE public."Puntos_id_punto_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Puntos_id_punto_seq";
       public          postgres    false    5    228            �           0    0    Puntos_id_punto_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Puntos_id_punto_seq" OWNED BY public."Puntos".id_punto;
          public          postgres    false    229            �            1259    25359    Sede    TABLE     �   CREATE TABLE public."Sede" (
    id_sede integer NOT NULL,
    nombre_sede character varying(50),
    latitud character varying(255),
    longitud character varying(255),
    ip character varying(255),
    borrado boolean
);
    DROP TABLE public."Sede";
       public         heap    postgres    false    5            �            1259    25364    SedeDepartamento    TABLE     �   CREATE TABLE public."SedeDepartamento" (
    id_sede_departamento integer NOT NULL,
    id_departamento integer,
    id_sede integer
);
 &   DROP TABLE public."SedeDepartamento";
       public         heap    postgres    false    5            �            1259    25367 %   Sede-Departamento_id_Departamento_seq    SEQUENCE     �   CREATE SEQUENCE public."Sede-Departamento_id_Departamento_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public."Sede-Departamento_id_Departamento_seq";
       public          postgres    false    5    231            �           0    0 %   Sede-Departamento_id_Departamento_seq    SEQUENCE OWNED BY     r   ALTER SEQUENCE public."Sede-Departamento_id_Departamento_seq" OWNED BY public."SedeDepartamento".id_departamento;
          public          postgres    false    232            �            1259    25368 "   Sede-Departamento_id_SedeDepar_seq    SEQUENCE     �   CREATE SEQUENCE public."Sede-Departamento_id_SedeDepar_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Sede-Departamento_id_SedeDepar_seq";
       public          postgres    false    231    5            �           0    0 "   Sede-Departamento_id_SedeDepar_seq    SEQUENCE OWNED BY     t   ALTER SEQUENCE public."Sede-Departamento_id_SedeDepar_seq" OWNED BY public."SedeDepartamento".id_sede_departamento;
          public          postgres    false    233            �            1259    25369    Sede-Departamento_id_Sede_seq    SEQUENCE     �   CREATE SEQUENCE public."Sede-Departamento_id_Sede_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Sede-Departamento_id_Sede_seq";
       public          postgres    false    231    5            �           0    0    Sede-Departamento_id_Sede_seq    SEQUENCE OWNED BY     b   ALTER SEQUENCE public."Sede-Departamento_id_Sede_seq" OWNED BY public."SedeDepartamento".id_sede;
          public          postgres    false    234            �            1259    25370    Sede_id_Sede_seq    SEQUENCE     {   CREATE SEQUENCE public."Sede_id_Sede_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Sede_id_Sede_seq";
       public          postgres    false    230    5            �           0    0    Sede_id_Sede_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Sede_id_Sede_seq" OWNED BY public."Sede".id_sede;
          public          postgres    false    235            �            1259    25371    TipoUsuario    TABLE     s   CREATE TABLE public."TipoUsuario" (
    id_tipo_usuario integer NOT NULL,
    descripcion character varying(50)
);
 !   DROP TABLE public."TipoUsuario";
       public         heap    postgres    false    5            �            1259    25374    Tipo_usuario_id_tipousuario_seq    SEQUENCE     �   CREATE SEQUENCE public."Tipo_usuario_id_tipousuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."Tipo_usuario_id_tipousuario_seq";
       public          postgres    false    5    236            �           0    0    Tipo_usuario_id_tipousuario_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public."Tipo_usuario_id_tipousuario_seq" OWNED BY public."TipoUsuario".id_tipo_usuario;
          public          postgres    false    237            �            1259    25375    Usuario    TABLE     �  CREATE TABLE public."Usuario" (
    id_usuario integer NOT NULL,
    nombre_usuario character varying(50),
    id_sededepar integer,
    id_tipousuario integer,
    nombre character varying(50),
    apellido character varying(50),
    pregunta character varying(255),
    clave character varying(255),
    foto_usuario character varying(255),
    extension_telefonica character varying(20),
    borrado boolean
);
    DROP TABLE public."Usuario";
       public         heap    postgres    false    5            �            1259    25380    Usuario_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public."Usuario_id_usuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."Usuario_id_usuario_seq";
       public          postgres    false    238    5            �           0    0    Usuario_id_usuario_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Usuario_id_usuario_seq" OWNED BY public."Usuario".id_usuario;
          public          postgres    false    239            �            1259    25381    Zona    TABLE     |   CREATE TABLE public."Zona" (
    id_zona integer NOT NULL,
    nombre_zona character varying(50),
    id_usuario integer
);
    DROP TABLE public."Zona";
       public         heap    postgres    false    5            �            1259    25384    Zona_id_zona_seq    SEQUENCE     �   CREATE SEQUENCE public."Zona_id_zona_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Zona_id_zona_seq";
       public          postgres    false    5    240            �           0    0    Zona_id_zona_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Zona_id_zona_seq" OWNED BY public."Zona".id_zona;
          public          postgres    false    241            �           2604    25385    Anuncio id_anuncio    DEFAULT     |   ALTER TABLE ONLY public."Anuncio" ALTER COLUMN id_anuncio SET DEFAULT nextval('public."Anuncio_id_anuncio_seq"'::regclass);
 C   ALTER TABLE public."Anuncio" ALTER COLUMN id_anuncio DROP DEFAULT;
       public          postgres    false    215    214            �           2604    25386    Auditoria id_auditoria    DEFAULT     �   ALTER TABLE ONLY public."Auditoria" ALTER COLUMN id_auditoria SET DEFAULT nextval('public."Auditoria_id_auditoria_seq"'::regclass);
 G   ALTER TABLE public."Auditoria" ALTER COLUMN id_auditoria DROP DEFAULT;
       public          postgres    false    217    216            �           2604    25387    Cliente id_cliente    DEFAULT     |   ALTER TABLE ONLY public."Cliente" ALTER COLUMN id_cliente SET DEFAULT nextval('public."Cliente_id_cliente_seq"'::regclass);
 C   ALTER TABLE public."Cliente" ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    219    218            �           2604    25388    Departamento id_departamento    DEFAULT     �   ALTER TABLE ONLY public."Departamento" ALTER COLUMN id_departamento SET DEFAULT nextval('public."Departamento_id_departamento_seq"'::regclass);
 M   ALTER TABLE public."Departamento" ALTER COLUMN id_departamento DROP DEFAULT;
       public          postgres    false    221    220            �           2604    25389    Documentos id_documento    DEFAULT     �   ALTER TABLE ONLY public."Documentos" ALTER COLUMN id_documento SET DEFAULT nextval('public."Documentos_id_documento_seq"'::regclass);
 H   ALTER TABLE public."Documentos" ALTER COLUMN id_documento DROP DEFAULT;
       public          postgres    false    223    222            �           2604    25390    Mensaje id_mensaje    DEFAULT     |   ALTER TABLE ONLY public."Mensaje" ALTER COLUMN id_mensaje SET DEFAULT nextval('public."Mensaje_id_mensaje_seq"'::regclass);
 C   ALTER TABLE public."Mensaje" ALTER COLUMN id_mensaje DROP DEFAULT;
       public          postgres    false    225    224            �           2604    25391    Planes id_plan    DEFAULT     t   ALTER TABLE ONLY public."Planes" ALTER COLUMN id_plan SET DEFAULT nextval('public."Planes_id_Plan_seq"'::regclass);
 ?   ALTER TABLE public."Planes" ALTER COLUMN id_plan DROP DEFAULT;
       public          postgres    false    227    226            �           2604    25392    Puntos id_punto    DEFAULT     v   ALTER TABLE ONLY public."Puntos" ALTER COLUMN id_punto SET DEFAULT nextval('public."Puntos_id_punto_seq"'::regclass);
 @   ALTER TABLE public."Puntos" ALTER COLUMN id_punto DROP DEFAULT;
       public          postgres    false    229    228            �           2604    25393    Sede id_sede    DEFAULT     p   ALTER TABLE ONLY public."Sede" ALTER COLUMN id_sede SET DEFAULT nextval('public."Sede_id_Sede_seq"'::regclass);
 =   ALTER TABLE public."Sede" ALTER COLUMN id_sede DROP DEFAULT;
       public          postgres    false    235    230            �           2604    25394 %   SedeDepartamento id_sede_departamento    DEFAULT     �   ALTER TABLE ONLY public."SedeDepartamento" ALTER COLUMN id_sede_departamento SET DEFAULT nextval('public."Sede-Departamento_id_SedeDepar_seq"'::regclass);
 V   ALTER TABLE public."SedeDepartamento" ALTER COLUMN id_sede_departamento DROP DEFAULT;
       public          postgres    false    233    231            �           2604    25395    TipoUsuario id_tipo_usuario    DEFAULT     �   ALTER TABLE ONLY public."TipoUsuario" ALTER COLUMN id_tipo_usuario SET DEFAULT nextval('public."Tipo_usuario_id_tipousuario_seq"'::regclass);
 L   ALTER TABLE public."TipoUsuario" ALTER COLUMN id_tipo_usuario DROP DEFAULT;
       public          postgres    false    237    236            �           2604    25396    Usuario id_usuario    DEFAULT     |   ALTER TABLE ONLY public."Usuario" ALTER COLUMN id_usuario SET DEFAULT nextval('public."Usuario_id_usuario_seq"'::regclass);
 C   ALTER TABLE public."Usuario" ALTER COLUMN id_usuario DROP DEFAULT;
       public          postgres    false    239    238            �           2604    25397    Zona id_zona    DEFAULT     p   ALTER TABLE ONLY public."Zona" ALTER COLUMN id_zona SET DEFAULT nextval('public."Zona_id_zona_seq"'::regclass);
 =   ALTER TABLE public."Zona" ALTER COLUMN id_zona DROP DEFAULT;
       public          postgres    false    241    240                      0    25319    Anuncio 
   TABLE DATA           ]   COPY public."Anuncio" (id_anuncio, anuncio, fecha_inicio, fecha_fin, id_usuario) FROM stdin;
    public          postgres    false    214   2�       �          0    25323 	   Auditoria 
   TABLE DATA           W   COPY public."Auditoria" (id_auditoria, operacion, id_usuario, fecha, hora) FROM stdin;
    public          postgres    false    216   O�       �          0    25327    Cliente 
   TABLE DATA           �   COPY public."Cliente" (id_cliente, nombre, ubicacion, telefono, correo, id_plan, id_usuario, estado_usuario, borrado) FROM stdin;
    public          postgres    false    218   l�       �          0    25333    Departamento 
   TABLE DATA           W   COPY public."Departamento" (id_departamento, nombre_departamento, borrado) FROM stdin;
    public          postgres    false    220   ��       �          0    25337 
   Documentos 
   TABLE DATA           �   COPY public."Documentos" (id_documento, titulo, descripcion, id_usuario, hora_subida, fecha_subida, permiso, borrado) FROM stdin;
    public          postgres    false    222   ��       �          0    25343    Mensaje 
   TABLE DATA           i   COPY public."Mensaje" (id_mensaje, contenido, usuario_emisor, usuario_receptor, fecha, hora) FROM stdin;
    public          postgres    false    224   è       �          0    25347    Planes 
   TABLE DATA           c   COPY public."Planes" (id_plan, nombre_plan, descripcion, precio, estado_plan, borrado) FROM stdin;
    public          postgres    false    226   �       �          0    25353    Puntos 
   TABLE DATA           H   COPY public."Puntos" (id_punto, id_zona, latitud, longitud) FROM stdin;
    public          postgres    false    228   ��       �          0    25359    Sede 
   TABLE DATA           V   COPY public."Sede" (id_sede, nombre_sede, latitud, longitud, ip, borrado) FROM stdin;
    public          postgres    false    230   �       �          0    25364    SedeDepartamento 
   TABLE DATA           \   COPY public."SedeDepartamento" (id_sede_departamento, id_departamento, id_sede) FROM stdin;
    public          postgres    false    231   7�       �          0    25371    TipoUsuario 
   TABLE DATA           E   COPY public."TipoUsuario" (id_tipo_usuario, descripcion) FROM stdin;
    public          postgres    false    236   T�       �          0    25375    Usuario 
   TABLE DATA           �   COPY public."Usuario" (id_usuario, nombre_usuario, id_sededepar, id_tipousuario, nombre, apellido, pregunta, clave, foto_usuario, extension_telefonica, borrado) FROM stdin;
    public          postgres    false    238   q�       �          0    25381    Zona 
   TABLE DATA           B   COPY public."Zona" (id_zona, nombre_zona, id_usuario) FROM stdin;
    public          postgres    false    240   ��       �           0    0    Anuncio_id_anuncio_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Anuncio_id_anuncio_seq"', 1, false);
          public          postgres    false    215            �           0    0    Auditoria_id_auditoria_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."Auditoria_id_auditoria_seq"', 1, false);
          public          postgres    false    217            �           0    0    Cliente_id_cliente_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Cliente_id_cliente_seq"', 1, false);
          public          postgres    false    219            �           0    0     Departamento_id_departamento_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public."Departamento_id_departamento_seq"', 1, false);
          public          postgres    false    221            �           0    0    Documentos_id_documento_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."Documentos_id_documento_seq"', 1, false);
          public          postgres    false    223            �           0    0    Mensaje_id_mensaje_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Mensaje_id_mensaje_seq"', 1, false);
          public          postgres    false    225            �           0    0    Planes_id_Plan_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Planes_id_Plan_seq"', 1, false);
          public          postgres    false    227            �           0    0    Puntos_id_punto_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Puntos_id_punto_seq"', 1, false);
          public          postgres    false    229            �           0    0 %   Sede-Departamento_id_Departamento_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public."Sede-Departamento_id_Departamento_seq"', 1, false);
          public          postgres    false    232            �           0    0 "   Sede-Departamento_id_SedeDepar_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."Sede-Departamento_id_SedeDepar_seq"', 1, false);
          public          postgres    false    233            �           0    0    Sede-Departamento_id_Sede_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."Sede-Departamento_id_Sede_seq"', 1, false);
          public          postgres    false    234            �           0    0    Sede_id_Sede_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Sede_id_Sede_seq"', 1, false);
          public          postgres    false    235            �           0    0    Tipo_usuario_id_tipousuario_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Tipo_usuario_id_tipousuario_seq"', 1, false);
          public          postgres    false    237            �           0    0    Usuario_id_usuario_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Usuario_id_usuario_seq"', 1, false);
          public          postgres    false    239            �           0    0    Zona_id_zona_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Zona_id_zona_seq"', 1, false);
          public          postgres    false    241            �           2606    25399    Sede id_Sede 
   CONSTRAINT     S   ALTER TABLE ONLY public."Sede"
    ADD CONSTRAINT "id_Sede" PRIMARY KEY (id_sede);
 :   ALTER TABLE ONLY public."Sede" DROP CONSTRAINT "id_Sede";
       public            postgres    false    230            �           2606    25401    Planes id_plan 
   CONSTRAINT     S   ALTER TABLE ONLY public."Planes"
    ADD CONSTRAINT id_plan PRIMARY KEY (id_plan);
 :   ALTER TABLE ONLY public."Planes" DROP CONSTRAINT id_plan;
       public            postgres    false    226            �           2606    25403    Anuncio pk_anuncio 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Anuncio"
    ADD CONSTRAINT pk_anuncio PRIMARY KEY (id_anuncio);
 >   ALTER TABLE ONLY public."Anuncio" DROP CONSTRAINT pk_anuncio;
       public            postgres    false    214            �           2606    25405    Auditoria pk_auditoria 
   CONSTRAINT     `   ALTER TABLE ONLY public."Auditoria"
    ADD CONSTRAINT pk_auditoria PRIMARY KEY (id_auditoria);
 B   ALTER TABLE ONLY public."Auditoria" DROP CONSTRAINT pk_auditoria;
       public            postgres    false    216            �           2606    25407    Cliente pk_cliente 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Cliente"
    ADD CONSTRAINT pk_cliente PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public."Cliente" DROP CONSTRAINT pk_cliente;
       public            postgres    false    218            �           2606    25409    Departamento pk_departamento 
   CONSTRAINT     i   ALTER TABLE ONLY public."Departamento"
    ADD CONSTRAINT pk_departamento PRIMARY KEY (id_departamento);
 H   ALTER TABLE ONLY public."Departamento" DROP CONSTRAINT pk_departamento;
       public            postgres    false    220            �           2606    25411    Documentos pk_documentos 
   CONSTRAINT     b   ALTER TABLE ONLY public."Documentos"
    ADD CONSTRAINT pk_documentos PRIMARY KEY (id_documento);
 D   ALTER TABLE ONLY public."Documentos" DROP CONSTRAINT pk_documentos;
       public            postgres    false    222            �           2606    25413    Mensaje pk_mensaje 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Mensaje"
    ADD CONSTRAINT pk_mensaje PRIMARY KEY (id_mensaje);
 >   ALTER TABLE ONLY public."Mensaje" DROP CONSTRAINT pk_mensaje;
       public            postgres    false    224            �           2606    25415    Puntos pk_puntos 
   CONSTRAINT     V   ALTER TABLE ONLY public."Puntos"
    ADD CONSTRAINT pk_puntos PRIMARY KEY (id_punto);
 <   ALTER TABLE ONLY public."Puntos" DROP CONSTRAINT pk_puntos;
       public            postgres    false    228            �           2606    25417    SedeDepartamento pk_sededepar 
   CONSTRAINT     o   ALTER TABLE ONLY public."SedeDepartamento"
    ADD CONSTRAINT pk_sededepar PRIMARY KEY (id_sede_departamento);
 I   ALTER TABLE ONLY public."SedeDepartamento" DROP CONSTRAINT pk_sededepar;
       public            postgres    false    231            �           2606    25419    TipoUsuario pk_tipousuario 
   CONSTRAINT     g   ALTER TABLE ONLY public."TipoUsuario"
    ADD CONSTRAINT pk_tipousuario PRIMARY KEY (id_tipo_usuario);
 F   ALTER TABLE ONLY public."TipoUsuario" DROP CONSTRAINT pk_tipousuario;
       public            postgres    false    236            �           2606    25421    Usuario pk_usuario 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT pk_usuario PRIMARY KEY (id_usuario);
 >   ALTER TABLE ONLY public."Usuario" DROP CONSTRAINT pk_usuario;
       public            postgres    false    238            �           2606    25423    Zona pk_zona 
   CONSTRAINT     Q   ALTER TABLE ONLY public."Zona"
    ADD CONSTRAINT pk_zona PRIMARY KEY (id_zona);
 8   ALTER TABLE ONLY public."Zona" DROP CONSTRAINT pk_zona;
       public            postgres    false    240            �           1259    25424    fki_d    INDEX     D   CREATE INDEX fki_d ON public."Documentos" USING btree (id_usuario);
    DROP INDEX public.fki_d;
       public            postgres    false    222            �           1259    25425    fki_fk_anunciousuario    INDEX     Q   CREATE INDEX fki_fk_anunciousuario ON public."Anuncio" USING btree (id_usuario);
 )   DROP INDEX public.fki_fk_anunciousuario;
       public            postgres    false    214            �           1259    25426    fki_fk_auditoriausuario    INDEX     U   CREATE INDEX fki_fk_auditoriausuario ON public."Auditoria" USING btree (id_usuario);
 +   DROP INDEX public.fki_fk_auditoriausuario;
       public            postgres    false    216            �           1259    25427    fki_fk_clienteplan    INDEX     K   CREATE INDEX fki_fk_clienteplan ON public."Cliente" USING btree (id_plan);
 &   DROP INDEX public.fki_fk_clienteplan;
       public            postgres    false    218            �           1259    25428    fki_fk_clienteusuario    INDEX     Q   CREATE INDEX fki_fk_clienteusuario ON public."Cliente" USING btree (id_usuario);
 )   DROP INDEX public.fki_fk_clienteusuario;
       public            postgres    false    218            �           1259    25429    fki_fk_departamento    INDEX     ]   CREATE INDEX fki_fk_departamento ON public."SedeDepartamento" USING btree (id_departamento);
 '   DROP INDEX public.fki_fk_departamento;
       public            postgres    false    231            �           1259    25430    fki_fk_documentousuario    INDEX     V   CREATE INDEX fki_fk_documentousuario ON public."Documentos" USING btree (id_usuario);
 +   DROP INDEX public.fki_fk_documentousuario;
       public            postgres    false    222            �           1259    25431    fki_fk_iddepartamento    INDEX     _   CREATE INDEX fki_fk_iddepartamento ON public."SedeDepartamento" USING btree (id_departamento);
 )   DROP INDEX public.fki_fk_iddepartamento;
       public            postgres    false    231            �           1259    25432    fki_fk_idsede    INDEX     O   CREATE INDEX fki_fk_idsede ON public."SedeDepartamento" USING btree (id_sede);
 !   DROP INDEX public.fki_fk_idsede;
       public            postgres    false    231            �           1259    25433    fki_fk_puntoszona    INDEX     I   CREATE INDEX fki_fk_puntoszona ON public."Puntos" USING btree (id_zona);
 %   DROP INDEX public.fki_fk_puntoszona;
       public            postgres    false    228            �           1259    25434    fki_fk_sede    INDEX     M   CREATE INDEX fki_fk_sede ON public."SedeDepartamento" USING btree (id_sede);
    DROP INDEX public.fki_fk_sede;
       public            postgres    false    231            �           1259    25435    fki_fk_sededepar    INDEX     N   CREATE INDEX fki_fk_sededepar ON public."Usuario" USING btree (id_sededepar);
 $   DROP INDEX public.fki_fk_sededepar;
       public            postgres    false    238            �           1259    25436    fki_fk_tipousuario    INDEX     R   CREATE INDEX fki_fk_tipousuario ON public."Usuario" USING btree (id_tipousuario);
 &   DROP INDEX public.fki_fk_tipousuario;
       public            postgres    false    238            �           1259    25437    fki_fk_usuarioanuncio    INDEX     Q   CREATE INDEX fki_fk_usuarioanuncio ON public."Anuncio" USING btree (id_usuario);
 )   DROP INDEX public.fki_fk_usuarioanuncio;
       public            postgres    false    214            �           1259    25438    fki_fk_usuarioauditoria    INDEX     U   CREATE INDEX fki_fk_usuarioauditoria ON public."Auditoria" USING btree (id_usuario);
 +   DROP INDEX public.fki_fk_usuarioauditoria;
       public            postgres    false    216            �           1259    25439    fki_fk_usuarioemisor    INDEX     T   CREATE INDEX fki_fk_usuarioemisor ON public."Mensaje" USING btree (usuario_emisor);
 (   DROP INDEX public.fki_fk_usuarioemisor;
       public            postgres    false    224            �           1259    25440    fki_fk_usuarioreceptor    INDEX     X   CREATE INDEX fki_fk_usuarioreceptor ON public."Mensaje" USING btree (usuario_receptor);
 *   DROP INDEX public.fki_fk_usuarioreceptor;
       public            postgres    false    224            �           1259    25441    fki_fk_usuariosededepar    INDEX     U   CREATE INDEX fki_fk_usuariosededepar ON public."Usuario" USING btree (id_sededepar);
 +   DROP INDEX public.fki_fk_usuariosededepar;
       public            postgres    false    238            �           1259    25442    fki_fk_usuariotipousuario    INDEX     Y   CREATE INDEX fki_fk_usuariotipousuario ON public."Usuario" USING btree (id_tipousuario);
 -   DROP INDEX public.fki_fk_usuariotipousuario;
       public            postgres    false    238            �           1259    25443    fki_fk_zonausuario    INDEX     K   CREATE INDEX fki_fk_zonausuario ON public."Zona" USING btree (id_usuario);
 &   DROP INDEX public.fki_fk_zonausuario;
       public            postgres    false    240            �           1259    25444    fki_g    INDEX     >   CREATE INDEX fki_g ON public."Zona" USING btree (id_usuario);
    DROP INDEX public.fki_g;
       public            postgres    false    240            �           1259    25445    fki_id_Departamento    INDEX     _   CREATE INDEX "fki_id_Departamento" ON public."SedeDepartamento" USING btree (id_departamento);
 )   DROP INDEX public."fki_id_Departamento";
       public            postgres    false    231            �           1259    25446    fki_id_Sede    INDEX     O   CREATE INDEX "fki_id_Sede" ON public."SedeDepartamento" USING btree (id_sede);
 !   DROP INDEX public."fki_id_Sede";
       public            postgres    false    231            �           1259    25447    fki_k    INDEX     =   CREATE INDEX fki_k ON public."Puntos" USING btree (id_zona);
    DROP INDEX public.fki_k;
       public            postgres    false    228            �           1259    25448    fki_o    INDEX     A   CREATE INDEX fki_o ON public."Anuncio" USING btree (id_usuario);
    DROP INDEX public.fki_o;
       public            postgres    false    214            �           1259    25449    fki_u    INDEX     A   CREATE INDEX fki_u ON public."Cliente" USING btree (id_usuario);
    DROP INDEX public.fki_u;
       public            postgres    false    218            �           2606    25450    Auditoria fk_auditoriausuario    FK CONSTRAINT     �   ALTER TABLE ONLY public."Auditoria"
    ADD CONSTRAINT fk_auditoriausuario FOREIGN KEY (id_usuario) REFERENCES public."Usuario"(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 I   ALTER TABLE ONLY public."Auditoria" DROP CONSTRAINT fk_auditoriausuario;
       public          postgres    false    216    238    3295            �           2606    25455    Cliente fk_clienteplan    FK CONSTRAINT     �   ALTER TABLE ONLY public."Cliente"
    ADD CONSTRAINT fk_clienteplan FOREIGN KEY (id_plan) REFERENCES public."Planes"(id_plan) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 B   ALTER TABLE ONLY public."Cliente" DROP CONSTRAINT fk_clienteplan;
       public          postgres    false    218    3273    226            �           2606    25460    Cliente fk_clienteusuario    FK CONSTRAINT     �   ALTER TABLE ONLY public."Cliente"
    ADD CONSTRAINT fk_clienteusuario FOREIGN KEY (id_usuario) REFERENCES public."Usuario"(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 E   ALTER TABLE ONLY public."Cliente" DROP CONSTRAINT fk_clienteusuario;
       public          postgres    false    218    238    3295            �           2606    25465     SedeDepartamento fk_departamento    FK CONSTRAINT     �   ALTER TABLE ONLY public."SedeDepartamento"
    ADD CONSTRAINT fk_departamento FOREIGN KEY (id_departamento) REFERENCES public."Departamento"(id_departamento) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 L   ALTER TABLE ONLY public."SedeDepartamento" DROP CONSTRAINT fk_departamento;
       public          postgres    false    231    220    3263            �           2606    25470    Documentos fk_documentousuario    FK CONSTRAINT     �   ALTER TABLE ONLY public."Documentos"
    ADD CONSTRAINT fk_documentousuario FOREIGN KEY (id_usuario) REFERENCES public."Usuario"(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 J   ALTER TABLE ONLY public."Documentos" DROP CONSTRAINT fk_documentousuario;
       public          postgres    false    238    3295    222            �           2606    25475    Puntos fk_puntoszona    FK CONSTRAINT     �   ALTER TABLE ONLY public."Puntos"
    ADD CONSTRAINT fk_puntoszona FOREIGN KEY (id_zona) REFERENCES public."Zona"(id_zona) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 @   ALTER TABLE ONLY public."Puntos" DROP CONSTRAINT fk_puntoszona;
       public          postgres    false    228    3299    240            �           2606    25480    SedeDepartamento fk_sede    FK CONSTRAINT     �   ALTER TABLE ONLY public."SedeDepartamento"
    ADD CONSTRAINT fk_sede FOREIGN KEY (id_sede) REFERENCES public."Sede"(id_sede) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 D   ALTER TABLE ONLY public."SedeDepartamento" DROP CONSTRAINT fk_sede;
       public          postgres    false    230    231    3279            �           2606    25485    Mensaje fk_usuarioemisor    FK CONSTRAINT     �   ALTER TABLE ONLY public."Mensaje"
    ADD CONSTRAINT fk_usuarioemisor FOREIGN KEY (usuario_emisor) REFERENCES public."Usuario"(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 D   ALTER TABLE ONLY public."Mensaje" DROP CONSTRAINT fk_usuarioemisor;
       public          postgres    false    238    3295    224            �           2606    25490    Mensaje fk_usuarioreceptor    FK CONSTRAINT     �   ALTER TABLE ONLY public."Mensaje"
    ADD CONSTRAINT fk_usuarioreceptor FOREIGN KEY (usuario_receptor) REFERENCES public."Usuario"(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 F   ALTER TABLE ONLY public."Mensaje" DROP CONSTRAINT fk_usuarioreceptor;
       public          postgres    false    224    3295    238            �           2606    25495    Usuario fk_usuariosededepar    FK CONSTRAINT     �   ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT fk_usuariosededepar FOREIGN KEY (id_sededepar) REFERENCES public."SedeDepartamento"(id_sede_departamento) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 G   ALTER TABLE ONLY public."Usuario" DROP CONSTRAINT fk_usuariosededepar;
       public          postgres    false    231    238    3287            �           2606    25500    Usuario fk_usuariotipousuario    FK CONSTRAINT     �   ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT fk_usuariotipousuario FOREIGN KEY (id_tipousuario) REFERENCES public."TipoUsuario"(id_tipo_usuario) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 I   ALTER TABLE ONLY public."Usuario" DROP CONSTRAINT fk_usuariotipousuario;
       public          postgres    false    238    3289    236            �           2606    25505    Zona fk_zonausuario    FK CONSTRAINT     �   ALTER TABLE ONLY public."Zona"
    ADD CONSTRAINT fk_zonausuario FOREIGN KEY (id_usuario) REFERENCES public."Usuario"(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 ?   ALTER TABLE ONLY public."Zona" DROP CONSTRAINT fk_zonausuario;
       public          postgres    false    238    240    3295            �           2606    25510    Anuncio id_anunciousuario    FK CONSTRAINT     �   ALTER TABLE ONLY public."Anuncio"
    ADD CONSTRAINT id_anunciousuario FOREIGN KEY (id_usuario) REFERENCES public."Usuario"(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;
 E   ALTER TABLE ONLY public."Anuncio" DROP CONSTRAINT id_anunciousuario;
       public          postgres    false    214    3295    238                  x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     