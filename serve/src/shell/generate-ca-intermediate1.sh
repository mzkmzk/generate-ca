#!/bin/bash

cp ../root/intermediate1.key ./
cp ../root/intermediate1.crt ./

touch certindex
echo 1000 > certserial
echo 1000 > crlnumber
echo 'unique_subject = no' > certindex.attr

envsubst < /code/src/template/intermediate-ca.conf > intermediate-ca.conf

openssl ca -config intermediate-ca.conf -gencrl -keyfile intermediate1.key -cert intermediate1.crt -out intermediate1.crl.pem
openssl crl -inform PEM -in intermediate1.crl.pem -outform DER -out intermediate1.crl

