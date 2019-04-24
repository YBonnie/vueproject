let express = require('express');

let app = express();

//设置public文件目录
app.use(express.static('public'))

app.get('/',(req,res) =>{
	res.send('success')
})

app.listen(8081,() => {
	console.log('Server Running')
})