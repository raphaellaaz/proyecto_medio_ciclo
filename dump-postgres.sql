PGDMP     %                    {            postgres    15.5 (Debian 15.5-0+deb12u1)    15.5 (Debian 15.5-0+deb12u1)     %           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            &           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            '           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            (           1262    5    postgres    DATABASE     t   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es_EC.UTF-8';
    DROP DATABASE postgres;
                postgres    false            )           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3368                        2615    16386    veterinaria    SCHEMA        CREATE SCHEMA veterinaria;
    DROP SCHEMA veterinaria;
                postgres    false            �            1259    16434    cita    TABLE     �   CREATE TABLE veterinaria.cita (
    idcita integer NOT NULL,
    idmascota integer,
    idmedico integer,
    motivo character varying(100) NOT NULL
);
    DROP TABLE veterinaria.cita;
       veterinaria         heap    postgres    false    6            �            1259    16394    mascota    TABLE     �   CREATE TABLE veterinaria.mascota (
    idmascota integer NOT NULL,
    nombre character varying(50) NOT NULL,
    especie character varying(50) NOT NULL,
    iddueno integer
);
     DROP TABLE veterinaria.mascota;
       veterinaria         heap    postgres    false    6            �            1259    16387    usuario    TABLE     2  CREATE TABLE veterinaria.usuario (
    idusuario integer NOT NULL,
    nombre character varying(50) NOT NULL,
    direccion character varying(100),
    telefono character varying(20),
    tipo_usuario character varying(20) NOT NULL,
    correo character varying(50) NOT NULL,
    pass character varying
);
     DROP TABLE veterinaria.usuario;
       veterinaria         heap    postgres    false    6            "          0    16434    cita 
   TABLE DATA           H   COPY veterinaria.cita (idcita, idmascota, idmedico, motivo) FROM stdin;
    veterinaria          postgres    false    217   �       !          0    16394    mascota 
   TABLE DATA           K   COPY veterinaria.mascota (idmascota, nombre, especie, iddueno) FROM stdin;
    veterinaria          postgres    false    216   =                  0    16387    usuario 
   TABLE DATA           j   COPY veterinaria.usuario (idusuario, nombre, direccion, telefono, tipo_usuario, correo, pass) FROM stdin;
    veterinaria          postgres    false    215   �       �           2606    16438    cita cita_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY veterinaria.cita
    ADD CONSTRAINT cita_pkey PRIMARY KEY (idcita);
 =   ALTER TABLE ONLY veterinaria.cita DROP CONSTRAINT cita_pkey;
       veterinaria            postgres    false    217            �           2606    16398    mascota mascota_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY veterinaria.mascota
    ADD CONSTRAINT mascota_pkey PRIMARY KEY (idmascota);
 C   ALTER TABLE ONLY veterinaria.mascota DROP CONSTRAINT mascota_pkey;
       veterinaria            postgres    false    216            �           2606    16393    usuario usuario_correo_key 
   CONSTRAINT     \   ALTER TABLE ONLY veterinaria.usuario
    ADD CONSTRAINT usuario_correo_key UNIQUE (correo);
 I   ALTER TABLE ONLY veterinaria.usuario DROP CONSTRAINT usuario_correo_key;
       veterinaria            postgres    false    215            �           2606    16391    usuario usuario_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY veterinaria.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (idusuario);
 C   ALTER TABLE ONLY veterinaria.usuario DROP CONSTRAINT usuario_pkey;
       veterinaria            postgres    false    215            �           2606    16444    cita f_key_cita_mascota    FK CONSTRAINT     �   ALTER TABLE ONLY veterinaria.cita
    ADD CONSTRAINT f_key_cita_mascota FOREIGN KEY (idmascota) REFERENCES veterinaria.mascota(idmascota);
 F   ALTER TABLE ONLY veterinaria.cita DROP CONSTRAINT f_key_cita_mascota;
       veterinaria          postgres    false    216    217    3212            �           2606    16439    cita f_key_cita_medico    FK CONSTRAINT     �   ALTER TABLE ONLY veterinaria.cita
    ADD CONSTRAINT f_key_cita_medico FOREIGN KEY (idmedico) REFERENCES veterinaria.usuario(idusuario);
 E   ALTER TABLE ONLY veterinaria.cita DROP CONSTRAINT f_key_cita_medico;
       veterinaria          postgres    false    215    217    3210            �           2606    16404    mascota f_key_mascota_dueno    FK CONSTRAINT     �   ALTER TABLE ONLY veterinaria.mascota
    ADD CONSTRAINT f_key_mascota_dueno FOREIGN KEY (iddueno) REFERENCES veterinaria.usuario(idusuario);
 J   ALTER TABLE ONLY veterinaria.mascota DROP CONSTRAINT f_key_mascota_dueno;
       veterinaria          postgres    false    216    3210    215            "   x   x�%���0�o{
OP)��������T�6Rp�I&�,F*t���@�F�cm�5~XC��Yv�4Ͳ���v�6��Q�j5�AR�"
O4u�d+-U�S�[��i�sW-�/����10��X)      !   M   x�3��M��H-*��4�2���,�N-*�tO,��4�2�t*MI���0�2�t�)MK��țp�r�'g��M�b���� \p          �   x�u��j�0���)� M�?J�[�B���)�,Ғ*Ȓ�m(}�Z:lN��|�p��#E���#�}���J�EQV5hg��)�D��v��:���"��%�a�(߃��:��c�E�ZoXlSe�,E5х^������Y�P�й2cV��W#ʗ�2�g�3�uU<ѥ�WG21���`=��,~d�q�x�إ���e)��L��o     