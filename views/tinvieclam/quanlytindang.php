
<!-- kêt thúc phần menu -->
<div id="wrapper" class="main-wrapper">
   <!-- phần tìm kiếm -->
   <!-- kêt thúc phần tìm kiếm -->
   <div id="job-search" class="job-search">
      <div class="container">
         <div class="box">
            <div class="row">
               <!-- phần left content -->
               <div id="left-column" class="col-1 col-sm-4 col-md-3">
                   <div id="facets" class="side-column awe-check">
                       <img src="<?php __SITE_PATH?>public/images/logo/BannerGiaohan.png"/>
                   </div>
               </div>
               <!-- phần center content-->
               <div class="col-2 col-sm-8 col-md-7">
                  <div class="job-search-body">
                     <div class="top-nav">
                        <div class="row">
                           <div class="col-xs-6 col-sm-6">
                              <div class="result-no">
                                 <div id="stats-container">
                                    <div data-reactroot="" class="ais-root ais-stats">
                                       <div class="ais-body ais-stats--body">
                                           <div style="margin-left: 15px; color: blue;">
                                               Quản Lý Tin Đăng
                                              
                                           </div>
                                           <div style="margin-left: 15px; color: blue;">
                                               ________________________________________
                                           </div>
<!--                                           <!-- Tiêu đề -->
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-xs-6 visible-xs text-right"> <span> <a class="icon-block btn-filter"><i class="fa fa-fw fa-filter"></i></a> </span> </div>
                        </div>
                     </div>
<!--                  Xử lí tab chổ này       -->
                      <div class="product">
			<div class="title" id="tabs">
				<a href="#" class="set number" title="tab1" style="display:block;width:120px;"><p>Tin Đã Duyệt</p></a>
				<a href="#" class=" number" title="tab2"style="	display:block;width:170px;"><p>Tin Đang Đợi Duyệt</p></a>
                                <a href="#" class=" number" title="tab3"style="	display:block;width:170px;"><p>Tin Bị Từ Chối</p></a>     
			</div><!--End .title-->
						
			<div id="tab1">
                            <div data-reactroot="" class="ais-hits">
                            <div class="job-list" id="job-list" data-page="1" data-uid="" >
                              <!-- bài đăng -->
                              <div class="box-top-level clearfix">
                            <?php
                                if(isset($this->alltin)){
                                for($i=1; $i<count($this->alltin);$i++){
                                   if($this->alltin[$i]['MAQT']!=NULL && $this->alltin[$i]['TINHTRANG']!='invalid'){
                                    echo '<div class="job-item" style="margin-top: 5px;">';
                                    echo '<div class="relative">';
                                       echo '<div class="row">';
                                         echo '<div class="col-xs-3 col-sm-4 col-md-3">';
                                         echo    '<div class="logo">'.'<img title="'
                                                 . $this->alltin[$i]['TIEUDE']
                                                 . '" class="img-responsive'
                                                 . '" src="';
                                                 if($this->alltin[$i]['img']!=NULL){
                                                     echo $this->alltin[$i]['img'];
                                                 }
                                                 else{
                                                     echo 'public/images/logo/shipper-logo.png';
                                                }
                                                 echo '">'
                                                 . ' </div>';
                                          echo '</div>';
                                          echo '<div class="col-xs-9 col-sm-7 col-md-8">';
                                             echo '<div class="job-item-info relative">';
                                             echo  '<a target="_blank" href="'. __SITE_PATH.'chitiettin?id='.$this->alltin[$i]['MATIN'].'" title="Chi tiết tin">';
                                             echo    '<h3 class="bold-red">'.$this->alltin[$i]['TIEUDE'];
                                             
                                             echo '</h3> ';
                                                echo '<div class="company">';
                                                echo '</div>';
                                                echo '</a>';
                                                echo '<div class="extra-info location text-clip">'. '<span class="circle-xs border">'.'<i class="fa fa-fw fa-1x fa-map-marker">'.'</i></span>';
                                                echo ' '.$this->alltin[$i]['dddau']. ' ';
                                                echo '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>';
                                                echo  ' '.$this->alltin[$i]['ddcuoi'];
                                                echo '</div>';
                                                echo '<div class="extra-info salary">'.'<span class="circle-xs border">'.'<i class="fa fa-fw fa-dollar">'.'</i></span> '.number_format($this->alltin[$i]['GIA'],2). ' VND'.'</div>';
                                                echo '</div>';
                                                echo '<div class="posted" style="text-align: right; margin-right:1px;">'.'<i class="fa fa-clock-o" aria-hidden="true"></i>'. '<small> Ngày đăng: '.$this->alltin[$i]['NGAYDANG'].'</small>';
                                             echo '</div>';
                                             
                                             echo '<a  href="'. __SITE_PATH.'del?id='.$this->alltin[$i]['MATIN'].'" style="color:blue; font-size:20px;  margin-left:80px" onclick="return confirm(\'Xác nhận xóa tin\');"><i class="fa fa-trash-o" aria-hidden="true" title="Xóa tin này?"></i> </a>';
                                          
                                             echo '<a href="#" style="color:blue; font-size:20px; margin-left:10px"><i class="fa fa-pencil-square-o" aria-hidden="true" title="Sửa tin này?"></i> </a>';
                                           
                                             echo '<a href="#" style="color:blue; font-size:20px; margin-left:10px"><i class="fa fa-arrow-up" title="Đẩy tin lên đầu trang để người mọi người nhìn thấy?"></i> </a>';
                                             
                                          echo '</div>';
                                          echo '</div>';
                                    echo '</div>';
                                 echo '</div>';
                                }
                                }
                            }
                            else {  
                                echo '<div class="job-item" style="margin-top: 5px;">';
                                    echo '<div class="relative">';
                                       echo '<div class="row">';
                                       echo '<h2 style="color:red">Không có tin nào để hiển thị</h2>';
                                       echo '</div>';
                                    echo '</div>';
                                echo '</div>';    
                                }
                                ?>
                              </div>
                              <!-- kết thúc phần bài đăng -->
                           </div>
                        </div>
			</div><!--End #tab1-->					
			<div id="tab2">
				<!-- Nội Dung tab 2-->
                                <div data-reactroot="" class="ais-hits">
                                    <div class="job-list" id="job-list" data-page="1" data-uid="" >
                              <!-- bài đăng -->
                                    <div class="box-top-level clearfix">
                            <?php
                                if(isset($this->alltin)){
                                for($i=1; $i<count($this->alltin);$i++)
                                {
                                   if($this->alltin[$i]['MAQT']==NULL){
                                    echo '<div class="job-item" style="margin-top: 5px;">';
                                        echo '<div class="relative">';
                                            echo '<div class="row">';
                                             echo '<div class="col-xs-3 col-sm-4 col-md-3">';
                                                echo '<div class="logo">'.'<img title="'
                                                 . $this->alltin[$i]['TIEUDE']
                                                 . '" class="img-responsive'
                                                 . '" src="';
                                                 if($this->alltin[$i]['img']!=NULL){
                                                     echo $this->alltin[$i]['img'];
                                                 }
                                                 else{
                                                     echo 'public/images/logo/shipper-logo.png';
                                                }
                                                 echo '">'
                                                 . ' </div>';
                                          echo '</div>';
                                          echo '<div class="col-xs-9 col-sm-7 col-md-8">';
                                             echo '<div class="job-item-info relative">';
                                             echo  '<a target="_blank" href="'. __SITE_PATH.'chitiettin?id='.$this->alltin[$i]['MATIN'].'" title="Chi tiết tin">';
                                             echo    '<h3 class="bold-red">'.$this->alltin[$i]['TIEUDE'];
                                             echo '</h3>';
                                                echo '<div class="company">';
                                                echo '</div>';
                                                echo '</a>';
                                                echo '<div class="extra-info location text-clip">'. '<span class="circle-xs border">'.'<i class="fa fa-fw fa-1x fa-map-marker">'.'</i></span>';
                                                echo ' '.$this->alltin[$i]['dddau']. ' ';
                                                echo '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>';
                                                echo  ' '.$this->alltin[$i]['ddcuoi'];
                                                echo '</div>';
                                                echo '<div class="extra-info salary">'.'<span class="circle-xs border">'.'<i class="fa fa-fw fa-dollar">'.'</i></span> '.number_format($this->alltin[$i]['GIA'],2). ' VND'.'</div>';
                                                echo '</div>';
                                                echo '<div class="posted" style="text-align: right; margin-right:1px;">'.'<i class="fa fa-clock-o" aria-hidden="true"></i>'. '<small> Ngày đăng: '.$this->alltin[$i]['NGAYDANG'].'</small>';
                                             echo '</div>';
                                             echo '<a href="'. __SITE_PATH.'quanlytin/del?id='.$this->alltin[$i]['MATIN'].'" style="color:blue; font-size:20px;  margin-left:80px" onclick="return confirm(\'Xác nhận xóa tin\');"><i class="fa fa-trash-o" aria-hidden="true" title="Xóa tin này?"></i> </a>';
                                          
                                             echo '<a href="'. __SITE_PATH.'quanlytin/edit?id='.$this->alltin[$i]['MATIN'].'" style="color:blue; font-size:20px; margin-left:10px"><i class="fa fa-pencil-square-o" aria-hidden="true" title="Sửa tin này?"></i> </a>';
                                           
                                             echo '<a href="#" style="color:blue; font-size:20px; margin-left:10px"><i class="fa fa-arrow-up" title="Đẩy tin lên đầu trang để người mọi người nhìn thấy?"></i> </a>';
                                             
                                          echo '</div>';
                                          echo '</div>';
                                    echo '</div>';
                                 echo '</div>';
                                }
                                }
                            }
                            else {  
                                echo '<div class="job-item" style="margin-top: 5px;">';
                                    echo '<div class="relative">';
                                       echo '<div class="row">';
                                       echo '<center><h2 style="color:red">Không có tin nào để hiển thị</h2></center>';
                                        echo '</div>';
                                    echo '</div>';
                                 echo '</div>';
                                       
                                }
                                ?>
                              </div>
                              <!-- kết thúc phần bài đăng -->
                           </div>
                        </div>
			</div><!--End #tab2-->
                        <div id="tab3">
				<!-- Nội Dung tab 3-->
                                <div data-reactroot="" class="ais-hits">
                                    <div class="job-list" id="job-list" data-page="1" data-uid="" >
                              <!-- bài đăng -->
                                    <div class="box-top-level clearfix">
                            <?php
                                if(isset($this->alltin)){
                                for($i=1; $i<count($this->alltin);$i++)
                                {
                                   if($this->alltin[$i]['MAQT']!=NULL && $this->alltin[$i]['TINHTRANG']=='invalid'){
                                    echo '<div class="job-item" style="margin-top: 5px;">';
                                        echo '<div class="relative">';
                                            echo '<div class="row">';
                                             echo '<div class="col-xs-3 col-sm-4 col-md-3">';
                                                echo '<div class="logo">'.'<img title="'
                                                 . $this->alltin[$i]['TIEUDE']
                                                 . '" class="img-responsive'
                                                 . '" src="';
                                                 if($this->alltin[$i]['img']!=NULL){
                                                     echo $this->alltin[$i]['img'];
                                                 }
                                                 else{
                                                     echo 'public/images/logo/shipper-logo.png';
                                                }
                                                 echo '">'
                                                 . ' </div>';
                                          echo '</div>';
                                          echo '<div class="col-xs-9 col-sm-7 col-md-8">';
                                             echo '<div class="job-item-info relative">';
                                             echo  '<a target="_blank" href="'. __SITE_PATH.'chitiettin?id='.$this->alltin[$i]['MATIN'].'" title="Chi tiết tin">';
                                             echo    '<h3 class="bold-red">'.$this->alltin[$i]['TIEUDE'];
                                             echo '</h3>';
                                                echo '<div class="company">';
                                                echo '</div>';
                                                echo '</a>';
                                                echo '<div class="extra-info location text-clip">'. '<span class="circle-xs border">'.'<i class="fa fa-fw fa-1x fa-map-marker">'.'</i></span>';
                                                echo ' '.$this->alltin[$i]['dddau']. ' ';
                                                echo '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>';
                                                echo  ' '.$this->alltin[$i]['ddcuoi'];
                                                echo '</div>';
                                                echo '<div class="extra-info salary">'.'<span class="circle-xs border">'.'<i class="fa fa-fw fa-dollar">'.'</i></span> '.number_format($this->alltin[$i]['GIA'],2). ' VND'.'</div>';
                                                echo '</div>';
                                                echo '<div class="posted" style="text-align: right; margin-right:1px;">'.'<i class="fa fa-clock-o" aria-hidden="true"></i>'. '<small> Ngày đăng: '.$this->alltin[$i]['NGAYDANG'].'</small>';
                                             echo '</div>';
                                             echo '<a href="#" style="color:blue; font-size:20px;  margin-left:80px" confirm(\'Xác nhận xóa tin?\');"><i class="fa fa-trash-o" aria-hidden="true" title="Xóa tin này?"></i> </a>';
                                          
                                             echo '<a href="#" style="color:blue; font-size:20px; margin-left:10px"><i class="fa fa-pencil-square-o" aria-hidden="true" title="Sửa tin này?"></i> </a>';
                                           
                                             echo '<a href="#" style="color:blue; font-size:20px; margin-left:10px"><i class="fa fa-arrow-up" title="Đẩy tin lên đầu trang để người mọi người nhìn thấy?"></i> </a>';
                                             
                                          echo '</div>';
                                          echo '</div>';
                                    echo '</div>';
                                 echo '</div>';
                                }
                                }
                            }
                            else {  
                                echo '<div class="job-item" style="margin-top: 5px;">';
                                    echo '<div class="relative">';
                                       echo '<div class="row">';
                                       echo '<center><h2 style="color:red">Không có tin nào để hiển thị</h2></center>';
                                        echo '</div>';
                                    echo '</div>';
                                 echo '</div>';
                                       
                                }
                                ?>
                              </div>
                              <!-- kết thúc phần bài đăng -->
                           </div>
                        </div>
                                
                                
                                
			</div><!--End #detail-->
		</div><!--End #tab2-->
                        
		</div>
<!-- Kết thúc tab -->
                  </div>
               </div>
               <!-- kết thúc phần center content-->
               <!--- phần right content -->
               <div class="col-3 hidden-sm col-md-2 hidden-xs" >
                   <!-- Quảng Cáo Đặt Vào Chổ này -->              
               </div>
               <!--- phần right content -->
            </div>
         </div>
      </div>
   </div>
</div>
<!-- kêt thúc phần content -->
<!-- phần footer -->
