<?php
ob_start();
session_start();
require 'models/pagination.php';
class timkiemnhanh_Controller extends Controller {
    public function __construct() {
        parent::__construct();
    }
    public function index(){
        if(isset($_GET['find'])){
                $array = array();
                $keytimkiem = array();
                $keywword = isset($_GET['keyword'])?addslashes(trim($_GET['keyword'])):"";
                array_push($keytimkiem, $keywword);
                if($keywword !=""){
                    $value = "TIEUDE LIKE '%$keywword%'";
                    array_push($array, $value);
                }
                $danhmuc = isset($_GET['id'])?addslashes($_GET['id']):"";
                array_push($keytimkiem, $this->getNameCatalogbyId($danhmuc));
                if($danhmuc !=""){
                    $value = "MADANHMUCTIN='$danhmuc'";
                    array_push($array, $value);
                }
                $tinhdau = isset($_GET['diadiemdaufind'])?addslashes(trim($_GET['diadiemdaufind'])):"";
                $tinhcuoi = isset($_GET['diadiemcuoifind'])?addslashes($_GET['diadiemcuoifind']):"";
                $huyendau = isset($_GET['district_id'])?addslashes(trim($_GET['district_id'])):"";// get id địa điểm quận huyện nơi đi
                $huyencuoi = isset($_GET['district_id1'])?addslashes($_GET['district_id1']):""; //get id địa điểm quận huyện nơi đến
                array_push($keytimkiem, $this-> getNameDistrictById($huyendau));
                if($huyendau !=""){
                    $value = "DIADIEMDAU='$huyendau'";
                    array_push($array, $value);
                }
                array_push($keytimkiem, $this->getNameProvinceById($tinhdau));
                if($huyendau ==="" && $tinhdau !=""){
                    //gọi hàm trả về danh sách các huyện. sau đó dùng DIADIEMDAU IN(..,..,..) để tạo truy vấn
                    $listDistrict = $this->getstring($tinhdau);
                    if($listDistrict !=""){
                        $value = "DIADIEMDAU IN($listDistrict)";
                        array_push($array, $value);
                    }
                }
                array_push($keytimkiem, $this->getNameDistrictById($huyencuoi));
                if($huyencuoi !=""){
                    $value = "DIADIEMCUOI='$huyencuoi'";
                    array_push($array, $value);
                }
                array_push($keytimkiem, $this->getNameProvinceById($tinhcuoi));
                if($huyencuoi ==="" && $tinhcuoi !=""){
                    //gọi hàm trả về danh sách các huyện. sau đó dùng DIADIEMDAU IN(..,..,..) để tạo truy vấn
                    $listDistricts = $this->getstring($tinhcuoi);
                    if($listDistricts !=""){
                        $value = "DIADIEMCUOI IN($listDistricts)";
                        array_push($array, $value);
                    }
                }
                //thực hiện tìm kiếm khi có dữ liệu đưa vào. ngược lại thì gọi mặc định
                if(count($array)>=0){
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
                        $this->view->titlework= "Kết quả tìm kiếm (".$totalRecord.")";
                        $key ="";
                        if($keytimkiem[0]!=''){
                            $key = "&nbsp;&nbsp;&nbsp;&nbsp; Từ khóa: <span class='mes'><span style=\" color:red;\">".$keytimkiem[0]." </span></span><br/>";
                        }
                        if($keytimkiem[1] !=""){
                            $key = $key."&nbsp;&nbsp;&nbsp;&nbsp; Danh mục: <span class='mes'><span style=\" color:red;\">".$keytimkiem[1]."</span></span><br/>";
                        }
                        if($keytimkiem[2]!="" || $keytimkiem[3] !=""){
                            $key= $key."&nbsp;&nbsp;&nbsp;&nbsp; Nơi đi: <span class='mes'><span style=\" color:red;\">".$keytimkiem[2]. " &gt;&gt; $keytimkiem[3]</span></span><br/>";
                        }
                        if($keytimkiem[4]!="" || $keytimkiem[5] !=""){
                            $key=$key."&nbsp;&nbsp;&nbsp;&nbsp; Nơi đến: <span class='mes'><span style=\" color:red;\">".$keytimkiem[4]. " &gt;&gt; $keytimkiem[5]</span></span>";
                        }
                        $this->view->keys=$key;
                        $this->view->allwork = $this->model->findata($param, $start,$limit);
                        if($this->view->allwork ==0){
                            $this->view->mess = "<center><div style =\"color:red;\">Không có kết quả phù hợp</div></center>";
                            echo '<script language="javascript">alert("Không có dữ liệu nào được tìm thấy");window.location="'. __SITE_PATH.'vieclam";</script>';
                        }else{
                            $this->view->render("header");
                            $this->view->render("tinvieclam/timvieclam");
                            echo '<center>';
                            echo '<div id="pagination">';
                            echo $Pagination->listPages($totalPages);
                            echo '</div>';
                            echo '</center>';
                            $this->view->render("footer");
                        }
                    } else {
                        $this->view->redirect("vieclam");
                    }
            }else {
                $this->view->redirect("vieclam");
            }
        }
    }
    public function getstring($provinceId) {
        $sql= "select DISTRICTID  from DISTRICT where PROVINCEID='$provinceId'";
        $md = new Model();
        $md->query($sql);
        $data = $md ->fetch();
        $kq ="";
        foreach($data as $key=>$test){
             $temp="";
             $temp="'".$test['DISTRICTID'].'\',';
             $kq= $kq.$temp;
        }
        $kq = substr($kq, 0, -1);
        
        return $kq;
    }
    public function getNameDistrictById($districtid){
        $KQ = "";
        $sql= "select FULLNAME from DISTRICT where DISTRICTID='$districtid'";
         $md = new Model();
        $md->query($sql);
        $data = $md ->fetch();
        if($data !=NULL && count($data>0)){
            foreach($data as $key=>$test){
                $KQ = $KQ.$test['FULLNAME'];
            }
        }
        return $KQ;
    }
    public function getNameProvinceById($provinceid){
        $KQ = "";
        $sql= "select FULLNAME from PROVINCE where PROVINCEID='$provinceid'";
         $md = new Model();
        $md->query($sql);
        $data = $md ->fetch();
        if($data !=NULL && count($data>0)){
            foreach($data as $key=>$test){
                $KQ = $KQ.$test['FULLNAME'];
            }
        }
        return $KQ;
    }
     public function getNameCatalogbyId($idcatalog){
        $KQ = "";
        $sql= "select TENDANHMUCTIN from DANHMUCTIN where MADANHMUCTIN='$idcatalog'";
         $md = new Model();
        $md->query($sql);
        $data = $md ->fetch();
        if($data !=NULL && count($data>0)){
        foreach($data as $key=>$test){
            $KQ = $KQ.$test['TENDANHMUCTIN'];
        }
     }
    
     return $KQ;
    }


    //put your code here
}
