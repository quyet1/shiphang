<?php
ob_start();
session_start();
class Hotro_Controller extends Controller{
    //put your code here
     public function __construct(){
              parent::__construct();
           }
           function index(){
                    $this->view ->title = 'ShipCom - Hỗ trợ';
                    $this->view->render("header");
                   $this->view->render("hotro/lienhe");
                   $this->view->render("footer");
           }
}
