<?php
ob_start();
session_start();
class Dangkynhanh_Controller extends Controller{
    //put your code here
    public function __construct(){
	   parent::__construct();
	}
        function index(){
             if(!isset($_SESSION['user'])){
                  $this->view ->title = 'ShipCom - Đăng Ký nhanh';
		$this->view->render("user/dangkynhanh");
             } else {
                $this->view->redirect();
            }
        }
        public function registry(){
            if(!isset($_SESSION['user'])){
		if(isset($_POST['registryexpre'])){
                    if(trim($_POST['pass'])=== trim($_POST['repass'])){
                        $phone = addslashes(trim($_POST['phone']));
                        $pass = md5(addslashes(trim($_POST['pass'])));
                        if($this->model->account_exists($phone) == FALSE){
                            $mathanhvien = "SC_TV".$phone;
                            if($this->model->registryexpre($mathanhvien, $phone,$pass) == TRUE){
                                print("Đăng Ký thành công! đăng nhập để tiếp tục!");
                                echo'<head>';
                                echo '<title>Đang Chuyen Trang...</title>';
                                echo '<meta http-equiv="refresh" content="4;http://localhost/Shipcom/dangnhap">';
                                echo '</head>';
                            } else {
                               echo '<script language="javascript">alert("[LỖI]\nĐăng ký không thành công, vui lòng thử lại hoặc liện hệ với chúng tôi");window.location="'. __SITE_PATH.'dangkynhanh";</script>';
                            }
                        } else {
                            echo '<script language="javascript">alert("Số điện thoại này đã được sử dụng để đăng ký! vui lòng nhập lại số điện thoại khác");window.location="'. __SITE_PATH.'dangkynhanh";</script>';
                        }
                    }else {
                        echo '<script language="javascript">alert("Mật khẩu không trùng nhau, Vui lòng kiểm tra lại");window.location="'. __SITE_PATH.'dangkynhanh";</script>';
                    }
                }
            }
        }
}
