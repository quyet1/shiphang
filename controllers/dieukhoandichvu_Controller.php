<?php
ob_start();
session_start();
class Dieukhoandichvu_Controller extends Controller {
    //put your code here
     public function __construct(){
              parent::__construct();
           }
           function index(){
               $this->view ->title = 'ShipCom - Điều khoản dịch vụ';
               $this->view->render("header");
                   $this->view->render("hotro/dieukhoandichvu");
                   $this->view->render("footer");
           }
    
}
