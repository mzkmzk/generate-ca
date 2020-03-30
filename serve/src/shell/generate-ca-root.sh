#!/bin/bash

openssl genrsa -out rootca.key 8192
touch certindex
echo 1000 > certserial
echo 1000 > crlnumber
cp /code/src/template/root-ca.conf ./root-ca.conf
echo 'create rootca.crt'
openssl req \
    -subj /C=CN/ST=GUANGDONG/L=SHENZHEN/O=404MZK.COM/OU=404MZK.COM-CA/CN=404MZK.COM-Root-CA/emailAddress=mzk@404mzk.com \
    -sha256 -new -x509 -days 1826 -key rootca.key -out rootca.crt


echo 'create intermediate1.key'
openssl genrsa -out intermediate1.key 4096

echo 'create intermediate1.csr'
openssl req \
    -subj /C=CN/ST=GUANGDONG/L=SHENZHEN/O=404MZK.COM/OU=404MZK.COM-CA/CN=404MZK.COM-Root-CA/emailAddress=mzk@404mzk.com \
    -new -sha256 -key intermediate1.key -out intermediate1.csr

echo 'create intermediate1.crt'
openssl ca -batch -config root-ca.conf -notext -in intermediate1.csr -out intermediate1.crt
echo 'create rootca.crl.pem'
openssl ca -config root-ca.conf -gencrl -keyfile rootca.key -cert rootca.crt -out rootca.crl.pem
echo 'create rootca.crl'
openssl crl -inform PEM -in rootca.crl.pem -outform DER -out rootca.crl

exit 0