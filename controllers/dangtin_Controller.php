<?php
ob_start();
session_start();
class dangtin_Controller extends Controller{
    public function __construct(){
              parent::__construct();
           }
           public function index(){
               if((Session::get('user'))){
                    $this->view->catalog = $this->model->showcatalog();
                    $this->view->data = $this->model->Showlocation();
                    $this->view ->title = 'ShipCom - Đăng Tin';
                    $this->view->render("header");
                    $this->view->render("tinvieclam/dangtin");
                    $this->view->render("footer");
               }
                else {
                     echo '<script language="javascript">alert("Vui lòng đăng nhập để đăng tin!");window.location="'. __SITE_PATH.'dangnhap";</script>';
                }
           }
           public function action(){
                    if(isset($_POST['submitfrm'])){
                            if($this->model->dangtins() == TRUE){
                                echo '<script language="javascript">alert("Đăng tin thành công");window.location="'. __SITE_PATH.'vieclam";</script>';
                                } else {
                                    echo '<script language="javascript">alert("[ERROR]\nĐăng tin không thành công, Vui lòng kiểm tra lại dữ liệu!");window.location="'. __SITE_PATH.'dangtin";</script>';
                                }
                        }
            }
    }