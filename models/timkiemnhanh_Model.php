<?php
class timkiemnhanh_Model extends Model{
    function __construct() {
        parent::__construct();
    }
    public function findata($param, $start, $limit) {
        $sql = "SELECT `MATIN`, `TIEUDE`, "
                . "(SELECT CONCAT_WS(\" - \", district.fullname, province.FULLNAME) AS fulladress from district INNER JOIN province ON district.PROVINCEID = province.PROVINCEID WHERE district.districtid=tindang.DIADIEMDAU) AS dddau, "
                . "(SELECT CONCAT_WS(\" - \", district.fullname, province.FULLNAME) AS fulladres from district INNER JOIN province ON district.PROVINCEID = province.PROVINCEID WHERE district.districtid = tindang.DIADIEMCUOI) AS ddcuoi,"
                . " `NGAYDANG`, `GIA`, `TINHTRANG`, (select duongdan FROM images WHERE images.MATIN = tindang.MATIN LIMIT 1) AS img "
                . "FROM `tindang` WHERE( MAQT IS not null) and  (tinhtrang is null) and $param ORDER BY NGAYDANG DESC LIMIT {$start},{$limit}";
        $this->query($sql);
        return $this->fetch();        
    }
    public function totalrowfinded($param){
        $sql = "SELECT *". "FROM `tindang` WHERE( MAQT IS not null) and  (tinhtrang is null)  and $param";
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

}
