<!DOCTYPE html>
<html >
   <head>
       <script src="<?= __SITE_PATH ?>public/js/prefixfree.min.js" type="text/javascript"></script>
       <script src='https://www.google.com/recaptcha/api.js'></script>
       <meta name="viewport" content="height=device-height,width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <title><?=(isset($this->title)) ? $this->title :'ShipCom - Sự lựa chọn tin cậy'; ?></title> <!-- Cộng đồng shipper Việt Nam =(isset($this->title)) ? WEB_NAME." | ".$this->title : WEB_NAME; ? -->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link rel="shortcut icon" href="<?= __SITE_PATH ?>public/images/icon/favicon.ico" type="image/x-icon" />
    <meta name="keywords" content="Cộng đồng shipper Việt Nam, việc làm thêm,nhận giao hàng, nhận chuyển hàng, đi xe nhờ, đi chợ thuê, mua hàng thuê, gửi hàng nhanh, gửi hàng, vận chuyển đường xa, xe ôm"/>      
    <link href="<?= __SITE_PATH ?>public/css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="<?= __SITE_PATH ?>public/fonts/css/font-awesome.min.css" />
    <link type="text/css" rel="stylesheet" href="<?= __SITE_PATH ?>public/css/all-5b0793f5ab.css" />
     <script type="text/javascript" src="<?= __SITE_PATH ?>public/js/jquery-1.10.2.min.js"></script> 
     <script type="text/javascript" src="<?= __SITE_PATH ?>public/js/ProcessLocation.js"></script> 
    <script src="<?= __SITE_PATH ?>public/js/flux.min.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript"> var base_url = "index.html"; var lang = "en"; </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    
    <script type="text/javascript" charset="utf-8">
            $(function(){
		if(!flux.browser.supportsTransitions)
		alert("Flux Slider yêu cầu một trình duyệt hỗ trợ chuyển tiếp CSS3");
                window.f = new flux.slider('#slider', {
                   pagination: true
                });
            });
    </script>
    
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
   <body id="search-result-page" class="instant-search">
      <!-- phần content -->
      <div data-role="page">
         <!-- phần menu -->
         <div >
            <header>
               <nav class="navbar horizontal-navbar navbar-default">
                  <div class="container-fluid">
                      <div class="navbar-header hidden-xs"> 
                          <a href="<?php echo __SITE_PATH?>index">
                          <img class="" src="<?= __SITE_PATH ?>public/images/logo/compele.png" alt="ShipCpm" title="ShipCom Việt Nam">
                          </a> 
                      </div>
                     <div class="hidden-xs">
                         
                        
                        <ul class="nav navbar-nav navbar-left">
                           <li>
                               <a href="<?php echo __SITE_PATH?>vieclam"><span style="font-size: 15px">Việc Làm</span>
                               </a>
                           </li>
                           <li>
                               <a href="<?php echo __SITE_PATH?>dangtin"> <span style="font-size: 15px">Đăng Tin</span>
                              </a> 
                           </li>
                              
                           <span style="font-size: 17px; color: red;"><b> </b></span>
                            <li>
                                <a target="_blank" href="<?=  __SITE_PATH?>hotro"> <span style="font-size: 15px;">Hỗ Trợ</span> </a> 
                            </li>
                           <?php 
                                if(Session::get('user'))
                                {
                                    echo '<li class="dropdown">';
                                    echo '<a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" href="#"><span style="font-size: 15px;" ><i class="fa fa-user fa-1x" aria-hidden="true"></i> ' .$_SESSION['user'].'</span><b class="caret"></b> </a>';
                                    echo '<ul class="dropdown-menu">';
                                    echo '<li > <a href="profile">Tài Khoản Của Bạn</a> </li>';
                                    echo '<li> <a href="'.__SITE_PATH.'quanlytin">Quản Lý Tin Đăng</a> </li>';
                                    echo '<li> <a href="dangxuat/">Đăng Xuất</a> </li>';
                                    echo '</ul>';
                                    echo '</li>';
                                }
                                else
                                {
                                    echo '<li>';
                                    echo '<a '.'href="'.__SITE_PATH .'dangnhap">'.'<span '.'style=" font-size: 15px">Đăng Nhập | Đăng Ký</span></a>';
                                    echo '</li>';
                                }
                               ?>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                           <li class="hidden-md hidden-sm hidden-xs">
                              <a class="header-contact" title="Contact Us"> 
                              <i class="fa fa-phone">
                              </i>
                                  84-9 78512938 | 84-1 653561285 | 84-838383127
                              </a>
                           </li>
                           <li>
                              <a href="<?php echo __SITE_PATH?>vieclam" class="box-search-job clickable" title="Tìm Việc Làm">
                                  <i class="glyphicon glyphicon-search">
                                  </i>
                              </a>
                           </li>
                           <li class="horizontal-navbar__employer-site">
                               
                                <a href="<?php echo __SITE_PATH?>index">
                                    <strong class="text-white hidden-xs">
                                     SHIPCOM 
                                    </strong> 
                                   <br>
                                       <span class="fa fa-thumbs-up like-btn"></span>
                                       <span  class="text-white" > An Toàn - Chính Xác</span> 
                                </a>
                           </li>
                        </ul>
                     </div>    
                  </div>
               </nav>
            </header>
         </div>
      </div>