<?php include 'views/user/hearder_user.php';?>
      <div class="wrap-intro">
         <div class="container">
            <div class="row">
               <div class="app-signup app-form app-form-login col-lg-12 col-xs-12 col-md-12 col-sm-12">
                    <div class="col-md-5 col-sm-5 img-signup" style="margin-top: 10px">
                       <img class="img-responsive" src="<?= __SITE_PATH ?>public/images/logo/shipper-logo.png">
                    </div>
                    <div class="col-md-7 col-sm-7">  
                        <form id="frm-login" class="frm-login" method="POST" action="dangnhap/login">
                        <div class="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 no-padding">
                           <h2>Đăng Nhập</h2>
                        </div>
                        <div class="form-group">
                           <div class="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 no-padding">
                               <input type="text" name="username" class="form-control" id="username" required placeholder='Tên đăng nhập hoặc số điện thoại'>                             
                           </div>
                           <div class="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 no-padding">
                               <input type="password" name="password"  class="form-control" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required="required" lass="form-control" id="password" placeholder='Mật khẩu'>                             
                           </div>
                        </div>
<!--                       <div class="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 remember no-padding">
                                <span style="color: red">
                                    //<?php 
//                                        if(isset($this->msg)){
//                                            echo $this->msg;
//                                        }
//                                        else {echo 'huanit';}
//                                    ?>
                                </span>
                       </div>-->
                        <div class="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 remember no-padding">
                           <label>
                           <input type="checkbox" name="remember">Ghi Nhớ
                           </label>
                           <label style="margin-left: 20px;">
                               <a href="<?php echo __SITE_PATH?>forgotpass">Quên mật khẩu?</a>
                           </label>
                        </div>
                        <div class="form-group">
                           <div class="col-sm-10 col-sm-offset-1 col-md-10 no-padding col-md-offset-1">
                               <button type="submit" name="dangnhap" class="btn btn-create col-sm-12 col-md-12 col-xs-12 btn-lg">
                                   <i class="icon_edit"></i>Đăng nhập</button><br>
                                  
                              <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 no-padding or-login-with" style="padding-top:10px">Hoặc đăng nhập với</div>
                           </div>
                        </div>
                          <div style="text-align: center;" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin-top">
            <ul class="list-login">
                <li>
                    <button data-id="0" type="button" class="btn btn-facebook btn-login-facebook col-sm-12 col-md-12 col-xs-12 btn-lg btn-block">
                        <i class="fa fa-facebook"></i>
                    </button>
                </li>
              <li>
                    <a href="#" style="color:#fff;font-size:20px;" class="btn-google btn-block btn btn-lg col-sm-12 col-md-12">
                        <i class="fa fa-google"></i>
                    </a>
                </li>
                <li>
                    <a style="color:#fff;font-size:20px;" class="btn-twitter btn-block btn btn-lg col-sm-12 col-md-12" href="#">
                        <i class="fa fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a style="color:#fff;font-size:20px;" class="btn-linkedin btn-block btn btn-lg col-sm-12 col-md-12" href="#">
                        <i class="fa fa-linkedin"></i>
                    </a>
                </li>
            </ul>
           </div>
<p class="col-lg-11 col-md-10 col-sm-11 col-xs-12 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 no-padding">
        Bạn chưa có tài khoản?
    <span>
        <a class="xanh-13-b" href="<?php echo __SITE_PATH?>dangky"> Đăng ký</a>
    </span>
        Hoặc
        <span>
            <a class="xanh-13-b" href="<?php echo __SITE_PATH?>dangkynhanh"> Đăng ký nhanh ở đây</a>
        </span>
</p>
         </form>
                  </div>
               </div>
               <!-- app-form-login -->
            </div>
         </div>
         <!-- /.container -->
      </div>
      <!-- wrap intro -->
      <?php include 'views/user/footer_user.php';?>