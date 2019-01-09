<!-- Small Nav -->
            <div class="small-nav"> <a href="#">Điều Khiển</a> <span>&gt;</span>Quản Trị Thành Viên</div>
            <!-- End Small Nav -->
            <!-- Message OK -->
            <!-- End Message OK -->
            <!-- Message Error -->
            <!-- End Message Error -->
            <br />
            <!-- Main -->
            <div id="main">
               <div class="cl">&nbsp;</div>
               <!-- Content -->
               <div id="content">
                  
			           <!-- Box -->
                  <div class="box">
                     <!-- Box Head -->
                     <div class="box-head">
                        <h2>Thêm Thành Viên Mới</h2>
                     </div>
                     <!-- End Box Head -->
                     <form action="#" method="post" enctype="multipart/form-data">
                        <!-- Form -->
                        <div class="form">
			<table>
                              <tr>
                                 <td>
                                    <label>Họ Tên</label>
                                    <input type="text" name="hoten" class="field size1" required maxlength="255" placeholder="Nguyễn Ngọc Giàu">
                                 </td>
                                 <td>
                                    <label>Tên Đăng Nhập</label>
                                    <input type="text" name="tendangnhap" class="field size1" required maxlength="100" placeholder="Lekudania">
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <label>Ngày Sinh</label>
                                    <input type="date" name="ngaysinh" class="field size1" required />
                                 </td>
                                 <td>
                                    <label>Địa Chỉ</label>
                                    <input type="text" name="diachi" class="field size1" required maxlength="255" placeholder="136 Trần Đại Nghĩa, Q. Ngũ Hành Sơn, TP. Đà Nẵng"/>
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <label>Email</label>
                                    <input type="email" name="email" class="field size1" required maxlength="50" placeholder="giaudn@gm.edu.vn"/>
                                 </td>
                                 <td>
                                    <label>Số Điện Thoại</label>
                                    <input type="text" name="sodt" class="field size1" required maxlength="20" placeholder="0978512938"/>
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <label>Số CMND</label>
                                    <input type="text" name="socmnd" class="field size1" required maxlength="15" placeholder="212373578"/>
                                 </td>
                                 <td>
                                    &nbsp;
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <label>Hình CMND Mặt Trước</label>
                                    <input type="file" name="imgcmndt" accept="image/png" class="field size1" required />
                                 </td>
                                 <td>
                                    <label>Hình CMND Mặt Sau</label>
                                    <input type="file" name="imgcmnds" accept="image/png" class="field size1" required />
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <label>Hình Đại Diện</label>
                                    <input type="file" name="imgavatar" accept="image/png" class="field size1" required />
                                 </td>
                                 <td>
                                    &nbsp;
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <label>Mật Khẩu Đăng Nhập</label>
                                    <input type="password" name="pass"  class="field size1" required />
                                 </td>
                                 <td>
                                    <label>Nhập Lại Mật Khẩu Đăng Nhập</label>
                                    <input type="password" name="repass" class="field size1" required />
                                 </td>
                              </tr>
			</table>
                        </div>
                        <!-- End Form -->
                        <!-- Form Buttons -->
                        <div class="buttons">
                           <input type="submit" class="button" value="Thêm" />
                           <input type="reset" class="button" value="Điền lại" />
                        </div>
                        <!-- End Form Buttons -->
                     </form>
                  </div>
                  <!-- End Box -->
                  <!-- Box -->
                  <div class="box">
                     <!-- Box Head -->
                     <div class="box-head">
                        <h2 class="left">List Thành Viên</h2>
                        <div class="right">
                           <label>Tìm Thành Viên</label>
                           <input type="text" class="field small-field" />
                           <input type="submit" class="button" value="search" />
                        </div>
                     </div>
                     <div class="product">
			<div class="title" id="tabs">
				<a  class="set number" title="tab1" style="display:block;width:170px;"><p> Thành viên loại 0</p></a>
				<a  class=" number" title="tab2"style="	display:block;width:170px;"><p>Thành viên loại 1</p></a>
                                <a class=" number" title="tab3"style="	display:block;width:170px;"><p>Thành viên loại 2</p></a>
			</div><!--End .title-->
			<div id="tab1">
					<!-- Table -->
                                        <div class="table">
                                           <table max-width="100%" border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                 <th width="13">&nbsp;</th>
                                                 <th>Hình Avatar</th>
                                                 <th>Mã Thành Viên</th>
                                                 <th>Tên Thành Viên</th>
                                                 <th>Ngày Sinh</th>
                                                 <th>Địa Chỉ</th>
                                                 <th>Email</th>
                                                 <th>Số Điện Thoại</th>
                                                 <th>Số CMND</th>
                                                 <th>CMND Trước</th>
                                                 <th>CMND Sau</th>
                                                 <th>Ngày Đăng Ký</th>
                                                 <!--<th>Tình Trạng</th>-->
                                                 <th width="80px" class="ac">Điều Khiển</th>
                                              </tr>
                                              <?php
                                              if(isset($this->AllThanhVien)){
                                                  $row1 = 0;
                                                  for($i=0; $i<count($this->AllThanhVien); $i++){
                                                  if($this->AllThanhVien[$i]['TINHTRANG']==0){
                                                      $row1 ++;
                                                      ?>
                                              <tr title="Click edit để duyệt và sửa thành viên">
                                                 <td><input type="checkbox" class="checkbox" /></td>
                                                 <td><img width="80px" height = "80px" src="<?php echo $this->AllThanhVien[$i]['HINHDAIDIEN'] ?>"/></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['MATHANHVIEN'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['TENTHANHVIEN'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['NGAYSINH'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['DIACHI'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['EMAIL'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['SODIENTHOAI'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['SOCMND'] ?></td>
                                                 <td><img width="80px" height = "80px" src="<?PHP echo $this->AllThanhVien[$i]['HINHCMNDT']?>"/></td>
                                                 <td><img width="80px" height = "80px" src="<?PHP echo $this->AllThanhVien[$i]['HINHCMNDS']?>"/></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['NGAYDANGKY'] ?></td>
                                                 <td><a href="adminThanhVien/delThanhVien?id=<?php echo $this->AllThanhVien[$i]['MATHANHVIEN'] ?>"class="ico del" onclick="return confirm('Ban co chac chan xóa khong?');">Delete</a><a href="#" class="ico edit">Edit</a></td>
                                              </tr>
                                              <?php }}}?>
                                           </table>
                                           <div style="margin-top:5px; margin-bottom:5px; margin-left:11px">
                                              <p class="select-all">
                                                 <input type="checkbox" class="checkbox" />
                                                 <label>Chọn Tất Cả</label>&thinsp;
                                                 <a href="#" style="text-decoration:none"> Xóa Dòng Đã Chọn</a>
                                              </p>
                                           </div>
                                           <!-- Pagging -->
                                           <div class="pagging">
                                              <div class="left">Số thành viên level 0: <?php echo $row1;?></div>
                                              <div class="right"> <a href="#">Previous</a> <a href="#">1</a> <a href="#">2</a> <span>...</span> <a href="#">Next</a> <a href="#">View all</a> </div>
                                           </div>
                                           <!-- End Pagging -->
                                        </div>
                                        <!-- End Table -->
			</div><!--End #tab1-->
			<!-- Tab hiển thị thành viên loại 1(level 1) -->	
			<div id="tab2">
					<!-- Table -->
                                        <div class="table">
                                           <table max-width="100%" border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                 <th width="13">&nbsp;</th>
                                                 <th>Hình Avatar</th>
                                                 <th>Mã Thành Viên</th>
                                                 <th>Tên Thành Viên</th>
                                                 <th>Ngày Sinh</th>
                                                 <th>Địa Chỉ</th>
                                                 <th>Email</th>
                                                 <th>Số Điện Thoại</th>
                                                 <th>Số CMND</th>
                                                 <th>CMND Trước</th>
                                                 <th>CMND Sau</th>
                                                 <th>Ngày Đăng Ký</th>
                                                 <th width="90px" class="ac">Điều Khiển</th>
                                              </tr>
                                              <?php
                                              if(isset($this->AllThanhVien)){
                                                  $row2 =0;
                                                  for($i=0; $i<count($this->AllThanhVien); $i++){
                                                  if($this->AllThanhVien[$i]['TINHTRANG']==1){
                                                      $row2 ++;
                                                      ?>
                                              <tr title="Click edit để duyệt và sửa thành viên">
                                                 <td><input type="checkbox" class="checkbox" /></td>
                                                 <td><img width="80px" height = "80px" src="<?php echo $this->AllThanhVien[$i]['HINHDAIDIEN'] ?>"/></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['MATHANHVIEN'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['TENTHANHVIEN'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['NGAYSINH'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['DIACHI'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['EMAIL'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['SODIENTHOAI'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['SOCMND'] ?></td>
                                                 <td><img width="90px" height = "90px" src="<?PHP echo $this->AllThanhVien[$i]['HINHCMNDT']?>"/></td>
                                                 <td><img width="90px" height = "90px" src="<?PHP echo $this->AllThanhVien[$i]['HINHCMNDS']?>"/></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['NGAYDANGKY'] ?></td>
                                                 <td><a href="adminThanhVien/delThanhVien?id=<?php echo $this->AllThanhVien[$i]['MATHANHVIEN'] ?>" class="ico del" onclick="return confirm('Ban co chac chan xóa khong?');">Delete</a><a href="#" class="ico edit">Edit</a></td>
                                              </tr>
                                              <?php }}}?>
                                           </table>
                                           <div style="margin-top:5px; margin-bottom:5px; margin-left:11px">
                                              <p class="select-all">
                                                 <input type="checkbox" class="checkbox" />
                                                 <label>Chọn Tất Cả</label>&thinsp;
                                                 <a href="#" style="text-decoration:none"> Xóa Dòng Đã Chọn</a>
                                              </p>
                                           </div>
                                           <!-- Pagging -->
                                           <div class="pagging">
                                              <div class="left">Số thành viên level 1: <?php echo $row2;?></div>
                                              <div class="right"> <a href="#">Previous</a> <a href="#">1</a> <a href="#">2</a> <span>...</span> <a href="#">Next</a> <a href="#">View all</a> </div>
                                           </div>
                                           <!-- End Pagging -->
                                        </div>
                                        <!-- End Table -->
			</div><!--End #tab2-->
                        <!-- Tab hiển thị danh sách thành viên level 2 -->	
			<div id="tab3">
					<!-- Table -->
                                         <div class="table">
                                           <table max-width="100%" border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                 <th width="13">&nbsp;</th>
                                                 <th>Hình Avatar</th>
                                                 <th>Mã Thành Viên</th>
                                                 <th>Tên Thành Viên</th>
                                                 <th>Ngày Sinh</th>
                                                 <th>Địa Chỉ</th>
                                                 <th>Email</th>
                                                 <th>Số Điện Thoại</th>
                                                 <th>Số CMND</th>
                                                 <th>CMND Trước</th>
                                                 <th>CMND Sau</th>
                                                 <th>Ngày Đăng Ký</th>
                                                 <th width="90px" class="ac">Điều Khiển</th>
                                              </tr>
                                              <?php
                                              if(isset($this->AllThanhVien)){
                                                  $row3 = 0;
                                                  for($i=0; $i<count($this->AllThanhVien); $i++){
                                                  if($this->AllThanhVien[$i]['TINHTRANG']==2){
                                                      $row3++;
                                                      ?>
                                              <tr title="Click edit để duyệt và sửa thành viên" >
                                                 <td><input type="checkbox" class="checkbox" /></td>
                                                 <td><img width="90px" height = "80px" src="<?php echo $this->AllThanhVien[$i]['HINHDAIDIEN'] ?>"/></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['MATHANHVIEN'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['TENTHANHVIEN'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['NGAYSINH'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['DIACHI'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['EMAIL'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['SODIENTHOAI'] ?></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['SOCMND'] ?></td>
                                                 <td><img width="90px" height = "90px" src="<?PHP echo $this->AllThanhVien[$i]['HINHCMNDT']?>"/></td>
                                                 <td><img width="90px" height = "90px" src="<?PHP echo $this->AllThanhVien[$i]['HINHCMNDS']?>"/></td>
                                                 <td><?php echo $this->AllThanhVien[$i]['NGAYDANGKY'] ?></td>
                                                 <td><a href="adminThanhVien/delThanhVien?id=<?php echo $this->AllThanhVien[$i]['MATHANHVIEN'] ?>" class="ico del" onclick="return confirm('Ban co chac chan xóa khong?');">Delete</a><a href="#" class="ico edit">Edit</a></td>
                                              </tr>
                                              <?php }}}?>
                                           </table>
                                           <div style="margin-top:5px; margin-bottom:5px; margin-left:11px">
                                              <p class="select-all">
                                                 <input type="checkbox" class="checkbox" />
                                                 <label>Chọn Tất Cả</label>&thinsp;
                                                 <a href="#" style="text-decoration:none"> Xóa Dòng Đã Chọn</a>
                                              </p>
                                           </div>
                                           <!-- Pagging -->
                                           <div class="pagging">
                                              <div class="left">Số thành viên level 2: <?php echo $row3;?></div>
                                              <div class="right"> <a href="#">Previous</a> <a href="#">1</a> <a href="#">2</a> <span>...</span> <a href="#">Next</a> <a href="#">View all</a> </div>
                                           </div>
                                           <!-- End Pagging -->
                                        </div>
                                        <!-- End Table -->
			</div><!--End #tab3-->
                    </div><!--End .product-->
                
                     <!-- End Box Head -->
                     
                     <!-- Table -->
                  </div>
                  <!-- End Box -->
          
               </div>
               <!-- End Content -->
               <div class="cl">&nbsp;</div>
            </div>
            <!-- Main -->