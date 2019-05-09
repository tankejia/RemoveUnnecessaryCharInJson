let keyMap = new Map();
let prefixList = [];
let arrayIndexList = [];

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
//prefixList删除最后一位
function prefixListBack(){
    let listLength = prefixList.length;
    if(listLength > 0){
        prefixList.pop();
    }
}
//arrayIndexList删除最后一位
function arrayIndexListBack(){
    let listLength = arrayIndexList.length;
    if(listLength > 0){
        arrayIndexList.pop();
    }
}
//将占位符@替换为arrayIndexList中的值
function replacePlaceholder(s){
    if(arrayIndexList.length !== 0){
        for(let arrayIndex in arrayIndexList){
            let temp = parseInt(arrayIndex) + 1;
            s = s.replace(/@/,temp);
        }
    }
    return s;
}
//控制格式添加到keySet中
function addToKeyMap(key,value){
    let keysStr;
    if(prefixList.length === 0){
        keysStr = key;
    } else{
        keysStr = prefixList;
        if(key.length !== 0)
            keysStr += "-" + key;
    }
    keysStr = replacePlaceholder(keysStr);
    keyMap.set(keysStr,value);
}


//递归获得所有key
function getAllKeyAndValue(jsonStr,isUpperMultiArray,isUpperLayerArray)
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
                if(!(isJsonObject(value)||isJsonArray(value))
                    ||value === "[]"){
                    addToKeyMap(key,value);
                }else{
                    if(isJsonArray(value)){
                        let temp = JSON.parse(value);
                        if(temp.length > 1){
                            prefixList.push(key + '@');
                        }else{
                            prefixList.push(key);
                        }
                    }else{
                        prefixList.push(key);
                    }
                    getAllKeyAndValue(value,isUpperMultiArray,false);
                }
            }
            if(Object.keys(jsonObject).length === i){//object遍历结束前退
                if(!isUpperLayerArray)//上层是array一律array结束时前退
                    prefixListBack();
                if(isUpperMultiArray)//上层array且多个元素
                    arrayIndexListBack();
            }
        }
    }else if(isJsonArray(jsonStr)){
        let jsonArray = JSON.parse(jsonStr);
        for(let jsonObjIndex in jsonArray){//遍历array
            if(jsonArray.hasOwnProperty(jsonObjIndex)){
                let innerJsonStr = jsonArray[jsonObjIndex];
                if(typeof innerJsonStr === "object")//object转string
                    innerJsonStr = JSON.stringify(innerJsonStr);
                if(jsonArray.length > 1){//array多层
                    arrayIndexList.push(jsonObjIndex);
                    getAllKeyAndValue(innerJsonStr,true,true);
                    if(!(jsonStr.startsWith("{",1)||jsonStr.startsWith("{",2))){//["value","value"]格式
                        arrayIndexListBack();
                    }
                }else {
                    getAllKeyAndValue(innerJsonStr,false,true);
                }
            }
        }
        prefixListBack();
    }else{
        addToKeyMap("",jsonStr);
    }
}

function getAllKeyAndValues(){
    let input = document.getElementById("origin").value;
    keyMap.clear();//清空keySet
    prefixList.splice(0,prefixList.length);//清空prefixList
    arrayIndexList.splice(0,arrayIndexList.length);//清空arrayIndexList
    getAllKeyAndValue(input,false,false);
    let output = "";
    for(let [k,v] of keyMap){
        output += k + ":" + v + "\n";
    }
    output = output.replace(/,/g,"-");
    document.getElementById("converted").value = output;
}