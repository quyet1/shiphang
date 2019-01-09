<?php
ob_start();
session_start();
class Dangnhap_Controller extends Controller{
	public function __construct(){
	   parent::__construct();
	}
	public function index(){
            if(!isset($_SESSON['user'])){
                $this->view ->title = 'ShipCom - Đăng Nhập';
		$this->view->render("user/dangnhap");
            } else {
                $this->view->redirect();
            }
	}
	public function login(){
            if(!(Session::get('user')))
            {
		if(isset($_POST['dangnhap'])){
                                $user= addslashes(trim($_POST['username']));
                                $pass= md5(addslashes(trim($_POST['password'])));
				if($this->model->login($user,$pass)==true){
                                    Session::set('user',$_POST['username']);
                                    
                                    Session::set('loaitv',$this->model->getLoaiTV($_POST['username']));
                                    $k = Session::get('loaitv');
                                    $this->view->redirect();
				}else{
                                   echo '<script language="javascript">alert("Tài khoản hoặc mật khẩu không hợp lệ!");window.location="'. __SITE_PATH.'dangnhap";</script>';
				}
			}
		}
            else {
                $this->view->redirect();
            }
        }
}
?>