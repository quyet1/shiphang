<?php

class admin_Controller extends Controller {
    public function __construct() {
        parent::__construct();
    }
    public function index() {
        $this->view->render('admin/header_admin');
        //S$this->view->render('admin/adminThanhVien');
        $this->view->render('admin/footer_admin');
        
    }
}
