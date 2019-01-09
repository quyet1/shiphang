<?php include 'views/user/hearder_user.php';?>

<div class="wrap-intro">
      <div class="container">
         <div class="row">
            <div class="app-signup app-form app-form-login col-lg-12 col-xs-12 col-md-12 col-sm-12">
                <div class="col-md-5 col-sm-5 img-signup">
                    <img class="img-responsive" src="public/images/logo/shipper-logo.png">
                </div>
               <div class="col-md-7 col-sm-7">
                  <form id="frm-login" method="POST" action="#">
                     <div class="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 no-padding">
                        <h2>Quên mật khẩu?</h2>
                     </div>
                     <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 no-padding">
                           <input type="text" name="email" id="email" class="form-control" value=""  placeholder='Nhập Email'>
                           <span class="help-block"></span>
                        </div>
                        <div style="margin-bottom: 10px;margin-top: 10px;" class="g-recaptcha col-sm-10 col-sm-offset-1 col-md-10 no-padding col-md-offset-1" data-sitekey="6LfwEQcTAAAAAH6yVhgkQ5Ir4KZRdv3iJ4my27Bt"></div>
                        <div class="col-sm-10 col-sm-offset-1 col-md-10 no-padding col-md-offset-1"></div>
                        <span class="col-lg-12 col-md-12 col-sm-12 col-xs-12 help-block"></span>
                        <div class="form-group">
                           <div class="col-sm-10 col-sm-offset-1 col-md-10 no-padding col-md-offset-1">
                              <button type="submit" name="forgotPassword" value="forgotPassword" class="btn btn-create col-sm-12 col-md-12 col-xs-12 btn-lg">
                              <i class="icon_edit"></i>Đặt lại mật khẩu</button>
                           </div>
                        </div>
                  </form>
                  </div>
               </div>
               <!-- app-form-login -->
            </div>
         </div>
         <!-- /.container -->
      </div>
      <!-- wrap intro -->
      <script>
         $(document).ready(function(){
             var status = '';
             var email = '';
             var username = '';
             var avatar = '';
             if (status == "not-exist") {
                 $("#modal-appota-register input[name='email']").val(email);
                 $("#modal-appota-register input[name='username']").val(username);
                 $("#modal-appota-register").modal('show');
                 if(avatar != ''){
                     $(".image-avatar-google").attr('src', avatar);
                 }
             } else if (status == "appota-exist") {
                 $("#email-login-appota").text(email);
                 $("#modal-login-register input[name='username']").val(username);
                 $("#modal-login-appota").modal('show');
                 if(avatar != '') {
                     $(".image-avatar-appota").attr('src', avatar);
                 }
             }
         
             $(".rating").rating('refresh',{showCaption:true,clearCaption:'0'});
         
             // change option search
             $('.search-type').change(function(){
                 var optionSearch = $(this).val();
         
                 if(optionSearch == 0){
                     $(this).parents('form').find('.search').attr('placeholder', "");
                     $(this).parents('form').attr('action', "../browse-projects.html");
                 }else if(optionSearch == 1){
                     $(this).parents('form').find('.search').attr('placeholder', "");
                     $(this).parents('form').attr('action', "../find-freelancer.html");
                 }
             });
         });
         
      </script>
      
<?php include 'views/user/footer_user.php';?>