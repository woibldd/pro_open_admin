sudo yum install -y git

curl --silent --location https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum -y install nodejs

sudo npm install -g pm2 como express body-parser redis@2.8.0 promise-mysql mongoose@5.4.0 request md5 
sudo npm install -g jsonwebtoken moment