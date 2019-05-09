/*
功能：输入json字符串，返回带有前缀的key列表
     可以处理value有无引号包裹情况
思路：keySet存储所有的带前缀key，prefixList保存当前前缀
     区分array和object递归得到所有的带前缀key
 */

let keySet = new Set();
let prefixList = [];

//是否是JSONObject
function isJsonObject(jsonStr) {
    try{
        if(typeof JSON.parse(jsonStr) === "object" && !Array.isArray(JSON.parse(jsonStr))){
            return true;
        }
    } catch (e) {
        console.log("not in json structure or value");
    }return false;
}
//是否是JSONArray
function isJsonArray(jsonStr) {
    try{
        if(Array.isArray(JSON.parse(jsonStr))){
            return true;
        }
    } catch (e) {
        console.log("not in json structure or value");
    }return false;
}
// let s = '{"key":"value"}';
// let s1 = '["a","b"]';
// alert(isJsonObject(s));
// alert(isJsonArray(s));
// alert(isJsonObject(s1));
// alert(isJsonArray(s1));

//前缀列表回退1个
function prefixListBack(){
    let listLength = prefixList.length;
    if(listLength > 0){
        prefixList.pop();
    }
}
//控制格式添加到keySet中
function addToKeySet(key){
    let keysStr;
    if(prefixList.length === 0){
        keysStr = key;
    } else{
        keysStr = prefixList;
        keysStr += "," + key;
    }
    keySet.add(keysStr);
}


//递归获得所有key
function getAllKeyList(jsonStr,isUpperLayerArray)
{
    if(isJsonObject(jsonStr)){
        let jsonObject = JSON.parse(jsonStr);
        let i = 0;
        for(let key in jsonObject){//遍历object
            i++;
            if(jsonObject.hasOwnProperty(key)){//加上更谨慎
                let value = jsonObject[key];
                if(typeof value === "object")//object转string
                    value = JSON.stringify(value);
                value += "";//将int boolean类型转化为string
                if(value === "[]"||value === ""||value.substring(0,2) === "[\""
                    ||!(isJsonObject(value)||isJsonArray(value))){//满足前述条件则不用判断是否object、array
                    addToKeySet(key);
                }else{
                    prefixList.push(key);
                    getAllKeyList(value,false);
                }
            }
            //上层是array一律array结束时前退，上层非array在object遍历结束前退
            if(!isUpperLayerArray && i === Object.keys(jsonObject).length)
                prefixListBack();
        }
    }
    if(isJsonArray(jsonStr)){
        let jsonArray = JSON.parse(jsonStr);
        for(let jsonObjIndex in jsonArray){//遍历array
            if(jsonArray.hasOwnProperty(jsonObjIndex)){
                let innerJsonStr = jsonArray[jsonObjIndex];
                if(typeof innerJsonStr === "object")//object转string
                    innerJsonStr = JSON.stringify(innerJsonStr);
                getAllKeyList(innerJsonStr,true);
            }
        }
        prefixListBack();
    }
}

function getAllKeyLists(){
    let input = document.getElementById("origin").value;
    keySet.clear();//清空keySet
    prefixList.splice(0,prefixList.length);//清空prefixList
    getAllKeyList(input,false);
    let output = "";
    for(let k of keySet){
        output += k + "\n";
    }
    output = output.replace(/,/g,"-");
    document.getElementById("converted").value = output;
}