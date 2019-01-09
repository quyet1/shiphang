<?php

class chitiettin_Model extends Model {
    public function __construct() {
        parent::__construct();
    }
    public  function  getListByID($id){
         $sql = "SELECT `TIEUDE`, `NOIDUNG`, "
                . "(SELECT CONCAT_WS(\" - \", district.fullname, province.FULLNAME) AS fulladress from district INNER JOIN province ON district.PROVINCEID = province.PROVINCEID WHERE district.districtid=tindang.DIADIEMDAU) AS dddau, "
                . "(SELECT CONCAT_WS(\" - \", district.fullname, province.FULLNAME) AS fulladres from district INNER JOIN province ON district.PROVINCEID = province.PROVINCEID WHERE district.districtid = tindang.DIADIEMCUOI) AS ddcuoi, "
                . "`NGAYDANG`, `GIA`, `KHOILUONGHANG`, (select tenthanhvien from thanhvien where thanhvien.mathanhvien=tindang.MATHANHVIEN) as tentv, (select sodienthoai from thanhvien where thanhvien.mathanhvien=tindang.MATHANHVIEN) as sodt, `TINHTRANG`"
                . "FROM `tindang` WHERE MATIN='$id'";
        $this->query($sql);
        return $this->fetch();
    }
    public function getImages($id){
        $sql = "SELECT DUONGDAN FROM IMAGES WHERE MATIN = '$id'";
        $this->query($sql);
        return $this->fetch();
    }
    //put your code here
}
