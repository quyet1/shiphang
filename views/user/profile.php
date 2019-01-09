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
<!--                  <div id="facets" class="side-column awe-check">
                     <img src="<?= __SITE_PATH ?>public/images/logo/BannerGiaohan.png"/>
                  </div>-->
               </div>
               <!-- phần center content-->
               <div class="col-2 col-sm-8 col-md-7">
                  <div class="job-search-body">
                    <!-- phần profile -->
                     <div class="card-wrap">
                            <div class="profile_pic-wrap">
                                 <?php if(isset($this->ThongTin)){
                                foreach ($this->ThongTin as $key => $value) {
                                ?>
                                    <img src="
                                  <?php 
                                        if($value['hinhdaidien']!= NULL){
                                           echo $value['hinhdaidien'];
                                        } else {
                                            echo 'public/images/logo/shipper-logo.png';
                                        }
                                    ?>" alt=""/>
                              <?php 
                                }
                                 }
                              ?>
                            </div>
                            <div class="info-wrap">
                                <?php  if(isset($this->User)){
                                ?>
                                <h1 class="user-name"><?php echo $this->User ?></h1>
                                <?php }?>
                                <!--<p class="user-title">User-Interface Designer</p>-->
                                <center>
                                <?php if(isset($this->ThongTin)){
                                foreach ($this->ThongTin as $key => $value) {
                                ?>
                                    <table style="width: 70%; margin-top: 2%;">
                                    <tr>
                                        <th>
                                            Họ và tên:
                                        </th>
                                        <td class="conten">
                                            <?php echo $value['tenthanhvien']; ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <br>
                                            Ngày sinh:
                                        </th>
                                        <td class="conten">
                                            <br>
                                            <?php echo $value['ngaysinh']; ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <br>
                                            Địa chỉ:
                                        </th>
                                        <td class="conten">
                                            <br>
                                            <?php echo $value['diachi']; ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <br>
                                            Email:
                                        </th>
                                        <td class="conten">
                                            <br>
                                            <?php echo $value['email']; ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <br>
                                            Số điện thoại:
                                        </th>
                                        <td class="conten">
                                            <br>
                                            <?php echo $value['sodienthoai']; ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <br>
                                            Số chứng minh nhân dân:
                                        </th>
                                        <td class="conten">
                                            <br>
                                           <?php echo $value['socmnd']; ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <br>
                                            Ngày đăng ký thành viên:
                                        </th>
                                        <td class="conten">
                                            <br>
                                           <?php echo $value['ngaydangky']; ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <br>
                                            Cấp độ tài khoản:
                                        </th>
                                        <td class="conten">
                                            <br>
                                            <?php echo "Cấp độ: ".$value['tinhtrang']; ?>
                                        </td>
                                    </tr>
                                </table>
                                    <?php
                                }
                                }
                                    ?>
                                </center>
                            </div>
                         <center>
                            <div class="find_me-wrap">
                                <button type="submit" title="Click để nâng cấp tài khoản">Nâng cấp tài khoản</button>
                            </div>
                         </center>
                      </div>
                    <!-- kết thúc phần profile-->
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