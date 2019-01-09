<!-- kêt thúc phần menu -->
<div id="wrapper" class="main-wrapper">
   <!-- phần tìm kiếm -->
   <div id="search-widget-wrapper">
      <div id="search-widget" class="collapse m-t-lg in">
         <div class="search-form container">
            <div class="bg-blue">
               <!--   <span class="close-square"></span> -->
               <div class="row">
                  <div class="search-widget-area col-sm-12" id="search-box">
                     <form class="form-inline form-adjacent" action="timkiemnhanh"  method="GET">
                        <!-- shipcom/vieclam/search id="frm_block_quick_search" -->
                        <div class="row">
                           <div class="col-sm-10">
                              <div class="row">
                                 <div class="col-sm-4 keyword-search">
                                    <div class="textbox">
                                       <i hidden class="fa fa-long-arrow-left clickable keyword-search__close">
                                       </i>
                                       <i class="fa fa-close clear-keyword clickable absolute">
                                       </i> 
                                       <div class="border-text-box" style="height: 100%;"> 
                                           <input type="text" name="keyword" id="keywordMainSearch" value="" class="form-control job-typeahead tt-input" placeholder="Tìm kiếm tin...">
                                       </div>
                                    </div>
                                 </div>
                                 <div class="col-sm-4 cate-search">
                                    <div class="textbox">
                                       <select data-placeholder="Tất cả dịch vụ" data-search-input-placeholder="Tìm dịch vụ" class="select-category" id="cateListMainSearch" name="id">
                                          <option value=''>Danh Mục Công Việc</option>
                                          <?php
                                             if(isset($this->catalogzz))//$this->catalog
                                                             for($i=0; $i<3;$i++)
                                                                 {
                                                                     echo "<option value='".$this->catalogzz[$i]['MADANHMUCTIN']."'>".$this->catalogzz[$i]['TENDANHMUCTIN']."</option>";
                                                                  }
                                                       ?>
                                       </select>
                                    </div>
                                 </div>
                                 <div class="level-search col-sm-4">
                                    <div class="textbox">
                                       <!-- Trigger/Open The Modal. when  select tag changed value -->
                                       <select class="select-location" id="diadiemdaufind" name="diadiemdaufind" data-search-input-placeholder="Tìm kiếm một vị trí" data-placeholder="Select location">
                                          <option value="">Nơi đi</option>
                                          <?php
                                             if(isset($this->locationszz))
                                                    for($i=3; $i<66;$i++)
                                                    {
                                                        echo "<option value='".$this->locationszz[$i]['PROVINCEID']."'>".$this->locationszz[$i]['PTYPE'] ." ".$this->locationszz[$i]['FULLNAME']."</option>";
                                                    }
                                             ?>
                                       </select>
                                    </div>
                                    <!--popup hien thi quan huyen noi đi--> 
                                    <div class="overlays" style="display: none;">
                                       <div class="login-wrappers">
                                          <div class="login-contents">
                                             <a class="closes">x</a>
                                             <h3>Chọn Quận/Huyện</h3>
                                             <select name="district_id" id="district_id" class="district" style="border: 1px; border-color: blue;">
<!--                                                <option value="">
                                                   -- Tùy chọn quận/huyện --
                                                </option>-->
                                             </select>
                                             <label class="btn" onclick="hidepopup();" style="background-color: #50c1e9;
                                                border: 1px solid rgba(0, 0, 0, .1);
                                                color: rgb(255, 255, 255);
                                                font-family: 'Varela Round', sans-serif;
                                                font-size: .85em;
                                                width: 60px;
                                                height: 30px;
                                                padding: .55em .9em;
                                                transition: all 400ms ease;
                                                margin-top: 8px;
                                                margin-left: 150px;">Chọn</label>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="level-search col-sm-4">
                                    <div class="textbox">
                                       <select class="select-location" id="diadiemcuoifind" name="diadiemcuoifind" data-search-input-placeholder="Tìm kiếm một vị trí" data-placeholder="Select location">
                                          <option value="">Nơi đến</option>
                                          <?php
                                             if(isset($this->locationszz))
                                                 for($i=3; $i<66;$i++){
                                                     echo "<option value='".$this->locationszz[$i]['PROVINCEID']."'>".$this->locationszz[$i]['PTYPE'] ." ".$this->locationszz[$i]['FULLNAME']."</option>";
                                                 }
                                             ?>
                                       </select>
                                    </div>
                                    <!--popup hien thi quan huyen noi đi--> 
                                    <div class="overlays1" style="display: none;">
                                       <div class="login-wrappers1">
                                          <div class="login-contents1">
                                             <a class="closes1">x</a>
                                             <h3>Chọn Quận/Huyện</h3>
                                             <select name="district_id1" id="district_id1" class="district1">
                                             </select>
                                             <label class="btn" onclick="hidepopup1();" style="background-color: #50c1e9;
                                                border: 1px solid rgba(0, 0, 0, .1);
                                                color: rgb(255, 255, 255);
                                                font-family: 'Varela Round', sans-serif;
                                                font-size: .85em;
                                                width: 60px;
                                                height: 30px;
                                                padding: .55em .9em;
                                                transition: all 400ms ease;
                                                margin-top: 8px;
                                                margin-left: 150px;">Chọn</label>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-sm-2"> 
                               <input type="submit" name="find" value="Tìm việc" class="btn-search btn btn-lg btn-primary"> 
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- kêt thúc phần tìm kiếm -->
   <div id="job-search" class="job-search">
      <div class="container">
         <div class="box">
            <div class="row">
               <!-- phần left content -->
               <div id="left-column" class="col-1 col-sm-4 col-md-3">
                  <div id="facets" class="side-column awe-check">
                     <img src="<?= __SITE_PATH ?>public/images/logo/BannerGiaohan.png"/>
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
                                             Tất cả công việc
                                          </div>
                                          <div style="margin-left: 1px; color: blue; ">
                                             ________________________________________
                                          </div>
                                          <?php //if(isset($this->titlework)) echo $this->titlework.'....';?>
                                          <!--                                            <div> <strong class="text-primary"> <?php //if(isset($this->titlework)) echo $this->titlework;?> </div>-->
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-xs-6 visible-xs text-right"> <span> <a class="icon-block btn-filter"><i class="fa fa-fw fa-filter"></i></a> </span> </div>
                        </div>
                     </div>
                     <!-- <div>-->
                     <div data-reactroot="" class="ais-hits">
                        <div class="job-list" id="job-list" data-page="1" data-uid="" >
                           <!-- bài đăng -->
                           <div class="box-top-level clearfix">
                              <?php
                                 if(isset($this->allwork)){
                                 for($i=66; $i<count($this->allwork);$i++)
                                 {
                                  echo '<div class="job-item" style="margin-top: 5px;">';
                                     echo '<div class="relative">';
                                        echo '<div class="row">';
                                          echo '<div class="col-xs-3 col-sm-4 col-md-3">';
                                          echo    '<div class="logo">'.'<img title="'
                                                  . $this->allwork[$i]['TIEUDE']
                                                  . '" class="img-responsive'
                                                  . '" src="';
                                                  if($this->allwork[$i]['img']!=NULL){
                                                      echo $this->allwork[$i]['img'];
                                                  }
                                                  else{
                                                      echo 'public/images/logo/shipper-logo.png';
                                                 }
                                                  echo '">'
                                                  . ' </div>';
                                           echo '</div>';
                                           echo '<div class="col-xs-9 col-sm-7 col-md-8">';
                                              echo '<div class="job-item-info relative">';
                                              echo  '<a target="_blank" href="'. __SITE_PATH.'chitiettin?id='.$this->allwork[$i]['MATIN'].'">';
                                              echo    '<h3 class="bold-red">'.$this->allwork[$i]['TIEUDE']. '<span class="label-danger new-tag">';
                                              if($this->allwork[$i]['TINHTRANG']==NULL) echo 'Mới'; else echo 'Cũ';
                                              echo '</span> </h3> ';//<a href="detail-jobs/hn-front-end-developer-reactjs-salary-up-to3000-3014.html" class="job-title" target="_blank"> 
                                                 echo '<div class="company">';
                                 //                                                echo '<h5>';
                                 //                                                echo ' '.substr($this->allwork[$i]['NOIDUNG'],0,100).'......' ;
                                 //                                                echo '</h5>';
                                                 echo '</div>';
                                                 echo '</a>';
                                                 echo '<div class="extra-info location text-clip">'. '<span class="circle-xs border">'.'<i class="fa fa-fw fa-1x fa-map-marker">'.'</i></span>';
                                                 echo ' '.$this->allwork[$i]['dddau']. ' ';
                                                 echo '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>';
                                                 echo  ' '.$this->allwork[$i]['ddcuoi'];
                                                 echo '</div>';
                                                 echo '<div class="extra-info salary">'.'<span class="circle-xs border">'.'<i class="fa fa-fw fa-dollar">'.'</i></span> '.number_format($this->allwork[$i]['GIA'],2). ' VND'.'</div>';
                                                 
                                                 echo '</div>';
                                                 echo '<div class="posted" style="text-align: right; margin-right:1px;">'.'<i class="fa fa-clock-o" aria-hidden="true"></i>'. '<small> Ngày đăng: '.$this->allwork[$i]['NGAYDANG'].'</small>';
                                        
                                              echo '</div>';
                                           echo '</div>';
                                           echo '</div>';
                                     echo '</div>';
                                  echo '</div>';
                                 }
                                 }
                                 else {  
                                 echo '<div class="job-item" style="margin-top: 5px;">';
                                     echo '<div class="relative">';
                                        echo '<div class="row">';
                                        echo 'Không có tin nào để hiển thị';
                                         echo '</div>';
                                     echo '</div>';
                                  echo '</div>';
                                        
                                 }
                                 ?>
                           </div>
                           <!-- kết thúc phần bài đăng -->
                        </div>
                     </div>
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