const dao = require("../dao/dao");

/*
     添加记录
     tbName：表名
     arr1：字段名数组
     arr2：字段值数组
 */


let addRepairMsg = async function(tbName, arr1, arr2){
    /* try {
        let result = await dao.insert(tbName, arr1, arr2);
        result;
    } catch (e) {
        return e;
    } */
    return await dao.insert(tbName, arr1, arr2);

}

//将附件路径写入持久层
let addImgUrl = function(tbName, arr1, arr2){
    return addRepairMsg(tbName, arr1, arr2);
}

//获取报修记录
let showRecords = async function(tbName, tbName2, tbName3, arr1, arr2, arr3, on, on2, where){
    return await dao.selectRecords(tbName, tbName2, tbName3, arr1, arr2, arr3, on, on2, where);
}

let showAnnex = async function(tbName, colName, attributename, attribute){
    return await dao.select(tbName, colName, attributename, attribute);
}

let showDialogs = async function(tbName, tbName2, colNames, on, attributename, attribute){
    return await dao.selectDialogs(tbName, tbName2, colNames, on, attributename, attribute);
}

//将留言记录写入持久层
let addDialog = function(tbName, arr1, arr2){
    return addRepairMsg(tbName, arr1, arr2);
}

module.exports = {addRepairMsg, showRecords, addImgUrl, showAnnex, showDialogs, addDialog}