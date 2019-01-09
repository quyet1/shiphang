<?php
ob_start();
session_start();
require 'models/pagination.php';
class vieclam_Controller extends Controller{
    
    public function __construct(){
	   parent::__construct();
	}
        public function index(){
            $Pagination = new Pagination();
            $limit = $Pagination->limit; // Số record hiển thị trên một trang
            $start = $Pagination->start();
            $totalRecord = $this->model->totalrow(); // Tổng số user có trong database
            $totalPages = $Pagination->totalPages($totalRecord);
            $this->view ->title = 'ShipCom - Tin việc làm';
            $this->view-> catalogzz = $this->model->showcatalog();
            $this->view->locationszz = $this->model->Showlocation();
            $this->view->titlework= "Tất cả công việc";
            $this->view->allwork = $this->model->getAllWork($start,$limit);
            
            $this->view->render("header");
            $this->view->render("tinvieclam/vieclam");
            echo '<center>';
            echo '<div id="pagination">';
            echo $Pagination->listPages($totalPages);
            echo '</div>';
            echo '</center>';
            $this->view->render("footer");
        }
        public function timvieclam() {
            if(isset($_GET['find'])){
                $array = array();
                
                $keywword = isset($_GET['keyword'])?addslashes(trim($_GET['keyword'])):"";
                if($keywword !=""){
                    $value = "TIEUDE LIKE '%$keywword%'";
                    array_push($array, $value);
                }
                $danhmuc = isset($_GET['id'])?addslashes($_GET['id']):"";
                if($danhmuc !=""){
                    $value = "MADANHMUCTIN='$danhmuc'";
                    array_push($array, $value);
                }
                $tinhdau = isset($_GET['diadiemdaufind'])?addslashes(trim($_GET['diadiemdaufind'])):"";
                $tinhcuoi = isset($_GET['dgtiadiemcuoifind'])?addslashes($_GET['diadiemcuoifind']):"";
                $huyendau = isset($_GET['district_id'])?addslashes(trim($_GET['district_id'])):"";// get id địa điểm quận huyện nơi đi
                $huyencuoi = isset($_GET['district_id1'])?addslashes($_GET['district_id1']):""; //get id địa điểm quận huyện nơi đến
                
                if($huyendau !=""){
                    $value = "DIADIEMDAU='$huyendau'";
                    array_push($array, $value);
                }
                if($huyendau ==="" && $tinhdau !=""){
                    //gọi hàm trả về danh sách các huyện. sau đó dùng DIADIEMDAU IN(..,..,..) để tạo truy vấn
                    $listDistrict = $this->model->getListIdDistrict($tinhdau);
                    if($listDistrict !=""){
                        $value = "DIADIEMDAU IN($listDistrict)";
                        array_push($array, $value);
                    }
                }
                if($huyencuoi !=""){
                    $value = "DIADIEMCUOI='$huyencuoi'";
                    array_push($array, $value);
                }
                if($huyencuoi ==="" && $tinhcuoi !=""){
                    //gọi hàm trả về danh sách các huyện. sau đó dùng DIADIEMDAU IN(..,..,..) để tạo truy vấn
                    $listDistricts = $this->model->getListIdDistrict($tinhcuoi);
                    if($listDistricts !=""){
                        $value = "DIADIEMDAU IN($listDistricts)";
                        array_push($array, $value);
                    }
                }
                //thực hiện tìm kiếm khi có dữ liệu đưa vào. ngược lại thì gọi mặc định
                if(count($array)>0){
                    //chuyển mảng thành chuỗi\\
                    $param = "";
                    for($i=0; $i<count($array); $i++){
                        $temp="";
                        if($i==count($array)-1){
                            $temp = "$array[$i]";
                        } else {
                            $temp = "$array[$i]"." ". "AND"." ";
                        }
                        $param =$param.$temp;
                    }
                    if($param !=""){
                        $Pagination = new Pagination();
                        $limit = $Pagination->limit; // Số record hiển thị trên một trang
                        $start = $Pagination->start();
                        $totalRecord = $this->model->totalrowfinded($param); // Tổng số user có trong database
                        $totalPages = $Pagination->totalPages($totalRecord);
                        $this->view ->title = 'ShipCom - Tin việc làm';
                        $this->view-> catalogzz = $this->model->showcatalog();
                        $this->view->locationszz = $this->model->Showlocation();
                        $this->view->titlework= "Tin hiện có";
                        $this->view->allwork = $this->model->findata($param, $start,$limit);
                        $this->view->render("header");
                        $this->view->render("tinvieclam/timvieclam");
                        echo '<center>';
                        echo '<div id="pagination">';
                        echo $Pagination->listPages($totalPages);
                        echo '</div>';
                        echo '</center>';
                        $this->view->render("footer");
                    } else {
                        header('Location: ' . $_SERVER['HTTP_REFERER']);
                    }
                   
            }else {
                header('Location: ' . $_SERVER['HTTP_REFERER']);
            }
            }
        }
           
}