<?php
class Dangnhap_Model extends Model{
	public $table="TAIKHOAN";
	public function __construct(){
		 parent::__construct();
    }
	public function login($user, $pass){
                try{
                    $where=array('TENDANGNHAP'=>$user,'MATKHAU'=>$pass);
                    $this->select($this->table,$where);
                } catch (Exception $ex) {
                    print_r($ex);
                }
		if($this->num_rows()==0){
                    return false;
		}
                else{
                    return true;
		}	
	}
        public function getLoaiTV($tendangnhap){
            $kq="";
            try{
                    $sql = "select tinhtrang from thanhvien where thanhvien.MATHANHVIEN IN (SELECT MATAIKHOAN FROM TAIKHOAN WHERE TENDANGNHAP ='".$tendangnhap."')";
                    $this->query($sql);
                    $data =$this->fetch();
                    foreach ($data as $key => $value) {
                        $kq = $kq.$value['tinhtrang'];
                    }
                    return $kq;
                } catch (Exception $ex) {
                    print_r($ex);
                }
                return $kq;
        }
        
}