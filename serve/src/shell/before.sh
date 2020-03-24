#!/bin/bash

# 设置参数获取
while getopts 't:' OPT; do
    case $OPT in
        t)
            name="$OPTARG";;
    esac
done

# openssl需要的随机文件
if [ ! -f "$HOME/.rnd" ]; then
    dd if=/dev/urandom of=~/.rnd bs=256 count=1
fi

# 创建需要的目录
mkdir -p "/data/ca/$name"
mkdir "/data/ca/$name/root"
mkdir "/data/ca/$name/intermediate1"
mkdir "/data/ca/$name/enduser-certs"


