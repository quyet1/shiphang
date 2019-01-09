<?php
class Dangkynhanh_Model extends Model{
	public function __construct(){
		 parent::__construct();
    }
	public function registryexpre($mathanhvien, $phone,$pass){
                    //$rand =$this->numrows("select * from thanhvien");
                    $sqltk = "INSERT INTO TAIKHOAN(MATAIKHOAN, TENDANGNHAP, MATKHAU) "
                            . "VALUES('$mathanhvien', '$phone', '$pass')";
                    $sql = "INSERT INTO THANHVIEN(MATHANHVIEN, SODIENTHOAI, TINHTRANG) "
                            . "VALUES('$mathanhvien', '$phone',0)";        
                    if ($this->exec($sql) == 1 && $this->exec($sqltk) == 1) {
                         return TRUE;
                    }return FALSE;
        }
        public function account_exists($tendangnhap) {
            $kq= FALSE;
            try{
                $sql ="SELECT * FROM TAIKHOAN WHERE TENDANGNHAP='".$tendangnhap."'";
                if($this->numrows($sql)>0){
                $kq= TRUE;
            }
            } catch(Exception $ex){
                print_r($ex->getMessage());
            }
            return $kq;
        }
}