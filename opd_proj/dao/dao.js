const db = require('../config/db')
var mysql = require("mysql")


// let show = (tbName) => {
//     return new  Promise((resolve, reject) => {
//       db.query(`select * from ${tbName}`, (err, rows) => {
//         if(err) {
//           reject(err);
//         }
//         resolve(rows);
//       })
//     });


// }//显示全部 （select*）
  
// let selectOne = (tbName, attributename, attribute) => {
//     return new Promise((resolve, reject) => {
//         db.query(`select * from ${tbName} where ${attributename} = '${attribute}'`, (err, rows) => {
//         if(err) {
//             reject(err);
//         }
//         resolve(rows);
//         })
//     })
// }

// let update = (tbName, updateattributename, newdata,attributename,attribute) => {
//     return new Promise((resolve, reject) => {
//         db.query(`update ${tbName} set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`,(err,rows) => {
//         if(err) {
//             reject(err);
//         }
//         resolve(rows);
//         })
//     }) 
// }//修改



//多表查询报修记录!!!
//select tb_user.*, tb_service.* from tb_user inner join tb_service on tb_user.u_jobno = tb_service.u_jobno where tb_service.u_jobno = 1001;
let selectRecords = (jobNo) => {
    return new Promise((resolve, reject) => {
        let sql = 'select tb_user.*, tb_service.*, tb_department.* from tb_user inner join tb_service on tb_user.u_jobno =tb_service.u_jobno inner join tb_department on tb_department.d_no = tb_user.d_no where tb_service.u_jobno = ? order by tb_service.s_id desc';
        let replaces = [jobNo];
        sql = mysql.format(sql, replaces);
        console.log(sql);
        db.query(sql, (err, rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}

//增加报修记录 !!!
let insert = (tbName, attributenames, attributes) => {
    return new Promise((resolve, reject) => {
        let sql = 'insert into ??(??) values(?)';
        let replaces = [tbName, attributenames, attributes];
        sql = mysql.format(sql, replaces);
        db.query(sql, (err,rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}

//查询单个字段!!!
let select = (tbName, colNames, attributename, attribute) => {
    let sql = 'select ?? from ?? where ?? = ?';
    let replaces = [colNames, tbName, attributename, attribute];
    sql = mysql.format(sql, replaces);
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}

//查询留言记录
let selectDialogs = (sid) => {
    let sql = 'select da_msg, u_name, newTbl.u_jobno, da_date from (select da_id, da_msg, u_jobno, da_date from tb_dialog where s_id = ?) newTbl inner join tb_user on newTbl.u_jobno = tb_user.u_jobno order by da_id desc';
    let replaces = [sid];
    sql = mysql.format(sql, replaces);
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if(err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}


module.exports = { selectRecords, insert, select, selectDialogs}

