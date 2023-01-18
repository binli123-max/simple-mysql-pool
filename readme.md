# 安装

```
npm i simple-mysql-pool --save
```



# 使用

```
const MysqlPool = require('simple-mysql-pool');

//其中MysqlPool配置参数参考于mysql的配置参数


const testPool = new MysqlPool({
    host: 'localhost',
    user: 'xxxxx',
    password: 'xxxxx',
    database: 'xxxxx',
    port: '3306',
    connectionLimit: 20, //连接池最大连接数
    multipleStatements: true //允许执行多条sql语句
})


let sql = 'select * from users'
let params = []

//方式1
testPool.query(sql,params,(err,result)=>{
	if(err){
		console.log(err);
		return
	}
    console.log(result);
})

//方式2
async function testQuery() {
    let rows =  await testPool.query(sql,params)
    console.log(rows);
}
testQuery()

//sql语句另外一种写法
//代表查询用户id为5的用户
let sql = 'select * from users where id=?'
let params = [5]
testPool.query(sql,params,(err,result)=>{
	if(err){
		console.log(err);
		return
	}
    console.log(result);
})


```

