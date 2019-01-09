<?php

class profile_Model extends Model {
    public function __construct() {
        parent::__construct();
    }
    public function getInfoThanhVienByMaThanhVien($tendangnhap) {
        $sql = "Select tenthanhvien, ngaysinh, diachi, email, sodienthoai, socmnd, hinhdaidien, ngaydangky, tinhtrang from thanhvien where mathanhvien IN (SELECT mataikhoan FROM taikhoan WHERE tendangnhap='".$tendangnhap."')";
        $this->query($sql);
        return $this->fetch();
    }
}
