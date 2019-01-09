         <div id="wrapper" class="main-wrapper">
            <section class="main-content container" id="content">
               <section class="container contact">
                  <div class="box box-md">
                     <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-xs-12">
                            <h4 style="color: red; font-size: 22px;">
                                <div style="margin-left: 1px; color: blue;">
                                               Đăng tin của bạn lên đây để được giúp đỡ!<br/>
                                               <small style=" color: red;">Tin càng chi tiết sẽ dễ dàng hơn để bạn tìm người giúp đỡ!</small>
                                            ________________________________________
                                </div>
                                </h4>
                            <form action="dangtin/action" class="form-custom" method="POST" role="form" enctype="multipart/form-data">
                                <div class="form-group ">
                                  <label>Tiêu đề tin đăng:</label> 
                                  <span style="color: red">(*)</span>
                                  <input type="text" class="form-control" name="tieude" placeholder="Tiêu đề ngắn gọn về thông tin tin của bạn" required maxlength="255" minlength="10">
                                </div>
                                <div class="form-group ">
                                        <div class="form-group row ">
                                            <div class="col-lg-6 col-md-6 col-xs-12">
                                               <label>Danh mục tin đăng:</label> <span style="color: red">(*)</span> 
                                               <select name="danhmuc" class="form-control" required>
                                                  <option value=""> -- Danh mục dịch vụ -- </option>
                                                  <?php
                                                        if(isset($this->catalog))//$this->catalog
                                                            foreach($this->catalog as $keys=>$tests)
                                                               {
                                                                   echo "<option value='".$tests['MADANHMUCTIN']."'>".$tests['TENDANHMUCTIN']."</option>";
                                                                }
                                                    ?>
                                               </select>
                                            </div>
                                        </div>                                 
                                        <div class="form-group row">
                                                <div class="col-lg-6 col-md-6 col-xs-12">
                                                   <label>Nơi đi</label> <span style="color: red">(*)</span> 
                                                   <select name="diadiemdau" class="form-control" required id="diadiemdau">
                                                      <option value=""> -- Tỉnh/ Thành phố -- </option>
                                                     <?php
                                                     if(isset($this->data))
                                                            for($i=3; $i<count($this->data);$i++)
                                                            {
                                                                echo "<option value='".$this->data[$i]['PROVINCEID']."'>".$this->data[$i]['PTYPE'] ." ".$this->data[$i]['FULLNAME']."</option>";
                                                            }
                                                    ?>
                                                   </select>
                                                </div>
                                            <div class="col-lg-6 col-md-6 col-xs-12">
                                                <label style="color: red">*</label>
                                                <select name="districtdau" class="form-control" required id="districtdau">
                                                   <option value=""> -- Quận/ Huyện --</option>
                                                </select>
                                            </div>
                                        </div>                     
                                    <div class="form-group row">
                                                <div class="col-lg-6 col-md-6 col-xs-12">
                                                   <label>Nơi đến</label> <span style="color: red">(*)</span> 
                                                   <select name="diadiemcuoi" class="form-control" required id="diadiemcuoi">
                                                      <option value=""> -- Tỉnh/ Thành phố -- </option>
                                                      <?php
                                                        if(isset($this->data))
                                                            for($i=3; $i<count($this->data);$i++)
                                                            {
                                                                echo "<option value='".$this->data[$i]['PROVINCEID']."'>".$this->data[$i]['PTYPE'] ." ".$this->data[$i]['FULLNAME']."</option>";
                                                            }
                                                  ?>
                                                   </select>
                                                </div>
                                            <div class="col-lg-6 col-md-6 col-xs-12">
                                                <label style="color: red">*</label>
                                                <select name="districtcuoi" class="form-control" required id="districtcuoi">
                                                   <option value=""> -- Quận/ Huyện -- </option>
                                                </select>
                                            </div>
                                        </div>
                             
                                        <div class="form-group row ">
                                           <div class="col-lg-6 col-md-6 col-xs-12">
                                              <label>Khối lượng hàng(nếu có)</label> 
                                              <div class="input-group">
                                                 <div class="input-group-addon">kg</div>
                                                 <input type="number" class="form-control" min="0" max="1000" name="khoiluong_hang" placeholder="2"> 
                                              </div>
                                           </div>
                                           <div class="col-lg-6 col-md-6 col-xs-12">
                                              <label>Giá giao dịch công việc</label> 
                                              <div class="input-group">
                                                 <div class="input-group-addon">VND</div>
                                                 <input type="text" pattern="([1-9])+(?:-?\d){4,}" class="form-control" name="gia_giaodich" id='gia_giaodich' placeholder="100.000"> 
                                                 
                                                 	
                                              </div>
                                           </div>
                                        </div>
                                        <div class="form-group "> <label>Hình ảnh kèm theo(không nhiều hơn 3 hình)</label>
                                            <input type="file" multiple accept="image/png" class="form-control" name="hinhminhhoa[]">
                                        </div>
                                        <div class="form-group "> <label>Mô tả nội dung tin đăng</label> <span style="color: red">(*)</span>
                                            <textarea class="form-control" name="motatin" required minlength="50" maxlength="1000" cols="30" rows="10" placeholder="Mô tả chi tiết về tin của bạn">
                                            </textarea>
                                        </div>
                                    <div class="form-group "> 
                                        <center><div class="g-recaptcha" data-sitekey="6Ld_vCAUAAAAAFfFtVze6HO47fizDzdqt-dyVriR" style="width: 302px; height:100px; border-style: none;"></div></center>
                                    </div>
                                        <div class="form-group ">
                                            <input type="submit" value="Đăng tin" class="btn btn2 btn-primary col-md-12 col-sm-12 col-xs-12" name="submitfrm"/>      
                                        </div> <br/>
                                </div>
                           </form>
                       
                     </div>
                  </div>
               </section>
            </section>
         </div>