PGDMP  +                    }            teste    17.2    17.2 %               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16388    teste    DATABASE     |   CREATE DATABASE teste WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE teste;
                     postgres    false            �            1259    16400 
   manutencao    TABLE     �   CREATE TABLE public.manutencao (
    id integer NOT NULL,
    maquina character varying(100) NOT NULL,
    descricao text NOT NULL,
    status character varying(20) DEFAULT 'pendente'::character varying,
    tecnico_id integer,
    operador_id integer
);
    DROP TABLE public.manutencao;
       public         heap r       postgres    false            �            1259    16399    manutencao_id_seq    SEQUENCE     �   CREATE SEQUENCE public.manutencao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.manutencao_id_seq;
       public               postgres    false    220                       0    0    manutencao_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.manutencao_id_seq OWNED BY public.manutencao.id;
          public               postgres    false    219            �            1259    16421    pedidos_aprovacao    TABLE     �   CREATE TABLE public.pedidos_aprovacao (
    id integer NOT NULL,
    usuario_id integer,
    data_pedido timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(50) DEFAULT 'pendente'::character varying,
    descricao text
);
 %   DROP TABLE public.pedidos_aprovacao;
       public         heap r       postgres    false            �            1259    16420    pedidos_aprovacao_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pedidos_aprovacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.pedidos_aprovacao_id_seq;
       public               postgres    false    222                       0    0    pedidos_aprovacao_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.pedidos_aprovacao_id_seq OWNED BY public.pedidos_aprovacao.id;
          public               postgres    false    221            �            1259    16452    solicitacoes_ferramentas    TABLE     )  CREATE TABLE public.solicitacoes_ferramentas (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    ferramenta character varying(255) NOT NULL,
    status character varying(20) DEFAULT 'pendente'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 ,   DROP TABLE public.solicitacoes_ferramentas;
       public         heap r       postgres    false            �            1259    16451    solicitacoes_ferramentas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.solicitacoes_ferramentas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.solicitacoes_ferramentas_id_seq;
       public               postgres    false    224                       0    0    solicitacoes_ferramentas_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.solicitacoes_ferramentas_id_seq OWNED BY public.solicitacoes_ferramentas.id;
          public               postgres    false    223            �            1259    16390    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    cargo character varying(50) DEFAULT 'user'::character varying
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16389    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    218                        0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217            h           2604    16465    manutencao id    DEFAULT     n   ALTER TABLE ONLY public.manutencao ALTER COLUMN id SET DEFAULT nextval('public.manutencao_id_seq'::regclass);
 <   ALTER TABLE public.manutencao ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            j           2604    16466    pedidos_aprovacao id    DEFAULT     |   ALTER TABLE ONLY public.pedidos_aprovacao ALTER COLUMN id SET DEFAULT nextval('public.pedidos_aprovacao_id_seq'::regclass);
 C   ALTER TABLE public.pedidos_aprovacao ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221    222            m           2604    16467    solicitacoes_ferramentas id    DEFAULT     �   ALTER TABLE ONLY public.solicitacoes_ferramentas ALTER COLUMN id SET DEFAULT nextval('public.solicitacoes_ferramentas_id_seq'::regclass);
 J   ALTER TABLE public.solicitacoes_ferramentas ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    224    224            f           2604    16468    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217    218                      0    16400 
   manutencao 
   TABLE DATA           ]   COPY public.manutencao (id, maquina, descricao, status, tecnico_id, operador_id) FROM stdin;
    public               postgres    false    220   v-                 0    16421    pedidos_aprovacao 
   TABLE DATA           [   COPY public.pedidos_aprovacao (id, usuario_id, data_pedido, status, descricao) FROM stdin;
    public               postgres    false    222   �/                 0    16452    solicitacoes_ferramentas 
   TABLE DATA           b   COPY public.solicitacoes_ferramentas (id, usuario_id, ferramenta, status, created_at) FROM stdin;
    public               postgres    false    224   �/                 0    16390    users 
   TABLE DATA           >   COPY public.users (id, username, password, cargo) FROM stdin;
    public               postgres    false    218   G3       !           0    0    manutencao_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.manutencao_id_seq', 96, true);
          public               postgres    false    219            "           0    0    pedidos_aprovacao_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.pedidos_aprovacao_id_seq', 1, false);
          public               postgres    false    221            #           0    0    solicitacoes_ferramentas_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.solicitacoes_ferramentas_id_seq', 60, true);
          public               postgres    false    223            $           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 30, true);
          public               postgres    false    217            u           2606    16408    manutencao manutencao_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.manutencao
    ADD CONSTRAINT manutencao_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.manutencao DROP CONSTRAINT manutencao_pkey;
       public                 postgres    false    220            w           2606    16430 (   pedidos_aprovacao pedidos_aprovacao_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.pedidos_aprovacao
    ADD CONSTRAINT pedidos_aprovacao_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.pedidos_aprovacao DROP CONSTRAINT pedidos_aprovacao_pkey;
       public                 postgres    false    222            y           2606    16459 6   solicitacoes_ferramentas solicitacoes_ferramentas_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.solicitacoes_ferramentas
    ADD CONSTRAINT solicitacoes_ferramentas_pkey PRIMARY KEY (id);
 `   ALTER TABLE ONLY public.solicitacoes_ferramentas DROP CONSTRAINT solicitacoes_ferramentas_pkey;
       public                 postgres    false    224            q           2606    16395    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            s           2606    16397    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public                 postgres    false    218            z           2606    16414 &   manutencao manutencao_operador_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.manutencao
    ADD CONSTRAINT manutencao_operador_id_fkey FOREIGN KEY (operador_id) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.manutencao DROP CONSTRAINT manutencao_operador_id_fkey;
       public               postgres    false    218    4721    220            {           2606    16409 %   manutencao manutencao_tecnico_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.manutencao
    ADD CONSTRAINT manutencao_tecnico_id_fkey FOREIGN KEY (tecnico_id) REFERENCES public.users(id);
 O   ALTER TABLE ONLY public.manutencao DROP CONSTRAINT manutencao_tecnico_id_fkey;
       public               postgres    false    218    220    4721            |           2606    16431 3   pedidos_aprovacao pedidos_aprovacao_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedidos_aprovacao
    ADD CONSTRAINT pedidos_aprovacao_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.users(id);
 ]   ALTER TABLE ONLY public.pedidos_aprovacao DROP CONSTRAINT pedidos_aprovacao_usuario_id_fkey;
       public               postgres    false    4721    218    222            }           2606    16460 A   solicitacoes_ferramentas solicitacoes_ferramentas_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitacoes_ferramentas
    ADD CONSTRAINT solicitacoes_ferramentas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.users(id);
 k   ALTER TABLE ONLY public.solicitacoes_ferramentas DROP CONSTRAINT solicitacoes_ferramentas_usuario_id_fkey;
       public               postgres    false    4721    224    218               Z  x��V͒�0>�O�'`�����80\v8q1��҄�$��#�鲵�2$����,ɲ��(P��4O�q�ڂ:Xi�V�}�\�V`��_����=�c�l�zCC�!���)��A�Om�vY[P�(]`�i���V���R�wsQ�B�1���U)_͒���n�c�� ��=�CchM�0��fZ<��qJs�vZ�t�E�4_�>=��������% H��B>(.�f#�&~���?�YB*)!C�&5���k��$�H��z����(5RP���N�zQDi-J�$5�䯭��9ϊ�,�����4^���&�P$�@cD��N��7˂U<����SZ�����D��<��7���	<�K;�/�󫮲!�+��.���q�����5h��U�P�%�N=ԘO$�$I�8+v��V���J��� ��ʃhR�����xGu�����۳�����
]M���V���5�E3z���4���������L/i��]�Vzc �al���t�D�d�û��{�v�	H��\��iF'�v��U��1�Ӱ�׷�)���^����b-|���˧�"�Y�٢������l�qLk����p8�����            x������ � �         :  x��V�n9<��"?��|ݒo�q/[�&H�r��3� �H+�XE5�U�-vP?,�������myZ��Y?s���U�i25�J��yy^��^���>�GM���$���4=^ڀ�d![�O5=>:��͍�.�9�v�T�knd~=~��5qa.�,n�ߺ�dn̓,�:_:kW�=�JV���g���>�%7\���x�̩���dk�N�3'ྚ�F�LΗ�NႎE����]�G�}��� �Ax;�ߎs�t�䖵6r�!�GN��
ɥ��+ں[bˮ���E�n�jTm�d��r�PR��x'i�jȴR��(hEU��r��w���V�ѵ��47���J�*P��TGt��- _ͳI�V��:���<| :�v�����[���B�׫�����@P� x�U^R�Y ����UG�rr�+}s��0M�A�)a��?nQ\���-�K">i�ڀ����a A5��F�2�鼺霋)	_d?�K�fI�Z��.���Q��*��B;�^�QH��r����S����&���m:�o�	��RQG��*��{�������!DlpƸZ�~m�×�/s�eG9���U�
/(�1;I��y�|���{��l$�����S�'e�E�`ĻQ�Sk�*�X�#���I?$l��.������;�Ϙ�.��ǭmf4�F���؆�ĉ
����jB����q� 1�l�}|}]~_��бn8���U)�޸�$>T2��Ì"� �u�ēV��چ��O�#SҘ[�-c��$��6����8���k��\�]�~}�?��ѽ�2B=#���2?��Юp�V�DD�]��         �   x�M�ar� ��=LG6$�K��dv�T��W�9���%Ɓ���>7�n����$qH�K��i�Rx���ɏ�0�g�]ol޸y3��B�*�u��<Yv�x��y���hSV��!�u��;�r�˙GWj-�m��X�R��.�bV�����΢�������BR�z�?!=���R�ќ�����W+��@+yX     