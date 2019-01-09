<?php
ob_start();
session_start();
class Dangky_Controller extends Controller {
    //put your code here
    public function __construct(){
	   parent::__construct();
	}
        function index(){
            if(!isset($_SESSION['user'])){
                $this->view ->title = 'ShipCom - Đăng Ký';
		$this->view->render("user/dangky");
            }
            else {
                 $this->view ->redirect();
            }
        }
        public function dangky(){
             if(!isset($_SESSION['user']))
                {
                 if(isset($_POST['usersConfirm'])){
                    if(trim($_POST['password'])=== trim($_POST['repassword'])){
                        if($this->model->account_exists(addslashes(trim($_POST['username'])))==FALSE){
                            if($this->model->dangkythanhvien() === TRUE){
                                print("Đăng Ký thành công! đăng nhập để tiếp tục!");
                                echo'<head>';
                                echo '<title>Đang Chuyen Trang...</title>';
                                echo '<meta http-equiv="refresh" content="4;http://localhost/Shipcom/dangnhap">';
                                echo '</head>';
                                //$this->view->redirect();
                            } else {
                               echo '<script language="javascript">alert("[LỖI]\nĐăng ký không thành công, vui lòng thử lại hoặc liện hệ với chúng tôi");window.location="'. __SITE_PATH.'dangky";</script>';
                            }
                        }else {
                            echo '<script language="javascript">alert("UserName này đã được sử dụng để đăng ký! vui lòng nhập lại UserName khác");window.location="'. __SITE_PATH.'dangky";</script>';
                        }
                    } else {
                        echo '<script language="javascript">alert("Mật khẩu không trùng nhau, Vui lòng kiểm tra lại");window.location="'. __SITE_PATH.'dangky";</script>';
                    }
                 }
            }
        }
}