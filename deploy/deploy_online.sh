#!/bin/bash
this_file=`pwd`"/"$0
DEPLOY_DIR_OLD=`dirname $this_file`
DEPLOY_DIR=`dirname $DEPLOY_DIR_OLD`
NAME="pro.open.admin"
TARGET_DIR="/data/vhosts/${NAME}"
HISTORY_DIR="${DEPLOY_DIR}/history"

INSTANCES=(
"project"
)

function deploy_message() {
    echo "========" "[$(/bin/date '+%Y-%m-%d %H:%M:%S')]" ${1} "========"
}

function remote_ssh() {
    deploy_message ${2}
    sudo /usr/bin/ssh -i /home/devops-user/.ssh/id_rsa -t devops-user@${1} ${2}
}

# make directory
deploy_message "Making new directory"
TAG=`/bin/date "+%Y-%m-%d-%H-%M-%S"`
TGZ_NAME="${NAME}_${TAG}.tgz"
TARGET_TAG_DIR="/data/vhosts/${NAME}_${TAG}"
TARGET_TGZ_FILE="/data/vhosts/${TGZ_NAME}"


# create code tarball
deploy_message "Create tarball"
cd ${DEPLOY_DIR}/;
/bin/tar zcf ${TGZ_NAME} ./src/* --exclude=logs --exclude=data --exclude=history;
git checkout .;
mkdir -p ${HISTORY_DIR};
/bin/mv ./${TGZ_NAME} ${HISTORY_DIR}/

for instance in ${INSTANCES[*]}; do
    #创建远程文件夹
    remote_ssh ${instance} "/bin/mkdir -p ${TARGET_TAG_DIR};/bin/mkdir -p --mode=777 /data/logs/${NAME};"
    #将压缩文件拷贝到相应的目录
    sudo /usr/bin/scp -i /home/devops-user/.ssh/id_rsa ${HISTORY_DIR}/${TGZ_NAME} devops-user@${instance}:/data/vhosts/
    #解压文件,重新建立项目所需配置文件连接,重新启动pm
    remote_ssh ${instance} "/bin/tar xzf ${TARGET_TGZ_FILE} -C ${TARGET_TAG_DIR};/bin/rm -f ${TARGET_TGZ_FILE};/bin/rm -f ${TARGET_TAG_DIR}/src/conf/config.json;/bin/ln -s ${TARGET_TAG_DIR}/src/conf/config.release.json ${TARGET_TAG_DIR}/src/conf/config.json;/bin/unlink ${TARGET_DIR};/bin/ln -s ${TARGET_TAG_DIR} ${TARGET_DIR}; export NODE_PATH=\"/usr/lib/node_modules/\"; cd ${TARGET_DIR}/src; pm2 delete start.json; pm2 start start.json;"
    
done

deploy_message "Deployment completed!!"
