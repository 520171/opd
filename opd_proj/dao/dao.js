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

let insert = (tbName, attributenames, attributes) => {
    return new Promise((resolve, reject) => {
        db.query(`insert into ${tbName}(${attributenames}) values(${attributes})`, (err,rows) => {
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve(rows);
        })
    })
}//增加

module.exports = { show, select, update, insert}

