<?php
class Model{

    public function __construct(){//kết nối
		$this->conn=mysqli_connect(__HOST,__USER,__PASS, __DB_NAME) or die ("Không thể kết nối server");
	}
	public function disconnect(){//ngắt kết nối
		if($this->conn){
			@mysqli_close($this->conn);
		}
	}
        public function  exec($sql){// update, insert, delete
            if (mysqli_query($this->conn, $sql)) {
                return  1;
            } else {
                    return 0;
            }
        }
        // tra ve so dong
        public function numrows($sql){
            return mysqli_num_rows(mysqli_query($this->conn, $sql));
        }
        //truy van
	public function query($sql){
            $this->result=mysqli_query($this->conn, $sql);
	}
	public function num_rows(){//đếm số dòng trả về từ câu lệnh truy vấn
		if($this->result){
		    $rows=mysqli_num_rows($this->result);
		}
		else{
		    $rows=0;
		}
		return $rows;
	}
	public function fetch()
	{
                if($this->result)
		{
                    if($this->num_rows()!=0){
			while($row = mysqli_fetch_array($this->result)){
                            $this->data[]=$row;
			}
                    } else {
                            $this->data=0;
                        }
                    
		}
		return $this->data;
	 }
	public function select($table, $where='')
	{
            if($where != ""){
		if(is_array($where)){
                    foreach($where as $k => $v){
			$sql[]= "$k='$v'";
                    }
                    $where=implode(" and ",$sql);
                    $where="where $where";
                }else{
                    $where="where $where";
		}
            }
            $sql="select * from $table $where";
            $this->query($sql);
	}
}