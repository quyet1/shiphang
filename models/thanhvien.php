<?php
class Thanhvien {
    private $mathanhvien;
    private $tenthanhvien;
    private $ngaysinh;
    private $diachi;
    private $email;
    private $sodienthoai;
    private $socmnd;
    private $hinhcmndt;
    private $hinhcmnds;
    private $hinhdaidien;
    private $ngaydangky;
    private $tinhtrang;
    
    public function __construct() {
    }
    function Thanhvien($matv, $tentv, $ns, $dc, $mail, $sdt, $cmdn, $hinhcmt, $hinhcms,$hinhdt, $ngaydk, $tt){
        $this->mathanhvien = $matv;
        $this->tenthanhvien =  $tentv;
        $this->ngaysinh= $ns;
        $this->diachi = $dc;
        $this->email = $mail;
        $this->sodienthoai = $sdt;
        $this->socmnd = $cmdn;
        $this->hinhcmndt =$hinhcmt;
        $this->hinhcmnds=$hinhcms;
        $this->hinhdaidien = $hinhdt;
        $this->ngaydangky = $ngaydk;
        $this->tinhtrang = $tt;
    }
     public function setmathanhvien($matv){
         $this->mathanhvien = $matv;
    }
    public function settenthanhvien($tentv){
         $this->tenthanhvien =  $tentv;
    }
    public function setngaysinh($ns){
         $this->ngaysinh= $ns;
    }
    public function setdiachi($dc){
        $this->diachi = $dc;
    }
    public function setemail($mail){
         $this->email = $mail;
    }
    public function setsodienthoai($sdt){
         $this->sodienthoai = $sdt;
       
    }public function setsocmnd($cmdn){
         $this->socmnd = $cmdn;
       
    }
    public function sethinhcmndt($hinhcmt){
         $this->hinhcmndt =$hinhcmt;
        
    }
    public function sethinhcmnds($hinhcms){
        $this->hinhcmnds=$hinhcms;
        
    }
    public function sethinhdaidien($hinhdt){
        $this->hinhdaidien = $hinhdt;
       
    }
    public function setngaydangky($ngaydk){
         $this->ngaydangky = $ngaydk;
       
    }
    public function settinhtrang($tt){
         $this->tinhtrang = $tt;
    }
    public function getmathanhvien(){
        return $this->mathanhvien;
    }
    public function gettenthanhvien(){
        return $this->tenthanhvien;
    }
    public function getngaysinh(){
        return $this->ngaysinh;
    }
    public function getdiachi(){
        return $this->diachi;
    }
    public function getemail(){
        return $this->email;
    }
    public function getsodienthoai(){
        return $this->sodienthoai;
    }public function getsocmnd(){
        return $this->socmnd;
    }
    public function gethinhcmndt(){
        return $this->hinhcmndt;
    }
    public function gethinhcmnds(){
        return $this->hinhcmnds;
    }
    public function gethinhdaidien(){
        return $this->hinhdaidien;
    }
    public function getngaydangky(){
        return $this ->ngaydangky;
    }
    public function gettinhtrang(){
        return $this->tinhtrang;
    }
}
