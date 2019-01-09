<?php
ob_start();
session_start();
class index_Controller extends Controller{
	public function __construct(){
		parent::__construct();
	}
	public function index(){
                $this->view ->title = 'ShipCom - Trang Chủ';
                $this->view->render("header");
		$this->view->render("index/home");
                $this->view->render("footer");
	}
}
?>