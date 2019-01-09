<?php include 'views/user/hearder_user.php';?>
<div class="wrap-intro">
         <div class="container">
            <div class="row">
               <div class="app-form app-signup col-lg-12 col-xs-12 col-sm-12">
                   <div class="col-md-5 col-sm-5 img-signup" style="margin-top: 50px">
                       <img class="img-responsive" src="public/images/logo/shipper-logo.png">
                </div>
                  <div class="col-md-7 col-sm-7 no-padding">
                      <form id="form-signup" method="POST" role="form" action="dangkynhanh/registry">
                        <div class="col-md-12 no-padding">
                           <div >
                               <h2 class="" style="color: red">Đăng Ký Đăng Tin</h2>
                           </div>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                           <div class="no-padding col-md-12 col-sm-12 col-xs-12 form-group">
                               <span style="color: black; font-size: 15px">Số điện thoại<span style="color: red; font-size: 14px"> (dùng để liên lạc với đối tác)</span>:</span>
                               <input type="text" name="phone" id="username" class="form-control" value="" pattern="([1-9])+(?:-?\d){4,}"  placeholder='0978512938' required="Không được rỗng">
                              <span class="help-block"></span>
                           </div>
                            <div class="col-md-12 col-sm-12 no-padding form-group col-xs-12">
                                <span style="color: black; font-size: 15px">Mật khẩu đăng nhập:</span>
                              <input type="password" name="pass" id="password" value="" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required="required" class="form-control" placeholder='Abcd123456789'>
                              <span class="help-block"></span>
                           </div>
                           <div class="col-md-12 col-sm-12 no-padding form-group col-xs-12">
                               <span style="color: black; font-size: 15px">Nhập lại mật khẩu:</span>
                              <input type="password" name="repass" id="confirm-password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required="required" value="" class="form-control" placeholder='Abcd123456789'>
                              <span class="help-block"></span>
                           </div>
                        </div>
                      
                        <input type="hidden" value="" name="avatar-facebook" id="img-avatar-facebook" />
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 agree">
                           Khi nhấn vào đăng ký là bạn đã đồng ý với các quy định dịch vụ của chúng tôi. <a class="green-2" href="<?php echo __SITE_PATH?>dieukhoandichvu">Quy Định</a>.
                        </div>
                        <div class="form-group">
                           <div class=" col-md-12 col-lg-12 col-sm-12 col-xs-12 no-padding">
                              <button type="submit" name="registryexpre" class="btn btn-create btn-lg col-sm-12 col-md-12 col-xs-12">
								  <i class="icon_edit"></i>
									Đăng Ký Ngay
							  </button>
                           </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="text-align: center;font-style: italic">
                                Hoặc Đăng Ký Với
                            </div>
                            <div style="text-align: center;" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin-top">
                                <ul class="list-login">
                                    <li>
                                        <button data-id="0" type="button" class="btn btn-facebook btn-login-facebook col-sm-12 col-md-12 col-xs-12 btn-lg btn-block">
                                            <i class="fa fa-facebook"></i>
                                        </button>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" onclick="javascript:initiateSignIn();" style="color:#fff;font-size:20px;" class="btn-google btn-block btn btn-lg col-sm-12 col-md-12">
                                            <i class="fa fa-google"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a style="color:#fff;font-size:20px;" class="btn-twitter btn-block btn btn-lg col-sm-12 col-md-12">
                                            <i class="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a style="color:#fff;font-size:20px;" class="btn-linkedin btn-block btn btn-lg col-sm-12 col-md-12">
                                            <i class="fa fa-linkedin"></i>
                                        </a>
                                    </li>
                                </ul>
                        </div>
                        </div>
                     </form>
                  <!--</div>-->
               </div><!-- app-form-login -->
              
            </div>
         </div>
         <!-- /.container -->
      </div>
      <!-- wrap intro -->
      
      <?php include 'views/user/footer_user.php';?>
     

       