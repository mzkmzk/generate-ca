# !/bin/bash
openssl genrsa -out enduser-example.com.key 4096
openssl req \
  -subj /C=CN/ST=GUANGDONG/L=SHENZHEN/O=404MZK.COM/OU=404MZK.COM-CA/CN=404MZK.COM-Root-CA/emailAddress=mzk@404mzk.com \
  -new -sha256 -key enduser-example.com.key -out enduser-example.com.csr

chmod 744 enduser-example.com.key
cd ../intermediate1

openssl ca -batch -config intermediate-ca.conf -notext -in ../enduser-certs/enduser-example.com.csr -out ../enduser-certs/enduser-example.com.crt
openssl ca -config intermediate-ca.conf -gencrl -keyfile intermediate1.key -cert intermediate1.crt -out intermediate1.crl.pem
openssl crl -inform PEM -in intermediate1.crl.pem -outform DER -out intermediate1.crl

cat ../enduser-certs/enduser-example.com.crt intermediate1.crt ../root/rootca.crt > ../enduser-certs/enduser-example.com.chain
