<?php

class Forgotpass_Controller extends Controller{
    //put your code here
     public function __construct(){
	   parent::__construct();
	}
        function index(){
            //$this->view->render("header");
            $this->view ->title = 'ShipCom - Lấy lại mật khẩu';
		$this->view->render("user/forgot-password");
                //$this->view->render("footer");
        }
}
