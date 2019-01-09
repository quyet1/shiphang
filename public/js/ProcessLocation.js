$(document).ready(function() {
	$("#diadiemdau").change(function(){
		id=$("#diadiemdau").val();
                $.ajax({
                    url:"models/xulydiadiem.php",
                    type: "POST",
                    data:"provinceid="+id,
                    async:true,
                    success:function(kq){
                        $("#districtdau").html(kq);
                    }
                });
                return false;
  	});  
});

$(document).ready(function() {
	$("#diadiemcuoi").change(function(){
		id=$("#diadiemcuoi").val();
                $.ajax({
                    url:"models/xulydiadiem.php",
                    type: "POST",
                    data:"provinceid="+id,
                    async:true,
                    success:function(kq){
                        $("#districtcuoi").html(kq);
                    }
                });
                return false;
  	});  
});


$(document).ready(function() {
	$("#diadiemdaubk").change(function(){
		id=$("#diadiemdaubk").val();
                $.ajax({
                    url:"../models/xulydiadiem.php",
                    type: "POST",
                    data:"provinceid="+id,
                    async:true,
                    success:function(kq){
                        $("#districtdaubk").html(kq);
                    }
                });
                return false;
  	});  
});
$(document).ready(function() {
	$("#diadiemcuoibk").change(function(){
		id=$("#diadiemcuoibk").val();
                $.ajax({
                    url:"../models/xulydiadiem.php",
                    type: "POST",
                    data:"provinceid="+id,
                    async:true,
                    success:function(kq){
                        $("#districtcuoibk").html(kq);
                    }
                });
                return false;
  	});  
});
// hiển thị popup trong việc tìm kiếm tin đăng.
$(document).ready(function() {
                $("#diadiemdaufind").change(function(){
                    id=$("#diadiemdaufind").val();
                    $.ajax({
                    url:"models/xulydiadiem.php",
                    type: "POST",
                    data:"provinceid="+id,
                    async:true,
                    success:function(kq){
                        $(".district").html(kq);
                    }
                });
                //
                    $(".overlays").fadeToggle("fast");
                    //return false;
                });

                $(".closes").click(function(){
                        $(".overlays").fadeToggle("fast");
                });
        });
        
        
        
$(document).ready(function() {
                $("#diadiemcuoifind").change(function(){
                    id=$("#diadiemcuoifind").val();
                    $.ajax({
                    url:"models/xulydiadiem.php",
                    type: "POST",
                    data:"provinceid="+id,
                    async:true,
                    success:function(kq){
                        $(".district1").html(kq);
                    }
                });
                    $(".overlays1").fadeToggle("fast");
                    return false;
                });

                $(".closes1").click(function(){
                        $(".overlays1").fadeToggle("fast");
                });
        });
function hidepopup(){
    document.getElementsByClassName('overlays').item(0).style.display = 'none';
}
function hidepopup1(){
    document.getElementsByClassName('overlays1').item(0).style.display = 'none';
}

 