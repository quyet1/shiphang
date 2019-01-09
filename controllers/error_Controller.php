<?php
ob_start();
session_start();
class error_Controller extends Controller{
	public function __construct(){
		parent::__construct();
	}
	public function index(){
            $this->view ->title = '404 - Lỗi truy cập trang';
            $this->view->render("header");
            $this->view->render("error/page-not-found");
            $this->view->render("footer");
	}
}
?>