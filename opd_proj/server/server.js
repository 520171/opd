const dao = require("../dao/dao");

/*
     添加报修记录
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

let showRecords = async function(tbName, tbName2, tbName3, arr1, arr2, arr3, on, on2, where){
    return await dao.selectRecords(tbName, tbName2, tbName3, arr1, arr2, arr3, on, on2, where);
}

module.exports = {addRepairMsg, showRecords}