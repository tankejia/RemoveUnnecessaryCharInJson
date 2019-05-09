<%--
  Created by IntelliJ IDEA.
  User: kjtan
  Date: 2019/4/28
  Time: 13:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>获得Json中的key</title>
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
            ~~~~~~~~~~获得json中的key~~~~~~~~~~
        </td>
    </tr>
    <tr>
        <th >Json</th>
        <th><button type="button" onclick="getAllKeyLists()">获取</button></th>
        <th>keys</th>
    </tr>
    <tr>
        <td><textarea placeholder="请输入json字符串" id="origin"  cols="86"></textarea></td>
        <td> </td>
        <td><textarea placeholder="所有用-连接的key" id="converted" readonly="readonly" cols="86"></textarea></td>
    </tr>
</table>
</body>

<script src="../js/getAllKeyListInJson.js"></script>

</html>
