//code
// const SSH = require('simple-ssh')
// // var host = "106.75.67.107";
// const ssh = new SSH({
//   host: '118.193.40.6',
//   user: 'caoshiyuan',
//   pass: 'caoshiyuan@123'
// })

// const cmd = 'echo cd /data/caoshiyuan/server/pro_open'
// // ssh.exec('echo $PATH', {
// //     out: function(stdout) {
// //         console.log(stdout);
// //     }
// // }).start();
// ssh.exec(cmd, {
//     out: function(stdout) {
//       console.log(stdout)
//     },
//     exit: function(code) {
//       console.error("error",code)
//     }
//   })
//   .start()
const { Client } = require('ssh2');
const conn = new Client()
conn
  .on('ready', () => {
    console.log('Client :: ready')
    conn.exec("cd /data/caoshiyuan/server/pro_open_admin && git checkout . && git checkout task-dev && git pull && cd ./src && pm2 start start.dev.json",(err,stream)=>{
        if (err) throw err;
        stream.on('close', (code, signal) => {
          console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          conn.end();
        }).on('data', (data) => {
          console.log('STDOUT: ' + data);
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
        });
    })
  })
  .connect({
    host: '106.75.67.107',
    username: 'caoshiyuan',
    port: 22,
    password: 'caoshiyuan@123'
  })

//   platform