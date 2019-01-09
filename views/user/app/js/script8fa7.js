$(document).ready(function () {
    /*$(window).scroll(function(){
        var sticky = $('.header-top'),
            scroll = $(window).scrollTop();
        if(sticky.hasClass('temp1') === false){
            if (scroll >= 100) sticky.addClass('header-fixed');
            else sticky.removeClass('header-fixed');
        }
    });*/

    $(".footer-info > div:last-child").click(function () {
        $('html, body').animate({scrollTop: 0}, 'slow');
        return false;
    });

    $('body').on('click','.btn-partner-cv',function(event) {
        event.preventDefault();
        var $this=$(this);

        var id = $(this).data('id');
        var id_hide = $(this).data('id-hide');
        $(".btn-partner-cv").removeClass("btn-partner-cv-active");
        $(this).addClass("btn-partner-cv-active");
        $(".input-cv").hide();
        $("#"+id).slideDown();
        $("#"+id_hide).find("input").val("");
    });


    $('body').on('click','.btn-view-cv',function(event) {
        event.preventDefault();
        var $this=$(this);
        var href=$this.attr('href');
        var url = href;
        var user_id = $(this).data('user-id');
        var job_id = $(this).data('job-id');

        $.ajax({
            type :"POST",
            url : url,
            data: {user_id: user_id, job_id: job_id},
            beforeSend: function(){
                $this.attr('disable', 'disable');
                $('body').append('<div class="loader"><div class="overlay-loading"></div><div class="loading-2"></div></div>');
            },
            success: function(data){
                $('.loader').remove();
                $("#cv-modal").html(data);
                $("#cv-modal").modal('show');
            }
        });
    });

    $('body').on('click','.btn-view-contact',function(event) {
        event.preventDefault();
        var $this=$(this);
        var href=$this.attr('href');
        var url = href;
        var user_id = $(this).data('user-id');
        var job_id = $(this).data('job-id');

        $.ajax({
            type :"POST",
            url : url,
            data: {user_id: user_id, job_id: job_id},
            beforeSend: function(){
                $this.attr('disable', 'disable');
                $('body').append('<div class="loader"><div class="overlay-loading"></div><div class="loading-2"></div></div>');
            },
            success: function(data){
                $('.loader').remove();
                $("#cv-modal").html(data);
                $("#cv-modal").modal('show');
            }
        });
    });

    /*Huynh An*/
    $('body').on('click','.favourites',function(){
        var $this=$(this);
        var id = $(this).attr('data-id');
        var redirect_url = $(this).attr('data-url');
        var element = $(this);
        if($(this).hasClass('loved')){
            var status = "remove";
        }else{
            var status = "add";
        }
        $.ajax({
            type : "POST",
            url : BASE_URL+"/job/ajaxAddFavourites",
            data : {id : id,status:status},
            success:function(result){
                var data = $.parseJSON(result);
                if(data.message == "Not logged") {

                    var html = '<input type="hidden" name="redirect_url" value="' + redirect_url + '">'+
                        '<input type="hidden" name="job_id" value="' + id + '">';
                    $("#login-popup-form").append(html);
                    $("#login-modal").modal('show');
                }else if(data.status == 'success'){
                    if(element.hasClass('loved')){
                        element.removeClass('loved');
                    }else{
                        element.addClass('loved');
                    }
                    if(element.hasClass('loved')){
                        element.removeClass('glyphicon-heart-empty');
                        element.addClass('glyphicon-heart');
                    }
                    else{
                        element.removeClass('glyphicon-heart');
                        element.addClass('glyphicon-heart-empty');
                    }
                }

            }
        });
    });

    $('body').on('click','.resume-favourites',function(){
        var $this=$(this);
        var id = $(this).attr('data-id');
        var redirect_url = $(this).attr('data-url');
        var element = $(this);
        if($(this).hasClass('loved')){
            var action = "remove";
        }else{
            var action = "add";
        }
        $.ajax({
            type : "POST",
            url : BASE_URL+"/employers/ajaxAddResumeFavourites",
            data : {id : id, action:action},
            success:function(result){
                var data = $.parseJSON(result);

                if(data.status == "ERROR") {
                    var html = '<input type="hidden" name="redirect_url" value="' + redirect_url + '">'+
                        '<input type="hidden" name="resume_id" value="' + id + '">';
                    $("#login-popup-form").append(html);
                    $("#login-modal").modal('show');
                }else if(data.status == 'SUCCESS'){
                    if(element.hasClass('loved')){
                        element.removeClass('loved');
                    }else{
                        element.addClass('loved');
                    }
                    if($this.hasClass('loved')){
                        $this.removeClass('glyphicon-heart-empty');
                        $this.addClass('glyphicon-heart');
                    }
                    else{
                        $this.removeClass('glyphicon-heart');
                        $this.addClass('glyphicon-heart-empty');
                    }
                }
            }
        });
    });

    $('body').on('change','.salary-negotiable',function(){
        if($(this).is(':checked')){
            $('#currency_id').attr('disabled', true);
            $('#customize_budget').find('input').prop('disabled', true);
        }else{
            $('#currency_id').attr('disabled', false);
            $('#customize_budget').find('input').prop('disabled', false);
        }
    });

    $(document).ready(function() {
        $('body').on('click','.btn-apply-job',function(event) {
            var $this=$(this);
            var url = BASE_URL+'job/checkLoginApply';
            var idJobs=$(this).attr('data-id');
            var token=$(this).data('token');
            //var dataForm = new FormData(this);
            $.ajax({
                type :"POST",
                url : url,
                data : {idJobs:idJobs},
                beforeSend: function(){
                    $this.attr('disable', 'disable');
                    $('body').append('<div class="loader"><div class="overlay-loading"></div><div class="loading-2"></div></div>');
                },
                success: function(data){
                    $this.removeAttr('disable');
                    var res = $.parseJSON(data);
                    if(res.result=='error'){
                        var current_url=res.redirect_url;
                        window.open(BASE_URL+'users/login/?next='+current_url,'_self');
                    }
                    else{
                        $('.loader').remove();
                        var urlLoadModalApply=BASE_URL+'job/urlLoadModalApply'+ '/?idJobs='+idJobs;
                        if(token != ''){
                            urlLoadModalApply += '&token='+token;
                        }
                        $.ajax({
                            type :"POST",
                            url : urlLoadModalApply,
                            success: function(data){
                                if(data=='error'){
                                    modal(null,'Thông báo','Bạn cần phải đăng nhập với tư cách là người tìm việc','alert');
                                }
                                if(data==1){
                                    modal(null,'Thông báo','Bạn cần kích hoạt tài khoản.','alert');
                                }
                                else{
                                    $("#apply-modal").html(data);
                                    $("#apply-modal").modal('show');
                                }
                            }
                        })

                    }
                }
            });
        });
    });

    $(document).ready(function() {
        $('body').on('click','.btn-apply-free',function(event) {
            var $this=$(this);
            var id = $(this).attr('data-id');
            var token = $(this).data('token');
            var topcv_token = $(this).data('topcv-token');
            var seeder_id = $(this).data('seeder-id');

            var url = BASE_URL + 'job/getModalApply/?id=' + id;
            if(token != undefined){
                url += '&token='+token;
            }

            $.ajax({
                type :"POST",
                url : url,
                data: ({id: id, token: token, topcv_token: topcv_token, seeder_id: seeder_id}),
                beforeSend: function () {
                    $this.addClass('disabled');
                    $('body').append('<div class="loader"><div class="overlay-loading"></div><div class="loading-2"></div></div>');
                },
                success: function(data){
                    $this.removeClass('disabled');
                    $('.loader').remove();

                    $("#apply-modal").html(data);
                    $("#apply-modal").modal('show');
                }
            });

        });
    });
    /*end HUynh An*/
    //$('#horiz_container_outer').horizontalScroll();
    $(".brand-content").mCustomScrollbar({
        theme:"inset-2-dark",
        axis:"x",
        advanced:{autoExpandHorizontalScroll:true},
        /* change mouse-wheel axis on-the-fly */
        callbacks:{
            onOverflowY:function(){
                var opt=$(this).data("mCS").opt;
                if(opt.mouseWheel.axis!=="y") opt.mouseWheel.axis="y";
            },
            onOverflowX:function(){
                var opt=$(this).data("mCS").opt;
                if(opt.mouseWheel.axis!=="x") opt.mouseWheel.axis="x";
            }
        }
    });

    $('#btn-edit-profile').click(function () {
        $("#frm-edit-profile input,textarea").show();
        $("#frm-edit-profile #btn-save-profile").show();
        $("#frm-edit-profile #btn-cancel-save-profile").show();
    });
    $('#btn-cancel-save-profile').click(function () {
        $("#frm-edit-profile input,textarea").hide();
        $("#frm-edit-profile #btn-save-profile").hide();
        $("#frm-edit-profile #btn-cancel-save-profile").hide();
    });
    $('#add-resume').click(function () {
        $('.btn-resume li:last-child').before("<li><span><form id='frm-edit-resume' method='POST'><input class='form-control' name='resume' required style='margin-bottom: 10px;' type='text' /> <button type='button' onclick='editResume()' id='btn-save-resume' name='submit' value='submit' style='margin-right: 5px;' class='btn btn-primary'>Save</button><button type='button' id='btn-cancel-resume' class='btn btn-default'>Cancel</button></form></span></li>")
    });

    $('.btn-resume').on('click', '#btn-cancel-resume', function () {
        $(this).parent().parent().parent().remove();
    });

    $('#add-skill').click(function () {
        $('.btn-skill li:last-child').before("<li><span><form id='frm-edit-skill' method='POST'><input class='form-control' name='skill' required style='margin-bottom: 10px;' type='text' /> <button type='button' onclick='editSkill()' id='btn-save-skill ' name='submit' value='submit' style='margin-right: 5px;' class='btn btn-primary'>Save</button><button type='button' id='btn-cancel-skill' class='btn btn-default'>Cancel</button></form></span></li>")
    });
    $('.btn-skill').on('click', '#btn-cancel-skill', function () {
        $(this).parent().parent().parent().remove();
    });

    $("#bidAmt").on('input', function () {
        $("#bid-receive").html($("#bidAmt").val() - 5);
        $("#bid_paid").val($("#bidAmt").val() - 5);
    });

    // view detail Portfolio
    $('.detail-portfolio').on('click', function () {
        var pid = $(this).attr('data-id');
        $.ajax({
            type: "POST",
            url: BASE_URL + "programmer/ajaxPortfolio",
            data: ({portid: pid}),
            success: function (respond) {
                $('#ajax-modal').html(respond);
                $('#ajax-modal').modal();
            }
        });
    });

    // view detail Portfolio
    $('.partner-portfolio').on('click', function () {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "POST",
            url: BASE_URL + "partners/ajaxPortfolio",
            data: ({id: id}),
            success: function (respond) {
                $('#ajax-modal').html(respond);
                $('#ajax-modal').modal();
            }
        });
    });

    // load view add review buyer
    $('.review-buyer').on('click', function () {
        var url = $(this).attr('data-href');
        $.get(url, function (data) {
            $('#ajax-modal2').html(data);
            $('#ajax-modal2').modal();
        });
    });

    // load view invite program
    // $('.btn-invite').on('click', function () {
    //     var url = $(this).attr('data-href');
    //     $.get(url, function (data) {
    //         $('#ajax-modal2').html(data);
    //         $('#ajax-modal2').modal();
    //     });
    // });

    // $('.btn_invite_dev').on('click', function () {
    //     var url = $(this).attr('data-href');
    //     $.get(url, function (data) {
    //         $('#ajax-modal2').html(data);
    //         $('#ajax-modal2').modal();
    //     });
    // });

    // load review offer
    $('body').on('click', '.btn_invite_hire', function(){
        var userId = $(this).attr('data-user-id');
        var projectId = $(this).attr('data-project-id');

        $.ajax({
            type: "POST",
            url: BASE_URL + "buyer/reviewOffer",
            data: ({userId: userId, projectId: projectId}),
            success: function (data) {
                //var res = $.parseJSON(data);
                $('#ajax-modal').html(data);
                $('#ajax-modal').modal();
            }
        });
    });

    // load accept offer
    $('.accept-offer').on('click', function(){
        var userId = $(this).attr('data-id');
        var projectId = $(this).attr('data-project-id');

        $.ajax({
            type: "POST",
            url: BASE_URL + "programmer/acceptOffer",
            data: ({userId: userId, projectId: projectId}),
            success: function (data) {

                $('#ajax-modal').html(data);
                $('#ajax-modal').modal();
            }
        });
    });

    $('.decline-offer').on('click', function(){
        var userId = $(this).attr('data-id');
        var projectId = $(this).attr('data-project-id');

        $.ajax({
            type: "POST",
            url: BASE_URL + "programmer/declineOffer",
            data: ({userId: userId, projectId: projectId}),
            success: function (data) {

                $('#ajax-modal').html(data);
                $('#ajax-modal').modal();
            }
        });
    });

    $('body').on('click', '.view-offer-client', function(){
        var userId = $(this).attr('data-id');
        var projectId = $(this).attr('data-project-id');

        $.ajax({
            type: "POST",
            url: BASE_URL + "buyer/viewOffer",
            data: ({userId: userId, projectId: projectId}),
            success: function (data) {

                $('#ajax-modal').html(data);
                $('#ajax-modal').modal();
            }
        });
    });

    // pop-up login
    $("#link-log-in").click(function (e) {
        e.preventDefault();
        $("#login-modal").modal('show');
    });// end tag <a> click

    $('body').on('click', '.login', function(e){
        e.preventDefault();
        $("#login-modal").modal('show');
    });

    $('#link-log-in-hire-me').click(function(e){
        e.preventDefault();
        $("#login-modal").modal('show');
    });

    $(".link-log-in").click(function (e) {
        e.preventDefault();

        var redirect_url = BASE_URL + 'post-project.html';
        var html = '<input type="hidden" name="redirect_url_post_project" value="' + redirect_url + '">';
        $("#login-popup-form").append(html);
        $("#login-modal").modal('show');
    });

    $(".log-in-live-project").click(function (e) {
        e.preventDefault();

        var redirect_url = $(this).parent().attr('data-url');
        var html = '<input type="hidden" name="redirect_url_post_project" value="' + redirect_url + '">';
        $("#login-popup-form").append(html);
        $("#login-modal").modal('show');
    });

    $(".log-in-to-apply").click(function (e) {
        e.preventDefault();

        var redirect_url = $(this).parent().attr('data-url');
        var html = '<input type="hidden" name="redirect_url_view_project" value="' + redirect_url + '">';
        $("#login-popup-form").append(html);
        $("#login-modal").modal('show');
    });

    /**
     * Select with Search
     */
    jQuery(".chzn-select").chosen({
        no_results_text: "Không tìm thấy: ",
        enable_split_word_search: false,
        width: "100%"
    });

    $('.chosen-select').chosen();

    // select group
    $('.sl-group').change(function () {
        var id = $(this).val();

        $.ajax({
            type: "POST",
            url: BASE_URL + "project/ajaxGetCategories",
            data: ({group_id: id}),
            success: function (data) {
                var res = $.parseJSON(data);
                var html = "<select class='form-control multiple col-lg-12 sl-skill chzn-select'>" +
                    "<option>-- Please select --</option>";
                $.each(res, function () {
                    html += "<option value=" + this['id'] + ">" + this['category_name'] + "</option>";
                });
                html += "</select>";
                $('.div-skill').html(html);
                $('.chzn-select').chosen({
                    no_results_text: "Không tìm thấy: ",
                    enable_split_word_search: false,
                    width: "100%"
                });

            }
        });
    });

    // change select skill
    $('.sl-skill').on('change', function () {
        var category_id = $(this).val();
        var href_current = window.location.href;
        var uri = window.location.pathname;
        var arrUri = uri.split('/');
        var tmpUri = arrUri;
        var url = "/";// BASE_URL;

        if (arrUri[6] != undefined && arrUri[6] != '') {
            category_ids = arrUri[6].split(",");

            // remove 2 last element
            tmpUri.splice(5, 2);
            var uriNew = tmpUri.join('/');
            while (uriNew.charAt(0) === '/') {
                uriNew = uriNew.slice(1);
            }

            if (category_ids.indexOf(category_id) >= 0) {
                url += uriNew + "/0/" + category_ids;
            } else {
                url += uriNew + "/0/" + category_ids + "," + category_id;
            }

            window.location.href = url;
        } else {
            tmpUri.splice(5, 2);
            var uriNew = tmpUri.join('/');
            while (uriNew.charAt(0) === '/') {
                uriNew = uriNew.slice(1);
            }

            url += uriNew + "/0/" + category_id;

            window.location.href = url;
        }
    });

    if ($('#cate-milestone option:selected').text() == 'Customize') {
        $("#btn-create-milestone").show();
    } else {
        $("#btn-create-milestone").hide();
        $("#save-milestone").hide();
    }
    $('#cate-milestone').change(function () {
        if ($('#cate-milestone option:selected').text() == 'Customize') {
            $("#btn-create-milestone").show();
        } else {
            $("#btn-create-milestone").hide();
            $("#save-milestone").hide();
        }
    });

    // get skill by group


    // get skill by device
    $('.label-device input:checkbox').change(function () {
        var categoryIds = $(this).attr('data-categories');
        var $this = $(this);
        /*if($this.is(':checked')){
         alert('check');
         }else{
         alert('uncheck');
         }*/
        $.ajax({
            type: "POST",
            url: BASE_URL + "/project/ajaxGetCategories",
            data: ({ids: categoryIds}),
            beforeSend: function () {
                //setTimeout(function(){
                $('.sticky-skill').append('<span class="loading-1"></span>');
                //}, 3000);
            },
            success: function (data) {
                $('.sticky-skill').find('.loading-1').remove();

                var res = $.parseJSON(data);
                var html = '';

                var skillCur = [];
                var skillNameCur = [];
                $.each($('#skills option'), function (index, val) {
                    skillCur.push(this.value);
                });
                $.each($('.sticky-skill label'), function (index, val) {
                    skillNameCur.push(this.textContent);
                });

                var catHidden = '';
                if ($this.is(':checked')) {
                    $.each(res, function (index, val) {
                        if ($.inArray(val['id'], skillCur) == -1 && $.inArray(val['category_name'], skillNameCur) == -1 ) {
                            html += "<label class='label-skill' data-value=" + val['id'] + ">" + val['category_name'] + "</label>";
                        }else {
                            $(this).attr('checked', true);
                        }
                    });
                    //$this.attr('data-categories-hidden', catHidden);
                } else {
                    $.each($('.sticky-skill label'), function (i, v) {
                        var idOld = this.getAttribute("data-value");
                        var $this = $(this);

                        $.each(res, function (index, val) {
                            if (val['id'] == idOld) {
                                $this.fadeOut(300, function () {
                                    $this.remove();
                                });
                                //$this.remove();
                            }
                        });
                    });
                }

                $(html).hide().appendTo(".sticky-skill").fadeIn(300);


            }
        });
    });

    $('body').on('click', '.label-skill', function () {
        var id = $(this).attr('data-value');
        var title = $(this).text().trim();

        if ($(this).hasClass('active-skill')) {
            $(this).removeClass('active-skill');
            $.each($('#skills option'), function (index, val) {
                var $this = $(this);
                if (this.value == id) {
                    $this.remove();
                }
            });

            $('#skills').trigger('liszt:updated');
        } else {
            $(this).addClass('active-skill');
            var html = "<option value='" + id + "' selected>" + title + "<option>";

            $('#skills').append(html);
            $('#skills').trigger('liszt:updated');
        }
    });

    // chose project template
    $('.label-template input:radio').change(function () {
        var id = $(this).val();

        window.location.href = BASE_URL + "post-project/t/" + id;
    });

    // get skill by device
    $('.label-device input:radio').change(function () {
        var categoryIds = $(this).attr('data-categories');
        $.ajax({
            type: "POST",
            url: BASE_URL + "project/ajaxGetCategories",
            data: ({ids: categoryIds}),
            success: function (data) {
                var res = $.parseJSON(data);
                var html = '';

                $.each($('select[name="project_categories[]_helper1"] option'), function (index, val) {

                    html += "<option value=" + this.value + ">" + this.innerText + "</option>";
                });

                $.each(res, function (index, val) {
                    html += "<option value=" + val['id'] + " selected>" + val['category_name'] + "</option>";

                });
                listBoxSkill.html(html);
                listBoxSkill.trigger('bootstrapDualListbox.refresh');
            }
        });
    });
    //$('#more-country').click(function () {
    //    var $this = $(this);
    //    $.get(BASE_URL + "/project/ajaxGetCountries", function (data) {
    //        var res = $.parseJSON(data);
    //        var html = '';
    //        $.each(res, function (k, v) {
    //            html += "<label class='label-country'><input type='checkbox' name='locations[]' value=" + v.id + "> " + v.country_name + "</label>";
    //        });
    //        $('.countries').append(html);
    //        $this.remove();
    //    });
    //});

    // sort dev
    $('.select-sort').change(function () {
        var dir = $(this).find("option:selected").data("dir");
        $('#dir').val(dir);
        $(this).parent().submit();
    });

    // select option boottrap
    $('.selectpicker').selectpicker();

    // select category child
    $('#ChildCategory').on('change', 'input:checkbox', function(){
        var groupId = $(this).val();
        var $this = $(this);

        $.ajax({
            type: "POST",
            url: BASE_URL + "/project/ajaxGetCategories",
            data: ({group_id: groupId}),
            success: function (data) {
                var res = $.parseJSON(data);
                var html = '';

                if($this.is(":checked") === true) {
                    $.each(res, function (index, val) {
                        html += "<option value='" + val['id'] + "'>" + val['category_name'] + "</option>";
                    });
                    $('#skills').append(html);
                    $("#skills").trigger('liszt:updated');
                }else if($this.is(":checked") === false){
                    $.each(res, function (index, val) {
                        $.each($('#skills option'), function (i) {
                            var $this = $(this);
                            if(this.value == val['id']) {
                                $this.remove();
                            }
                        });
                    });
                    $('#skills').append(html);
                    $("#skills").trigger('liszt:updated');
                }

            }
        });
    });

    // multiselect bootstrap
    /*$('#ChildCategory').multiselect({
     numberDisplayed: 1,
     nonSelectedText: '-- Vui lòng chọn --',
     buttonWidth: '100%',
     buttonClass: 'form-control',
     onChange: function(element, checked) {
     var groupId = $(element).val();

     $.ajax({
     type: "POST",
     url: BASE_URL + "project/ajaxGetCategories",
     data: ({group_id: groupId}),
     success: function (data) {
     var res = $.parseJSON(data);
     var html = '';

     if(checked === true) {
     $.each(res, function (index, val) {
     html += "<option value='" + val['id'] + "'>" + val['category_name'] + "</option>";
     });
     $('#skills').append(html);
     $("#skills").trigger('liszt:updated');
     }else if(checked === false){
     $.each(res, function (index, val) {
     $.each($('#skills option'), function (i) {
     var $this = $(this);
     if(this.value == val['id']) {
     $this.remove();
     }
     });
     });
     $('#skills').append(html);
     $("#skills").trigger('liszt:updated');
     }

     }
     });
     }
     });*/

    // validate error
    $('.error').parents('.form-group').addClass('has-error');

    $('#btn-status-project').confirmation({
        popout:true
    });

    // add wishlist project
    $('body').on('click','.job-wishlist', function(){
        var id = $(this).attr('data-id');
        var redirect_url = $(this).attr('data-url');
        var $this = $(this);

        $.ajax({
            type: "POST",
            url: BASE_URL + "/job/ajaxAddFavourites",
            data: ({project_id: id}),
            success: function (data) {
                var res = $.parseJSON(data);

                if(res.status === "FAIL") {
                    var html = '<input type="hidden" name="project_id" value="' + id + '">' +
                        '<input type="hidden" name="redirect_url" value="' + redirect_url + '">';
                    $("#login-popup-form").append(html);
                    $("#login-modal").modal('show');
                }else if(res.status === "SUCCESS"){
                    //BootstrapDialog.alert('Job đã được thêm vào danh sách yêu thích');
                    var num_saved_project = $('#num-saved-project').attr('data-num');
                    num_saved_project = parseInt(num_saved_project) + 1;
                    $('#num-saved-project').attr('data-num', num_saved_project);
                    $('#num-saved-project').html('(<span>'+num_saved_project+'</span>)');

                    $this.removeClass('project-wishlist glyphicon-heart-empty');
                    $this.addClass('active-wishlist glyphicon-heart');
                }

            }
        });
    });

    // remove wishlist
    $('body').on('click', '.active-wishlist', function(){
        var id = $(this).attr('data-id');
        var redirect_url = $(this).attr('data-url');
        var $this = $(this);

        $.ajax({
            type: "POST",
            url: BASE_URL + "/joblist/ajaxRemoveProjectWishlist",
            data: ({project_id: id}),
            success: function (data) {
                var res = $.parseJSON(data);

                if(res.status === "FAIL") {
                    var html = '<input type="hidden" name="project_id" value="' + id + '">' +
                        '<input type="hidden" name="redirect_url" value="' + redirect_url + '">';
                    $("#login-popup-form").append(html);
                    $("#login-modal").modal('show');
                }else if(res.status === "SUCCESS"){
                    //BootstrapDialog.alert('Job đã được xóa ra khỏi danh sách yêu thích');
                    var num_saved_project = $('#num-saved-project').attr('data-num');
                    num_saved_project = parseInt(num_saved_project) - 1;
                    $('#num-saved-project').attr('data-num', num_saved_project);
                    $('#num-saved-project').html(num_saved_project);

                    $this.removeClass('active-wishlist glyphicon-heart');
                    $this.addClass('project-wishlist glyphicon-heart-empty');
                }

            }
        });
    });

    // remove wishlist
    $('body').on('click', '.remove-wishlist', function(){
        var id = $(this).attr('data-id');
        var redirect_url = $(this).attr('data-url');
        var $this = $(this);

        BootstrapDialog.confirm('Do you want to remove?', function(result){
            if(result === true) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + "/joblist/ajaxRemoveProjectWishlist",
                    data: ({project_id: id}),
                    success: function (data) {
                        var res = $.parseJSON(data);

                        if (res.status === "FAIL") {
                            var html = '<input type="hidden" name="project_id" value="' + id + '">' +
                                '<input type="hidden" name="redirect_url" value="' + redirect_url + '">';
                            $("#login-popup-form").append(html);
                            $("#login-modal").modal('show');
                        } else if (res.status === "SUCCESS") {
                            //BootstrapDialog.alert('Job đã được xóa ra khỏi danh sách yêu thích');
                            var num_saved_project = $('#num-saved-project').attr('data-num');

                            $this.removeClass('active-wishlist glyphicon-heart');
                            $this.addClass('project-wishlist glyphicon-heart-empty');
                            $this.parents('.row-find-job').remove();

                            num_saved_project = parseInt(num_saved_project) - 1;
                            $('#num-saved-project').attr('data-num', num_saved_project);
                            $('#num-saved-project').html('(<span>'+num_saved_project+'</span>)');
                        }

                    }
                });
            }
        });
    });

    // chose type budget
    $("#frm-bubget input:radio").change(function(){
        var type = $(this).val();

        $("#frm-bubget label").removeClass('active');
        $(this).parent().addClass('active');

        if(type == 2){
            $("#frm-bubget .budget").attr('disabled', false);
        }else{
            $("#frm-bubget .budget").attr('disabled', true);
        }
    });

    // job description read more
    $("body").on('click', '.des-readmore', function(){
        var id = $(this).attr('data-id');
        var $this = $(this);

        $.ajax({
            type: "POST",
            url: BASE_URL + "/project/ajaxGetProject",
            data: ({project_id: id}),
            beforeSend: function () {
                $this.after('<span class="loading-1" style="display: inline-block; margin-bottom: -4px; margin-left: 8px"></span>');
            },
            success: function (data) {
                $('.loading-1').remove();
                var res = $.parseJSON(data);
                $this.parent('.project-des').hide().html(nl2br(res.description)).fadeIn();
            }
        });
    });

    // submit project status
    $('.select-invoice-status').change(function(){
        var id = $(this).val();
        var href_current = BASE_URL + 'employers/orders';
        if(id != ''){
            href_current += '/st/'+id;
        }

        window.history.pushState({}, '', href_current);
        $(this).parent('form').submit();
    });

    $('.select-apply-status').change(function(){
        var id = $(this).val();
        var href_current = BASE_URL + 'employers/applies';
        if(id != ''){
            href_current += '/status/'+id;
        }

        window.history.pushState({}, '', href_current);
        $(this).parent('form').submit();
    });

    // submit project status
    $('.select-job-status-dev').change(function(){
        var id = $(this).val();
        var href_current = BASE_URL + 'worker/viewMyJobs';
        if(id != ''){
            href_current += '/st/'+id;
        }

        window.history.pushState({}, '', href_current);
        $(this).parent('form').submit();
    });

    $("#flexiselDemo").flexisel({
        visibleItems: 4,
        animationSpeed: 800,
        autoPlay: false,
        autoPlaySpeed: 5000,
        pauseOnHover: true,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: {
            mobi: {
                changePoint:340,
                visibleItems: 1
            },
            portrait: {
                changePoint:480,
                visibleItems: 1
            },
            landscape: {
                changePoint:640,
                visibleItems: 2
            },
            tablet: {
                changePoint:768,
                visibleItems: 2
            },
            pc: {
                changePoint:1024,
                visibleItems: 4
            }
        }
    });
    $('.flexslider').flexisel({
        visibleItems: 3,
        animationSpeed: 800,
        autoPlay: false,
        autoPlaySpeed: 5000,
        pauseOnHover: true,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: {
            mobi: {
                changePoint:340,
                visibleItems: 1
            },
            portrait: {
                changePoint:480,
                visibleItems: 1
            },
            landscape: {
                changePoint:640,
                visibleItems: 2
            },
            tablet: {
                changePoint:768,
                visibleItems: 2
            },
            pc: {
                changePoint:1024,
                visibleItems: 3
            }
        }
    });

    // remove watchlist
    $('.btn-remove-watchlist').click(function(){
        var id = $(this).attr('data-id');
        var $this = $(this);

        BootstrapDialog.confirm('Do you want remove item?', function(result){
            if(result === true) {
                $.ajax({
                    type: "POST",
                    data : "user_id="+id,
                    url : BASE_URL+"/users/removeWatchList",
                    success:function(data){
                        var data = $.parseJSON(data);
                        if(data.status == 'success'){
                            $this.parents('.item-'+id).fadeOut().remove();

                            var num_freelancer = $('#num-saved-freelancer').attr('data-num');
                            num_freelancer = parseInt(num_freelancer) - 1;
                            $('#num-saved-freelancer').attr('data-num', num_freelancer);
                            $('#num-saved-freelancer').html('(<span>'+num_freelancer+'</span>)');
                        }

                    }
                });
            }
        });
    });
    //ajaxgetChildCategory();

    // click tabs message
    $('.menu-message li').unbind('click').click(function (){
        var href_current = BASE_URL + '/buyer/messages';
        var link = $(this).find('a').attr('href');
        if(link != ''){
            href_current += '/'+link;
        }

        window.history.pushState({}, '', href_current);
    });

    // click tabs message
    $('.menu-message-programmer li').unbind('click').click(function (){
        var href_current = BASE_URL + '/programmer/messages';
        var link = $(this).find('a').attr('href');
        if(link != ''){
            href_current += '/'+link;
        }

        window.history.pushState({}, '', href_current);
    });

    $('.ajax-pagination').on('click','a', function(e){
        e.preventDefault();

        var url = $(this).parents('.ajax-pagination').attr('data-url');
        var target = $(this).parents('.ajax-pagination').attr('data-target');
        var target_pagination = $(this).parents('.ajax-pagination');
        var link = $(this).attr('href');
        var page = $(this).attr('data-page');

        if(link != '' || link != '#'){
            window.history.pushState({}, '', link);

            $.ajax({
                type: "POST",
                url : url,
                data : "p=" + page,
                beforeSend: function(){
                    $('body').append('<div class="loader"><div class="overlay-loading"></div><div class="loading-2"></div></div>');
                },
                success:function(data){
                    var data = $.parseJSON(data);

                    if(data.message_send != ''){
                        var html = '';

                        $.each(data.items, function (index, val) {
                            var logo = BASE_URL + '/app/css/images/default-images.jpg';

                            if(fileExists(BASE_URL + '/files/logos/'+val['logo']) && val['logo'] != ''){
                                logo = BASE_URL + '/files/logos/'+val['logo'];
                            }

                            html += '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding item-mess">' +
                            '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">' +
                            '<div class="table-cell"><input type="checkbox" data-id="'+val['id']+'"></div></div>' +
                            '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 no-padding">' +
                            '<a href="#">' +
                            '<img src="'+logo+'" class="img-responsive">' +
                            '</a>' +
                            '</div>' +
                            '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">' +
                            '<div class="table-cell">' +
                            '<a href="#">'+val['user_name']+'</a>' +
                            '<p>13 hrs ago</p>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">' +
                            '<div class="table-cell">' +
                            '<span class="subject-message">'+val['subject']+'</span>' +
                            '<p>'+val['message']+'</p>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        });
                        $(target).html(html);
                        target_pagination.html(data.pagination);

                        setTimeout(function() {
                            $('body').find('.loader').remove();
                        }, 200);
                    }
                }
            });
        }

        return false;
    });

    // chose all item message
    $('.checkall').click(function(){
        var item = $('#message_inbox').find('.checkbox');

        if($(this).is(':checked')) {
            item.each(function(){
                this.checked = true;
            });
        } else {
            item.each(function(){
                $(this).attr('checked',false);
            });
        }
    });

    // mark label message
    $('.mark-mess').click(function(){
        var data = new Array();
        var status = $(this).attr('data-type');

        $('#message_inbox .checkbox').each(function(){
            if($(this).is(':checked')){
                data.push($(this).attr('data-id'));
            }
        });

        $.ajax({
            type: "POST",
            url: BASE_URL + '/buyer/ajaxMarkMessage',
            data: ({ids: data, status: status}),
            beforeSend: function(){
                $('body').append('<div class="loader"><div class="overlay-loading"></div><div class="loading-2"></div></div>');
            },
            success: function(data){
                var res = $.parseJSON(data);

                if(res.redirect_url != undefined){
                    window.location.href = res.redirect_url;
                }

                if(res.count_unread != undefined){
                    $("#count_unread").html(res.count_unread);
                }

                if(res.count_archive != undefined){
                    $("#count_archive").html(res.count_archive);
                }

                if(res.archive != undefined){
                    var html = '';
                    $.each(res.archive, function (index, val) {
                        var logo = BASE_URL + '/app/css/images/default-images.jpg';

                        if(fileExists(BASE_URL + '/files/logos/'+val['logo']) && val['logo'] != ''){
                            logo = BASE_URL + '/files/logos/'+val['logo'];
                        }

                        html += '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding item-mess">' +
                        '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">' +
                        '<div class="table-cell"><input type="checkbox" data-id="'+val['id']+'"></div></div>' +
                        '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 no-padding">' +
                        '<a href="#">' +
                        '<img src="'+logo+'" class="img-responsive">' +
                        '</a>' +
                        '</div>' +
                        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">' +
                        '<div class="table-cell">' +
                        '<a href="#">'+val['user_name']+'</a>' +
                        '<p>13 hrs ago</p>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">' +
                        '<div class="table-cell">' +
                        '<span class="subject-message">'+val['subject']+'</span>' +
                        '<p>'+val['message']+'</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    });
                    $('#archive').html(html);
                }

                setTimeout(function() {
                    $('body').find('.loader').remove();
                }, 200);
            }
        });
    });
    $('body').on('click','.more-desc',function(e){
        //var value = e.currentTarget.innerHTML;
        var target = $(this);
        target.parent(".short-desc").hide();
        target.parent().next('.full-desc').show();

    });
    $('body').on('click','.hide-desc',function(e){
        //var value = e.currentTarget.innerHTML;
        var target = $(this);
        target.parent(".full-desc").hide();
        target.parent().prev('.short-desc').show();

    });

    // slide project detail
    $('.project-details').click(function(){
        if($(this).hasClass('up')){
            $(this).removeClass('up');
            $('#project-details').stop().slideUp('slow');
        }else{
            $(this).addClass('up');
            $('#project-details').stop().slideDown('slow');
        }
    });

    // load modal add milestone
    $('.client-add-milestone').click(function(){
        var project_id = $(this).attr('data-project-id');
        $.ajax({
            type: "POST",
            url: BASE_URL + "/project/addMilestone",
            data: ({projectId: project_id}),
            success: function (respond) {
                $('#ajax-modal').html(respond);
                $('#ajax-modal').modal();
            }
        });
    });

    // change action milestone (work room)
    $('body').on('click', '.action-milestone .action-milestone-first', function(){
        var milestone_id = $(this).attr('data-id');
        var step = $(this).attr('data-step');
        var status = $(this).attr('data-status');
        var $this = $(this);

        if(status == 3 ) {
            $('.close').html('');
            var content = '<h4 style="margin-bottom: 0"><strong>If you release this milestone payment you are confirming that:</strong></h4><br>' +
                '<label><span class="glyphicon glyphicon-chevron-right" aria-hidden="true" style="margin-right: 10px;font-size: 10px;top: 0px;"></span> The freelancer has delivered the work inline with your project requirements</label> <br>' +
                '<label><span class="glyphicon glyphicon-chevron-right" aria-hidden="true" style="margin-right: 10px;font-size: 10px;top: 0px;"></span> You are 100% satisfied with the work provided by the freelancer</label> <br>' +
                '<label><span class="glyphicon glyphicon-chevron-right" aria-hidden="true" style="margin-right: 10px;font-size: 10px;top: 0px;"></span> You are not releasing funds just because the freelancer requested it</label> <br>' +
                '<label><span class="glyphicon glyphicon-chevron-right" aria-hidden="true" style="margin-right: 10px;font-size: 10px;top: 0px;"></span> You understand released funds can not be returned<br>';

            BootstrapDialog.show({
                title: 'Are you sure you wish to release funds?',
                message: content,
                buttons: [{
                    label: 'Yes, i want to release funds',
                    cssClass: 'btn-primary',
                    action: function (dialogRef) {
                        $.ajax({
                            type: "POST",
                            url: BASE_URL + "/buyer/ajaxUpdateMilestone",
                            data: ({milestone_id: milestone_id, status: status, step: step}),
                            beforeSend: function () {
                                $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -20px;"></span>');
                            },
                            success: function (data) {
                                var res = $.parseJSON(data);
                                if(res.status == 'SUCCESS'){

                                    if(status == 9){
                                        $this.parents('tr').remove();
                                    }else{
                                        var html_row = '<td>'+step+'. '+res.name+'</td>'+
                                            '<td align="center">'+res.text_status+'</td>'+
                                            '<td align="center"></td>'+
                                            '<td align="center">';
                                        if(res.milestone_status == 3 || res.milestone_status == 1){
                                            html_row += '<span class="glyphicon glyphicon-ok" aria-hidden="true" style="color: #209800; "></span>';
                                        }
                                        html_row +='</td>'+
                                        '<td align="center">$'+res.fee+'</td>'+
                                        '<td align="center">'+res.select_html+'</td>';

                                        $this.parents('tr').html(html_row);
                                    }

                                    if(res.amount_balance != undefined){
                                        $('.user-balance').html('USD $'+res.amount_balance);
                                    }

                                    // if isset milestone not funded
                                    if(res.project_id != undefined){
                                        confirmFund(res.project_id);
                                    }else{
                                        $('.message-workroom').html(showMessage('success', res.message));
                                    }

                                    $('.loading-1').remove();
                                    $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                                }else if(res.status == 'AMOUNT_NOT_ENOUGH'){
                                    $.ajax({
                                        type: "POST",
                                        data: ({milestone_id: milestone_id, step: step}),
                                        url: BASE_URL + '//payment/depositFundMilestone/',
                                        success: function(data) {
                                            $('#ajax-modal').html(data);
                                            $('#ajax-modal').modal();
                                        }
                                    });
                                    $('.loading-1').remove();
                                }else if(res.status == 'ERROR'){
                                    if(res.redirect_url != undefined){
                                        window.location.href = res.redirect_url;
                                    }
                                }
                                dialogRef.close();
                            }
                        });
                    }
                }, {
                    label: 'Cancel',
                    action: function(dialogRef){
                        dialogRef.close();
                    }
                }]
            });
        }else if(status == 9 || status == 1 ){
            BootstrapDialog.confirm('Your funds will be held securely by Applancer until your are already to pay your freelancer.<br> Are you sure?', function(result){
                if(result === true){
                    $.ajax({
                        type: "POST",
                        url: BASE_URL + "/buyer/ajaxUpdateMilestone",
                        data: ({milestone_id: milestone_id, status: status, step: step}),
                        beforeSend: function () {
                            $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -20px;"></span>');
                        },
                        success: function (data) {
                            var res = $.parseJSON(data);
                            if(res.status == 'SUCCESS'){

                                if(status == 9){
                                    $this.parents('tr').remove();
                                }else{
                                    var html_row = '<td>'+step+'. '+res.name+'</td>'+
                                        '<td align="center">'+res.text_status+'</td>'+
                                        '<td align="center"></td>'+
                                        '<td align="center">';
                                    if(res.is_escrow == 1){
                                        html_row += '<span class="glyphicon glyphicon-ok" aria-hidden="true" style="color: #209800; "></span>';
                                    }
                                    html_row +='</td>'+
                                    '<td align="center">$'+res.fee+'</td>'+
                                    '<td align="center">'+res.select_html+'</td>';

                                    $this.parents('tr').html(html_row);
                                }

                                if(res.amount_balance != undefined){
                                    $('.user-balance').html('USD $'+res.amount_balance);
                                }

                                $('.message-workroom').html(showMessage('success', res.message));
                                $('.loading-1').remove();
                                $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                            }else if(res.status == 'AMOUNT_NOT_ENOUGH'){
                                $.ajax({
                                    type: "POST",
                                    data: ({milestone_id: milestone_id, step: step}),
                                    url: BASE_URL + '//payment/depositFundMilestone/',
                                    success: function(data) {
                                        $('#ajax-modal').html(data);
                                        $('#ajax-modal').modal();
                                    }
                                });
                                $('.loading-1').remove();
                            }else if(res.status == 'ERROR'){
                                if(res.redirect_url != undefined){
                                    window.location.href = res.redirect_url;
                                }
                            }
                        }
                    });
                }
            });
        }else{
            $.ajax({
                type: "POST",
                url: BASE_URL + "/buyer/ajaxUpdateMilestone",
                data: ({milestone_id: milestone_id, status: status, step: step}),
                beforeSend: function () {
                    $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -20px;"></span>');
                },
                success: function (data) {
                    var res = $.parseJSON(data);
                    if(res.status == 'SUCCESS'){

                        if(res.milestone_status == 14 || res.milestone_status == 15){
                            step = $('.table-milestone tbody tr').size() + 1;

                            var html_row = '<tr class="item-'+res.milestone_id+'"><td>' + step + '. ' + res.name + '</td>' +
                                '<td align="center">' + res.text_status + '</td>' +
                                '<td align="center"></td>' +
                                '<td align="center">';
                            if (res.is_escrow == 1) {
                                html_row += '<span class="glyphicon glyphicon-ok" aria-hidden="true" style="color: #209800; "></span>';
                            }
                            html_row += '</td>' +
                            '<td align="center">$' + res.fee + '</td>' +
                            '<td align="center">' + res.select_html + '</td></tr>';

                            $this.parents('tr').remove();
                            $('.table-milestone tbody').append(html_row);

                            if($('.box-request-milestone-client tbody tr').size() == 0){
                                $('.box-request-milestone-client').remove();
                            }
                        }else {
                            var html_row = '<td>' + step + '. ' + res.name + '</td>' +
                                '<td align="center">' + res.text_status + '</td>' +
                                '<td align="center"></td>' +
                                '<td align="center">';
                            if (res.is_escrow == 1) {
                                html_row += '<span class="glyphicon glyphicon-ok" aria-hidden="true" style="color: #209800; "></span>';
                            }
                            if (res.milestone_status == 4) {
                                window.location.href = BASE_URL + "/dispute/disputeStage1/" + res.milestone_id + "/" + res.project_id;

                            }
                            html_row += '</td>' +
                            '<td align="center">$' + res.fee + '</td>' +
                            '<td align="center">' + res.select_html + '</td>';

                            $this.parents('tr').html(html_row);

                            if(res.amount_balance != undefined){
                                $('.user-balance').html('USD $'+res.amount_balance);
                            }
                        }

                        $('.message-workroom').html(showMessage('success', res.message));
                        $('.loading-1').remove();
                        $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                    }else if(res.status == 'AMOUNT_NOT_ENOUGH'){
                        $.ajax({
                            type: "POST",
                            data: ({milestone_id: milestone_id, step: step}),
                            url: BASE_URL + '/payment/depositFundMilestone/',
                            success: function(data) {
                                $this.removeAttr('selected').find('option:first').attr('selected', 'selected');
                                $('.loading-1').remove();
                                $('#ajax-modal').html(data);
                                $('#ajax-modal').modal();
                            }
                        });
                        $('.loading-1').remove();
                    }else if(res.status == 'ERROR'){
                        if(res.redirect_url != undefined){
                            window.location.href = res.redirect_url;
                        }
                    }
                }
            });
        }

    });

    $('body').on('click', '.action-milestone ul li', function(){
        var milestone_id = $(this).attr('data-id');
        var step = $(this).attr('data-step');
        var status = $(this).attr('data-status');
        var $this = $(this);

        if(status == 9){
            BootstrapDialog.confirm('Do you want to delete the milestone?', function(result){
                if(result === true){
                    $.ajax({
                        type: "POST",
                        url: BASE_URL + "/buyer/ajaxUpdateMilestone",
                        data: ({milestone_id: milestone_id, status: status, step: step}),
                        beforeSend: function () {
                            $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -20px;"></span>');
                        },
                        success: function (data) {
                            var res = $.parseJSON(data);
                            if(res.status == 'SUCCESS'){
                                if(res.redirect_url != undefined && res.redirect_url != ''){
                                    window.location.href = res.redirect_url;
                                }

                                if(status == 9){
                                    $this.parents('tr').remove();

                                    var milestone_fee = $this.parents('tr').find('.milestone_fee').html();
                                    var total_amount_milestone = parseFloat($('.total-amount-milestone').html()) - parseFloat(milestone_fee);
                                    $('.total-amount-milestone').html(parseFloat(total_amount_milestone));
                                }else if(status == 8){
                                    $.ajax({
                                        type: "POST",
                                        data: ({milestone_id: milestone_id}),
                                        url: BASE_URL + '/project/viewUpdateMilestone/',
                                        success: function(data) {
                                            $('#ajax-modal').html(data);
                                            $('#ajax-modal').modal();
                                        }
                                    });
                                    $('.loading-1').remove();
                                }else{
                                    var html_row = '<td>'+step+'. '+res.name+'</td>'+
                                        '<td align="center">'+res.text_status+'</td>'+
                                        '<td align="center"></td>'+
                                        '<td align="center">';
                                    if(res.is_escrow == 1){
                                        html_row += '<span class="glyphicon glyphicon-ok" aria-hidden="true" style="color: #209800; "></span>';
                                    }
                                    html_row +='</td>'+
                                    '<td align="center">$'+res.fee+'</td>'+
                                    '<td align="center">'+res.select_html+'</td>';

                                    $this.parents('tr').html(html_row);
                                }
                                if(res.amount_balance != undefined){
                                    $('.user-balance').html('USD $'+res.amount_balance);
                                }
                                $('.message-workroom').html(showMessage('success', res.message));
                                $('.loading-1').remove();
                                $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                            }else if(res.status == 'AMOUNT_NOT_ENOUGH'){
                                $.ajax({
                                    type: "POST",
                                    data: ({milestone_id: milestone_id, step: step}),
                                    url: BASE_URL + '/payment/depositFundMilestone/',
                                    success: function(data) {
                                        $('#ajax-modal').html(data);
                                        $('#ajax-modal').modal();
                                    }
                                });
                                $('.loading-1').remove();
                            }else if(res.status == 'ERROR'){
                                if(res.redirect_url != undefined){
                                    window.location.href = res.redirect_url;
                                }
                            }
                        }
                    });
                }
            });
        }else{
            $.ajax({
                type: "POST",
                url: BASE_URL + "buyer/ajaxUpdateMilestone",
                data: ({milestone_id: milestone_id, status: status, step: step}),
                beforeSend: function () {
                    $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -20px;"></span>');
                },
                success: function (data) {
                    var res = $.parseJSON(data);
                    if(res.status == 'SUCCESS'){
                        if(res.redirect_url != undefined && res.redirect_url != ''){
                            window.location.href = res.redirect_url;
                        }

                        if(status == 8){
                            $.ajax({
                                type: "POST",
                                data: ({milestone_id: milestone_id}),
                                url: BASE_URL + '/project/viewUpdateMilestone/',
                                success: function(data) {
                                    $('#ajax-modal').html(data);
                                    $('#ajax-modal').modal();
                                }
                            });
                            $('.loading-1').remove();
                        }else if(res.milestone_status == 14){
                            $this.parents('tr').remove();

                            if($('.box-request-milestone-client tbody tr').size() == 0){
                                $('.box-request-milestone-client').remove();
                            }

                            $('.message-workroom').html(showMessage('success', res.message));
                            $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                        }else{
                            var html_row = '<td>'+step+'. '+res.name+'</td>'+
                                '<td align="center">'+res.text_status+'</td>'+
                                '<td align="center"></td>'+
                                '<td align="center">';
                            if(res.is_escrow == 1){
                                html_row += '<span class="glyphicon glyphicon-ok" aria-hidden="true" style="color: #209800; "></span>';
                            }
                            if(res.milestone_status == 4){
                                window.location.href = BASE_URL+"dispute/disputeStage1/"+res.milestone_id+"/"+res.project_id;

                            }
                            html_row +='</td>'+
                            '<td align="center">$'+res.fee+'</td>'+
                            '<td align="center">'+res.select_html+'</td>';

                            $this.parents('tr').html(html_row);

                            if(res.amount_balance != undefined){
                                $('.user-balance').html('USD $'+res.amount_balance);
                            }

                            $('.message-workroom').html(showMessage('success', res.message));
                            $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                        }

                        $('.loading-1').remove();
                    }else if(res.status == 'AMOUNT_NOT_ENOUGH'){
                        $.ajax({
                            type: "POST",
                            data: ({milestone_id: milestone_id, step: step}),
                            url: BASE_URL + '/payment/depositFundMilestone/',
                            success: function(data) {
                                $this.removeAttr('selected').find('option:first').attr('selected', 'selected');
                                $('.loading-1').remove();
                                $('#ajax-modal').html(data);
                                $('#ajax-modal').modal();
                            }
                        });
                        $('.loading-1').remove();
                    }else if(res.status == 'ERROR'){
                        if(res.redirect_url != undefined){
                            window.location.href = res.redirect_url;
                        }
                    }
                }
            });
        }

    });

    $('body').on('click', '.action-milestone-dev .action-milestone-first', function(){
        var milestone_id = $(this).attr('data-id');
        var step = $(this).attr('data-step');
        var status = $(this).attr('data-status');
        var $this = $(this);

        if(status == 9){
            BootstrapDialog.confirm('Do you want to delete the milestone?', function(result){
                if(result === true){
                    $.ajax({
                        type: "POST",
                        url: BASE_URL + "programmer/ajaxUpdateMilestone",
                        data: ({milestone_id: milestone_id, status: status, step: step}),
                        beforeSend: function () {
                            $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                        },
                        success: function (data) {
                            var res = $.parseJSON(data);
                            if(res.status == 'SUCCESS'){
                                if(res.redirect_url != undefined && res.redirect_url != ''){
                                    window.location.href = res.redirect_url;
                                }

                                if(status == 9){
                                    $this.parents('tr').remove();
                                }else if(status == 8){
                                    var html = '<form action="" method="post" id="frmReUpdateMilestone">'+
                                        '<input type="hidden" name="project_id" value="'+res.milestone_id+'">'+
                                        '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin: 10px 0">'+
                                        '<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8" style="font-weight: bold; font-size: 18px">Request Milestone</div>'+
                                        '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><button type="button" class="close close-box-request"></button></div>'+
                                        '</div>'+
                                        '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'+
                                        '<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 form-group has-success">'+
                                        '<input type="text" id="milestone-name" name="milestone_name" class="form-control" value="'+res.name+'" placeholder="Enter your milestone description here"><span for="milestone-name" class="help-block valid"></span>'+
                                        '</div>'+
                                        '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 form-group has-success">'+
                                        '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding input-group">'+
                                        '<span class="input-group-addon">$</span>'+
                                        '<input type="text" id="milestone-fee" name="milestone_fee" class="form-control" value="'+res.fee+'" onkeypress="isNumber(event)">'+
                                        '</div>'+
                                        '<span for="milestone-fee" class="help-block valid"></span></div>'+
                                        '</div>'+
                                        '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="text-align: right;padding-right: 30px;">'+
                                        '<button type="submit" class="btn btn-applancer">Request Milestone</button>'+
                                        '<button type="reset" class="btn">Cancel</button>'+
                                        '</div>'+
                                        '</form>';

                                    $('.box-request-milestone').html(html).slideUp();
                                    $('.loading-1').remove();
                                }else{
                                    var html_row = '<td>'+step+'. '+res.name+'</td>'+
                                        '<td align="center">'+res.text_status+'</td>'+
                                        '<td align="center">' +
                                        '<div class="input-group date form_datetime">'+
                                        '<input class="form-control delivery-date data-picker" type="text" data-date-format="DD-MM-YYYY">'+
                                        '<span class="input-group-addon set-delivery-date" data-id="'+res.milestone_id+'">set</span>'+
                                        '</div>'+
                                        '</td>'+
                                        '<td align="center">';
                                    if(res.is_escrow == 1){
                                        html_row += '<span class="glyphicon glyphicon-ok" aria-hidden="true" style="color: #209800; "></span>';
                                    }
                                    html_row +='</td>'+
                                    '<td align="center">$'+res.fee+'</td>'+
                                    '<td align="center">'+res.select_html+'</td>';

                                    $this.parents('tr').html(html_row);
                                }

                                $('.message-workroom').html(showMessage('success', res.message));
                                $('.loading-1').remove();
                                $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                            }else if(res.status == 'AMOUNT_NOT_ENOUGH'){
                                $.ajax({
                                    type: "POST",
                                    data: ({milestone_id: milestone_id, step: step}),
                                    url: BASE_URL + '/payment/depositFundMilestone/',
                                    success: function(data) {
                                        $('#ajax-modal').html(data);
                                        $('#ajax-modal').modal();
                                    }
                                });
                                $('.loading-1').remove();
                            }else if(res.status == 'ERROR'){
                                if(res.redirect_url != undefined){
                                    window.location.href = res.redirect_url;
                                }
                            }
                        }
                    });
                }
            });
        }else{
            $.ajax({
                type: "POST",
                url: BASE_URL + "programmer/ajaxUpdateMilestone",
                data: ({milestone_id: milestone_id, status: status, step: step}),
                beforeSend: function () {
                    $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                },
                success: function (data) {
                    var res = $.parseJSON(data);
                    if(res.status == 'SUCCESS'){
                        if(res.redirect_url != undefined && res.redirect_url != ''){
                            window.location.href = res.redirect_url;
                        }

                        if(status == 8){
                            var html = '<input type="hidden" id="action" value="'+BASE_URL+'/project/ajaxUpdateRequestMilestone">' +
                                '<input type="hidden" id="milestone_id" name="milestone_id" value="'+res.milestone_id+'">' +
                                '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin: 10px 0">'+
                                '<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8" style="font-weight: bold; font-size: 18px">Request Milestone</div>'+
                                '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><button type="button" class="close close-box-request"></button></div>'+
                                '</div>'+
                                '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'+
                                '<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 form-group has-success">'+
                                '<input type="text" id="milestone-name" name="milestone_name" class="form-control" value="'+res.name+'" placeholder="Enter your milestone description here"><span for="milestone-name" class="help-block valid"></span>'+
                                '</div>'+
                                '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 form-group has-success">'+
                                '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding input-group">'+
                                '<span class="input-group-addon">$</span>'+
                                '<input type="text" id="milestone-fee" name="milestone_fee" class="form-control" value="'+res.fee+'" onkeypress="isNumber(event)">'+
                                '</div>'+
                                '<span for="milestone-fee" class="help-block valid"></span></div>'+
                                '</div>'+
                                '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="text-align: right;padding-right: 30px;">'+
                                '<button type="submit" class="btn btn-applancer">Update Milestone</button>'+
                                '<button type="reset" class="btn">Cancel</button>'+
                                '</div>';

                            $('#frmReMilestone').html(html);
                            $('.box-request-milestone').slideDown();
                            $('.loading-1').remove();
                        } else {
                            var html_row = '<td>' + step + '. ' + res.name + '</td>' +
                                '<td align="center">' + res.text_status + '</td>' +
                                '<td align="center">' +
                                '<div class="input-group date form_datetime">'+
                                '<input class="form-control delivery-date data-picker" type="text" data-date-format="DD-MM-YYYY">'+
                                '<span class="input-group-addon set-delivery-date" data-id="'+res.milestone_id+'">set</span>'+
                                '</div>'+
                                '</td>'+
                                '<td align="center">';
                            if (res.is_escrow == 1) {
                                html_row += '<span class="glyphicon glyphicon-ok" aria-hidden="true" style="color: #209800; "></span>';
                            }
                            if (res.milestone_status == 4) {
                                window.location.href = BASE_URL + "dispute/disputeStage1/" + res.milestone_id + "/" + res.project_id;
                            }

                            html_row += '</td>' +
                            '<td align="center">$' + res.fee + '</td>' +
                            '<td align="center">' + res.select_html + '</td>';

                            $this.parents('tr').html(html_row);

                            $('.message-workroom').html(showMessage('success', res.message));
                            $('.loading-1').remove();
                            $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                        }
                    }else if(res.status == 'AMOUNT_NOT_ENOUGH'){
                        $.ajax({
                            type: "POST",
                            data: ({milestone_id: milestone_id, step: step}),
                            url: BASE_URL + '/payment/depositFundMilestone/',
                            success: function(data) {
                                $('#ajax-modal').html(data);
                                $('#ajax-modal').modal();
                            }
                        });
                        $('.loading-1').remove();
                    }else if(res.status == 'ERROR'){
                        if(res.redirect_url != undefined){
                            window.location.href = res.redirect_url;
                        }
                    }
                }
            });
        }

    });

    $('body').on('click', '.action-milestone-dev ul li', function(){
        var milestone_id = $(this).attr('data-id');
        var step = $(this).attr('data-step');
        var status = $(this).attr('data-status');
        var $this = $(this);

        if(status == 9){
            BootstrapDialog.confirm('Do you want to delete the milestone?', function(result){
                if(result === true){
                    $.ajax({
                        type: "POST",
                        url: BASE_URL + "programmer/ajaxUpdateMilestone",
                        data: ({milestone_id: milestone_id, status: status, step: step}),
                        beforeSend: function () {
                            $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                        },
                        success: function (data) {
                            var res = $.parseJSON(data);
                            if(res.status == 'SUCCESS'){
                                if(res.redirect_url != undefined && res.redirect_url != ''){
                                    window.location.href = res.redirect_url;
                                }

                                if(status == 9){
                                    $this.parents('tr').remove();
                                }else{
                                    var html_row = '<td>'+step+'. '+res.name+'</td>'+
                                        '<td align="center">'+res.text_status+'</td>'+
                                        '<td align="center">' +
                                        '<div class="input-group date form_datetime">'+
                                        '<input class="form-control delivery-date data-picker" type="text" data-date-format="DD-MM-YYYY">'+
                                        '<span class="input-group-addon set-delivery-date" data-id="'+res.milestone_id+'">set</span>'+
                                        '</div>'+
                                        '</td>'+
                                        '<td align="center">';
                                    if(res.is_escrow == 1){
                                        html_row += '<span class="glyphicon glyphicon-ok" aria-hidden="true" style="color: #209800; "></span>';
                                    }
                                    html_row +='</td>'+
                                    '<td align="center">$'+res.fee+'</td>'+
                                    '<td align="center">'+res.select_html+'</td>';

                                    $this.parents('tr').html(html_row);
                                }

                                $('.message-workroom').html(showMessage('success', res.message));
                                $('.loading-1').remove();
                                $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                            }else if(res.status == 'AMOUNT_NOT_ENOUGH'){
                                $.ajax({
                                    type: "POST",
                                    data: ({milestone_id: milestone_id, step: step}),
                                    url: BASE_URL + '/payment/depositFundMilestone/',
                                    success: function(data) {
                                        $('#ajax-modal').html(data);
                                        $('#ajax-modal').modal();
                                    }
                                });
                                $('.loading-1').remove();
                            }else if(res.status == 'ERROR'){
                                if(res.redirect_url != undefined){
                                    window.location.href = res.redirect_url;
                                }
                            }
                        }
                    });
                }
            });
        }else{
            $.ajax({
                type: "POST",
                url: BASE_URL + "programmer/ajaxUpdateMilestone",
                data: ({milestone_id: milestone_id, status: status, step: step}),
                beforeSend: function () {
                    $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                },
                success: function (data) {
                    var res = $.parseJSON(data);
                    if(res.status == 'SUCCESS'){
                        if(res.redirect_url != undefined && res.redirect_url != ''){
                            window.location.href = res.redirect_url;
                        }

                        var html_row = '<td>'+step+'. '+res.name+'</td>'+
                            '<td align="center">'+res.text_status+'</td>'+
                            '<td align="center">' +
                            '<div class="input-group date form_datetime">'+
                            '<input class="form-control delivery-date data-picker" type="text" data-date-format="DD-MM-YYYY">'+
                            '<span class="input-group-addon set-delivery-date" data-id="'+res.milestone_id+'">set</span>'+
                            '</div>'+
                            '</td>'+
                            '<td align="center">';
                        if(res.is_escrow == 1){
                            html_row += '<span class="glyphicon glyphicon-ok" aria-hidden="true" style="color: #209800; "></span>';
                        }
                        if(res.milestone_status == 4){
                            window.location.href = BASE_URL+"dispute/disputeStage1/"+res.milestone_id+"/"+res.project_id;
                        }

                        html_row +='</td>'+
                        '<td align="center">$'+res.fee+'</td>'+
                        '<td align="center">'+res.select_html+'</td>';

                        $this.parents('tr').html(html_row);


                        $('.message-workroom').html(showMessage('success', res.message));
                        $('.loading-1').remove();
                        $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                    }else if(res.status == 'AMOUNT_NOT_ENOUGH'){
                        $.ajax({
                            type: "POST",
                            data: ({milestone_id: milestone_id, step: step}),
                            url: BASE_URL + '/payment/depositFundMilestone/',
                            success: function(data) {
                                $('#ajax-modal').html(data);
                                $('#ajax-modal').modal();
                            }
                        });
                        $('.loading-1').remove();
                    }else if(res.status == 'ERROR'){
                        if(res.redirect_url != undefined){
                            window.location.href = res.redirect_url;
                        }
                    }
                }
            });
        }

    });
    // send message
    $('.btn-send-message').click(function(){
        var project_id = $(this).attr('data-project-id');
        var message_content = $('#new-message').val();

        $.ajax({
            type: "POST",
            data: ({project_id: project_id, message_content: message_content}),
            url: BASE_URL + '/project/ajaxAddMessageChat/',
            beforeSend: function(){
                $('.btn-send-message').attr('disabled', true);
            },
            success: function(data) {
                var res = $.parseJSON(data);

                if(res.status == 'SUCCESS'){
                    var html = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 item-detail-mess">'+
                        '<div class="to-message">'+
                        '<div class="col-lg-11 col-md-11 col-sm-11 col-xs-11">'+
                        '<div class="message-content">'+
                        '<p class="user-post">'+res.user_name +'</p>'+
                        '<p>'+res.message_content+'</p>'+
                        '<span class="date_post">'+res.create_date+'</span>'+
                        '</div>'+
                        '</div>'+
                        '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 no-padding">'+
                        '<a href="#"><img src="'+res.avatar+'" class="img-responsive"></a>'+
                        '</div>'+
                        '</div>'+
                        '</div>';

                    $('#chat-area').append(html);
                    $('.message-chat').animate({
                        scrollTop: $('#chat-area').height()
                    }, 1000);

                    $('#new-message').val('');
                    $('.btn-send-message').removeAttr('disabled');
                }else if(res.status == 'ERROR'){
                    if(res.redirect_url != undefined){
                        window.location.href = res.redirect_url;
                    }
                }
            }
        });
    });

    $('.btn-send-message2').click(function(){
        var to_id = $(this).attr('data-to-id');
        var subject = $(this).attr('data-subject');
        var message_content = $('#new-message').val();

        $.ajax({
            type: "POST",
            data: ({to_id: to_id, subject: subject, message_content: message_content}),
            url: BASE_URL + '/project/ajaxAddMessage/',
            beforeSend: function(){
                $('.btn-send-message').attr('disabled', true);
            },
            success: function(data) {
                var res = $.parseJSON(data);

                if(res.status == 'SUCCESS'){
                    var html = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 item-detail-mess">'+
                        '<div class="to-message">'+
                        '<div class="col-lg-11 col-md-11 col-sm-11 col-xs-11">'+
                        '<div class="message-content">'+
                        '<p class="user-post">'+res.user_name +'</p>'+
                        '<p>'+res.message_content+'</p>'+
                        '<span class="date_post">'+res.create_date+'</span>'+
                        '</div>'+
                        '</div>'+
                        '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 no-padding">'+
                        '<a href="#"><img src="'+res.avatar+'" class="img-responsive"></a>'+
                        '</div>'+
                        '</div>'+
                        '</div>';

                    $('#chat-area').append(html);
                    $('.message-chat').animate({
                        scrollTop: $('#chat-area').height()
                    }, 1000);

                    $('#new-message').val('');
                    $('.btn-send-message2').removeAttr('disabled');
                }else if(res.status == 'ERROR'){
                    if(res.redirect_url != undefined){
                        window.location.href = res.redirect_url;
                    }
                }
            }
        });
    });

    var ajax_load_notification = false;
    $('#divScrollNotifications').scroll(function(){
        if(ajax_load_notification) return;
        //console.log(track_notification);
        if($('#divScrollNotifications').scrollTop() + $('#divScrollNotifications').innerHeight() >= $('#divScrollNotifications')[0].scrollHeight) {
            $.ajax({
                type: "POST",
                url: BASE_URL + "notification/moreNotifications",
                data: "track=0",
                beforeSend: function () {
                    //$('#loading-notifications').show();
                },
                success: function (data) {
                    $('#loading-notifications').hide();
                    data = $.parseJSON(data);
                    if ((data.status == 'error') || (data.status == 'no-data')) {
                        //$('#notifications-no-data').show();
                        //alert('error');
                    } else {
                        //track_notification = track_notification + 15;
                        //console.log(data.data);

                        $.each(data.data,function(k,v){
                            var content = "<b>" + v.user_name + "</b> " + v.type_name + " <b>" + v.project_name + "</b>";
                            $("#divScrollNotifications ul").append('<li><div class="col-lg-12 col-md-12 col-xs-12 no-padding"><a href="#">'+ content+'</a></div></li>');
                        });
                    }
                }
            });
            ajax_load_notification = true;
        }
    });

    // request milestone
    $('.request-milestone').click(function(){
        var project_id = $('#frmReMilestone').attr('data-project-id');

        var html = '<input type="hidden" id="action" value="'+BASE_URL+'/project/ajaxAddRequestMilestone">' +
            '<input type="hidden" id="project_id" name="project_id" value="'+project_id+'">' +
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin: 10px 0">'+
            '<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8" style="font-weight: bold; font-size: 18px">Request Milestone</div>'+
            '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><button type="button" class="close close-box-request"></button></div>'+
            '</div>'+
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'+
            '<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 form-group has-success">'+
            '<input type="text" id="milestone-name" name="milestone_name" class="form-control" value="" placeholder="Enter your milestone description here"><span for="milestone-name" class="help-block valid"></span>'+
            '</div>'+
            '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 form-group has-success">'+
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding input-group">'+
            '<span class="input-group-addon">$</span>'+
            '<input type="text" id="milestone-fee" name="milestone_fee" class="form-control" value="" onkeypress="isNumber(event)">'+
            '</div>'+
            '<span for="milestone-fee" class="help-block valid"></span></div>'+
            '</div>'+
            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="text-align: right;padding-right: 30px;">'+
            '<button type="submit" class="btn btn-applancer">Request Milestone</button>'+
            '<button type="reset" class="btn">Cancel</button>'+
            '</div>';

        $('#frmReMilestone').html(html);

        if($(this).hasClass('up')){
            $(this).removeClass('up');
            $('.box-request-milestone').stop().slideUp('slow');
        } else{
            $(this).addClass('up');
            $('.box-request-milestone').stop().slideDown('slow');
            $('.box-request-milestone').find('input[type="text"]').val('');
        }
    });

    $('body').on('click', '.close-box-request', function(){
        $('.box-request-milestone').stop().slideUp('slow');
    });

    // datetime picker
    $('.data-picker').datetimepicker({
        pickTime: false,
        showToday: true,
        format: 'DD-MM-YYYY'
    });

    $.each($('.data-picker'), function(){
        $(this).data("DateTimePicker").setMinDate(new Date());
    });

    $(".set-delivery-date").on("click",function (e) {
        var date = $(this).parent().find('input[type="text"]').val();
        var milestone_id = $(this).attr('data-id');
        var $this = $(this);

        $.ajax({
            type: "POST",
            url: BASE_URL + "programmer/ajaxUpdateDelivery",
            data: ({milestone_id: milestone_id, date: date}),
            success: function (data) {
                data = $.parseJSON(data);
                if ((data.status == 'ERROR')) {
                    if(data.redirect_url != undefined){
                        window.location.href = data.redirect_url;
                    }

                    $this.parents('td').addClass('has-error');
                    $('.help-block').remove();
                    $this.parents('td').append('<span class="help-block">'+data.message+'</span>');
                }else{
                    $this.parents('td').html(date);
                }
            }
        });
    });

    $('.delivery-date').on('keypress', function(e) {
        $(this).val('');
        e.stopPropagation();
        return false;
    });

    $('body').on( 'click', '.sl-tax li', function( event ) {
        var $target = $( event.currentTarget );

        $target.closest( '.btn-group' )
            .find( '[data-bind="label"]' ).text( $target.text() )
            .end()
            .children( '.dropdown-toggle' ).dropdown( 'toggle' );

        var input_id = $target.find('a').attr('data-id');
        var input_value = $target.find('a').attr('data-value');
        var input_name = $target.find('a').text();
        var tax = parseFloat($(this).parents('tr').find('.invoice-detail-amount').val()) * input_value/100;

        $target.closest( '.btn-group')
            .children( 'button' ).find( 'input')
            .removeClass()
            .addClass('tax-item tax-item-'+input_id)
            .val(tax)
            .attr('data-rate', input_value)
            .attr('data-name', input_name);

        var $input_taget = $target.find('a').attr('data-taget');
        var ids = '';
        var total_tax = 0;
        var tax_cur = 0;


        if($input_taget == 'EDIT'){
            $.ajax({
                type: "POST",
                url: BASE_URL + '/programmer/viewEditTax/',
                data:({project_id: input_id}),
                success: function(data) {
                    $('#ajax-modal').html(data);
                    $('#ajax-modal').modal();
                }
            });
        }else {
            $(this).parents('.btn-group').find('.' + $input_taget).val(input_value);
            $(this).parents('.btn-group').find('.id-' + $input_taget).val(input_id);

            if ($('#total-tax-' + input_id).val() != undefined) {
                total_tax = parseFloat($('#total-tax-' + input_id).val()) + tax;
            } else {
                total_tax = tax;
            }

            $(this).parents('.btn-group').find('.' + $input_taget).val(input_value);

            taxCal();
        }

        return false;
    });

    $('body').on('click', '.add-tax', function(){
        $('.create-tax').find('.help-block').remove();

        var html = '';
        var index = parseFloat($('.create-tax').attr('data-index')) + 1;

        $('.create-tax').attr('data-index', index);

        html += '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding item-tax">'+
        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 form-group">'+
        '<input type="text" name="tax['+index+'][name]" class="form-control tax-name" value="" placeholder="Tax type">'+
        '</div>'+
        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 form-group">'+
        '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding input-group">'+
        '<input type="text" name="tax['+index+'][rate]" class="form-control tax-rate" value="" onkeypress="isNumber(event)" placeholder="Rate">'+
        '<span class="input-group-addon">%</span>'+
        '</div>'+
        '</div>'+
        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 form-group">'+
        '<input type="text" name="tax['+index+'][tax_no]" class="form-control tax-tax_no" value="" placeholder="Tax ID or Company No">'+
        '</div>'+
        '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"><span class="btn-close delete-row-tax"></span></div>'+
        '<div class="clear"></div>'+
        '</div>';

        $('.create-tax').append(html);
    });

    $('body').on('click','.delete-row-tax', function(){
        $(this).parents('.item-tax').remove();
    });

    $('body').on('click', '.action-invoice-dev .action-invoice-first', function(){
        var invoice_id = $(this).attr('data-id');
        var status = $(this).attr('data-status');
        var $this = $(this);

        if(status == 3){
            BootstrapDialog.confirm('Do you want to remove?', function(result){
                if(result === true){
                    $.ajax({
                        type: "POST",
                        url: BASE_URL + "programmer/ajaxDeleteInvoice",
                        data: ({invoice_id: invoice_id}),
                        beforeSend: function () {
                            $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                        },
                        success: function (data) {
                            var res = $.parseJSON(data);
                            if(res.status == 'SUCCESS'){
                                $('.message-workroom').html(showMessage('success', res.message));
                                $('.table-invoice .item-invoice-'+res.invoice_id).remove();
                                $.ajax({
                                    type: "POST",
                                    url: BASE_URL + "programmer/viewAddInvoice",
                                    data: ({invoice_id: res.invoice_id, project_id: res.project_id}),
                                    beforeSend: function () {
                                        $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                                    },
                                    success: function (data2) {
                                        $('.box-invoices').html(data2);
                                        $('.loading-1').remove();
                                        $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                                    }
                                });
                                $('.loading-1').remove();
                                $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                            }else if(res.status == 'ERROR'){
                                if(res.redirect_url != undefined){
                                    window.location.href = res.redirect_url;
                                }
                            }
                        }
                    });
                }
            });
        }else if(status == 1){
            $.ajax({
                type: "POST",
                url: BASE_URL + "programmer/viewUpdateInvoice",
                data: ({invoice_id: invoice_id}),
                beforeSend: function () {
                    $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                },
                success: function (data) {
                    $('.box-create-invoice').show();
                    $('#frmUpdateInvoice').html(data);
                    $('.box-update-invoice').slideDown('slow');
                    $('.loading-1').remove();
                    $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                }
            });
        }else if(status == 2){
            window.location.href = BASE_URL + "programmer/viewInvoice/"+invoice_id;
        }

    });

    $('body').on('click', '.action-invoice-dev ul li', function(){
        var invoice_id = $(this).attr('data-id');
        var status = $(this).attr('data-status');
        var $this = $(this);

        if(status == 3){
            BootstrapDialog.confirm('Do you want to remove?', function(result){
                if(result === true){
                    $.ajax({
                        type: "POST",
                        url: BASE_URL + "programmer/ajaxDeleteInvoice",
                        data: ({invoice_id: invoice_id}),
                        beforeSend: function () {
                            $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                        },
                        success: function (data) {
                            var res = $.parseJSON(data);
                            if(res.status == 'SUCCESS'){

                                $('.message-workroom').html(showMessage('success', res.message));
                                $('.table-invoice .item-invoice-'+res.invoice_id).remove();
                                /*$.ajax({
                                 type: "POST",
                                 url: BASE_URL + "programmer/viewAddInvoice",
                                 data: ({invoice_id: res.invoice_id, project_id: res.project_id}),
                                 beforeSend: function () {
                                 $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                                 },
                                 success: function (data2) {
                                 $('.box-create-invoice').slideDown('slow').find('form').first().html(data2);
                                 $('.loading-1').remove();
                                 $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                                 }
                                 });*/
                                $('.loading-1').remove();
                                $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                                setTimeout(function () {
                                    window.location.href = BASE_URL + '/project/viewPayments/'+res.project_id;
                                }, 3000);
                            }else if(res.status == 'ERROR'){
                                if(res.redirect_url != undefined){
                                    window.location.href = res.redirect_url;
                                }
                            }
                        }
                    });
                }
            });
        }else if(status == 1){
            $.ajax({
                type: "POST",
                url: BASE_URL + "programmer/viewUpdateInvoice",
                data: ({invoice_id: invoice_id}),
                beforeSend: function () {
                    $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                },
                success: function (data) {
                    $('.box-invoices').html(data);
                    $('.loading-1').remove();
                    $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                }
            });
        }else if(status == 2){
            window.location.href = BASE_URL + "programmer/viewInvoice/"+invoice_id;
        }

    });

    $('body').on('click', '.action-invoice .action-invoice-first', function(){
        var invoice_id = $(this).attr('data-id');
        var status = $(this).attr('data-status');
        var $this = $(this);

        if(status == 1){
            $.ajax({
                type: "POST",
                url: BASE_URL + "buyer/viewPayInvoice",
                data: ({invoice_id: invoice_id}),
                beforeSend: function () {
                    $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                },
                success: function (data) {

                    $('.box-fund-milestone').html(data);
                    $('.loading-1').remove();
                }
            });
        }else if(status == 2){
            $.ajax({
                type: "POST",
                url: BASE_URL + "buyer/viewRequestInvoice",
                data: ({invoice_id: invoice_id}),
                beforeSend: function () {
                    $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                },
                success: function (data) {
                    $('#ajax-modal').html(data);
                    $('#ajax-modal').modal();
                }
            });
        }else if(status == 3){
            window.location.href = BASE_URL + "programmer/viewInvoice/"+invoice_id;
        }

    });

    $('body').on('click', '.action-invoice ul li', function(){
        var invoice_id = $(this).attr('data-id');
        var status = $(this).attr('data-status');
        var $this = $(this);

        if(status == 1){
            $.ajax({
                type: "POST",
                url: BASE_URL + "buyer/viewPayInvoice",
                data: ({invoice_id: invoice_id}),
                beforeSend: function () {
                    $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                },
                success: function (data) {
                    $('.box-fund-milestone').html(data);
                    $('.loading-1').remove();
                }
            });
        }else if(status == 2){
            $.ajax({
                type: "POST",
                url: BASE_URL + "buyer/viewRequestInvoice",
                data: ({invoice_id: invoice_id}),
                beforeSend: function () {
                    $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                },
                success: function (data) {
                    $('#ajax-modal').html(data);
                    $('#ajax-modal').modal();
                }
            });
        }else if(status == 3){
            window.location.href = BASE_URL + "programmer/viewInvoice/"+invoice_id;
        }

    });

    // fund milestone
    $('#frmFundMilestone').validate({
        rules: {
            "milestone_id[]": {
                required: true
            }
        },
        submitHandler: function (form) {

            $.ajax({
                type: "POST",
                url: BASE_URL + "buyer/ajaxUpdateMilestones",
                data: $("#frmFundMilestone").serializeArray(),
                beforeSend: function () {
                    $("#frmFundMilestone").find('.btn-applancer').attr("disabled", 'disabled').append('<span class="loading-4" style="left: 330px;"></span>');
                },
                success: function (data) {
                    var res = $.parseJSON(data);
                    if (res.status == 'ERROR') {
                        if(res.redirect_url == undefined){
                            $('.message-workroom').html(showMessage('error', res.message));
                            $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');
                            $('.loading-4').remove();
                        }else{
                            window.location.href = res.redirect_url;
                        }

                    } else if (res.status == 'AMOUNT_NOT_ENOUGH') {
                        $.ajax({
                            type: "POST",
                            data: ({milestone_ids: res.milestone_ids}),
                            url: BASE_URL + '/payment/depositFundMilestones/',
                            success: function (data) {
                                $('#ajax-modal').html(data);
                                $('#ajax-modal').modal();
                            }
                        });

                        $('.fund-milestones').removeAttr("disabled");
                        $('.loading-4').remove();
                    }else if(res.status == 'SUCCESS'){
                        var html = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">' +
                            '<div class="alert alert-success">'+
                            '<button data-dismiss="alert" class="close"></button>'+
                            '<i class="fa fa-times-circle"></i>'+res.message+'</div></div>';

                        $.each(res.milestone_ids, function(key, val){
                            var funded = $('.item-'+val).find('.col-amount').text();
                            var milestone_name = '<span style="display: inline-block;width: 20px;"></span>' + ($('.item-'+val).find('.col-name').text()).replace( /<.*?>/g, '' );

                            $('.item-'+val).find('.col-name').html(milestone_name);
                            $('.item-'+val).find('.col-funded').html(funded);
                        });

                        $('.user-balance').html('USD $'+res.amount_balance);

                        $('.message-workroom').html(html);
                        $('html,body').animate({scrollTop: $('.message-workroom').offset().top - 50}, 'slow');

                        $('.fund-milestones').removeAttr("disabled");
                        $('.loading-4').remove();
                    }
                }
            });
        }
    });

    // check pay invoice
    $('body').on('click', '.cb-milestone', function(){
        var invoice_id = $(this).attr('data-invoice-id');
        var milestone_id = $(this).attr('data-milestone-id');
        var milestone_id_select = '';
        $.each($('.cb-milestone'), function(){
            if($(this).is(':checked')){
                if(milestone_id_select == ''){
                    milestone_id_select = $(this).attr('data-milestone-id');
                }else{
                    milestone_id_select += ',' + $(this).attr('data-milestone-id');
                }
            }
        });

        if($(this).is(':checked'))
            loadPayInvoice(invoice_id, milestone_id, milestone_id_select, 'PLUS');
        else
            loadPayInvoice(invoice_id, milestone_id, milestone_id_select, 'SUB');
    });

    // close box pay invoice
    $('body').on('click', '#frmPayInvoice .btn-close', function(){
        $('.box-create-invoice').slideDown().remove();
    });

    // delete item
    $('body').on('click', '.delete-item-invoice', function(){
        $(this).parents('tr').remove();
        getSubTotalInvoice();
        getTotalInvoice();
        taxCal();
    });

    /*$('body').on('change', '.invoice-detail-amount', function(){
     if(parseFloat($(this).val()) < 0 || $(this).val() == ''){
     $(this).val(0);
     }
     getSubTotalInvoice();
     getTotalInvoice();
     taxCal();
     });*/

    $('body').on('keyup', '.invoice-detail-name', function(){
        if($(this).val() == ''){
            $(this).parents('td').addClass('has-error');
            $(this).next('.help-block').remove();
            $(this).after('<span class="help-block">This field is required.</span>');
            result = false;
        }else{
            $(this).parents('td').removeClass('has-error').addClass('has-success');
            $(this).next().remove();

        }
    });

    $('body').on('keyup', '.invoice-detail-amount', function(){
        var amount = $(this).val();
        if(amount == ''){
            $(this).parents('td').addClass('has-error');
            $(this).next('.help-block').remove();
            $(this).after('<span class="help-block">This field is required.</span>');
            result = false;
        }else{
            $(this).parents('td').removeClass('has-error').addClass('has-success');
            $(this).parents('td').find('.help-block').remove();

            $.each($(this).parents('tr').find('.tax-item'), function(){
                var rate = parseFloat($(this).attr('data-rate'));
                var tax_amount = amount * rate/100;

                $(this).val(tax_amount);
            });
        }
        getSubTotalInvoice();
        getTotalInvoice();
        taxCal();
    });

    // enable form edit profile
    $('body').on('click', '.edit-profile', function(){
        if($(this).hasClass('block')){
            $('.edit-profile').removeClass('block').addClass('non-block');
            $('.edit-profile-invoice').slideUp('slow');
        } else {
            $('.edit-profile').removeClass('non-block').addClass('block');
            $('.edit-profile-invoice').slideDown('slow');
        }
    });

    // cancel update invoice
    $('body').on('click', '.btn-cancel-update-invoice', function(){
        $('.box-create-invoice').slideUp();
    });

    // click btn create invoice
    $('body').on('click', '.btn-cancel-invoice', function(){
        $(this).removeClass('block').addClass('non-block');
        $('.btn-create-invoice').removeClass('block').addClass('non-block');
        $('.box-create-invoice').slideUp('slow');
    });

    $('body').on('click', '.btn-create-invoice', function(){
        if($(this).hasClass('block')){
            $(this).removeClass('block').addClass('non-block');
            $('.box-create-invoice').slideUp('slow');
        } else{
            $(this).removeClass('non-block').addClass('block');
            $('.box-create-invoice').slideDown('slow');
        }
    });

    // submit form input
    $('.submit-form').on('change', function(){
        $(this).parent('form').submit();
    });

    // change withdraw method
    $('.withdraw_method').on('change', function(){
        var val = $(this).val();
        if(val == 1){
            $('.info-paypal').fadeIn();
            $('.info-bank').fadeOut();
            $(".info-paypal input").each(function () {
                $(this).rules("add", {
                    required: true,
                    email: true
                });
            });
        }else if(val == 2){
            $('.info-paypal').fadeOut();
            $('.info-bank').fadeIn();
            $(".info-bank input").each(function () {
                $(this).rules("add", {
                    required: true
                });
            });
        }
    });

    //setup payment
    $('.setup').on('click', function(){
        var id = $(this).attr('data-id');
        $('.box-verify').hide();
        $('.form-verify-'+id).slideDown();
    });

    // change payment method
    $('body').on('change', '.payment_method', function(){
        var val = $(this).val();
        var amount = $('#amount').val();
        if(val == 4){
            //$('.min-fee').html('100,000.00');
            if(amount < 5){
                //$('#amount').val('100000');
                $('.amount-to-send').html('$5.00');
                $('.after-deposit').html('5.00');
            }else{
                $('#amount').val(amount);
                $('.amount-to-send').html('$'+amount + '.00');
                $('.after-deposit').html(amount + '.00');
            }
        }else if(val == 2){
            commission = parseFloat(amount) * (parseFloat(4.4)/100);
            var amountSend = parseFloat(amount) + commission + parseFloat(0.3);
            amountSend= amountSend.toFixed(2);
            $('.min-fee').html('5.00');
            $('.amount-to-send').html('$'+amountSend);
            $('.after-deposit').html('$'+parseInt(amount));
        }
    });

    // regex validate
    $.validator.addMethod('regex', function(value, element, param) {
            return this.optional(element) ||
                value.match(typeof param == 'string' ? new RegExp(param) : param);
        },
        'Invalid characters in username. Valid characters are "_", A-Z, a-z, and 0-9.');
    $.validator.addMethod("dateFormat",function(value, element) {
            return value.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
        },
        "Ngày tháng chưa chính xác");
    $.validator.addMethod("dateFormatMonth",function(value, element) {
            return value.match(/^\d{1,2}\/\d{4}$/);
        },
        "Ngày tháng chưa chính xác");
    $.validator.addMethod("greaterStart", function (value, element, params) {
        return this.optional(element) || new Date(value) >= new Date($(params).val());
    },'Must be greater than start date.');
    // filter responsive
    $('body').on('click', '.btn-filter', function(){
        $(this).parents('.box-filter').hide();
        $('.box-cat-responsive').slideDown();
    });

    $('body').on('click', '.btn-cancel-filter', function(){
        $('.box-filter').show();
        $('.box-cat-responsive').hide();
    });

    $('.type-worker').on('change', function(){
        var value = $(this).val();
        alert(value);
        if(value == 0){
            $('.box-referral').find('input').attr('disabled', true);
        }else{
            $('.box-referral').find('input').attr('disabled', false);
        }
    });

    /**
     *  javascript top dev
     */

        // change qty cart
    $('.cmbPack').on('change', function(){
        var id = $(this).data('id');
        var qty = $(this).val();

        $.ajax({
            type: "POST",
            data: ({id: id, qty: qty}),
            url: BASE_URL + '/employers/ajaxUpdateCart',
            dataType: "json",
            success: function (data) {
                $.each(data.result, function(i, item){
                    $('#jobPosting-qty-' + i).html(item.qty);
                    $('#jobPosting-price-' + i).html(item.price);
                    $('#jobPosting-vat-' + i).html(item.vat);
                    $('#jobPosting-total-' + i).html(item.subtotal);
                });
                $('#resultTotal').html(data.total);
            }
        });
    });

    $('.delete-cart').on('click', function(){
        var row_id = $(this).data('row-id');
        var id = $(this).data('id');

        $.ajax({
            type: "POST",
            data: ({id: id}),
            url: BASE_URL + '/employers/ajaxRemoveCart',
            dataType: 'json',
            success: function (data) {
                if(data.status == 'SUCCESS'){
                    $('#row-'+id).remove();
                    $('#resultTotal').html(data.total);
                }
            }
        });
    });

    $('.payment-method-type').on('click', function(){
        var id = $(this).data('id');
        $('.error').remove();
        if($('#is_read').is(':checked')){
            $('#payment_id').val(id);
            $(this).attr('disable');
            $(this).parents('form').submit();
        }else{
            $('#is_read').parent().after('<p class="error" style="color: #f00;">Bạn chưa đồng ý với điều khoản dịch vụ.</p>');
        }
    });

    $('.method').on('click', function(){
        var id = $(this).data('id');
        $('.error').remove();
        if($('#is_read').is(':checked')){
            $('#payment_id').val(id);
            $(this).attr('disable');
            $(this).parents('form').submit();
        }else{
            $('#is_read').parent().after('<p class="error" style="color: #f00;">Bạn chưa đồng ý với điều khoản dịch vụ.</p>');
        }
    });

    $('.method-offline').on('click', function(){
        if($('.offline-payment').hasClass('open')){
            $('.offline-payment').removeClass('open');
            $('.offline-payment').stop().slideUp();
        }else{
            $('.offline-payment').addClass('open');
            $('.offline-payment').stop().slideDown();
        }
    });


    $('body').on('click', '.action-apply .action-apply-first', function(){
        var apply_id = $(this).attr('data-id');
        var status = $(this).attr('data-status');
        var $this = $(this);

        if(status == 1){
            $.ajax({
                type: "POST",
                url: BASE_URL + "employers/ajaxUpdateApply",
                data: ({apply_id: apply_id, status: status}),
                beforeSend: function () {
                    $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                },
                success: function (data) {
                    if(data.status == 'ERROR' && data.redirect_url != undefined){
                        window.location.href = data.redirect_url;
                    }
                    $this.parent('.action-apply').remove();
                }
            });
        }
    });

    $('body').on('click', '.action-apply ul li', function(){
        var apply_id = $(this).attr('data-id');
        var status = $(this).attr('data-status');
        var $this = $(this);

        if(status == 2){
            $.ajax({
                type: "POST",
                url: BASE_URL + "employers/ajaxUpdateApply",
                dataType: 'json',
                data: ({apply_id: apply_id, status: status}),
                beforeSend: function () {
                    $this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
                },
                success: function (data) {
                    if(data.status == 'ERROR' && data.redirect_url != undefined){
                        window.location.href = data.redirect_url;
                    }
                    $this.parents('.action-apply').remove();
                }
            });
        }
    });


    /**
     * tag search
     */
    var skills = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('category_name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: BASE_URL + "employers/jsonGetSkills"
    });
    skills.initialize();

    $('.tag-input > input').tagsinput({
        //allowDuplicates: true,
        itemValue: 'category_name',
        itemText: 'category_name',
        typeaheadjs: {
            name: 'category_ids',
            displayKey: 'category_name',
            source: skills.ttAdapter()
        }
    });

    $('.tag-input3 > input').tagsinput({
        //allowDuplicates: true,
        itemValue: 'id',
        itemText: 'category_name',
        typeaheadjs: {
            name: 'skills',
            displayKey: 'category_name',
            source: skills.ttAdapter()
        }
    });

    $('.tag-input > input').on('itemAdded', function(event) {
        var keyword = $('.em-keyword').val();

        if(keyword == ''){
            keyword =  event.item.category_name;
        }else{
            keyword += ','+event.item.category_name;
        }
        $('.tag-input .tt-input').attr('placeholder', '');

        keyword.replace(",,", ",");
        $('.em-keyword').val(keyword);
        // event.item: contains the item
    });

    $('.tag-input > input').on('itemRemoved', function(event) {
        var keyword = $('.em-keyword').val();

        var re = new RegExp(event.item.category_name, 'g');
        keyword = keyword.replace(re, '');
        var re2 = new RegExp(',,', 'g');
        keyword = keyword.replace(re2, ",");
        keyword = keyword.replace(/\,$/, '');

        $('.em-keyword').val(keyword);
        $('.tag-input .tt-input').val('');

        if(keyword == ''){
            $('.tag-input .tt-input').attr('placeholder', 'Kỹ năng, vị trí làm việc...');
        }else{
            $('.tag-input .tt-input').attr('placeholder', '');
        }
        // event.item: contains the item
    });

    $('.tag-input .tt-input').on('blur', function(){
        var $this = $(this);
        var val = $(this).val();

        if(val != '') {
            var keyword = $('.em-keyword').val();

            $('.tag-input > input').tagsinput('add', {id: 0, category_name: val});
            $('.tag-input > input').tagsinput('refresh');
            $this.val('');
            $('.tt-hint').val('');
        }
    });

    $('.tag-input .tt-input').keypress(function(event){
        var $this = $(this);
        var val = $(this).val();
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            if(val != '') {
                $('.tag-input > input').tagsinput('add', {id: 0, category_name: val});
                $('.tag-input > input').tagsinput('refresh');
                $this.val('');
                $('.tt-hint').val('');
            }
        }
    });

    if(typeof json_skills != 'undefined'){
        $.each(json_skills, function(i, item){
            $('.tag-input > input').tagsinput('add', {id: i, category_name: item});
        });
        $('.tag-input > input').tagsinput('refresh');
    }


    $('.tooltips').tooltip();


    $('.more-bank').on('click', function(){
        if($('.banks').hasClass('open')){
            $('.banks').removeClass('open');
            $('.banks').stop().slideUp();
        }else{
            $('.banks').addClass('open');
            $('.banks').stop().slideDown();
        }
    });

    //refresh job
    $('.fresh').on('click', function(){
        var id = $(this).data('id');
        $.ajax({
            type: "POST",
            url: BASE_URL + "employers/ajaxFresh",
            dataType: 'json',
            data: ({job_id: id}),
            beforeSend: function () {
                //$this.after('<span class="loading-1" style="position: absolute;top: 5px;right: -15px;"></span>');
            },
            success: function (data) {
                if(data.status == 'ERROR' && data.redirect_url != undefined){
                    window.location.href = data.redirect_url;
                }else if(data.status == 'ERROR'){
                    modal(null,'Thông báo', data.message,'alert');
                }else{
                    modal(null,'Thông báo', data.message,'alert');
                }
            }
        });
    });

    $('.modal-email-close').on('click', function(){
        $('.modal-email').removeClass('modal-fade-out');
        $('.modal-overlay').css({'opacity': '0', 'display': 'none'});
    });

    $('.choose-package').click(function(){
        var val = $(this).find('input').val();
        if(!$(this).hasClass('package-active')){
            $('.choose-package').removeClass('package-active');
            $(this).addClass('package-active');
            $('.content-package-type').hide();
            $('#content-package-type-'+val).slideDown();
        }
    });

    $('.discount_type').change(function(){
        var val = $(this).val();
        var id = $(this).data('id');
        $('.box-des-radio').hide();
        $(id).slideDown();
    });

    $('.contact_type').change(function(){
        var val = $(this).val();
        var id = $(this).data('id');
        if($(this).is(':checked')){
            $(id).slideDown();
        }else{
            $(id).slideUp();
        }
        //$('.box-des-radio').hide();

    });
});

// BootstrapDialog
function modal(element, title, message, type) {
    if (type == 'alert') {
        BootstrapDialog.alert({
            title: title,
            message: message,
            closable: true,
            cssClass: 'btn-primary',
            callback: function (result) {
                return result;
                //result = result;
            }
        });
    } else if (type == 'confirm') {
        var href = $(element).attr('href');
        var dlg = new BootstrapDialog({
            title: title,
            message: message,
            closable: false,
            buttons: [{
                label: 'Yes',
                cssClass: 'btn-primary',
                id: 'btnYes',
                action: function (dialog) {
                    window.location.href = href;
                    dialog.close();
                }
            },
                {
                    label: 'No',
                    cssClass: 'btn',
                    id: 'btnNo',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
        });

        dlg.open();
    }
    return false;
}
function RemoveItemMilestone() {
    $("#item-milestone > div:last-child").remove();
}


function checkNotification() {
    $.ajax({
        type: "POST",
        url: BASE_URL + "notification/checkNotification",
        data: "track=0",
        beforeSend: function () {
            //$('#loading-notifications').show();
        },
        success: function (data) {
            $('#loading-notifications').hide();
            data = $.parseJSON(data);
            if ((data.status == 'error') || (data.status == 'no-data')) {
                $('#notifications-no-data').show();
            } else {
                if (data.result == 0) {
                    var n = noty({text: "<a style='color:#fff;' href='" + BASE_URL + "messages/showAllMessage'>" + "Có 1 tin nhắn mới" + "</a>"});
                }
            }
            //setTimeout(function () {
            //checkNotification();
            //}, 10000);
        }
    });
}
$.noty.defaults = {
    layout: 'bottomRight',
    theme: 'defaultTheme',
    type: 'information',
    text: "", // can be html or string
    dismissQueue: true, // If you want to use queue feature set this true
    template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
    animation: {
        open: {height: 'toggle'},
        close: {height: 'toggle'},
        easing: 'swing',
        speed: 500 // opening & closing animation speed
    },
    timeout: 500000, // delay for closing event. Set false for sticky notifications
    force: false, // adds notification to the beginning of queue when set to true
    modal: false,
    maxVisible: 5, // you can set max visible notification for dismissQueue true option,
    killer: false, // for close all notifications before show
    closeWith: ['click'], // ['click', 'button', 'hover']
    callback: {
        onShow: function () {
        },
        afterShow: function () {
        },
        onClose: function () {
        },
        afterClose: function () {
        }
    },
    buttons: false // an array of buttons
};

function loginGG() {
    urls = BASE_URL + "users/loginGoogle";
    jQuery.ajax({
        url: urls,
        type: 'POST',
        success: function (obj) {
            var res = jQuery.parseJSON(obj);

            if (res.status == "ERROR") {
                //window.open(res.url,'_blank');
                window.location.href = res.url;
                //popup_window = openPopupWindow(res.url);
            } else if (res.status == "OK") {
                popup_window.close();
            }
        }
    });

}
    $('body').on('click','.btn-login-facebook',function (e) {
        e.preventDefault();
        var pr_id = $(this).attr('data-id');
        var role_id = $('.role_id:checked').val();
        $('#login-modal').modal('hide');
        if ($(this).parents('.modal').hasClass('login-modal')) {
            FB.login(function (response) {
                if (response.authResponse){
                    FB.api('/me', function (response) {
                        //console.log(response);
                        //return false;
                        if (response.email == null) {
                            alert('Sorry email not found.Login failed !');
                            return false;
                        }
                        var url = $('input#url').val();
                        $.ajax({
                            type: "POST",
                            data: "url=" + url + "&role_id=" + role_id + "&email=" + response.email + "&response=" + JSON.stringify(response),
                            url: BASE_URL + "users/loginFacebook",
                            beforeSend: function () {
                                $('.header-top').attr("disabled", 'disabled').before('<div class="loader"><div class="overlay-loading"></div><div class="loading-2"></div></div>');
                            },
                            success: function (data) {
                                var data = $.parseJSON(data);
                                if (data.url == 'redirect_signup') {
                                    window.location.href = BASE_URL + 'users/signUp';
                                }
                                else {
                                    window.location.href = data.url;
                                }
                            }
                        });
                    });
                }
                else{
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, {scope: 'email'});
        }
        else if($(this).parents('#frm-login').hasClass('frm-login')) {
            FB.login(function (response) {
                if (response.authResponse){
                    FB.api('/me', function (response) {
                        if (response.email == null) {
                            alert('Sorry email not found.Login failed !');
                            return false;
                        }
                        var url = $('input#url').val();
                        $.ajax({
                            type: "POST",
                            data: "url=" + url + "&role_id=" + role_id + "&email=" + response.email + "&response=" + JSON.stringify(response),
                            url: BASE_URL + "users/loginFacebook",
                            beforeSend: function () {
                                $('.header-top').attr("disabled", 'disabled').before('<div class="loader"><div class="overlay-loading"></div><div class="loading-2"></div></div>');
                            },
                            success: function (data) {
                                var data = $.parseJSON(data);
                                if (data.url == 'redirect_signup') {
                                    window.location.href = BASE_URL + 'users/signUp';
                                }
                                else {
                                    window.location.href = data.url;
                                }
                            }
                        });
                    });
                }
                else{
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, {scope: 'email'});
        }
        else {
            if ($(".role_id").is(":checked")) {
                FB.login(function (response) {
                    if (response.authResponse){
                        FB.api('/me', function (response) {
                            if (response.email == null) {
                                alert('Sorry email not found.Login failed !');
                                return false;
                            }
                            var url = $('input#url').val();
                            $.ajax({
                                type: "POST",
                                data: "url=" + url + "&role_id=" + role_id + "&email=" + response.email + "&response=" + JSON.stringify(response),
                                url: BASE_URL + "users/loginFacebook",
                                beforeSend: function () {
                                    $('.header-top').attr("disabled", 'disabled').before('<div class="loader"><div class="overlay-loading"></div><div class="loading-2"></div></div>');
                                },
                                success: function (data) {
                                    var data = $.parseJSON(data);
                                    window.location.href = data.url;
                                }
                            });
                        });
                    }
                    else{
                        console.log('User cancelled login or did not fully authorize.');
                    }
                }, {scope: 'email'});
            }
            else {
                if ($('.div-role').hasClass('has-error'));
                else {
                    var html = '<div class="box-error col-lg-12 col-md-12 col-xs-12">' +
                        '<span for="role_id" class="help-block">Trường này là bắt buộc</span>' +
                        '</div>';
                    $('.div-role').addClass('has-error');
                    $('.div-role').append(html);
                }
                return false;
            }
        }
    });

    $('body').on('click','.btn-apply-facebook',function (e) {
        e.preventDefault();
        var url = $(this).attr('href');
        $('#login-modal').modal('hide');
        FB.login(function (response) {
            if (response.authResponse){
                FB.api('/me', function (response) {
                    if (response.email == null) {
                        alert('Sorry email not found.Login failed !');
                        return false;
                    }
                    $.ajax({
                        type: "POST",
                        data: "url=" + url + "&url=" + url + "&email=" + response.email + "&response=" + JSON.stringify(response),
                        url: BASE_URL + "users/loginFacebook",
                        beforeSend: function () {
                            $('.header-top').attr("disabled", 'disabled').before('<div class="loader"><div class="overlay-loading"></div><div class="loading-2"></div></div>');
                        },
                        success: function (data) {
                            var data = $.parseJSON(data);
                            //console.log(data.url);
                            window.location.href = decodeURIComponent(data.url);
                        }
                    });
                });
            }
            else{
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email'});
    });

    //$('body').on('click', '.btn-twitter', function (e) {
    //    e.preventDefault();
    //    var pr_id = $(this).attr('data-id');
    //    var role_id = $('.role_id:checked').val();
    //    var url = $('input#url').val();
    //    $('#login-modal').modal('hide');
    //    if ($(this).parents('.modal').hasClass('login-modal')) {
    //        window.location.href = BASE_URL + "profile/twitter";
    //    }
    //    else {
    //        if ($(".role_id").is(":checked")) {
    //            window.location.href = BASE_URL + "profile/twitter";
    //        }
    //        else {
    //            if ($('.div-role').hasClass('has-error'));
    //            else {
    //                var html = '<div class="box-error col-lg-12 col-md-12 col-xs-12">' +
    //                    '<span for="role_id" class="help-block">Trường này là bắt buộc</span>' +
    //                    '</div>';
    //                $('.div-role').addClass('has-error');
    //                $('.div-role').append(html);
    //            }
    //            return false;
    //        }
    //    }
    //
    //});
    function ajaxgetChildCategory() {
        var arrData = [];
        $.ajax({
            type: "POST",
            url: BASE_URL + "project/getChildCategory",
            data: "id_category=" + $('#ParentCategory').val(),
            beforeSend: function () {
                $('#ParentCategory').parent().append('<span class="loading-1"></span>');
            },
            success: function (data) {
                $('#ParentCategory').parent().find(".loading-1").remove();

                var res = $.parseJSON(data);
                if (res.status == "success") {
                    var html = '';
                    var html2 = '';
                    $('#ChildCategory').empty();
                    $('#ChildCategoryProfile').empty();
                    $.each(res.data, function (k) {
                        html += "<label class='label-category'>" +
                        "<input type='checkbox' name='group[]' value='" + res.data[k].id + "' />" + res.data[k].group_name + "</label>";
                    });
                    $('#ChildCategoryPortfolio').empty();
                    $.each(res.data, function (k) {
                        html2 += "<label class='label-category'>" +
                        "<input type='checkbox' name='group[]' value='" + res.data[k].id + "' />" + res.data[k].group_name + "</label>";
                    });
                    $('#ChildCategoryPortfolio').html(html2);
                    $('#ChildCategoryProfile').html(html);
                    $('#ChildCategory').html(html);
                }
            }
        });
    }

    function ajaxgetChildCategoryPortfolio() {
        var arrData = [];
        var id_category;


        $.ajax({
            type: "POST",
            url: BASE_URL + "project/getChildCategory",
            data: "id_category=" + $('.ParentCategoryPortfolio').val(),
            beforeSend: function () {
                $('.ParentCategoryPortfolio').parent().append('<span class="loading-1"></span>');
            },
            success: function (data) {
                $('.ParentCategoryPortfolio').parent().find(".loading-1").remove();

                var res = $.parseJSON(data);
                if (res.status == "success") {
                    var html = '';
                    $('.ChildCategoryPortfolio').empty();
                    $.each(res.data, function (k) {
                        html += "<label class='label-category'>" +
                        "<input type='checkbox' name='group[]' value='" + res.data[k].id + "' />" + res.data[k].group_name + "</label>";
                    });
                    $('.ChildCategoryPortfolio').html(html);

                }
            }
        });
    }


    function ajaxgetChildCategoryPortfolioValue(id) {
        var arrData = [];

        $.ajax({
            type: "POST",
            url: BASE_URL + "project/getChildCategory",
            data: "id_category=" + id,
            beforeSend: function () {
                $('.ParentCategoryPortfolio').parent().append('<span class="loading-1"></span>');
            },
            success: function (data) {
                $('.ParentCategoryPortfolio').parent().find(".loading-1").remove();

                var res = $.parseJSON(data);
                if (res.status == "success") {
                    var html = '';
                    $('.ChildCategoryPortfolio').empty();
                    $.each(res.data, function (k) {
                        html += "<label class='label-category'>" +
                        "<input type='checkbox' name='group[]' value='" + res.data[k].id + "' />" + res.data[k].group_name + "</label>";
                    });
                    $('.ChildCategoryPortfolio').html(html);

                }
            }
        });
    }

    $('.ChildCategoryPortfolio').on('change', 'input:checkbox', function () {
        var groupId = $(this).val();
        var $this = $(this);

        $.ajax({
            type: "POST",
            url: BASE_URL + "project/ajaxGetCategories",
            data: ({group_id: groupId}),
            success: function (data) {
                var res = $.parseJSON(data);
                var html = '';

                if ($this.is(":checked") === true) {
                    $.each(res, function (index, val) {
                        html += "<option value='" + val['id'] + "'>" + val['category_name'] + "</option>";
                    });
                    $('.skills-portfolio').append(html);
                    $(".skills-portfolio").trigger('liszt:updated');
                } else if ($this.is(":checked") === false) {
                    $.each(res, function (index, val) {
                        $.each($('#skills option'), function (i) {
                            var $this = $(this);
                            if (this.value == val['id']) {
                                $this.remove();
                            }
                        });
                    });
                    $('.skills-portfolio').append(html);
                    $(".skills-portfolio").trigger('liszt:updated');
                }

            }
        });
    });


    function initiateSignIn() {
        var params = {
            'clientid': '648205599986-7aq3sjigrs1k26mul06up8tb6q1i2idi.apps.googleusercontent.com',
            //'clientid': '754619413177-28dp7gjl950vqsaq1tmlri9k9epoobs9.apps.googleusercontent.com',
            'cookiepolicy': BASE_URL,
            'callback': 'onSignInCallback',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
            'requestvisibleactions': 'http://schemas.google.com/AddActivity'
        };
        gapi.auth.signIn(params);
    }

    function onSignInCallback(resp) {
        gapi.client.load('plus', 'v1', apiClientLoaded);
        gapi.client.load('oauth2', 'v2', apiClientLoaded2);
    }

    function apiClientLoaded() {
        gapi.client.plus.people.get({userId: 'me'}).execute(handleEmailResponse);
    }

    function apiClientLoaded2() {
        gapi.client.oauth2.userinfo.get().execute(handleEmailResponse);
    }

    function handleEmailResponse(resp) {
        var email;
        var avatar;

        var arAvatar = resp.image.url.split('?sz=');
        avatar = arAvatar[0] + '?sz=200';

        for (var i = 0; i < resp.emails.length; i++) {
            if (resp.emails[i].type === 'account') {
                email = resp.emails[i].value;
            }
        }

        var pid = $('#btn-google').attr('data-id');
        var url = $('input#url').val();
        var role_id = $('.role_id:checked').val();
        //alert(role_id);return false;
        //alert(url);
        $('#login-modal').modal('hide');

        if ($('#login-modal').css('display') == 'none') {
            if ($(".role_id").is(":checked")) {
                $.ajax({
                    type: "POST",
                    data: "url=" + url + "&role_id=" + role_id + "&email=" + email + "&response=" + JSON.stringify(resp),
                    url: BASE_URL + "users/loginGoogle",
                    beforeSend: function () {
                        $('.header-top').attr("disabled", 'disabled').before('<div class="loader"><div class="overlay-loading"></div><div class="loading-2"></div></div>');
                    },
                    success: function (data) {
                        var data = $.parseJSON(data);
                        window.location.href = data.url;
                    }
                });

            }
            else {
                if ($('.div-role').hasClass('has-error'));
                else {
                    var html = '<div class="box-error col-lg-12 col-md-12 col-xs-12">' +
                        '<span for="role_id" class="help-block">Trường này là bắt buộc</span>' +
                        '</div>';
                    $('.div-role').addClass('has-error');
                    $('.div-role').append(html);
                }
                return false;
            }

        }
        else {
            $.ajax({
                type: "POST",
                data: "url=" + url + "&role_id=" + role_id + "&email=" + email + "&response=" + JSON.stringify(resp),
                url: BASE_URL + "users/loginGoogle",
                beforeSend: function () {
                    $('.header-top').attr("disabled", 'disabled').before('<div class="loader"><div class="overlay-loading"></div><div class="loading-2"></div></div>');
                },
                success: function (data) {
                    var data = $.parseJSON(data);
                    if (data.url == 'redirect_signup') {
                        window.location.href = BASE_URL + 'users/signUp';
                    }
                    else {
                        window.location.href = data.url;
                    }
                }
            });
        }

    }

    $('.item-dev-recommend').popover({

        html: true,
        trigger: 'manual',
        placement: 'bottom',
        content: function () {
            return $(this).find('.popover_info_dev').html();
        }
    }).on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(this).siblings(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide")
            }
        }, 100);
    });
    $('#btn-status-project').confirmation({
        popout: true
    });
    $('body').on('click', '.btn-invite-one', function () {
        var url = $(this).attr('data-href');
        $.get(url, function (data) {
            $('#invite-modal').html(data);
            $('#invite-modal').modal();
        });
    });
    $('body').on('click', '#btn-watchlist', function () {
        var user_id = $(this).parent().attr('data-id');
        var target_click = $(this);
        if ($(this).hasClass(('glyphicon-heart'))) {
            $.ajax({
                type: "POST",
                data: "user_id=" + user_id,
                url: BASE_URL + "users/removeWatchList",
                success: function (data) {
                    var data = $.parseJSON(data);
                    if (data.status == 'success') {
                        target_click.removeClass('glyphicon-heart');
                        target_click.addClass('glyphicon-heart-empty');

                        var num_saved_freelancer = $('#num-saved-freelancer').attr('data-num');
                        num_saved_freelancer = parseInt(num_saved_freelancer) - 1;
                        $('#num-saved-freelancer').attr('data-num', num_saved_freelancer);
                        $('#num-saved-freelancer').html('(<span>' + num_saved_freelancer + '</span>)');
                    }
                    if (data.status == 'not-client') {
                        alert('not client');
                    }
                    if (data.status == 'not-login') {
                        if (document.getElementById('dev_save') == null) {
                            var html = '<input type="hidden" name="dev_id" id="dev_save" value="' + user_id + '">';
                        }
                        else {
                            $('#dev_save').remove();
                            var html = '<input type="hidden" name="dev_id" id="dev_save" value="' + user_id + '">';
                        }
                        $("#login-popup-form").append(html);
                        $("#login-modal").modal('show');
                    }
                }
            });
        }
        if ($(this).hasClass(('glyphicon-heart-empty'))) {
            $.ajax({
                type: "POST",
                data: "user_id=" + user_id,
                url: BASE_URL + "users/addWatchList",
                success: function (data) {
                    var data = $.parseJSON(data);
                    if (data.status == 'success') {
                        target_click.removeClass('glyphicon-heart-empty');
                        target_click.addClass('glyphicon-heart');

                        var num_saved_freelancer = $('#num-saved-freelancer').attr('data-num');
                        num_saved_freelancer = parseInt(num_saved_freelancer) + 1;
                        $('#num-saved-freelancer').attr('data-num', num_saved_freelancer);
                        $('#num-saved-freelancer').html('(<span>' + num_saved_freelancer + '</span>)');
                    }
                    if (data.status == 'not-client') {
                        alert('not client');
                    }
                    if (data.status == 'not-login') {
                        if (document.getElementById('dev_save') == null) {
                            var html = '<input type="hidden" name="dev_id" id="dev_save" value="' + user_id + '">';
                        }
                        else {
                            $('#dev_save').remove();
                            var html = '<input type="hidden" name="dev_id" id="dev_save" value="' + user_id + '">';
                        }
                        $("#login-popup-form").append(html);
                        $("#login-modal").modal('show');
                        $("#login-modal").modal('show');
                    }
                }
            });
        }
    });
    $('.find-freelancer-country').on('change', function () {
        var url = $(this).val(); // get selected value
        if (url) { // require a URL
            window.location = url; // redirect
        }
        return false;
    });


    function getInfoUser(userId) {
        var result = '';
        $.ajax({
            type: "POST",
            data: "user_id=" + userId,
            url: BASE_URL + "users/ajaxGetInfoUser",
            success: function (data) {
                var res = $.parseJSON(data);
                result = res;
            }
        });

        return result;
    }

    function fileExists(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status != 404;
    }

    $('.child-category-profile').on('change', 'input:checkbox', function () {
        var groupId = $(this).val();
        var $this = $(this);

        $.ajax({
            type: "POST",
            url: BASE_URL + "project/ajaxGetCategories",
            data: ({group_id: groupId}),
            success: function (data) {
                var res = $.parseJSON(data);
                var html = '';
                var li_html = "<ul>";

                if ($this.is(":checked") === true) {
                    $.each(res, function (index, val) {
                        html += "<option value='" + val['id'] + "'>" + val['category_name'] + "</option>";
                        li_html += "<li data-value='" + val['id'] + "' class='label-skill'>" + val['category_name'] + "</li>";
                    });
                    li_html += "</ul>";
                    $('#skills').append(html);
                    $('#stick-skills').append(li_html);
                    $("#skills").trigger('liszt:updated');
                } else if ($this.is(":checked") === false) {
                    $.each(res, function (index, val) {
                        $.each($('#stick-skills li'), function (i) {

                            var $this = $(this);
                            if ($this.attr('data-value') == val['id']) {
                                $this.remove();
                            }
                        });
                        $.each($('#skills option'), function (i) {

                            var $this2 = $(this);
                            if ($this2.attr('value') == val['id']) {
                                $this2.remove();
                            }
                        });
                    });
                    $('#skills').append(html);
                    $('#stick-skills').append(li_html);
                    $("#skills").trigger('liszt:updated');
                }

            }
        });
    });
    function ajaxgetChildCategoryProfile(list_group_ids) {

        if (list_group_ids != 0) {
            list_group_ids = list_group_ids.split(',');
        }


        var arrData = [];
        $.ajax({
            type: "POST",
            url: BASE_URL + "project/getChildCategory",
            data: "id_category=" + $('#ParentCategory').val(),
            beforeSend: function () {
                $('#ParentCategory').parent().append('<span class="loading-1"></span>');
            },
            success: function (data) {
                $('#ParentCategory').parent().find(".loading-1").remove();

                var res = $.parseJSON(data);
                if (res.status == "success") {
                    var html = '';
                    $('#ChildCategory').empty();
                    $('#ChildCategoryProfile').empty();
                    $.each(res.data, function (k) {

                        if ($.isArray(list_group_ids)) {
                            //console.log($.inArray(res.data[k].id,list_group_ids));
                            if (($.inArray(res.data[k].id, list_group_ids)) >= '0') {

                                checked = 'checked="checked"';
                            }
                            else {
                                checked = '';
                            }
                        }


                        html += "<label class='label-category'>" +
                        "<input type='checkbox' " + checked + "  name='group[]' value='" + res.data[k].id + "' />" + res.data[k].group_name + "</label>";
                    });
                    $('#ChildCategoryProfile').html(html);
                    $('#ChildCategory').html(html);
                }
            }
        });
    }

    function getNumBid(projectId) {
        var num_bid = 0;
        $.ajax({
            type: "POST",
            async: false,
            url: BASE_URL + "project/ajaxGetNumBid",
            data: "projectId=" + projectId,
            success: function (data) {
                num_bid = data;
            }
        });

        return num_bid;
    }

    function getCategoryLink(category_ids) {
        var strCategory = '';
        $.ajax({
            type: "POST",
            async: false,
            url: BASE_URL + "project/ajaxGetCategoryLink",
            data: "category_ids=" + category_ids,
            success: function (data) {
                strCategory = data;
            }
        });

        return strCategory;
    }

    function cutString(string, lenght, char) {
        if (string == '') {
            return '';
        }
        if (lenght > string.length) {
            return string;
        }

        string = string.substr(0, lenght);
        string = string.split('').reverse().join('');
        var pos = string.indexOf(' ');
        string = string.substr((pos + 1));
        string = string.split('').reverse().join('');

        return string + ' ' + char;
    }

    function isNumber(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (key != 8 && key != 37 && key != 46) {
            key = String.fromCharCode(key);
        }

        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    function getTotalAvail() {
        var milestone_total_avail = 0;

        $('.milestone-fee').each(function (index, val) {
            milestone_total_avail = milestone_total_avail + parseFloat($(this).val());
        });

        return milestone_total_avail;
    }

    $('#notification-dropdown').hover(function () {
        $.post(BASE_URL + 'notification/updateNotification');
        $("#notification-dropdown span[class=alert-notification]").remove();
        $("#divScrollNotifications li").removeClass("bg-edf2f5");
    });
    $('#project-feed-dropdown').hover(function () {
        $.post(BASE_URL + 'notification/updateProjectFeed');
        $("#project-feed-dropdown span[class=alert-notification]").remove();
        $(".ul-alert-project-feed li").removeClass("bg-edf2f5");
    });
    $('#message-dropdown').hover(function () {
        $("#message-dropdown span[class=alert-notification]").remove();
    });
    $('body').on('change', '#select-project-dispute', function () {
        var value = $("#select-project-dispute").val();
        $.post(BASE_URL + 'dispute/ajaxGetProjectDispute', {project_id: value}, function (response) {
            $('#load-dispute').html(response);
        });
    });
    $('body').on('click', '.rd-budget', function () {
        if (!$('.budget').prop('disabled')) {
            $('.budget').css('border', '1px solid #ccc');
        } else if ($('.budget').prop('disabled')) {
            $('.budget').css('border', '1px solid #90dbdf');
            $('.budget').css('background', '#fff');
        }
    });
// get sub-total invoice
    function getSubTotalInvoice() {
        var subtotal = 0;
        $.each($('.invoice-detail-amount'), function () {
            if (!isNaN($(this).val())) {
                subtotal += parseInt($(this).val());
            }
        });
        $('.subtotal').html(subtotal);
        $('#sub-total').val(subtotal);

        return subtotal;
    }

// load total invoice
    function getTotalInvoice() {
        var total = 0;
        var tax_total = 0;
        $.each($('.tax-total'), function () {
            if (!isNaN($.trim($(this).text()))) {
                tax_total += parseInt($(this).text());
            }
        });

        total = Math.round(parseFloat($('#sub-total').val()) + parseFloat(tax_total));
        $('#total').val(total);
        $('.total').html(total);
    }

// load pay invoice
    function loadPayInvoice(invoice_id, milestone_id, milestone_id_select, action) {
        $.ajax({
            type: "POST",
            async: false,
            url: BASE_URL + "buyer/ajaxGetPayInvoice",
            data: ({
                invoice_id: invoice_id,
                milestone_id: milestone_id,
                milestone_id_select: milestone_id_select,
                action: action
            }),
            success: function (data) {
                var res = $.parseJSON(data);

                if (res.milestone != null) {
                    $.each(res.milestone, function (key, val) {
                        $('.milestone-' + val['id']).val(val['fee']);
                    });
                }

                $('.pay-amount').val(res.pay_amount);
                $('.paying-amount').html(res.pay_amount);
            }
        });
    }

    $('body').on('click', "input:radio[name=milestone_id]", function () {
        var value = $(this).attr('data-value');
        $('#value-dispute-limit').text(value);
    });

// alert fund ?
    function confirmFund(project_id) {
        BootstrapDialog.show({
            title: 'Fund Your Escrow',
            message: 'Keep your freelancer on track by funding the next milestone for your project. Your funds will be held securely by Applancer until your are already to pay your freelancer. What is Applaner Escrow Payment Protection?',
            buttons: [{
                label: 'Fund',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    window.location.href = BASE_URL + 'project/viewPayments/' + project_id;
                }
            }, {
                label: 'Later',
                cssClass: 'btn-default',
                action: function () {
                    // You can also use BootstrapDialog.closeAll() to close all dialogs.
                    $.each(BootstrapDialog.dialogs, function (id, dialog) {
                        dialog.close();
                    });
                }
            }]
        });
    }

// change tax
    function taxCal() {
        var tax_ids = $('.table-subtotal').attr('data-tax-ids');

        if (tax_ids != '') {
            tax_ids = tax_ids.split(',');

            $.each(tax_ids, function (key, val) {
                var total_tax = 0;
                var tax_name = '';
                var tax_rate = '';
                $.each($('.tax-item-' + val), function () {
                    total_tax += parseFloat($(this).val());
                    tax_name = $(this).attr('data-name');
                    tax_rate = $(this).attr('data-rate');
                });

                var className = 'total-tax-item-' + val;
                if (total_tax > 0) {
                    if ($('.table-subtotal').find('tr').hasClass(className) === true) {
                        var html_row = '<td class="col-lg-6 col-md-6 col-sm-6 col-xs-6">' + tax_name + ' (' + tax_rate + '%)</td>' +
                            '<td class="col-lg-6 col-md-6 col-sm-6 col-xs-6" align="center">$<span class="tax-total">' + total_tax + '</span></td>';

                        $('.' + className).html(html_row);
                    } else {
                        var html_row = '<tr class="' + className + '"><td class="col-lg-6 col-md-6 col-sm-6 col-xs-6">' + tax_name + ' (' + tax_rate + '%)</td>' +
                            '<td class="col-lg-6 col-md-6 col-sm-6 col-xs-6" align="center">$<span class="tax-total">' + total_tax + '</span></td></tr>';

                        $('.table-subtotal tr').first().after(html_row);
                    }
                } else {
                    if ($('.table-subtotal').find('tr').hasClass(className) === true) {
                        $('.' + className).remove();
                    }
                }
            });
        }

        var total = parseFloat($('.subtotal').text());
        $.each($('.tax-total'), function () {
            total += parseFloat($(this).text());
        });

        $('.total').html(total);
        $('#total').val(total);
    }

    function checkInvoiceValid() {
        var result = true;

        $('.invoice-detail-name').each(function (index, val) {
            if ($(this).val() == '') {
                $(this).parents('td').addClass('has-error');
                $(this).after('<span class="help-block">This field is required.</span>');
                result = false;
            } else {
                $(this).parents('td').removeClass('has-error').addClass('has-success');
                $(this).next().remove();
            }
        });

        $('.invoice-detail-amount').each(function (index, val) {
            if (parseInt($(this).val()) <= 0) {
                $(this).parents('td').addClass('has-error');
                $(this).parents('td').append('<span class="help-block">This field is required.</span>');
                result = false;
            } else {
                $(this).parents('td').removeClass('has-error').addClass('has-success');
                $(this).parents('td').find('.help-block').remove();
            }
        });

        return result;
    }

    function showMessage(type, message) {
        var result = '';
        if (type == 'error') {
            result = '<div class="alert alert-danger">' +
            '<button data-dismiss="alert" class="close"></button>' +
            '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true" style="float: left"></span>' +
            '<strong></strong>' +
            '<ul>' + message + '</ul></div>';
        } else if (type == 'success') {
            result = '<div class="alert alert-success">' +
            '<button data-dismiss="alert" class="close"></button>' +
            '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true" style="float: left"></span>' +
            '<strong></strong>' +
            '<ul>' + message + '</ul></div>';
        } else if (type == 'warning') {
            result = '<div class="alert alert-warning">' +
            '<button data-dismiss="alert" class="close"></button>' +
            '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true" style="float: left"></span>' +
            '<strong></strong>' +
            '<ul>' + message + '</ul></div>';
        } else if (type == 'warning2') {
            result = '<div class="alert alert-warning2">' +
            '<button data-dismiss="alert" class="close"></button>' +
            '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true" style="float: left"></span>' +
            '<strong></strong>' +
            '<ul>' + message + '</ul></div>';
        }

        return result;
    }

    function goBackLink() {
        window.history.back();
    }

    function loginAppota(reload_url) {
        var left = (screen.width - 600) / 2;
        var top = (screen.height - 400) / 4;
        var redirect_url = BASE_URL + 'buyer/registerAppota/';
        var href = 'https://id.appota.com/oauth/request_token?response_type=code&client_id=179b049c0457ec42da21d58c1f735e42054336766&redirect_uri=' + redirect_url + '&scope=user.info,user.email&state=' + reload_url + '&lang=en';
        window.open(href, '_blank ', 'width=600,height=400,top=' + top + ', left=' + left + '');

        return true;
    }

    function nl2br(str, is_xhtml) {
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }

    $('body').on('click', '.facebook', function () {
        window.location.href = "https://www.facebook.com/applancer.net";
    });
    $('body').on('click', '.twitter', function () {
        window.location.href = "https://twitter.com/ApplancerNet";
    });
    $('body').on('click', '#more-country', function () {
        if ($('#more-countries').css('display') == 'none') {
            $('#more-countries').show();
            $("#more-country").text('Hide');
        } else {
            $('#more-countries').hide();
            $("#more-country").text('View more');
        }
    });
    $('body').on('click', '#check-all', function () {
        var value = $(this).attr('data-value');
        if (value == 'check-all') {
            $(this).attr('data-value', 'uncheck-all');
            $(this).text('Uncheck all');
        } else {
            $(this).attr('data-value', 'check-all');
            $(this).text('Check all');
        }
        $('.countries').find('input[type=checkbox]').each(function () {
            if (value == 'uncheck-all') {
                $(this).prop("checked", false);
            }
            else {
                $(this).prop("checked", true);
            }
        });
    });
    $('body').on('click', '#btn_join_contest', function (e) {
        e.preventDefault();
        var target = $(this).attr('data-target');
        $('html, body').animate({scrollTop: $('.' + target).offset().top}, 'slow');
    });

    /*Huynh An*/
    /*
     function getJson
     */
    function getJson(url) {
        return JSON.parse($.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            global: false,
            async: false,
            success: function (data) {
                return data;
            }
        }).responseText);
    }

    var tagList = [];
    var tagLimitation = 30;
    var $tagView = $('#tags-view');
    var $tagEdit = $('#tags-edit');
    var $tagInput = $('#key-skills');
    var $tagAddButton = $('#btn-add-tag');
    var $tagError = $('#key-skill-error');
    /*getContent*/
    function getContent(element) {
        $(element).find('.view-control').each(function () {
            var dataType = $(this).data('type');
            var dataControl = $(this).data('control');
            // Select Element
            if (dataType == 'select') {
                var select_edit_control = $(this).parents('.view-field').siblings('.edit-field').find('select.edit-control').filter(function () {
                    if ($(this).data('control') == dataControl) {
                        return true
                    }
                });
                // If there is no value, use the placeholder
                var select_text = select_edit_control.find('option:selected').text();
                var select_value = select_edit_control.find('option:selected').val();
                if (select_value == undefined || select_value.trim() == "" || select_value < 0) {
                    select_text = select_edit_control.data('placeholder');
                    $(this).addClass('placeholder');
                } else {
                    $(this).removeClass('placeholder');
                }
                $(this).text(select_text);
            }

            // Multiple Select Element
            else if (dataType == 'multiple-select') {
                var multiple_select_value = "";
                var $multiple_select_control = $(this).parents('.view-field').siblings('.edit-field').find('select.edit-control').filter(function () {
                    if ($(this).data('control') == dataControl) {
                        return true
                    }
                });
                var $selectedOptions = $multiple_select_control.find('option:selected');
                var number_of_selected_options = $selectedOptions.length;
                $selectedOptions.each(function (index) {
                    if (index == number_of_selected_options - 1) {
                        multiple_select_value += $(this).text();
                    } else {
                        multiple_select_value += $(this).text() + ", ";
                    }
                });

                // If there is no value, use the placeholder
                if (multiple_select_value.trim() == "" || multiple_select_value == undefined) {
                    multiple_select_value = $multiple_select_control.data('placeholder');
                    $(this).addClass('placeholder');
                } else {
                    $(this).removeClass('placeholder');
                }
                $(this).text(multiple_select_value);
            }

            // Radio buttons
            else if (dataType == "radio") {
                var radio_value = $(this).parents('.view-field').siblings('.edit-field').find('.edit-control:checked').data('text-value');
                $(this).text(radio_value);
            }
            // Manual
            else if (dataType == "checkbox") {
                // do nothing
            }
            // Other cases: text input, text area
            else {
                var text_edit_control = $(this).parents('.view-field').siblings('.edit-field').find('.edit-control').filter(function () {
                    if ($(this).data('control') == dataControl) {
                        return true
                    }
                });
                var text_value = text_edit_control.val();

                // If there is no value, use the placeholder
                if (text_value == undefined || text_value.trim() == "") {
                    text_value = text_edit_control.attr('placeholder');
                    $(this).addClass('placeholder');
                } else {
                    $(this).removeClass('placeholder');
                }
                // Add html to field
                $(this).html(text_value);
            }
        });

    }

// Save Content & Turn to View Mode
    function saveContent(this_formwrapper) {
        getContent(this_formwrapper);
        if ($(this_formwrapper).hasClass('opened-section')) {
            $(this_formwrapper).removeClass('opened-section')
        }
        $(this_formwrapper).removeClass('edit-mode new-section').find('.edit-field').fadeOut('fast').promise().done(function () {
            $(this_formwrapper).find('.view-field').fadeIn('fast');
        });
        $(this_formwrapper).find('.edit-control').each(function () {
            if ($(this).is(':checkbox') || $(this).is(':radio')) {
                $(this).data('current_data', $(this).prop('checked')).change();
            } else {
                $(this).data('current_data', $(this).val());
            }

        });
        // Show the add section button
        this_formwrapper.parents('fieldset').find('.add-one-more-section').fadeIn('fast');

        // Summary Case
        if (this_formwrapper.find('.btn-primary').is('#saveSummaryInforBtn')) {
            //getSalaryValue();
            var $noExcheckbox = $('#no-experience-check-box');
            if ($noExcheckbox.is(':checked')) {
                var $thisViewControl = $noExcheckbox.parents('.edit-field').siblings('.view-field').find('.view-control');
                $thisViewControl.text($noExcheckbox.data('text')).removeClass('placeholder')
            }
        }

        // Contact Information Case
        if (this_formwrapper.find('.btn-primary').is('#save-contact-information')) {
            if ($('#district').is(':disabled')) {
                var $districtViewControl = $('#district-view-control');
                $districtViewControl.text($districtViewControl.data('na'))
            }
        }
        // Key Skills
        if (this_formwrapper.find('.btn-primary').is('#save-skills')) {
            updateTags($tagView);
            $('.skill-old').remove();
            $('#alert-old-skill').remove();

        }
    }

// Update Current Tags
    function updateTags(tagId) {
        $(tagId).empty();
        $.each(tagList, function (tagNum, newTag) {
//            var newTag = '<span class="tag-xs">' + newTag + '</span>';
            if (tagId == $tagEdit) {
                newTag = '<span class="tag-xs">' + newTag + '<a href="#" class="ic-close"><i class="fa fa-fw fa-remove"></i></a></span>'
            } else {
                newTag = '<span class="tag-xs">' + newTag + '</span>';
            }
            $(tagId).append(newTag);
        });
        removeTag($tagInput);
    }

// Remove Tag from List - editable mode
    function removeTag(inputField) {
        $(".ic-close").click(function () {
            var removeItem = $(this).parents('.tag-xs').text();
            tagList.splice(tagList.indexOf(removeItem), 1);
            $(this).parents('.tag-xs').fadeOut().remove();
            $(inputField).siblings('.error-message').fadeOut('slow');
            $(inputField).focus();
            return false;
        });
    }

// Reset the form function
    function resetForm(element) {
        $(element).find('input.edit-control, textarea.edit-control').each(function () {
            $(this).val($(this).data('current_data'));

            if ($(this).is(':checkbox') || $(this).is(':radio')) {
                $(this).prop('checked', $(this).data('current_data')).change();
            } else {
                $(this).val($(this).data('current_data'));
            }
        });
        $(element).find('select.edit-control').each(function () {
            //$(this).select2('val', $(this).data('current_data'));
        })
    }

// Check/uncheck Current Job; checkbox should be the "to-present-checkbox"
    function checkToDateDatePickerIsPresent(checkbox) {
        var $toDateDatePicker = $(checkbox).parents('.form-wrapper').find('input.datepicker[data-control="to-date"]');
        if ($(checkbox).is(':checked')) {
            $toDateDatePicker.attr('disabled', 'disabled').val("")
        } else {
            if ($toDateDatePicker.is(":disabled")) {
                $toDateDatePicker.removeAttr('disabled').trigger('focus');
            }

        }
    }

// Scroll page to any element with 100px offset
    function scrollToThisSection(element) {
        $("html, body").animate({
            scrollTop: $(element).offset('body').top - 100
        }, 'slow');
    }

// Count down maxlength
    function updateCountdown(element, thisCounter, maxLength, isTinyMCE) {
        var remaining;
        if (isTinyMCE == true) {
            var htmlContent = element.getContent().replace(/(<([^>]+)>)/ig, '').replace('&nbsp;', '');
            remaining = maxLength - htmlContent.length;
        } else {
            remaining = maxLength - $(element).val().length;
        }
        $(thisCounter).text(remaining + " " + $(thisCounter).data('text'));
    }

    function removeAddedForm(thisFormWrapper) {
        $(thisFormWrapper).slideUp('fast').promise().done(function () {
            $(this).remove();
        });
        // Show the add section button
        var $this_fieldset = $(thisFormWrapper).parents('fieldset');
        $this_fieldset.find('.add-one-more-section').fadeIn('fast');
        // If the number of sections is 0, then remove the whole fieldset
        $this_fieldset.data('numberOfSection', $this_fieldset.data('numberOfSection') - 1);
        if ($this_fieldset.data('numberOfSection') == 0) {
            $(thisFormWrapper).parents('div[class^="section-"]').slideUp('fast');
        }
        $(thisFormWrapper).parents('fieldset').removeClass('edit-mode');
    }

    /*checkbox delete tat ca*/
    function toggle(source) {
        checkboxes = document.getElementsByName('job[]');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = source.checked;
        }
    }

    function onDelMyJob() {
        if (checkedJobtrackers()) {
            $("#deleteJobBtn").unbind("click");
            $('#deleteJobBtn').on("click", function () {
                $('#frmMyJob').submit();
            });
            $('#delete-modal').modal('show');
        }
    }

    function checkedJobtrackers() {
        if (!anyCheckOrUncheckBox(frmMyJob.job, 1)) {
            $('#alert-modal').modal('show');
            return false;
        }
        return true;
    }

    function anyCheckOrUncheckBox(obj, isCheck) {
        var _isCheck = (isCheck == 0) ? false : true;

        if (typeof(obj) == 'undefined') return false;

        num_item = $(obj).length;
        if (num_item > 1) {
            for (i = 0; i < num_item; i++) {
                if (obj[i].checked == _isCheck) {
                    return true;
                }
            }
            return false;
        }
        else {
            return (obj.checked == _isCheck);
        }
    };

    function checkAllBox(obj, checked) {
        var _checked = (checked == 0) ? false : true;

        num_item = $(obj).length;
        if (num_item > 1) {
            for (i = 0; i < num_item; i++) {
                obj[i].checked = _checked;
            }
        }
        else {
            if (typeof obj != 'undefined') obj.checked = _checked;
        }
    }
    ;

// For Mailbox

    function showMailbox(_obj, entryid, _jobid) {
        _top = $('#newMailbox_' + entryid).y();
        _left = $('#newMailbox_' + entryid).x();
        $('#mailboxPopup').css({top: _top - 200 + 'px', left: _left - 170 + 'px'});
        $('#mailboxPopup').show();
        loadMailbox(entryid, _jobid);
    }

    function hideMailbox() {
        $('#mailboxPopup').hide();
    }

    function delMailbox(entryid, _jobid) {
        var dataFrm = {
            'mailbox_id': entryid,
            'ac': 'delMailbox',
            'jobid': _jobid
        };
        $.ajax({
            type: "POST",
            url: base_url + "quan-ly-nghe-nghiep/viec-lam-cua-toi",
            data: dataFrm,
            dataType: "json",
            error: function () {
                alert('Có lỗi hệ thống khi bạn xóa thông tin. Vui lòng xóa lại. Cảm ơn.');
            },
            success: function (resultHTML) {
                if (resultHTML.notError) {
                    if (resultHTML.totalMessage < 1) $('#newMailbox_' + entryid).remove();
                    hideMailbox();
                }
                else {
                    alert('Có lỗi hệ thống khi bạn xóa thông tin. Vui lòng xóa lại. Cảm ơn.');
                }
            }
            //,
            //beforeSend:function(){ $("#contentFeedback").html('<center><img src="'+_imgPath+'/loading.gif" border=0 align="absmiddle"/></center>'); }
        });
    }

    function loadMailbox(entryid, _jobid) {
        var dataFrm = {
            'mailbox_id': entryid,
            'ac': 'loadMailbox'
        };
        $.ajax({
            type: "POST",
            url: base_url + "quan-ly-nghe-nghiep/viec-lam-cua-toi",
            data: dataFrm,
            dataType: "html",
            error: function () {
                alert('Có lỗi hệ thống khi bạn xem thông tin. Vui lòng xem lại. Cảm ơn.');
                hideMailbox();
            },
            success: function (resultHTML) {
                if (resultHTML == null || resultHTML == '') {
                    $('#contentMailbox').html('This message is deleted!');
                    $('#reply').unbind('click');
                    $('#delete').unbind('click');
                }
                else {
                    $('#contentMailbox').html(resultHTML);
                    $('#reply').unbind('click');
                    $('#delete').unbind('click');

                    $('#reply').click(function () {
                        window.location = base_url + 'quan-ly-nghe-nghiep/phan-hoi-cua-nha-tuyen-dung/tra-loi/' + entryid;
                    });

                    $('#delete').click(function () {
                        var _confirm = confirm("Bạn có chắc là bạn muốn xóa phản hồi này không?");
                        if (_confirm) {
                            delMailbox(entryid, _jobid);
                        }
                    });
                }
            },
            beforeSend: function () {
                $("#contentMailbox").html('<center><img src="' + _imgPath + '/loading.gif" border=0 align="absmiddle"/></center>');
            }
        });
    }

    /*end checkbox delete tat ca*/

    function checkRequired(_a, _b) {
        if (_b == null) {
            _b = "err_" + _a.name;
        }
        objErr = document.getElementById(_b);
        objErr.style.display = "none";
        var s = _a.value;
        if (trim(s) == "") {
            return errorAlert(_a, _b);
        }
        return true;
    }

    function ltrim(a) {
        var b = /^\s */;
        return a.replace(b, "");
    }

    function rtrim(a) {
        var b = /\s *$/;
        return a.replace(b, "");
    }

    function trim(a) {
        return ltrim(rtrim(a));
    }

    function errorAlert(a, b) {
        objErr = document.getElementById("err_top");
        if (objErr != null) {
            objErr.style.display = "";
        }
        if (b == null) {
            b = "err_" + a.name;
        }
        objErr = document.getElementById(b);
        objErr.style.display = "";
        return false;
    }

    function checkEmail(obj, a) {
        if (a == null) {
            a = "err_" + obj.name;
        }
        objErr = document.getElementById(a);
        objErr.style.display = "none";
        var s = trim(obj.value);
        if (!_checkEmail(s)) {
            return errorAlert(obj, a);
        }
        return true;
    }

    function _checkEmail(st) {
        var a = "^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,8})$";
        var b = new RegExp(a);
        return b.exec(st);
    }

function close_modal(){
    var id = Math.random() * 100000;
    setCookie('email_key', id);
    //document.cookie = encodeURIComponent("email_key") + "=" + encodeURIComponent(id) + "; expires = "+2592000000 + "; path=/";

}

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

/*Huynh An*/
