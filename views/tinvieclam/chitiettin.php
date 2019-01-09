

<div id="wrapper" class="main-wrapper">
            <section class="main-content container" id="content">    
                <div class="modal fade apply-form-modal modal-apply" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <form class="form-horizontal">                     
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal"> <span aria-hidden="true" tabindex="8">&times;</span> <span class="sr-only">Close</span> </button>
                                    <?php
                                        if(isset($this->cttin)){
                                            if($this->cttin !=0){
                                                foreach ($this->cttin as $chitiet){
                                    ?>
                                <h4 class="modal-title" id="myModalLabel">Thông tin liên lạc: <strong><?php echo $chitiet['TIEUDE']?></strong><br/> </h4> 
                                </div>
                                <div class="modal-body">
                                    <div id="resume" class="resume-body resume-upload-cv">
                                        <div class="form-group m-t-sm">
                                            <div class="form-group">
                                                <div class="col-sm-9 col-xs-12">
                                                    <div class="input-group group-file-upload">
                                                        <center>
                                                            <span class="input-group-btn" id="resumeFile">
                                                            </span>
                                                            <input type="text" readonly class="form-control" value="<?php echo $chitiet['sodt']?>" style=" text-align: center; margin-left: 150px; height: 34px; background: #e6e6e6; font-size: 14px !important;">
                                                        <?php
                                                        }
                                                        }
                                                    else {
                                                        ?>
                              <h4 class="modal-title" id="myModalLabel">Thông tin liên lạc: <strong>Không có thông tin nào</strong><br/> </h4> 
                                </div>
                                <div class="modal-body">
                                    <div id="resume" class="resume-body resume-upload-cv">
                                        <div class="form-group m-t-sm">
                                            <div class="form-group">
                                                <div class="col-sm-9 col-xs-12">
                                                    <div class="input-group group-file-upload">
                                                        <center>
                                                            <span class="input-group-btn" id="resumeFile">
                                                            </span>
                                                            <input type="text" class="form-control" value="Không có thông tin liên lạc" style=" text-align: center; margin-left: 150px; height: 34px; background: #e6e6e6; font-size: 14px !important;">
                                                      <?php
                                                    }
                                                    
                                                    }
                                                      ?>
                                                        </center>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-sm-9 col-xs-12 center-xs"  style=" margin-left: 150px;">
                                                    <a class="btn btn-primary apply-without-login">Gọi Ngay</a> 
                                                </div>
                                            </div>
<!--                                            <div class="progress-bar-status box-message" style="display: none;"></div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="section-job-detail">
                    <div class="row">
                        <?php
                            if(isset($this->cttin)){
                               if($this->cttin !=0){
                                    foreach ($this->cttin as $chitiet){
                        ?>
                        <div class="col-xs-12 col-md-8 col-lg-8 pull-left">
                            <div id="image-employer">
                                <div class="box box-lg">
                                    <div class="col2 col-md-12">
                                        <div class="row">
                                            <div class="col-md-8">
                                                <div class="row">
                                                    
                                                    <div class="job-header-info">
                                                        <h4 class="job-title"><?php echo $chitiet['TIEUDE'];?></h4> 
                                                        <span class="company-name text-lg block">
                                                           <?php echo $chitiet['NOIDUNG'];?>
                                                        </span>
                                                        <br>
                                                        <span class="company-address block"><i class="fa fa-location-arrow" aria-hidden="true"></i> <font color='blue'>Nơi đi:</font>  <?php echo $chitiet['dddau'];?> </span>
                                                  
                                                        <span class="company-address block"><i class="fa fa-location-arrow" aria-hidden="true"></i><font color='blue'> Nơi đến:</font>  <?php echo $chitiet['ddcuoi'];?></span>
                                                        <span class="company-address block"><i class="fa fa-flag-checkered" aria-hidden="true"></i><font color='blue'> Tình Trạng:</font> <?php if($chitiet['TINHTRANG']=="") echo '<font color="red">Chưa được giao dịch</font>';                                                                        else {
                                                                            
                                                                            echo 'Đã được giao dịch';}?>
                                                        </span>
                                                        <span class="company-address block"><i class="fa fa-balance-scale" aria-hidden="true"></i><font color='blue'>Khối Lượng:</font>  <?php echo $chitiet['KHOILUONGHANG'].' KG';?></span>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 hidden-xs hidden-sm">
                                                <div class="push-top-sm"></div>
                                                <div class="action-apply center-block">
                                                    <button type="button" class="btn btn-primary btn-xlg col-sm-12" data-toggle="modal" onclick="initApplyForm();">Xem số điện thoại</button>
                                                </div>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="pull-left">
                                                <div class="salary border pull-left padding-15 box-gray-light-ex rounded text-center bold-500"><i class="fa fa-usd" aria-hidden="true"></i><font color='blue'> Định Giá Giao Dịch:</font> <span class="orange bold-700 text-lg"><?php echo number_format($chitiet['GIA'],2).'VND';?></span>
                                                </div>
                                            </div>
                                            <div class="pull-right text-gray-light">
                                                <div class="pull-left small padding-15"><font color='blue'> Đăng bởi:</font><?php 
                                                if($chitiet['tentv'] =="") echo ' Vô danh';
                                                else {
                                                    echo $chitiet['tentv'];
                                                }?> </div>
                                                <div class="pull-left small padding-15"><font color='blue'>Đã đăng:</font> <?php echo $chitiet['NGAYDANG'];?> </div>
                                            </div>
                                        </div>
                                         
                                    </div>
                                </div>
                            </div>
                             
                        </div>
                        <?php }
                            } else {
                                echo ' <div class="col-xs-12 col-md-8 col-lg-8 pull-left">
                                     <div id="image-employer">
                                    <div class="box box-lg">
                                    <div class="col2 col-md-12">
                                    <div class="row" style="text-align:center;">';
                                echo '<i class="fa fa-5x fa-exclamation-circle" aria-hidden="true"></i>';
                                echo '<h3><font color="red">Xin lỗi, Chúng tôi không tìm thấy dữ liệu bạn yêu cầu!</font></h3>';
                                echo '  </div>
                                </div>
                                </div>
                                </div>
                                </div>';
                                                }
                                                }
                                            ?>
                        <div class="col-xs-12 col-md-4 col-lg-4 pull-right">
                            <div class="box">
                                <div class="employer-info">
                                <?php
                                    if(isset($this ->images)){
                                       if($this ->images[1]!=0){
                                ?>    
                                     <div class="bs-example" style="width:320px; height: 350px;">
                                        <div id="myCarousel" class="carousel slide" data-interval="300000" data-ride="carousel">
                                                 <!-- Wrapper for carousel items -->
                                                 <div class="carousel-inner">
                                                     <div class="active item" style="width: 320px; height: 350px">
                                                         <img src="<?php echo $this->images[1]['DUONGDAN']?>" width="320px" height="350px" alt="Hinh">
                                                     </div>
                                                      <?php
                                                    for($i=2; $i<count($this ->images); $i++){
                                                        echo '<div class="item" style="width: 320px; height: 350px">';
                                                        echo '<img width="320px" height="350px" src="'.$this ->images[$i]['DUONGDAN'].'" alt="Hinh">';
                                                       
                                                        echo ' </div>';
                                                    }?>
                                                 </div>
                                                 <!-- Carousel controls -->
                                                 <a class="carousel-control left" href="#myCarousel" data-slide="prev">
                                                     <span class="glyphicon glyphicon-chevron-left"></span>
                                                 </a>
                                                 <a class="carousel-control right" href="#myCarousel" data-slide="next">
                                                     <span class="glyphicon glyphicon-chevron-right"></span>
                                                 </a>
                                        </div>
                                     </div>
                                    <?php
                               }
 else {
     
 ?>
                        <div class="bs-example" style="width:320px; height: 350px;">
                            <img width="320px" height="350px" src="public/images/logo/shipper-logo.png" alt="No Image">
                        </div>
                                    <?php
                                    }
                            }
                                    ?>
                                    <br>
                                    <div>
                                        <a href="#" ><strong>Xem hướng dẫn giao dịch an toàn ở đây</strong></a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="float-table-wrapper">
                    <div class="link-list pull-right hide go-top"> <span class="fa-stack fa-lg"> <a href="#top"><i class="fa fa-circle fa-stack-2x"></i> <i class="fa fa-arrow-up fa-stack-1x fa-inverse"></i></a> </span> </div>
                </div>
            </section>
        </div>