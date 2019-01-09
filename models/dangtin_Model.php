<?php
ob_start();
define ("MAX_SIZE",100);
class Dangtin_Model extends Model {
    //put your code here
    public function __construct(){
        parent::__construct();
    }
     public function getMathanhvienByuser($user){
         $mathanhvien = "";
        $sql = "SELECT MATAIKHOAN FROM TAIKHOAN WHERE TENDANGNHAP='$user'";
        $md = new Model();
        $md->query($sql);
        $datas =$md ->fetch();
        if($datas !=0){
            foreach ($datas as $key=>$value) {
                $mathanhvien = $value['MATAIKHOAN'];
            }
        }
        return $mathanhvien;
    }
    public function getMatin() {
        $matin = "0";
        $sql = "select matin from tindang ORDER BY matin DESC LIMIT 1";
        $this->query($sql); 
        $datask = $this->fetch();
        if($datask !=0){
            foreach ($datask as $key => $value) {
                $matin = $value['matin'];
            }
        }
        return $matin;
    }
    public function dangtins(){  
        $tieude = isset($_POST['tieude'])?addslashes(trim($_POST['tieude'])): "" ;
        $danhmuc = $_POST['danhmuc'];
        $diadiemdau =$_POST['districtdau'];
        $diadiemcuoi = $_POST['districtcuoi'];
        $khoiluong = isset($_POST['khoiluong_hang']) ?$_POST['khoiluong_hang'] :0 ;
        $gia = isset($_POST['gia_giaodich'])? $_POST['gia_giaodich']:0 ;   
        $motatin = isset($_POST['motatin'])? addslashes(trim($_POST['motatin'])):"";
        //select lấy số mã tin lớn nhất
        $ma = $this->getMatin();
        $matin = ((int)$ma+1);
        $mathanhvien = $this->getMathanhvienByuser(Session::get('user'));
        //$mathanhvien= $mathanhviens[0]['MATAIKHOAN'];
        $name = array();
        $type = array();
        $size = array();
        $urlhinh= array();
        $newname = array();//($_FILES['hinhminhhoa']['tmp_name']) || 
        $sqlimage = array();// !file_exists($_FILES['hinhminhhoa']['tmp_name']) || !is_uploaded_file($_FILES['hinhminhhoa']['tmp_name'])
        if($_FILES['hinhminhhoa']['name'][0]!=""){
            foreach ($_FILES['hinhminhhoa']['name'] as $file) {
                $name[] = $file;
            }
            foreach ($_FILES['hinhminhhoa']['type'] as $file){
                $type[] = $file;
            }
            foreach ($_FILES['hinhminhhoa']['size'] as $file){
                $size[] = round($file/1024,2);
            }
            if(count($name)<=0 || count($name)>3){
                return FALSE;
            }
            for($i =0; $i <count($name); $i++){
                if ($type[$i] !="image/png"){
                    return FALSE;
                }
                if ($size[$i] > MAX_SIZE*1024){
                    return FALSE;
                }
                $newname[$i] = "image_".$matin."_".$i.'.png';
            }
            $path = 'upload/baidang/'.$matin;
            if(!is_dir($path)){
                mkdir($path);
            }
            $tempath = array();
            
            for($i=0; $i<count($name); $i++){
                $tempath[$i] = $path.'/'.$newname[$i];
                move_uploaded_file($_FILES['hinhminhhoa']['tmp_name'][$i],$tempath[$i]);
                if(file_exists($tempath[$i])){
                    $urlhinh[$i] = $tempath[$i];
                }
            }
        }
        
        $sqltindang = "INSERT INTO "
                . "TINDANG(TIEUDE, NOIDUNG, DIADIEMDAU, DIADIEMCUOI, GIA, KHOILUONGHANG, MAQT, MATHANHVIEN, MADANHMUCTIN, TINHTRANG)"
                . " VALUES('$tieude', '$motatin', '$diadiemdau', '$diadiemcuoi', '$gia', '$khoiluong',null, '$mathanhvien' , '$danhmuc', null)";
        $result = 0;
        if($this->exec($sqltindang) == 1){
             $result++;
        }
        if(count($newname)>0){
        for($i =0; $i<count($newname); $i++){
                $sqlimage[$i] = "INSERT INTO IMAGES(TENHINH, DUONGDAN, MATIN) VALUES('$newname[$i]','$urlhinh[$i]','$matin')";
                $this->exec($sqlimage[$i]);
            }
        }
        if($result >0)
            return TRUE;
        return FALSE;
    }
    public function Showlocation(){
        $sql = "select PROVINCEID, FULLNAME, PTYPE from PROVINCE";
        $this->query($sql); 
        return $this->fetch();
    }
    public function showcatalog(){
        $sql = "select MADANHMUCTIN, TENDANHMUCTIN from DANHMUCTIN";
        $this->query($sql); 
        return $this->fetch();
    }
}
