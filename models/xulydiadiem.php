<?php
require_once("../config/define_database.php");
require_once("../config/define_path.php");
//end define path
require_once("../".__LIB_PATH."Model.php");
$id_province = $_POST['provinceid'];
$sql = "SELECT DISTRICTID, FULLNAME, DTYPE  from DISTRICT where PROVINCEID='".$id_province."'";
$md = new Model();
$md->query($sql);
$data =$md ->fetch();
echo ' <option value=""> -- Tùy chọn quận/huyện --</option>';
foreach($data as $key=>$test)
    {
        echo "<option value='".$test['DISTRICTID']."'>".$test['DTYPE'] ." ".$test['FULLNAME']."</option>";
    }