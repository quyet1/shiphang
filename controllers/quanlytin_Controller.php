<?php
ob_start();
session_start();
//require 'models/pagination.php';
class quanlytin_Controller extends Controller {
    //put your code here
    public function __construct() {
        parent::__construct();
    }
    public function index(){
         if((Session::get('user'))){
            $mathanhvien =$this->model->getMathanhvienByuser(Session::get('user'));
            $this->view ->title = 'ShipCom - Quản lý tin đã đăng';
            $this->view ->alltin = $this->model->getAlltin($mathanhvien[0]['MATAIKHOAN']);
            
            $this->view->render("header");
            $this->view->render("tinvieclam/quanlytindang");
            $this->view->render("footer");
        }
        else {
            $this->view->render("header");
                   print '<center><h2 style="color:red; margin-top:50px">Vui Lòng Đăng Nhập</h2></center>';
                   $this->view->render("footer");
        }
    }
    public function del() {
        if(isset($_GET['id'])){
            if($_GET['id'] !=""){
                if($this->model->del(addslashes(trim($_GET['id'])))==TRUE){
                    echo '<script language="javascript">alert("Xóa thành công");window.location="'. __SITE_PATH.'quanlytin";</script>';
                }else {
                    echo '<script language="javascript">alert("ERROR\nXóa không thành công, Vui lòng kiểm tra lại!");window.location="'. __SITE_PATH.'quanlytin";</script>';
                    
               }
            }
        }
    }
    public function edit() {
        if(isset($_GET['id'])){
            if($_GET['id'] !=""){
                if($this->model->checktin($_GET['id'])==TRUE){
                    $this->view->catalog = $this->model->showcatalog();
                    $this->view->tincu = $this->model->gettin($_GET['id']);
                    $this->view->data = $this->model->Showlocation();
                    //print_r($this->view->data);
                    $this->view ->title = 'ShipCom - Sửa tin';
                    $this->view->render("header");
                    $this->view->render("tinvieclam/edittin");
                    $this->view->render("footer");
                } else {
                    echo '<script language="javascript">alert("Không thể xóa tin!");window.location="'. __SITE_PATH.'quanlytin";</script>';
                }
            }
        }
    }
    public function editaction() {
                        if(isset($_POST['submitfrm'])){
                            $matins = $_POST['matin'];
                            $path = 'upload/baidang/'.$matins;
                            $this->model->deleteDir($path);
                            if($this->model->edittin($matins) == TRUE){
                                //do something
                                //$this->view->redirect('vieclam');
                                echo '<script language="javascript">alert("Sửa tin thành công");window.location="'. __SITE_PATH.'quanlytin";</script>';
                                } else {
                                    //$this->view->redirect('dangtin');
                                    echo '<script language="javascript">alert("[ERROR]\nSửa tin không thành công, Vui lòng kiểm tra lại dữ liệu!");window.location="'. __SITE_PATH.'quanlytin";</script>';
                                }
                        }
        
    }
}
