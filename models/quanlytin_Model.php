<?php
ob_start();
define ("MAX_SIZE",100);
class quanlytin_Model extends Model {
    //put your code here
    public function __construct() {
        parent::__construct();
    }
    
   public function deleteDir($dirPath) {
//    if (! is_dir($dirPath)) {
//        throw new InvalidArgumentException("$dirPath must be a directory");
//    }
    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
        $dirPath .= '/';
    }
    $files = glob($dirPath . '*', GLOB_MARK);
    foreach ($files as $file) {
        if (is_dir($file)) {
            self::deleteDir($file);
        } else {
            unlink($file);
        }
    }
    if(is_dir($dirPath)){
        rmdir($dirPath);
    }
}
    public function getAlltin($mathanhvien){
        $sql = "SELECT MAQT, MATIN, TIEUDE, "
                . "(SELECT CONCAT_WS(\" - \", district.fullname, province.FULLNAME) AS fulladress from district INNER JOIN province ON district.PROVINCEID = province.PROVINCEID WHERE district.districtid=tindang.DIADIEMDAU) AS dddau, "
                . "(SELECT CONCAT_WS(\" - \", district.fullname, province.FULLNAME) AS fulladres from district INNER JOIN province ON district.PROVINCEID = province.PROVINCEID WHERE district.districtid = tindang.DIADIEMCUOI) AS ddcuoi,"
                . " NGAYDANG, GIA, TINHTRANG, "
                . "(select duongdan FROM images WHERE images.MATIN = tindang.MATIN LIMIT 1) AS img"
                . " FROM tindang WHERE MATHANHVIEN='$mathanhvien' ORDER BY NGAYDANG DESC";// "select MATIN, TIEUDE, NOIDUNG, DIADIEMDAU, DIADIEMCUOI, NGAYDANG, GIA, KHOILUONGHANG, TINHTRANG FROM TINDANG WHERE MAQT IS NOT NULL";
        $this->query($sql);
        return $this->fetch();
    }
    public function totalrow($mathanhvien){
        $sql ="select * from tindang where mathanhvien='$mathanhvien'";
        return $this->numrows($sql);
    }
    public function getMathanhvienByuser($user){
        $sql = "SELECT MATAIKHOAN FROM TAIKHOAN WHERE TENDANGNHAP='$user'";
        $this->query($sql);
        return $this->fetch();
    }
    public function del($id){
        $row= "select * from tindang where matin = '$id'";
        if($this->numrows($row)>0){
            $delimg = "DELETE FROM IMAGES WHERE MATIN='$id' ";
            $sql = "DELETE FROM TINDANG  WHERE MATIN = '$id'";
            $path ='upload/baidang/'.$id;
            if(is_dir($path)){
                $this->deleteDir($path);
            }
            if($this->exec($delimg)==1 && $this->exec($sql)==1){
                return TRUE;
            }
            else {
                       return FALSE;
            }
        }
        else {
                   return FALSE;
        }
    }
    public function checktin($id) {
        $row= "select * from tindang where matin = '$id' and MAQT is null";
        if($this->numrows($row)>0){
            return TRUE;
        }
        return FALSE;
        
    }
    public function gettin($id) {
            $sql = "SELECT matin, `TIEUDE`, `NOIDUNG`, "
                //. "(SELECT CONCAT_WS(\" - \", district.fullname, province.FULLNAME) AS fulladress from district INNER JOIN province ON district.PROVINCEID = province.PROVINCEID WHERE district.districtid=tindang.DIADIEMDAU) AS dddau, "
                //. "(SELECT CONCAT_WS(\" - \", district.fullname, province.FULLNAME) AS fulladres from district INNER JOIN province ON district.PROVINCEID = province.PROVINCEID WHERE district.districtid = tindang.DIADIEMCUOI) AS ddcuoi, "
                . "`GIA`, `KHOILUONGHANG`"
                . "FROM `tindang` WHERE MATIN='$id' AND MAQT IS null";
            $this->query($sql);
            return $this->fetch();
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
    public function edittin($MATIN){  
        $tieude = isset($_POST['tieude'])?addslashes(trim($_POST['tieude'])): "" ;
        $danhmuc = $_POST['danhmuc'];
        $diadiemdau =$_POST['districtdau'];
        $diadiemcuoi = $_POST['districtcuoi'];
        $khoiluong = isset($_POST['khoiluong_hang']) ?$_POST['khoiluong_hang'] :0 ;
        $gia = isset($_POST['gia_giaodich'])? $_POST['gia_giaodich']:0 ;   
        $motatin = isset($_POST['motatin'])? addslashes(trim($_POST['motatin'])):"";
        $mathanhvien = $this->getMathanhvienByuser(Session::get('user'));
        $matv = $mathanhvien[0]['MATAIKHOAN'];
        $name = array();
        $type = array();
        $size = array();
        $urlhinh= array();
        $newname = array();
        $sqlimage = array();
        if($_FILES['hinhminhhoa']){
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
                $newname[$i] = "image_".$MATIN."_".$i.'.png';
            }
            $path = 'upload/baidang/'.$MATIN;
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
        $sqltindang = "UPDATE TINDANG SET TIEUDE='$tieude',NOIDUNG='$motatin', DIADIEMDAU= '$diadiemdau',DIADIEMCUOI= '$diadiemcuoi',GIA= '$gia',KHOILUONGHANG='$khoiluong', MADANHMUCTIN='$danhmuc',MATHANHVIEN='$matv' WHERE MATIN= '$MATIN'";
        $result = 0;
        if($this->exec($sqltindang) == 1){
             $result++;
        }
        for($i =0; $i<count($newname); $i++){
                $sqlimage[$i] = "INSERT INTO IMAGES(TENHINH, DUONGDAN, MATIN) VALUES('$newname[$i]','$urlhinh[$i]','$MATIN')";
                $this->exec($sqlimage[$i]);
            }
        if($result >0)
            return TRUE;
        return FALSE;
    }
}