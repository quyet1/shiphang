<?php
ob_start();
session_start();
class dangxuat_Controller  extends Controller{
    public function __construct(){
	   parent::__construct();
	}
	public function index(){
		if(isset($_SESSION['user'])){
                    unset($_SESSION['user']);
                    unset($_SESSION['loaitv']);
                    $this->view->redirect();
                } else {
                    $this->view->redirect();
                }
        }
}
