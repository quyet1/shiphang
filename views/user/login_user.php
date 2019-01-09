<div class="modal fade login-modal" id="login-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
        <h4 class="modal-title"><strong>LOG IN</strong></h4>
      </div>
      <div class="modal-body">
        <form action="https://topdev.vn/employers/users/loginUpdate" class="form-horizontal" role="form" id="login-popup-form" method="POST">
            <div class="box-message"></div>
		  <div class="form-group">
		    <div class="col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2">
		      	<input type="text" class="form-control input-margin" id="inputfield" name="inputfield" placeholder="Email or username" value="" >
                <div id="error_input_field"></div>
		    </div>
		  </div>
		  <div class="form-group">
		    <div class="col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 remove_icon">
		      	<input type="password" class="form-control input-margin check_pwd" id="login-password" name="login-password" placeholder="Password" value="">

                <span id="show_error"></span>
                <span id="result_check_pwd"></span>
		    </div>
		  </div>
		  <div class="form-group">
		    <div class="col-sm-offset-2 col-sm-10 col-md-8 col-md-offset-2">
		      <div class="checkbox">
		        <label>
		          <input type="checkbox" style="padding-top:0px;margin-top:-2px;" id="login-checkbox" name="login-checkbox">  Remember me next time
		        </label>
		        <label><a href="forgot-password.html">Forgot password?</a></label>
		      </div>
		    </div>
		  </div>

		  <div class="form-group">
		    <div class="col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2">
		      	<button type="submit" class="btn-create btn btn-lg col-sm-12 col-md-12 col-xs-12"><i class="icon_edit"></i>Log in</button>
                <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 no-padding or-login-with" style="padding-top:10px">or log in with</div>
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
                    <a href="javascript:void(0);" onclick="javascript:initiateSignIn();" style="color:#fff;font-size:20px;" class="btn-google btn-block btn btn-lg col-sm-12 col-md-12">
                        <i class="fa fa-google"></i>
                    </a>
                </li>
                <li>
                    <a style="color:#fff;font-size:20px;" class="btn-twitter btn-block btn btn-lg col-sm-12 col-md-12" href="login/indexb8f2.html">
                        <i class="fa fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a style="color:#fff;font-size:20px;" class="btn-linkedin btn-block btn btn-lg col-sm-12 col-md-12" href="login/indexb8f2.html">
                        <i class="fa fa-linkedin"></i>
                    </a>
                </li>
            </ul>
        </div>
          <!-- <div class="form-group block-login">
            <div class="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-btn-fb">
                    <button type="button" style="margin-top: 0" class="btn-facebook btn-block btn-login-facebook btn btn-lg col-sm-12 col-md-12"><i class="icon_facebook"></i> Facebook</button>
                </div>
				<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-btn-gg btn-signup-google" style="margin-top: 0">
					<a href="javascript:void(0);" onclick="javascript:initiateSignIn();" style="color:#fff;font-size:20px;padding: 5px 10px;"  class="bg-red btn-facebook btn-login-google btn btn-lg btn-primary col-sm-12 col-md-12"><i class="icon_google"></i> GOOGLE</a>
				</div>
		    </div>
		  </div> -->

		</form>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- /.modal -->

<script type="text/javascript">

	var login_pop_form = $("#login-popup-form").validate({

		errorElement: "span", // contain the error msg in a span tag
		errorClass: 'help-block',
        onkeyup: false,
		errorPlacement: function (error, element) { // render error placement for each input type
            if (element.attr("type") == "radio" || element.attr("type") == "checkbox") { // for chosen elements, need to insert the error after the chosen container
                error.insertAfter($(element).closest('.form-group').children('div').children().last());
            } else if (element.attr("name") == "dd" || element.attr("name") == "mm" || element.attr("name") == "yyyy") {
                error.insertAfter($(element).closest('.form-group').children('div'));
            } else {
                error.insertAfter(element);
                // for other inputs, just perform default behavior
            }
        },
        highlight: function(element){
        	$(element).closest('.help-block').removeClass('valid');
        	// display OK icon
        	$(element).parent().parent().removeClass('has-success').addClass('has-error has-feedback').find('.symbol').removeClass('ok').addClass('required');
        	$(element).closest('.form-group').find(".glyphicon-ok").remove();
        	$(element).after("<span class='glyphicon glyphicon-remove form-control-feedback'></span>");
        },
        unhighlight: function (element) { // revert the change done by hightlight
            $(element).closest('.form-group').removeClass('has-error');

            
            // set error class to the control group
        },
        success: function(label,element){
        	label.addClass('help-block');
        	$(element).parent().parent().removeClass('has-error').addClass('has-success has-feedback').find('.symbol').removeClass('ok').addClass('required');
        	$(element).closest('.form-group').find(".glyphicon-remove").remove();
        	$(element).after("<span class='glyphicon glyphicon-ok form-control-feedback'></span>");
        },
		    rules:{
                "inputfield" : {
                    required : true,
                    regex:"^[a-zA-Z0-9@'.'_\s]{5,40}$",
                    /*remote: {
                      type : "POST",
                      url : "",
                    },  */
                    minlength:5
                },
                "login-password" : {
                    required : true,
                    minlength : 8
                }
            },
             messages:{
                "inputfield":{
                    required : "This field is required",
                    remote : "The login details you entered were incorrect.",
                    minlength : "Too short. Use at least 8 characters.",
                    regex : 'Sorry! No special characters.'

                },
                "login-password":{
                    required : "This field is required",
                    minlength : "Too short. Use at least 8 characters."
                }
            },
            submitHandler: function (form) {
                var url = 'loginUpdate.html';
                //var dataForm = new FormData(this);
                $.ajax({
                    type :"POST",
                    url : url,
                    data : $("#login-popup-form").serializeArray(),
                    beforeSend: function(){

                    },
                    success: function(data){
                        var res = $.parseJSON(data);
                        if(res.status === 'success'){
                            if(res.msg == "url")
                                window.location.href = res.redirect_url;
                            else if(res.msg == "worker")
                                window.location.href = BASE_URL+'jobseeker/viewMyJobs';
                            else if(res.msg == "employer")
                                window.location.href = BASE_URL+'employers/jobs';
                        }else{
                            $('.box-message').html(showMessage('error', res.msg));
                            // sai mật khẩu

                        }
                    }
                });
            }

	});

</script>
<script type="text/javascript">
    $(document).ready(function () {
        // pop-up login
        $("#link-log-in").click(function (e) {
            e.preventDefault();
            $("#login-modal").modal('show');
        })// end tag <a> click
    });
    $('.ul-alert-message li').click(function(){
        window.location.href = $(this).attr('data-url');
    });
    $('.ul-alert-notification-click li').click(function(){
        window.location.href = $(this).attr('data-id');
    });
    $('.ul-alert-project-feed-click li').click(function(){
        window.location.href = BASE_URL+"detail-jobs/"+$(this).data('alias')+'-'+$(this).data('id');
    });
</script>


        </div>
    </div> <!-- header-top -->

    </header>


    <div class="wrap-intro">
        <div class="container">
            <div class="row">
                <div class="app-signup app-form app-form-login col-lg-12 col-xs-12 col-md-12 col-sm-12">

                    <div class="col-md-5 col-sm-5 img-signup">
                        <img class="img-responsive" src="../app/css/images/bg_login.png">
                    </div>

                    <div class="col-md-7 col-sm-7">
                        <form id="frm-login" method="POST" action="#">
                                                        <div class="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 no-padding">
                                <h2>Forgot your password?</h2>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 no-padding">
                                    <input type="text" name="email" id="email" class="form-control" value=""  placeholder='Email'>
                                    <span class="help-block"></span>
                                </div>
                                                                    <div style="margin-bottom: 10px;margin-top: 10px;" class="g-recaptcha col-sm-10 col-sm-offset-1 col-md-10 no-padding col-md-offset-1" data-sitekey="6LfwEQcTAAAAAH6yVhgkQ5Ir4KZRdv3iJ4my27Bt"></div>
                                    <div class="col-sm-10 col-sm-offset-1 col-md-10 no-padding col-md-offset-1"></div>

                                                                <span class="col-lg-12 col-md-12 col-sm-12 col-xs-12 help-block"></span>
                            <div class="form-group">
                                <div class="col-sm-10 col-sm-offset-1 col-md-10 no-padding col-md-offset-1">
                                    <button type="submit" name="forgotPassword" value="forgotPassword" class="btn btn-create col-sm-12 col-md-12 col-xs-12 btn-lg">
                                        <i class="icon_edit"></i>Reset Password</button>
                                </div>
                            </div>
                                                    </form>
                    </div>
                </div>
                <!-- app-form-login -->
            </div>

        </div>
        <!-- /.container -->
    </div> <!-- wrap intro -->

    <script language="javascript" type="text/javascript">
        $(document).ready(function () {

            $("#frm-login").validate({
                errorElement: "span", // contain the error msg in a span tag
                errorClass: 'help-block',
                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.attr("type") == "radio" || element.attr("type") == "checkbox") { // for chosen elements, need to insert the error after the chosen container
                        error.insertAfter($(element).closest('.form-group').children('div').children().last());
                    } else if (element.attr("name") == "dd" || element.attr("name") == "mm" || element.attr("name") == "yyyy") {
                        error.insertAfter($(element).closest('.form-group').children('div'));
                    } else {
                        error.insertAfter(element);
                        // for other inputs, just perform default behavior
                    }
                },
                highlight: function (element) {
                    $(element).closest('.help-block').removeClass('valid');
                    // display OK icon
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error').find('.symbol').removeClass('ok').addClass('required');
                    $(element).closest('.form-group').find(".glyphicon-ok").remove();
                    $(element).after("<span class='glyphicon glyphicon-remove form-control-feedback'></span>");

                    // add the Bootstrap error class to the control group
                },
                unhighlight: function (element) { // revert the change done by hightlight
                    $(element).closest('.form-group').removeClass('has-error');
                    // set error class to the control group
                },
                success: function (label, element) {
                    label.addClass('help-block valid');
                    // mark the current input as valid and display OK icon
                    $(element).closest('.form-group').removeClass('has-error').addClass('has-success').find('.symbol').removeClass('required').addClass('ok');
                    $(element).closest('.form-group').find(".glyphicon-remove").remove();
                    $(element).after("<span class='glyphicon glyphicon-ok form-control-feedback'></span>");
                },
                rules: {
                    "email" : {
                        required : true,
                        email : true
                    },
                    "captcha": {
                        required: true
                    }
                },
                messages: {
                    "email" : {
                        required : "This field is required",
                        email : "Please enter a valid email address."
                    },
                    "captcha": {
                        required: "This field is required"
                    }
                },
                submitHandler:function(form){
                    form.submit();
                }

            });

        });
    </script>
<!-- Modal view cv online -->
<div id="cv-modal" class="modal fade cv-modal" tabindex="-1" style="display: none;"></div>
<!-- Modal apply -->
<div id="apply-modal" class="modal fade apply-modal" tabindex="-1" style="display: none;"></div>
<!-- Modal apply -->
<div id="invite-modal" class="modal fade invite-modal" tabindex="-1" style="display: none;"></div>
<!-- Modal Alert -->
<div class="modal fade " tabindex="-1" role="dialog" id="alert-modal">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <p>Vui lòng chọn ít nhất 1 việc làm.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-primary" data-dismiss="modal">OK</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal Delete -->
<div class="modal fade" tabindex="-1" role="dialog" id="delete-modal" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <p id="modal-delete-message">Bạn có thực sự muốn xóa việc làm đã chọn?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Hủy</button>
                <button id="deleteJobBtn" type="button" class="btn btn-sm btn-primary">Xóa</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal-avatar-user-edit" tabindex="-1" role="dialog" aria-labelledby="avatar-modal-label"
         aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form class="avatar-user-form" method="post"
                  action="https://topdev.vn/employers/cropavatar/CropAvatarUser"
                  encrypt="multipart/form-data">
                <div class="modal-header">

                    <h4 class="modal-title" id="avatar-modal-label">Change Avatar</h4>
                </div>
                <div class="modal-body">
                    <div class="avatar-user-body">

                        <!-- Upload image and data -->
                        <div class="avatar-user-upload">
                            <input class="avatar-user-src" name="avatar_src" type="hidden">
                            <input class="avatar-user-data" name="avatar_data" type="hidden">

                            <label for="avatarInput">Local upload</label>
                            <input class="avatar-user-input" id="avatarInput" name="avatar_file" type="file">
                        </div>

                        <!-- Crop and preview -->
                        <div class="row">
                            <div class="col-md-9">
                                <div class="avatar-user-wrapper"></div>
                            </div>
                            <div class="col-md-3">
                                <button id="close-avatar-user" class="btn btn-default" type="button">Close</button>
                                <button class="btn btn-primary avatar-user-save" id="avatar-user-save"
                                        type="submit">Save
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </form>
        </div>
    </div>
</div><!-- /.modal -->
<div class="modal fade" id="dialog-delete-section" tabindex="-1" role="dialog" aria-labelledby="delete-confirmation" aria-hidden="true" style="display: none;">
    <form>
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button btn-sm" class="close" data-dismiss="modal">
                        <span aria-hidden="true" tabindex="8">×</span>
                        <span class="sr-only">Đóng</span>
                    </button>
                    <strong class="modal-title">Xác nhận</strong>
                </div>
                <div class="modal-body">
                    <p>Bạn có chắc là bạn muốn xóa không?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-sm" data-dismiss="modal" tabindex="9">Hủy</button>
                    <button type="button" class="btn btn-primary btn-sm" tabindex="10">Đồng ý xóa</button>
                </div>
            </div>
        </div>
    </form>
</div>