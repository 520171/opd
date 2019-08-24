const db = require('../config/db')


let show = (tbName) => {
    return new  Promise((resolve, reject) => {
      db.query(`select * from ${tbName}`, (err, rows) => {
        if(err) {
          reject(err);
        }
        resolve(rows);
      })
    });


}//显示全部 （select*）
  
let select = (tbName, attributename, attribute) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from ${tbName} where ${attributename} = '${attribute}'`, (err, rows) => {
        if(err) {
            reject(err);
        }
        resolve(rows);
        })
    })
}//查询一行（传参)

let update = (tbName, updateattributename, newdata,attributename,attribute) => {
    return new Promise((resolve, reject) => {
        db.query(`update ${tbName} set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`,(err,rows) => {
        if(err) {
            reject(err);
        }
        resolve(rows);
        })
    }) 
}//修改



//多表查询报修记录
//select tb_user.*, tb_service.* from tb_user inner join tb_service on tb_user.u_jobno = tb_service.u_jobno where tb_service.u_jobno = 1001;
let selectRecords = (tbName, tbName2, tbName3, arr1, arr2, arr3, on, on2, where) => {
    return new Promise((resolve, reject) => {
        db.query(`select ${arr1},${arr2}, ${arr3} from ${tbName} inner join ${tbName2} on ${on} inner join ${tbName3} on ${on2} where ${where}`, 
        (err, rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}

//增加报修记录
let insert = (tbName, attributenames, attributes) => {
    return new Promise((resolve, reject) => {
        db.query(`insert into ${tbName}(${attributenames}) values(${attributes})`, (err,rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}

module.exports = { selectRecords, insert}

