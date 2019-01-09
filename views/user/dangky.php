<?php include 'views/user/hearder_user.php';?>
<div class="wrap-intro">
         <div class="container">
            <div class="row">
                
               <div class="app-form app-signup col-lg-12 col-xs-12 col-sm-12">
                   <div class="col-md-5 col-sm-5 img-signup" style="margin-top: 100px">
                       <img class="img-responsive" src="<?php __SITE_PATH?>public/images/logo/shipper-logo.png">
                </div>
                  <div class="col-md-7 col-sm-7 no-padding">
                      <form id="form-signup" method="POST" role="form" enctype='multipart/form-data' action="dangky/dangky">
                        <div class="col-md-12 no-padding">
                           <div >
                               <h2 class="" style="text-align: left">Đăng Ký Làm Việc</h2>
                           </div>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 no-padding">
                           <div class="no-padding col-md-12 col-sm-12 col-xs-12 form-group">
                               <span style="color: red; font-size: 15px">Tên Đăng Nhập(*):</span>
                               <input type="text" name="username" id="username" class="form-control" value=""  placeholder='Shipcom' required>
                              <span class="help-block"></span>
                           </div>
                           <div class="col-md-12 col-xs-12 col-sm-12 form-group no-padding">
                               <span style="color: red; font-size: 15px">Tên đầy đủ của bạn:</span>
                              <input type="text" name="fullname" id="fullname" value="" class="form-control" placeholder='Nguyễn Văn A'>
                              <span class="help-block"></span>
                           </div>
                           <div class="col-md-12 col-sm-12 no-padding form-group col-xs-12">
                               <span style="color: red; font-size: 15px">Ngày sinh:</span>
                               <input type="date" name="birth" id="birth" value="" class="form-control">
                              <span class="help-block"></span>
                           </div>
                             <div class="col-md-12 col-sm-12 no-padding form-group col-xs-12">
                                 <span style="color: red; font-size: 15px">Địa chỉ hiện tại:</span>
                                 <input type="text" name="address" id="Address" value="" class="form-control"  placeholder='p.Hòa Quý, q.Ngũ Hành Sơn, tp.Đà Nẵng'>
                              <span class="help-block"></span>
                           </div>
                             <div class="col-md-12 col-sm-12 no-padding form-group col-xs-12">
                                 <span style="color: red; font-size: 15px">Địa chỉ email:</span>
                                 <input type="email" name="email" id="email" value="" class="form-control"  placeholder='huanoaz@gmail.com'>
                              <span class="help-block"></span>
                           </div>
                             <div class="col-md-12 col-sm-12 no-padding form-group col-xs-12">
                                 <span style="color: red; font-size: 18px">Số điện thoại(*):</span>
                                 <input type="text" name="phonenum" id="phonenum" value="" class="form-control" required="Không được rỗng" pattern="([1-9])+(?:-?\d){4,}"  placeholder='0978512938'>
                              <span class="help-block"></span>
                           </div>
                            <div class="col-md-12 col-sm-12 no-padding form-group col-xs-12">
                                <span style="color: red; font-size: 15px">Số chứng minh nhân dân:</span>
                                 <input type="text" name="socmnd" id="socmnd" value="" pattern="([1-9])+(?:-?\d){4,}" class="form-control"  placeholder='212373586'>
                              <span class="help-block"></span>
                           </div>
                            
                             <div class="col-md-12 col-sm-12 no-padding form-group col-xs-12">
                                 <span style="color: red; font-size: 15px">Hình đại diện:</span>
                                 <input type="file" name="image[]" accept="image/png" class="form-control" title="Chọn hình">
                              <span class="help-block"></span>
                           </div>
                            <div class="col-md-12 col-sm-12 no-padding form-group col-xs-12">
                                <span style="color: red; font-size: 15px">Hình chứng minh nhân dân(Mặt trước):</span>
                                 <input type="file" name="image[]" value="" accept="image/png" class="form-control" title="Chọn hình">
                              <span class="help-block"></span>
                           </div>
                            <div class="col-md-12 col-sm-12 no-padding form-group col-xs-12">
                                <span style="color: red; font-size: 15px">Hình chứng minh nhân dân(Mặt sau):</span>
                                <input type="file" name="image[]" accept="image/png" class="form-control" title="Chọn hình">
                              <span class="help-block"></span>
                           </div>
                            
                            <div class="col-md-12 col-sm-12 no-padding form-group col-xs-12">
                                <span style="color: red; font-size: 15px">Mật khẩu đăng nhập:</span>
                              <input type="password" name="password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" id="password" value="" required class="form-control" placeholder='abc123456789'>
                              <span class="help-block"></span>
                           </div>
                           <div class="col-md-12 col-sm-12 no-padding form-group col-xs-12">
                               <span style="color: red; font-size: 15px">Nhập lại mật khẩu:</span>
                              <input type="password" name="repassword" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" id="confirm-password" required value="" class="form-control" placeholder='abc123456789'>
                           </div>
                            <div style="margin-bottom: 10px;margin-top: 10px;" class="g-recaptcha col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                
                            </div>
                           <div style="margin-left: 15px"></div>
                        </div>
                      
                        <input type="hidden" value="" name="avatar-facebook" id="img-avatar-facebook" />
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 agree">
                           Khi nhấn vào đăng ký là bạn đã đồng ý với các quy định dịch vụ của chúng tôi.<a class="green-2" href="<?php echo __SITE_PATH?>dieukhoandichvu">Quy Định</a>.
                        </div>
                        <div class="form-group">
                           <div class=" col-md-12 col-lg-12 col-sm-12 col-xs-12 no-padding">
                              <button type="submit" name="usersConfirm" class="btn btn-create btn-lg col-sm-12 col-md-12 col-xs-12">
                                  <i class="icon_edit">
                                  </i> Đăng Ký Ngay					
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
               </div><!-- app-form-login -->
              
            </div>
         </div>
         <!-- /.container -->
      </div>
      <!-- wrap intro -->
      
      <?php include 'views/user/footer_user.php';?>
     

       