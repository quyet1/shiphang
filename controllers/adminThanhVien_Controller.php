<?php
class adminThanhVien_Controller extends Controller {
    public function __construct() {
        parent::__construct();
    }
    public function index() {
        $this->view->AllThanhVien = $this->model->getAllThanhVien();
        $this->view->render('admin/header_admin');
        $this->view->render('admin/adminThanhVien');
        $this->view->render('admin/footer_admin');
    }
    public function delThanhVien() {
        try {
            if(isset($_GET['id'])){
                if($_GET['id'] !=""){
                    $matv = addslashes(trim($_GET['id']));
                    if($this->model->delThanhVien($matv)==TRUE){
                        echo '<script language="javascript">alert("Xóa thành công");window.location="'. __SITE_PATH.'adminThanhVien";</script>';
                    }else {
                        echo '<script language="javascript">alert("ERROR\nXóa không thành công, Vui lòng kiểm tra lại!");window.location="'. __SITE_PATH.'adminThanhVien"; </script>';//window.location="'. __SITE_PATH.'admin";             
                   }
                }
            }
        } catch (Exception $exc) {
            echo $exc->getMessage();
        }
    }
    
}
