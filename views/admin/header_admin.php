<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
       <link href="<?php __SITE_PATH?>public/css/css_admin/tab_css.css" rel="stylesheet" type="text/css"/>
       <script src="<?php _SITE_PATH ?>public/js/jquery-3.2.1.min.js" type="text/javascript"></script>
      <title>Quản Trị Hệ Thống ShipCom</title>
      <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
      <link rel="stylesheet" href="<?php __SITE_PATH?>public/css/css_admin/style.css" rel="stylesheet" type="text/css"/>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>
		<script>
			$(document).ready(function(){
				$('a.number').click(function(){
				var an=$('a.set').attr('title');
				$('div#'+an).hide();
				$('a.set').removeClass('set');
				$(this).addClass('set');
				var hien=$(this).attr('title');
				$('div#'+hien).show();
				})
			});
		</script>
   </head>
   <body>
      <!-- Header -->
      <div id="header">
         <div class="shell">
            <!-- Logo + Top Nav -->
            <div id="top">
               <h1><a href="#">ShipCom</a></h1>
               <div id="top-navigation"> Xin Chào <a href="#"><strong>Administrator</strong></a> <span>|</span> <a href="#">Trợ Giúp</a> <span>|</span> <a href="#">Cài Đặt Cấu Hình</a> <span>|</span> <a href="#">Đăng Xuất</a> </div>
            </div>
            <!-- End Logo + Top Nav -->
            <!-- Main Nav -->
            <div id="navigation">
               <ul>
                   <li><a href="#" class="active"><span>Bảng Điều Khiển</span></a></li>
                  <li><a href=""  ><span>Quản Trị Tin Đăng</span></a></li>
                  <li><a href="" ><span>Quản Trị Thành Viên</span></a></li>
                  <li><a href="#" ><span>Quản Trị Hình Ảnh</span></a></li>
                  <li><a href="#"><span>Quản Trị Dich Vụ</span></a></li>
                  <li><a href="#"><span>Hỗ Trợ</span></a></li>
               </ul>
            </div>
            <!-- End Main Nav -->
         </div>
      </div>
      <!-- End Header -->
	        <!-- Container -->
      <div id="container">
         <div class="shell">