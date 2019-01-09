<?php

class Controller {

    function __construct() {
        //echo 'Main controller<br />';
        //Session::__init();
        $this->view = new View();
    }
    /**
     * 
     * @param string $name Name of the model
     * @param string $path Location of the models
     */
    public function loadModel($name) {
        $path=__MODEL_PATH.$name."_Model.php";
        if(file_exists($path)){
                   require_once($path);
                    $name= ucwords($name)."_Model";
                    $this->model=new $name;  
        }
    }

}
?>