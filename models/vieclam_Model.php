<?php
class vieclam_Model extends Model {
    public function __construct(){
		 parent::__construct();
    }
    public function getAllWork($start, $limit){
        $sql = "SELECT `MATIN`, `TIEUDE`, "
                . "(SELECT CONCAT_WS(\" - \", district.fullname, province.FULLNAME) AS fulladress from district INNER JOIN province ON district.PROVINCEID = province.PROVINCEID WHERE district.districtid=tindang.DIADIEMDAU) AS dddau, "
                . "(SELECT CONCAT_WS(\" - \", district.fullname, province.FULLNAME) AS fulladres from district INNER JOIN province ON district.PROVINCEID = province.PROVINCEID WHERE district.districtid = tindang.DIADIEMCUOI) AS ddcuoi, "
                . "`NGAYDANG`, `GIA`, `TINHTRANG`, (select duongdan FROM images WHERE images.MATIN = tindang.MATIN LIMIT 1) AS img "
                . "FROM `tindang` WHERE( MAQT IS not null) and  (tinhtrang is null) ORDER BY NGAYDANG DESC LIMIT {$start},{$limit}";
        $this->query($sql); //(tinhtrang != 'invalid') or
        return $this->fetch();
    }
    // tính tổng số dòng của table tin đăng
    public function totalrow(){
        $sql = "select * from tindang WHERE( MAQT IS not null) and  (tinhtrang is null)";// where trangthai
        return $this->numrows($sql);
    }
    public function totalrowfinded($param){
        $sql = "SELECT `MATIN`, `TIEUDE`, "
                . "FROM `tindang` WHERE( MAQT IS not null) and  (tinhtrang is null) and $param";
        return $this->numrows($sql);
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
    // lấy danh sách các huyện thuộc tỉnh có $districtId là mã tỉnh
    public function getListIdDistrict($districtId) {
        $kq="";
        $sql= "select DISTRICTID from DISTRICT where PROVINCEID='$districtId'";
        $this->query($sql); 
        $arr = $this->fetch();
        if(count($arr)>0){
            for($i = 0; $i<count($arr); $i++){
                $temp="";
                if($i==count($arr)-1){
                    $temp = "'$arr[$i]'";
                }
                else {
                    $temp="'$arr[$i]',";
                }
                $kq= $kq.$temp;
            }
        }
        return $kq;
    }
    
    public function findata($param, $start, $limit) {
        $sql = "SELECT `MATIN`, `TIEUDE`, "
                . "(SELECT CONCAT_WS(\" - \", district.fullname, province.FULLNAME) AS fulladress from district INNER JOIN province ON district.PROVINCEID = province.PROVINCEID WHERE district.districtid=tindang.DIADIEMDAU) AS dddau, "
                . "(SELECT CONCAT_WS(\" - \", district.fullname, province.FULLNAME) AS fulladres from district INNER JOIN province ON district.PROVINCEID = province.PROVINCEID WHERE district.districtid = tindang.DIADIEMCUOI) AS ddcuoi,"
                . " `NGAYDANG`, `GIA`, `TINHTRANG`, (select duongdan FROM images WHERE images.MATIN = tindang.MATIN LIMIT 1) AS img "
                . "FROM `tindang` WHERE MAQT IS not null and tinhtrang != 'invalid' or tinhtrang is null and $param ORDER BY NGAYDANG DESC LIMIT {$start},{$limit}";
        $this->query($sql);
        return $this->fetch();        
    }
    //put your code here
    
}
