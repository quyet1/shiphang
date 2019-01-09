$('body').on('click','#close-crop-avatar',function(){
    $('#avatar-modal').modal('hide');
    $('#myModalAddPortfolio').modal('show');
});
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else {
    factory(jQuery);
  }
})(function ($) {

  "use strict";

  var console = window.console || {
        log: $.noop
      };

  function CropAvatar($element) {
    this.$container = $element;

    this.$avatarView = this.$container.find(".avatar-view");

    this.$avatar = this.$avatarView.find("img");
    this.$avatarModal = $("#avatar-modal");
    this.$loading = this.$container.find(".loading");

    this.$avatarForm = $(".avatar-form");
    this.$avatarUpload = this.$avatarForm.find(".avatar-upload");
    this.$avatarSrc = this.$avatarForm.find(".avatar-src");
    this.$avatarData = this.$avatarForm.find(".avatar-data");
    this.$avatarInput = this.$avatarForm.find(".avatar-input");
    this.$avatarSave = this.$avatarForm.find(".avatar-save");

    this.$avatarWrapper = this.$avatarModal.find(".avatar-wrapper");
    this.$avatarPreview = this.$avatarModal.find(".avatar-preview");


    this.init();

  }

  CropAvatar.prototype = {
    constructor: CropAvatar,

    support: {
      fileList: !!$("<input type=\"file\">").prop("files"),
      fileReader: !!window.FileReader,
      formData: !!window.FormData
    },

    init: function () {
      this.support.datauri = this.support.fileList && this.support.fileReader;

      if (!this.support.formData) {
        this.initIframe();
      }

      this.initTooltip();
      this.initModal();
      this.addListener();
    },

    addListener: function () {
      this.$avatarView.on("click", $.proxy(this.click, this));
      this.$avatarInput.on("change", $.proxy(this.change, this));
      this.$avatarForm.on("submit", $.proxy(this.submit, this));
    },

    initTooltip: function () {
      this.$avatarView.tooltip({
        placement: "bottom"
      });
    },

    initModal: function () {
      this.$avatarModal.modal("hide");
      this.initPreview();
    },

    initPreview: function () {
      var url = this.$avatar.attr("src");

      this.$avatarPreview.empty().html('<img src="' + url + '">');
    },

    initIframe: function () {
      var iframeName = "avatar-iframe-" + Math.random().toString().replace(".", ""),
          $iframe = $('<iframe name="' + iframeName + '" style="display:none;"></iframe>'),
          firstLoad = true,
          _this = this;

      this.$iframe = $iframe;
      this.$avatarForm.attr("target", iframeName).after($iframe);

      this.$iframe.on("load", function () {
        var data,
            win,
            doc;

        try {
          win = this.contentWindow;
          doc = this.contentDocument;

          doc = doc ? doc : win.document;
          data = doc ? doc.body.innerText : null;
        } catch (e) {}

        if (data) {
          _this.submitDone(data);
        } else {
          if (firstLoad) {
            firstLoad = false;
          } else {
            _this.submitFail("Image upload failed!");
          }
        }

        _this.submitEnd();
      });
    },

    click: function () {
        $('#myModalAddPortfolio').modal('hide');
      this.$avatarModal.modal("show");

    },

    change: function () {
      var files,
          file;

      if (this.support.datauri) {
        files = this.$avatarInput.prop("files");

        if (files.length > 0) {
          file = files[0];

          if (this.isImageFile(file)) {
            this.read(file);
          }
        }
      } else {
        file = this.$avatarInput.val();

        if (this.isImageFile(file)) {
          this.syncUpload();
        }
      }
    },

    submit: function () {
      if (!this.$avatarSrc.val() && !this.$avatarInput.val()) {
        return false;
      }

      if (this.support.formData) {
        this.ajaxUpload();
        return false;
      }
    },

    isImageFile: function (file) {
      if (file.type) {
        return /^image\/\w+$/.test(file.type);
      } else {
        return /\.(jpg|jpeg|png|gif)$/.test(file);
      }
    },

    read: function (file) {
      var _this = this,
          fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = function () {
        _this.url = this.result
        _this.startCropper();
      };
    },

    startCropper: function () {
      var _this = this;
      if (this.active) {
        this.$img.cropper("replace", this.url);
      } else {
        this.$img = $('<img src="' + this.url + '">');
        this.$avatarWrapper.empty().html(this.$img);
        this.$img.cropper({
          aspectRatio: 1,
          preview: this.$avatarPreview.selector,
          done: function (data) {
            var json = [
                  '{"x":' + data.x,
                  '"y":' + data.y,
                  '"height":' + data.height,
                  '"width":' + data.width + "}"
                ].join();

            _this.$avatarData.val(json);
          }
        });

        this.active = true;
      }
    },

    stopCropper: function () {
      if (this.active) {
        this.$img.cropper("destroy");
        this.$img.remove();
        this.active = false;
      }
    },

    ajaxUpload: function () {
      var url = this.$avatarForm.attr("action"),
          data = new FormData(this.$avatarForm[0]),
          _this = this;

      $.ajax(url, {
        type: "post",
        data: data,
        processData: false,
        contentType: false,

        beforeSend: function () {

            //$('body').removeClass('modal-open');
            //$('.modal-backdrop').remove();
          _this.submitStart();

        },

        success: function (data) {
          _this.submitDone(data);
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
          _this.submitFail(textStatus || errorThrown);
        },

        complete: function () {
          _this.submitEnd();
            //$('.modal-backdrop').remove();

        }
      });
    },

    syncUpload: function () {
      this.$avatarSave.click();
    },

    submitStart: function () {
      this.$loading.fadeIn();
    },

    submitDone: function (data) {
      console.log(data);

      try {
        data = $.parseJSON(data);
      } catch (e) {};

      if (data && data.state === 200) {
        if (data.result) {

          this.url = data.result;
          if (this.support.datauri || this.uploaded) {
            this.uploaded = false;
              $('#avatar-name').val(data.name);

            this.cropDone();

          } else {
            this.uploaded = true;

            this.$avatarSrc.val(this.url);
            $('#avatar-name').val(data.name);
            this.startCropper();
          }

          this.$avatarInput.val("");
        } else if (data.message) {
          this.alert(data.message);
        }
      } else {
        this.alert("Failed to response");
      }
    },

    submitFail: function (msg) {
      this.alert(msg);
    },

    submitEnd: function () {
      this.$loading.fadeOut();
    },

    cropDone: function () {
      this.$avatarSrc.val("");
      this.$avatarData.val("");
      this.$avatar.attr("src", this.url);
      this.stopCropper();
      this.$avatarModal.modal("hide");
      $('#myModalAddPortfolio').modal('show');

    },

    alert: function (msg) {
      var $alert = [
            '<div class="alert alert-danger avater-alert">',
              '<button type="button" class="close" data-dismiss="alert">&times;</button>',
              msg,
            '</div>'
          ].join("");

      this.$avatarUpload.after($alert);
    }
 };

  $(function () {
      var example = new CropAvatar($("#crop-avatar"));
  });
    //$('body').on('click','#crop-image',function(){

    //});
});

/////////////////////////////////////// edit ///////////////////////////////////////////////

$('body').on('click','#close-crop-avatar-edit',function(){
    $('#avatar-modal-edit').modal('hide');
    $('#myModalEditPortfolio').modal('show');
});
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {

    "use strict";

    var console = window.console || {
            log: $.noop
        };

    function CropAvatar($element) {
        this.$container = $element;

        this.$avatarView = this.$container.find(".avatar-view-edit");

        this.$avatar = this.$avatarView.find("img");
        this.$avatarModal = $("#avatar-modal-edit");
        this.$loading = this.$container.find(".loading");

        this.$avatarForm = $(".avatar-form-edit");
        this.$avatarUpload = this.$avatarForm.find(".avatar-upload-edit");
        this.$avatarSrc = this.$avatarForm.find(".avatar-src-edit");
        this.$avatarData = this.$avatarForm.find(".avatar-data-edit");
        this.$avatarInput = this.$avatarForm.find(".avatar-input-edit");
        this.$avatarSave = this.$avatarForm.find(".avatar-save-edit");

        this.$avatarWrapper = this.$avatarModal.find(".avatar-wrapper-edit");
        this.$avatarPreview = this.$avatarModal.find(".avatar-preview");


        this.init();

    }

    CropAvatar.prototype = {
        constructor: CropAvatar,

        support: {
            fileList: !!$("<input type=\"file\">").prop("files"),
            fileReader: !!window.FileReader,
            formData: !!window.FormData
        },

        init: function () {
            this.support.datauri = this.support.fileList && this.support.fileReader;

            if (!this.support.formData) {
                this.initIframe();
            }

            this.initTooltip();
            this.initModal();
            this.addListener();
        },

        addListener: function () {
            this.$avatarView.on("click", $.proxy(this.click, this));
            this.$avatarInput.on("change", $.proxy(this.change, this));
            this.$avatarForm.on("submit", $.proxy(this.submit, this));
        },

        initTooltip: function () {
            this.$avatarView.tooltip({
                placement: "bottom"
            });
        },

        initModal: function () {
            this.$avatarModal.modal("hide");
            this.initPreview();
        },

        initPreview: function () {
            var url = this.$avatar.attr("src");

            this.$avatarPreview.empty().html('<img src="' + url + '">');
        },

        initIframe: function () {
            var iframeName = "avatar-iframe-" + Math.random().toString().replace(".", ""),
                $iframe = $('<iframe name="' + iframeName + '" style="display:none;"></iframe>'),
                firstLoad = true,
                _this = this;

            this.$iframe = $iframe;
            this.$avatarForm.attr("target", iframeName).after($iframe);

            this.$iframe.on("load", function () {
                var data,
                    win,
                    doc;

                try {
                    win = this.contentWindow;
                    doc = this.contentDocument;

                    doc = doc ? doc : win.document;
                    data = doc ? doc.body.innerText : null;
                } catch (e) {}

                if (data) {
                    _this.submitDone(data);
                } else {
                    if (firstLoad) {
                        firstLoad = false;
                    } else {
                        _this.submitFail("Image upload failed!");
                    }
                }

                _this.submitEnd();
            });
        },

        click: function () {
            $('#myModalEditPortfolio').modal('hide');
            this.$avatarModal.modal("show");

        },

        change: function () {
            var files,
                file;

            if (this.support.datauri) {
                files = this.$avatarInput.prop("files");

                if (files.length > 0) {
                    file = files[0];

                    if (this.isImageFile(file)) {
                        this.read(file);
                    }
                }
            } else {
                file = this.$avatarInput.val();

                if (this.isImageFile(file)) {
                    this.syncUpload();
                }
            }
        },

        submit: function () {
            if (!this.$avatarSrc.val() && !this.$avatarInput.val()) {
                return false;
            }

            if (this.support.formData) {
                this.ajaxUpload();
                return false;
            }
        },

        isImageFile: function (file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif)$/.test(file);
            }
        },

        read: function (file) {
            var _this = this,
                fileReader = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload = function () {
                _this.url = this.result
                _this.startCropper();
            };
        },

        startCropper: function () {
            var _this = this;

            if (this.active) {
                this.$img.cropper("replace", this.url);
            } else {
                this.$img = $('<img src="' + this.url + '">');
                this.$avatarWrapper.empty().html(this.$img);
                this.$img.cropper({
                    aspectRatio: 1,
                    preview: this.$avatarPreview.selector,
                    done: function (data) {
                        var json = [
                            '{"x":' + data.x,
                            '"y":' + data.y,
                            '"height":' + data.height,
                            '"width":' + data.width + "}"
                        ].join();

                        _this.$avatarData.val(json);
                    }
                });

                this.active = true;
            }
        },

        stopCropper: function () {
            if (this.active) {
                this.$img.cropper("destroy");
                this.$img.remove();
                this.active = false;
            }
        },

        ajaxUpload: function () {
            var url = this.$avatarForm.attr("action"),
                data = new FormData(this.$avatarForm[0]),
                _this = this;

            $.ajax(url, {
                type: "post",
                data: data,
                processData: false,
                contentType: false,

                beforeSend: function () {

                    //$('body').removeClass('modal-open');
                    //$('.modal-backdrop').remove();
                    _this.submitStart();

                },

                success: function (data) {
                    _this.submitDone(data);
                },

                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    _this.submitFail(textStatus || errorThrown);
                },

                complete: function () {
                    _this.submitEnd();
                    //$('.modal-backdrop').remove();

                }
            });
        },

        syncUpload: function () {
            this.$avatarSave.click();
        },

        submitStart: function () {
            this.$loading.fadeIn();
        },

        submitDone: function (data) {
            console.log(data);

            try {
                data = $.parseJSON(data);
            } catch (e) {};

            if (data && data.state === 200) {
                if (data.result) {
                    this.url = data.result;
                    if (this.support.datauri || this.uploaded) {
                        this.uploaded = false;
                        $('#avatar-name-edit').val(data.name);

                        this.cropDone();

                    } else {
                        this.uploaded = true;
                        this.$avatarSrc.val(this.url);
                        $('#avatar-name-edit').val(data.name);
                        this.startCropper();
                    }

                    this.$avatarInput.val("");
                } else if (data.message) {
                    this.alert(data.message);
                }
            } else {
                this.alert("Failed to response");
            }
        },

        submitFail: function (msg) {
            this.alert(msg);
        },

        submitEnd: function () {
            this.$loading.fadeOut();
        },

        cropDone: function () {
            this.$avatarSrc.val("");
            this.$avatarData.val("");
            this.$avatar.attr("src", this.url);
            this.stopCropper();
            this.$avatarModal.modal("hide");
            $('#myModalEditPortfolio').modal('show');

        },

        alert: function (msg) {
            var $alert = [
                '<div class="alert alert-danger avater-alert">',
                '<button type="button" class="close" data-dismiss="alert">&times;</button>',
                msg,
                '</div>'
            ].join("");

            this.$avatarUpload.after($alert);
        }
    };

    $(function () {
        var example = new CropAvatar($("#crop-avatar-edit"));
    });
    //$('body').on('click','#crop-image',function(){

    //});
});

//////////////////////////////////// avatar user /////////////////////////////////////////

$('body').on('click','#close-avatar-user',function(){
    $('#modal-avatar-user-edit').modal('hide');
});
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function ($) {

    "use strict";

    var console = window.console || {
            log: $.noop
        };

    function CropAvatar($element) {
        this.$container = $element;

        this.$avatarView = this.$container.find(".avatar-user");

        this.$avatar = this.$avatarView.find("img");
        this.$avatarModal = $("#modal-avatar-user-edit");
        this.$loading = this.$container.find(".loading");

        this.$avatarForm = $(".avatar-user-form");
        this.$avatarUpload = this.$avatarForm.find(".avatar-user-upload");
        this.$avatarSrc = this.$avatarForm.find(".avatar-user-src");
        this.$avatarData = this.$avatarForm.find(".avatar-user-data");
        this.$avatarInput = this.$avatarForm.find(".avatar-user-input");
        this.$avatarSave = this.$avatarForm.find(".avatar-user-save");

        this.$avatarWrapper = this.$avatarModal.find(".avatar-user-wrapper");
        this.$avatarPreview = this.$avatarModal.find(".avatar-user-preview");


        this.init();
    }

    CropAvatar.prototype = {
        constructor: CropAvatar,

        support: {
            fileList: !!$("<input type=\"file\">").prop("files"),
            fileReader: !!window.FileReader,
            formData: !!window.FormData
        },

        init: function () {
            this.support.datauri = this.support.fileList && this.support.fileReader;

            if (!this.support.formData) {
                this.initIframe();
            }

            this.initTooltip();
            this.initModal();
            this.addListener();
        },

        addListener: function () {
            this.$avatarView.on("click", $.proxy(this.click, this));
            this.$avatarInput.on("change", $.proxy(this.change, this));
            this.$avatarForm.on("submit", $.proxy(this.submit, this));
        },

        initTooltip: function () {
            this.$avatarView.tooltip({
                placement: "bottom"
            });
        },

        initModal: function () {
            this.$avatarModal.modal("hide");
            this.initPreview();
        },

        initPreview: function () {
            var url = this.$avatar.attr("src");

            this.$avatarPreview.empty().html('<img src="' + url + '">');
        },

        initIframe: function () {
            var iframeName = "avatar-iframe-" + Math.random().toString().replace(".", ""),
                $iframe = $('<iframe name="' + iframeName + '" style="display:none;"></iframe>'),
                firstLoad = true,
                _this = this;

            this.$iframe = $iframe;
            this.$avatarForm.attr("target", iframeName).after($iframe);

            this.$iframe.on("load", function () {
                var data,
                    win,
                    doc;

                try {
                    win = this.contentWindow;
                    doc = this.contentDocument;

                    doc = doc ? doc : win.document;
                    data = doc ? doc.body.innerText : null;
                } catch (e) {}

                if (data) {
                    _this.submitDone(data);
                } else {
                    if (firstLoad) {
                        firstLoad = false;
                    } else {
                        _this.submitFail("Image upload failed!");
                    }
                }

                _this.submitEnd();
            });
        },

        click: function () {
            this.$avatarModal.modal("show");

        },

        change: function () {
            var files,
                file;

            if (this.support.datauri) {
                files = this.$avatarInput.prop("files");

                if (files.length > 0) {
                    file = files[0];

                    if (this.isImageFile(file)) {
                        this.read(file);
                    }
                }
            } else {
                file = this.$avatarInput.val();

                if (this.isImageFile(file)) {
                    this.syncUpload();
                }
            }
        },

        submit: function () {
            if (!this.$avatarSrc.val() && !this.$avatarInput.val()) {
                return false;
            }

            if (this.support.formData) {
                this.ajaxUpload();
                return false;
            }
        },

        isImageFile: function (file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif)$/.test(file);
            }
        },

        read: function (file) {
            var _this = this,
                fileReader = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload = function () {
                _this.url = this.result
                _this.startCropper();
            };
        },

        startCropper: function () {
            var _this = this;

            if (this.active) {
                this.$img.cropper("replace", this.url);
            } else {
                this.$img = $('<img src="' + this.url + '">');
                this.$avatarWrapper.empty().html(this.$img);
                this.$img.cropper({
                    aspectRatio: 1,
                    preview: this.$avatarPreview.selector,
                    done: function (data) {
                        var json = [
                            '{"x":' + data.x,
                            '"y":' + data.y,
                            '"height":' + data.height,
                            '"width":' + data.width + "}"
                        ].join();

                        _this.$avatarData.val(json);
                    }
                });

                this.active = true;
            }
        },

        stopCropper: function () {
            if (this.active) {
                this.$img.cropper("destroy");
                this.$img.remove();
                this.active = false;
            }
        },

        ajaxUpload: function () {
            var url = this.$avatarForm.attr("action"),
                data = new FormData(this.$avatarForm[0]),
                _this = this;

            $.ajax(url, {
                type: "post",
                data: data,
                processData: false,
                contentType: false,

                beforeSend: function () {

                    //$('body').removeClass('modal-open');
                    //$('.modal-backdrop').remove();
                    _this.submitStart();

                },

                success: function (data) {
                    _this.submitDone(data);
                },

                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    _this.submitFail(textStatus || errorThrown);
                },

                complete: function () {
                    _this.submitEnd();
                    //$('.modal-backdrop').remove();

                }
            });
        },

        syncUpload: function () {
            this.$avatarSave.click();
        },

        submitStart: function () {
            this.$loading.fadeIn();
        },

        submitDone: function (data) {
            console.log(data);

            try {
                data = $.parseJSON(data);
            } catch (e) {};

            if (data && data.state === 200) {
                if (data.result) {
                    this.url = data.result;
                    if (this.support.datauri || this.uploaded) {
                        this.uploaded = false;
                        $('#avatar-user-name').val(data.name);

                        this.cropDone();

                    } else {
                        this.uploaded = true;
                        this.$avatarSrc.val(this.url);
                        $('#avatar-user-name').val(data.name);
                        this.startCropper();
                    }
                    $.ajax({
                        type : "POST",
                        data : { name_image : data.name},
                        url : BASE_URL+"users/ajaxUploadImage",
                        success:function(data){

                        }
                    });
                    this.$avatarInput.val("");

                } else if (data.message) {
                    this.alert(data.message);
                }
            } else {
                this.alert("Failed to responseee");

            }
        },

        submitFail: function (msg) {
            this.alert(msg);
        },

        submitEnd: function () {
            this.$loading.fadeOut();
        },

        cropDone: function () {
            this.$avatarSrc.val("");
            this.$avatarData.val("");
            this.$avatar.attr("src", this.url);
            this.stopCropper();
            this.$avatarModal.modal("hide");

        },

        alert: function (msg) {
            var $alert = [
                '<div class="alert alert-danger avater-alert">',
                '<button type="button" class="close" data-dismiss="alert">&times;</button>',
                msg,
                '</div>'
            ].join("");

            this.$avatarUpload.after($alert);
        }
    };

    $(function () {
        var example = new CropAvatar($("#avatar-user-edit"));
    });
    //$('body').on('click','#crop-image',function(){

    //});
});






