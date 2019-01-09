<?php
class user_Model extends Model{
	public $table="user";
	public function __construct(){
		 parent::__construct();
    }
    
	public function login(){
		$user=$_POST['username'];
		$pass=md5($_POST['password']);
		$where=array('user_name'=>$user,'pass'=>$pass);
		$this->select($this->table,$where);
		if($this->num_rows()==0){
         return false;
		}else{
		return true;
		}	
	}
}
?>