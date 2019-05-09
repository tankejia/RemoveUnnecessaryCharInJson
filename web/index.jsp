<%--
  Created by IntelliJ IDEA.
  User: kjtan
  Date: 2019/4/22
  Time: 16:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>

<style>
    body{
        line-height: 300%;
        font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";
    }
    #welcome{
        font-size:20px;
        text-align: center;
        width: 100%;
        height: 5%;
        margin-top: 5%;
        margin-bottom: 5%;
    }
    #list{
        font-size:18px;
        height: 65%;
        text-align: left;
        margin-left: 40%;
    }
    #bottom{
        height: 1%;
        margin-top: 1%;
        margin-bottom: 1%;
        text-align: center;
    }
    div a {
        color: black;
        text-decoration:none;
    }
    div a:hover {
        color: grey;
        text-decoration:none;
    }

</style>




<html>
<head>
  <title>AboutJsonPage</title>
</head>
<body>
<div id="welcome">
  <h1 >Welcome To This Page</h1>
</div>
<hr>
<div id="list">
    <ul>
    <li><a href="pages/removeUnnecessaryCharInJson.jsp" target="_blank">去除json中多余引号</a>
    <li><a href="pages/getJsonKeys.jsp" target="_blank">获得json中的键</a>
    <li><a href="pages/getJsonKeysAndValues.jsp" target="_blank">获得json中的键和值</a>
    </ul>
</div>
<hr>
<div id = "bottom">
  <h6>contact kjtan@ctrip.com</h6>
</div>
</body>
</html>
