<?php
ob_start();
session_start();
class profile_Controller extends Controller{
    public function __construct() {
        parent::__construct();
    }
    
    public function index() {
         if((Session::get('user'))){
            $this->view->ThongTin = $this->model->getInfoThanhVienByMaThanhVien(Session::get('user'));
            $this->view ->User = Session::get('user');
            $this->view->render('header');
            $this->view->render('user/profile');
            $this->view->render('footer');
        }
    }
    //put your code here
}
