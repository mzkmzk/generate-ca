#!/bin/bash

openssl genrsa -out rootca.key 8192
openssl req \
    -subj /C=CN/ST=GUANGDONG/L=SHENZHEN/O=404MZK.COM/OU=404MZK.COM-CA/CN=404MZK.COM-Root-CA/emailAddress=mzk@404mzk.com \
    -sha256 -key intermediate1.key -out intermediate1.csr
touch certindex
echo 1000 > certserial
echo 1000 > crlnumber
cp /code/src/template/root-ca.conf ./root-ca.conf

openssl genrsa -out intermediate1.key 4096
openssl req \
    -subj /C=CN/ST=GUANGDONG/L=SHENZHEN/O=404MZK.COM/OU=404MZK.COM-CA/CN=404MZK.COM-Root-CA/emailAddress=mzk@404mzk.com \
    -new -sha256 -key intermediate1.key -out intermediate1.csr

openssl ca -batch -config ca.conf -notext -in intermediate1.csr -out intermediate1.crt
openssl ca -config ca.conf -gencrl -keyfile rootca.key -cert rootca.crt -out rootca.crl.pem
openssl crl -inform PEM -in rootca.crl.pem -outform DER -out rootca.crl