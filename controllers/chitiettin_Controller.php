<?php
ob_start();
session_start();
class Chitiettin_Controller extends Controller {
    //put your code here
    public function __construct(){
        parent::__construct();
    }    
    function index(){
        if((Session::get('user'))){
            $huanit = Session::get('loaitv');
            if(Session::get('loaitv')=='2'){
                $this->view->title = "ShipCom - Chi tiết tin";
                if(isset($_GET['id'])){
                    $id = ($_GET['id']);
                    if($id !=""){
                        $resualt = $this->model->getListByID($id);
                        $this->view->cttin= $resualt;
                        $this->view ->images = $this->model->getImages($id);
                        $this->view->render("header");
                        $this->view->render("tinvieclam/chitiettin");
                        $this->view->render("footer");
                    }
                }
            }else{
            echo '<script language="javascript">alert("Bạn không đủ quyền để xem chi tiết tin!");javascript:window.close();</script>';//window.location="'. __SITE_PATH.'vieclam"
	}
        }else{
            echo '<script language="javascript">alert("Đăng nhập để xem chi tiết tin!");window.location="'. __SITE_PATH.'dangnhap";</script>';
	}
    }            
}