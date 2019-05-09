<%--
  Created by IntelliJ IDEA.
  User: kjtan
  Date: 2019/4/26
  Time: 17:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>去除json中多余引号</title>
    <style>
        body{
            font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";
        }
        th{
            background-color: #d3fac1;
            color: darkgreen;
            padding: 5px;
        }
        button{
            background-color: #d3fac1;
            border: none;
            color: darkgreen;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
        }
        textarea{
            overflow-y: scroll;
            font-size: 14px;
            min-height: 870px;
            max-height: 870px;
            min-width: 300px;
            max-width: 800px;
            border-color: darkgreen;
        }
    </style>
</head>
<body>
<table>
    <tr>
        <td colspan="3" align="center">
            ~~~~~~~~~~去除json中多余引号~~~~~~~~~~
        </td>
    </tr>
    <tr>
        <th >原始</th>
        <th><button type="button" onclick="myFunction()">转换</button></th>
        <th>转换后</th>
    </tr>
    <tr>
        <td><textarea placeholder="请输入json字符串" id="origin" rows="60" cols="86"></textarea></td>
        <td> </td>
        <td><textarea placeholder="转换后json字符串" id="converted" readonly="readonly" rows="60" cols="86"></textarea></td>
    </tr>
</table>
</body>

<script>
    function myFunction()
    {
        let input = document.getElementById("origin").value;
        let output = "";
        for(let i = 0,n = input.length;i<n;i++){
            if(input[i]!=='\\'){
                if(input[i]!=='\"'){
                    output+=input[i];
                }else{
                    if(!(input[i+1]==="{"||input[i+1]==="["||
                        input[i-1]==="}"||input[i-1]==="]"))
                        output+=input[i];
                }
            }
        }
        document.getElementById("converted").value = output;
    }
</script>

</html>
