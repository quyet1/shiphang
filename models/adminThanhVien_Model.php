<?php
class adminThanhVien_Model extends Model{
    public function __construct() {
        parent::__construct();
    }
    public function getAllThanhVien() {
        try{
            $sql = "SELECT * from THANHVIEN";
            $this->query($sql);
            return $this->fetch();
        } catch (Exception $ex) {
            echo $ex->getMessage();
        }
    }
    public function delThanhVien($MaThanhVien) {
        $row= "select * from thanhvien where mathanhvien = '$MaThanhVien'";
        if($this->numrows($row)>0){
            $sql = "DELETE FROM THANHVIEN WHERE MATHANHVIEN='$MaThanhVien'";
            $sqldeltaikhoan = "DELETE FROM TAIKHOAN WHERE MATAIKHOAN='$MaThanhVien'";
            $sqldeltintuc = "DELETE FROM TINDANG WHERE MATHANHVIEN = '$MaThanhVien'";
            $sqlchecktintuc = "SELECT * FROM TINDANG WHERE MATHANHVIEN = '$MaThanhVien'";
            $sqldelimages = "SELECT * FROM images WHERE MATIN IN ( SELECT MATIN FROM TINDANG WHERE MATHANHVIEN = '".$MaThanhVien."')";
            $path_avatar ='upload/user/avatar/'.$MaThanhVien.'_avatar.png';
            $path_cmndt ='upload/user/cmnd/'.$MaThanhVien.'_cmdnt.png';
            $path_cmnds = 'upload/user/cmnd/'.$MaThanhVien.'_cmnds.png';
            if(file_exists($path_avatar)){
                unlink($path_avatar);
            }
             if(file_exists($path_cmndt)){
                unlink($path_cmndt);
            }
             if(file_exists($path_cmnds)){
                unlink($path_cmnds);
            }
            if($this->numrows($sqldelimages)>0){
                $sqldel = "DELETE FROM images WHERE MATIN IN (SELECT MATIN FROM TINDANG WHERE MATHANHVIEN = '".$MaThanhVien."')";
                $this->exec($sqldel);
            }
            if($this->numrows($sqlchecktintuc)){
                $this->exec($sqldeltintuc);
            }
            $this->exec($sqldeltaikhoan);
            if($this->exec($sql)==1){
                return TRUE;
            }
           
            }else {
                   return FALSE;
            }
    }
}
