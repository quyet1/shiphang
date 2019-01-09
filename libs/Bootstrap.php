<?php
class Bootstrap{
	public function __construct(){
	  if(isset($_GET['url'])){
		  $url=rtrim($_GET['url'],"/");
		  $url=explode('/',$url);
		  $c=$url[0];
	  }else{
		  $c="index";
	  }
	  $file_controller=__CONTROLLER_PATH.$c."_Controller.php";
	  if(file_exists($file_controller)){
	      require_once($file_controller);
	  }else{
		  require_once(__CONTROLLER_PATH."error_Controller.php");
		  $controller=new error_Controller();
		  $controller->index();
		  return false;
	  } 
	  $name_controller=$c."_Controller";
	  $controller=new $name_controller;
	  $controller->LoadModel($c);//autoload model
		  if(isset($url[2])){
			  $controller->{$url[1]}($url[2]);
		  }else{
			  if(isset($url[1])){
			  $controller->{$url[1]}();
			  }else{
			  $controller->index();
			  }
		  }
	}
}

//class Bootstrap {
//
//    private $_url = null;
//    private $_controller = null;
//    
//    private $_controllerPath = __CONTROLLER_PATH; // Always include trailing slash
//    private $_modelPath = __MODEL_PATH; // Always include trailing slash
//    private $_errorFile = 'error_Controller.php';
//    private $_defaultFile = 'index_Controller.php';
//   
//    public function init()
//    {
//        // Sets the protected $_url
//        $this->_getUrl();
//        // Load the default controller if no URL is set
//        // eg: Visit http://localhost it loads Default Controller
//        if (empty($this->_url[0])) {
//            $this->_loadDefaultController();
//        }
//        $this->_loadExistingController();
//        $this->_callControllerMethod();
//
//    }
//    
//    /**
//     * (Optional) Set a custom path to controllers
//     * @param string $path
//     */
//    public function setControllerPath($path)
//    {
//        $this->_controllerPath = trim($path, '/') . '/';
//    }
//    
//    /**
//     * (Optional) Set a custom path to models
//     * @param string $path
//     */
//    public function setModelPath($path)
//    {
//        $this->_modelPath = trim($path, '/') . '/';
//    }
//    
//    /**
//     * (Optional) Set a custom path to the error file
//     * @param string $path Use the file name of your controller, eg: error.php
//     */
//    public function setErrorFile($path)
//    {
//        $this->_errorFile = trim($path, '/');
//    }
//    
//    /**
//     * (Optional) Set a custom path to the error file
//     * @param string $path Use the file name of your controller, eg: index.php
//     */
//    public function setDefaultFile($path)
//    {
//        $this->_defaultFile = trim($path, '/');
//    }
//    
//    /**
//     * Fetches the $_GET from 'url'
//     */
//    private function _getUrl()
//    {
//        $url = isset($_GET['url']) ? $_GET['url'] : null;
//        $url = rtrim($url, '/');
//        $url = filter_var($url, FILTER_SANITIZE_URL);
//        $this->_url = explode('/', $url);
//        
// //     if(isset($_GET['url'])){
////		  $url=rtrim($_GET['url'],"/");
////		  $url=explode('/',$url);
////		  $c=$url[0];
////	  }else{
////		  $c="index";
////	  }
//    }
//   
//    /**
//     * This loads if there is no GET parameter passed
//     */
//    private function _loadDefaultController()
//    {
//        //require $this->_controllerPath . $this->_defaultFile;
//        //$this->_controller = new Index();
//        //$this->_controller->index();
//		$this->_url[0] = 'index';
//    }
//    
//    /**
//     * Load an existing controller if there IS a GET parameter passed
//     * 
//     * @return boolean|string
//     */
//    private function _loadExistingController()
//    {
//        $file = $this->_controllerPath . $this->_url[0] . '_Controller.php';
//        //index_Controller
//        if (file_exists($file)) {
//            require_once($file);
//            $class = $this->_url[0].'_Controller';
//            $this->_controller = new $class;
//            $this->_controller->loadModel($this->_url[0]);
//        } else {
//            $this->_error();
//            return false;
//        }
//        //	  $file_controller=__CONTROLLER_PATH.$c."_Controller.php";
////	  if(file_exists($file_controller)){
////              //require_once(__CONTROLLER_PATH."error_Controller.php");
////	      require_once($file_controller);
////	  }else{
////		  require_once(__CONTROLLER_PATH."error_Controller.php");
////		  $controller=new error_Controller();
////		  $controller->index();
////		  return false;
////	  } 
//    }
//    
//    /**
//     * If a method is passed in the GET url paremter
//     * 
//     *  http://localhost/controller/method/(param)/(param)/(param)
//     *  url[0] = Controller
//     *  url[1] = Method
//     *  url[2] = Param
//     *  url[3] = Param
//     *  url[4] = Param
//     */
//    private function _callControllerMethod()
//    {
//        $length = count($this->_url);
//        
//        // Make sure the method we are calling exists
//        if ($length > 1) {
//            if (!method_exists($this->_controller, $this->_url[1])) {
//                $this->_error();
//            }
//        }
//        
//        // Determine what to load
//        switch ($length) {
//            case 5:
//                //Controller->Method(Param1, Param2, Param3)
//                $this->_controller->{$this->_url[1]}($this->_url[2], $this->_url[3], $this->_url[4]);
//                break;
//            
//            case 4:
//                //Controller->Method(Param1, Param2)
//                $this->_controller->{$this->_url[1]}($this->_url[2], $this->_url[3]);
//                break;
//            
//            case 3:
//                //Controller->Method(Param1, Param2)
//                $this->_controller->{$this->_url[1]}($this->_url[2]);
//                break;
//            
//            case 2:
//                //Controller->Method(Param1, Param2)
//                $this->_controller->{$this->_url[1]}();
//                break;
//            
//            default:
//                $this->_controller->index();
//                break;
//        }
//    }
//    /**
//     * Display an error page if nothing exists
//     * 
//     * @return boolean
//     */
//    private function _error() {
//			require ($this->_controllerPath . $this->_errorFile);
//			$this->_controller = new error_Controller();
//			$this->_controller->index();
//			exit;
//		
//    }
//}
?>