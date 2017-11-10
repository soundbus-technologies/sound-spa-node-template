#!/bin/sh

sshremote=root@39.108.218.145
base_path="/home/appian/workspace"

env=$1
project=$2
type=$3

path=$base_path"/"$env"_"

public="/public/"
dist="/dist/"

if [ $type == "multi" ]; then
	path=$path$project$public
	echo "NOW UPDATING: ====== "$path
	rsync -rlptDvz -e ssh --rsync-path='sudo rsync' $sshremote:$path ./public/
elif [ $type == "spa" ]; then
	path=$path$project$dist
  echo "NOW UPDATING: ====== "$path
	rsync -rlptDvz -e ssh --rsync-path='sudo rsync' $sshremote:$path ./public/
fi