========================
Install
========================
1. Copy files
2. Run: npm install
3. Copy config.json.dist to config.json
4. Change config.json with correct database settings


========================
MySql slow on remote host?
========================
1. go to: /etc/mysql/
2. edit my.cnf
3. Add the following lines under [mysqld]:
  skip_external_locking
  skip_name_resolve
  skip_host_cach
