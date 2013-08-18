var act = new Object();
act.sh = new Object();

act.preview_select = function (select) {
    var $preview = jQuery(select).parents('.generic-field-preview-select').find('.preview');
    jQuery(select).children('option').each(function (index, elem) {
        if (jQuery(elem).is(':selected')) {
            $preview.addClass(jQuery(elem).val());
        } else {
            $preview.removeClass(jQuery(elem).val());
        }

    });
};

act.sh.columns = function (selector_part) {
    var view = jQuery('.' + selector_part + '_view').val();
    jQuery('.' + selector_part + '-sidebar-columns').hide();
    jQuery('.' + selector_part + '-no-sidebar-columns').hide();
    if ('list_view' != view) {
        var sidebar = jQuery('.' + selector_part + '_layout').val();
        if ('full' == sidebar) {
            jQuery('.' + selector_part + '-no-sidebar-columns').show();
        } else {
            jQuery('.' + selector_part + '-sidebar-columns').show();
        }
    }
};

act.sh.multilevel = new Object();
act.sh.multilevel.check = function (args) {
    var show = true;
    for (var selector in args) {
        var classname = args[ selector ];
        if (show && !jQuery(selector).first().is(':checked')) {
            show = false;
        }
        if (show) {
            jQuery(classname).show();
        } else {
            jQuery(classname).hide();
        }
    }
};

act.sh.multilevel.mixed = function (args) {
    var show = true;
    for (var selector in args) {
        var classname = args[ selector ][ 'class' ];
        if (show) {
            if (jQuery(selector).is('input')) {
                if (show && !jQuery(selector).first().is(':checked')) {
                    show = false;
                }
            } else if (jQuery(selector).is('select')) {
                if (jQuery(selector).val() == args[ selector ][ 'value' ]) {
                    show = false;
                }
            }
        }

        if (show) {
            jQuery(classname).show();
        } else {
            jQuery(classname).hide();
        }
    }
};

jQuery(function(){
    jQuery('input.generic-record-search').each(function(){
        var self = this;
        jQuery( self ).autocomplete({ 
            serviceUrl: MyAjax.ajaxurl + '?action=search&params=' + jQuery( self ).parent().children('input.generic-params').val(), 
            minChars:2,
            delimiter: /(,|;)\s*/, 
            maxHeight:400, 
            width:300, 
            zIndex: 9999, 
            deferRequestBy: 0, 
            noCache: false, 
            onSelect: function( value , data){
                jQuery(function(){
                    jQuery( self ).parent().children('input.generic-value').val( data );
                });
            }
        });
    });
});
act.search = function (self, selector) {
    jQuery(function () {
        if (jQuery(self).val().length > 0) {
            if (selector != '-') {
                jQuery(selector).show();
            }
        } else {
            if (selector != '-') {
                jQuery(selector).hide();
            }
            jQuery(self).parent().children('input.generic-value').val('');
        }
    });
};


act.min_likes = function (nr, page) {
    jQuery(function () {
        if (page == 1) {
            jQuery('span.digit-btn.result').html('update ..');
        }
        jQuery.post(MyAjax.ajaxurl, {'action':'min_likes', 'page':page, 'new_limit':nr}, function (result) {
            if (result > 0) {
                var n = (( parseInt(result) - 1 ) * 150 );
                jQuery('span.digit-btn.result').html(n + ' posts updated .. ');
                act.min_likes(nr, result);
            } else {
                jQuery('span.digit-btn.result').html('');
                return 0;
            }
        });
    });
};
act.sim_likes = function (page) {
    jQuery(function () {
        if (page == 1) {
            jQuery('.generate_likes span.btn.result').html('update ..');
        }
        jQuery.post(MyAjax.ajaxurl, {'action':'sim_likes', 'page':page}, function (result) {
            if (result > 0) {
                var n = (( parseInt(result) - 1 ) * 150 );
                jQuery('.generate_likes span.btn.result').html(n + ' posts updated .. ');
                act.sim_likes(result);
            } else {
                jQuery('.generate_likes span.btn.result').html('');
                return 0;
            }
        });
    });
};

act.reset_likes = function (page) {
    jQuery(function () {
        if (page == 1) {
            jQuery('.reset_likes span.btn.result').html('update ..');
        }
        jQuery.post(MyAjax.ajaxurl, {'action':'reset_likes', 'page':page}, function (result) {
            if (result > 0) {
                var n = (( parseInt(result) - 1 ) * 150 );
                jQuery('.reset_likes span.btn.result').html(n + ' posts updated .. ');
                act.reset_likes(result);
            } else {
                jQuery('.reset_likes span.btn.result').html('');
                return 0;
            }
        });
    });
};

act.select = function (selector, args, type) {
    jQuery(document).ready(function () {
        jQuery('option', jQuery('select' + selector)).each(function (i) {
            if (type == 'hs') {
                if (jQuery(this).is(':selected')) {
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {

                            if (jQuery(this).val().trim() == key) {
                                jQuery(args[ key ]).hide();
                            } else {
                                jQuery(args[ key ]).show();
                            }
                        }
                    }
                }
            }

            if (type == 'sh') {
                if (jQuery(this).is(':selected')) {
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (jQuery(this).val().trim() == key) {
                                jQuery(args[ key ]).show();
                            } else {
                                jQuery(args[ key ]).hide();
                            }
                        }
                    }
                }
            }

            if (type == 'sh_') {
                var show = '';
                var show_ = '';
                if (jQuery(this).is(':selected')) {
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {

                            if (jQuery(this).val().trim() == key) {
                                show = args[ key ];
                            } else {
                                if (key == 'else') {
                                    show_ = args[ key ];
                                }
                                jQuery(args[ key ]).hide();
                            }
                        }
                    }

                    if (show == '') {
                        jQuery(show_).show();
                    } else {
                        jQuery(show).show();
                    }
                }
            }

            if (type == 'hs_') {
                var hide = '';
                if (jQuery(this).is(':selected')) {
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {

                            if (jQuery(this).val().trim() == key) {
                                hide = args[ key ];
                            } else {
                                jQuery(args[ key ]).show();
                            }
                        }
                    }

                    jQuery(hide).hide();
                }
            }

            if (type == 's') {
                if (jQuery(this).is(':selected')) {
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (jQuery(this).val().trim() == key) {
                                jQuery(args[ key ]).show();
                            }
                        }
                    }
                }
            }

            if (type == 'h') {
                if (jQuery(this).is(':selected')) {
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (jQuery(this).val().trim() == key) {
                                jQuery(args[ key ]).hide();
                            }
                        }
                    }
                }
            }

            if (type == 'ns') {
                if (jQuery(this).is(':selected')) {
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (jQuery(this).val().trim() == key) {
                            } else {
                                jQuery(args[ key ]).show();
                            }
                        }
                    }
                }
            }

            if (type == 'nh') {
                if (jQuery(this).is(':selected')) {
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (jQuery(this).val().trim() == key) {
                            } else {
                                jQuery(args[ key ]).hide();
                            }
                        }
                    }
                }
            }
        });
    });
};
act.mcheck = function (selectors) {
    var result = true;
    jQuery(document).ready(function () {
        for (var i = 0; i < selectors.length; i++) {
            if (jQuery(selectors[ i ]).is(':checked')) {
                if (jQuery(selectors[ i ]).val().trim() == 'yes') {
                    result = result && true;
                } else {
                    result = result && false;
                }
            } else {
                result = result && false;
            }
        }
    });

    if (result) {
        jQuery('.g_l_register').show();
    } else {
        jQuery('.g_l_register').hide();
    }
};
act.check = function (selector, args, type) {
    jQuery(document).ready(function () {
        if (type == 'hs') {
            if (jQuery(selector).is(':checked')) {

                for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                        if (jQuery(selector).val().trim() == key) {
                            jQuery(args[ key ]).hide();
                        } else {
                            jQuery(args[ key ]).show();
                        }
                    }
                }
            }
        }

        if (type == 'sh') {
            if (jQuery(selector).is(':checked')) {
                for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                        if (jQuery(selector).val().trim() == key) {
                            jQuery(args[ key ]).show();
                        } else {
                            jQuery(args[ key ]).hide();
                        }
                    }
                }
            }
        }


        if (type == 'sh_') {
            var show = '';
            var show_ = '';
            if (jQuery(selector).is(':checked')) {

                for (var key in args) {
                    if (args.hasOwnProperty(key)) {

                        if (jQuery(this).val().trim() == key) {
                            show = args[ key ];
                        } else {
                            if (key == 'else') {
                                show_ = args[ key ];
                            }
                            jQuery(args[ key ]).hide();
                        }
                    }
                }
                if (show == '') {
                    jQuery(show_).show();
                } else {
                    jQuery(show).show();
                }
            }
        }

        if (type == 'hs_') {
            var hide = '';
            if (jQuery(selector).is(':checked')) {
                for (var key in args) {
                    if (args.hasOwnProperty(key)) {

                        if (jQuery(this).val().trim() == key) {
                            hide = args[ key ];
                        } else {
                            jQuery(args[ key ]).show();
                        }
                    }
                }

                jQuery(hide).hide();
            }
        }

        if (type == 's') {
            if (jQuery(selector).is(':checked')) {
                for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                        if (jQuery(selector).val().trim() == key) {
                            jQuery(args[ key ]).show();
                        }
                    }
                }
            }
        }

        if (type == 'h') {
            if (jQuery(selector).is(':checked')) {
                for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                        if (jQuery(selector).val().trim() == key) {
                            jQuery(args[ key ]).hide();
                        }
                    }
                }
            }
        }

        if (type == 'ns') {
            if (jQuery(selector).is(':checked')) {
                for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                        if (jQuery(selector).val().trim() == key) {
                        } else {
                            jQuery(args[ key ]).show();
                        }
                    }
                }
            }
        }

        if (type == 'nh') {
            if (jQuery(selector).is(':checked')) {
                for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                        if (jQuery(selector).val().trim() == key) {
                        } else {
                            jQuery(args[ key ]).hide();
                        }
                    }
                }
            }
        }
    });
};

act.show = function (selector) {
    jQuery(document).ready(function () {
        jQuery(selector).show();
    });
};

act.hide = function (selector) {
    jQuery(document).ready(function () {
        jQuery(selector).hide();
    });
};

act.link = function (selector, args, type) {
    jQuery(document).ready(function () {
        var id = jQuery(selector).attr('id');
        if (type == 'hs') {
            for (var key in args) {
                if (args.hasOwnProperty(key)) {
                    if (id.trim() == key) {
                        jQuery(args[ key ]).hide();
                    } else {
                        jQuery(args[ key ]).show();
                    }
                }
            }
        }

        if (type == 'sh') {
            for (var key in args) {
                if (args.hasOwnProperty(key)) {
                    if (id.trim() == key) {
                        jQuery(args[ key ]).show();
                    } else {
                        jQuery(args[ key ]).hide();
                    }
                }
            }
        }

        if (type == 's') {
            for (var key in args) {
                if (args.hasOwnProperty(key)) {
                    if (id.trim() == key) {
                        jQuery(args[ key ]).show();
                    }
                }
            }
        }

        if (type == 'h') {
            for (var key in args) {
                if (args.hasOwnProperty(key)) {
                    if (id.trim() == key) {
                        jQuery(args[ key ]).hide();
                    }
                }
            }
        }

        if (type == 'ns') {
            for (var key in args) {
                if (args.hasOwnProperty(key)) {
                    if (id.val().trim() == key) {
                    } else {
                        jQuery(args[ key ]).show();
                    }
                }
            }
        }

        if (type == 'nh') {
            for (var key in args) {
                if (args.hasOwnProperty(key)) {
                    if (id.val().trim() == key) {
                    } else {
                        jQuery(args[ key ]).hide();
                    }
                }
            }
        }
    });
};

act.extern_upload_id = function (group, name, id, upload_url) {
    if (upload_url == "") {
        tb_show_url = 'media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true';
    } else {
        tb_show_url = upload_url;
    }

    /*deleteUserSetting('uploader');
     setUserSetting('uploader', '1');*/

    jQuery(document).ready(function () {
        (function () {
            var tb_show_temp = window.tb_show;
            window.tb_show = function () {
                tb_show_temp.apply(null, arguments);
                jQuery('#TB_iframeContent').load(function () {

                    if (jQuery(this).contents().find('p.upload-html-bypass').length) {
                        jQuery(this).contents().find('p.upload-html-bypass').remove();
                    }

                    jQuery(this).contents().find('div#html-upload-ui').show();
                    jQuery(this).contents().find('ul#sidemenu li#tab-type_url , ul#sidemenu li#tab-library').hide();
                    jQuery(this).contents().find('thead tr td p input.button').hide();
                    jQuery(this).contents().find('tr.image_alt').hide();
                    jQuery(this).contents().find('tr.post_content').hide();
                    jQuery(this).contents().find('tr.url').hide();
                    jQuery(this).contents().find('tr.align').hide();
                    jQuery(this).contents().find('tr.image-size').hide();
                    jQuery(this).contents().find('p.savebutton.ml-submit').hide();


                    $container = jQuery(this).contents().find('tr.submit td.savesend');
                    var sid = '';
                    $container.find('div.del-attachment').each(function () {
                        var $div = jQuery(this);
                        sid = $div.attr('id').toString();
                        if (typeof sid != "undefined") {
                            sid = sid.replace(/del_attachment_/gi, "");
                            jQuery(this).parent('td.savesend').html('<input type="submit" name="send[' + sid + ']" id="send[' + sid + ']" class="button" value="Use this Attachment">');
                        } else {
                            var $submit = $container.find('input[type="submit"]');
                            sid = $submit.attr('name');
                            if (typeof sid != "undefined") {
                                sid = sid.replace(/send\[/gi, "");
                                sid = sid.replace(/\]/gi, "");
                                $container.html('<input type="submit" name="send[' + sid + ']" id="send[' + sid + ']" class="button" value="Use this Attachment">');
                            }
                        }
                    });

                    $container.find('input[type="submit"]').click(function () {
                        $my_submit = jQuery(this);
                        sid = $my_submit.attr('name');
                        if (typeof sid != "undefined") {
                            sid = sid.replace(/send\[/gi, "");
                            sid = sid.replace(/\]/gi, "");
                        } else {
                            sid = 0;
                        }
                        var html = $my_submit.parent('td').parent('tr').parent('tbody').parent('table').html();
                        window.send_to_editor = function () {
                            var attach_url = jQuery('input[name="attachments[' + sid + '][url]"]', html).val();
                            jQuery('input#' + group + '_' + name + id).val(attach_url);
                            jQuery('input#' + group + '_' + name + '_id' + id).val(sid);

                            if (id.length > 0) {
                                jQuery('img#attach_' + group + '_' + name + id).attr("src", attach_url);
                            }

                            tb_remove();
                        }
                    });
                });

            }
        })();

        formfield = jQuery('input#' + group + '_' + name + id).attr('name');
        tb_show('', tb_show_url);
        return false;
    });
};

act.upload_id = function (group, name, id, upload_url) {
    if (typeof upload_url == 'undefined' || upload_url == "") {
        tb_show_url = 'media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;flash=0';
    } else {
        tb_show_url = upload_url;
    }

    deleteUserSetting('uploader');
    setUserSetting('uploader', '1');

    jQuery(document).ready(function () {
        (function () {
            var tb_show_temp = window.tb_show;
            window.tb_show = function () {
                tb_show_temp.apply(null, arguments);
                jQuery('#TB_iframeContent').load(function () {

                    if (jQuery(this).contents().find('p.upload-html-bypass').length) {
                        jQuery(this).contents().find('p.upload-html-bypass').remove();
                    }

                    jQuery(this).contents().find('div#html-upload-ui').show();

                    $container = jQuery(this).contents().find('tr.submit td.savesend');
                    var sid = '';
                    $container.find('div.del-attachment').each(function () {
                        var $div = jQuery(this);
                        sid = $div.attr('id').toString();
                        if (typeof sid != "undefined") {
                            sid = sid.replace(/del_attachment_/gi, "");
                            jQuery(this).parent('td.savesend').html('<input type="submit" name="send[' + sid + ']" id="send[' + sid + ']" class="button" value="Use this Attachment">');
                        } else {
                            var $submit = $container.find('input[type="submit"]');
                            sid = $submit.attr('name');
                            if (typeof sid != "undefined") {
                                sid = sid.replace(/send\[/gi, "");
                                sid = sid.replace(/\]/gi, "");
                                $container.html('<input type="submit" name="send[' + sid + ']" id="send[' + sid + ']" class="button" value="Use this Attachment">');
                            }
                        }
                    });

                    $container.find('input[type="submit"]').click(function () {
                        $my_submit = jQuery(this);
                        sid = $my_submit.attr('name');
                        if (typeof sid != "undefined") {
                            sid = sid.replace(/send\[/gi, "");
                            sid = sid.replace(/\]/gi, "");
                        } else {
                            sid = 0;
                        }
                        var html = $my_submit.parent('td').parent('tr').parent('tbody').parent('table').html();
                        window.send_to_editor = function () {
                            var attach_url = jQuery('input[name="attachments[' + sid + '][url]"]', html).val();
                            jQuery('input#' + group + '_' + name + id).val(attach_url);
                            jQuery('input#' + group + '_' + name + '_id' + id).val(sid);

                            if (id.length > 0) {
                                jQuery('img#attach_' + group + '_' + name + id).attr("src", attach_url);
                            }

                            tb_remove();
                        }
                    });
                });

            }
        })();

        formfield = jQuery('input#' + group + '_' + name + id).attr('name');
        tb_show('', tb_show_url);
        return false;
    });
};

act.upload = function (selector) {

    deleteUserSetting('uploader');
    setUserSetting('uploader', '1');

    jQuery(document).ready(function () {
        (function () {
            var tb_show_temp = window.tb_show;
            window.tb_show = function () {
                tb_show_temp.apply(null, arguments);
                jQuery('#TB_iframeContent').load(function () {
                    jQuery(this).contents().find('p.upload-html-bypass').remove();
                    jQuery(this).contents().find('div#html-upload-ui').show();
                    $container = jQuery(this).contents().find('tr.submit td.savesend');
                    var sid = '';
                    $container.find('div.del-attachment').each(function () {
                        var $div = jQuery(this);
                        sid = $div.attr('id').toString();
                        if (typeof sid != "undefined") {
                            sid = sid.replace(/del_attachment_/gi, "");
                            jQuery(this).parent('td.savesend').html('<input type="submit" name="send[' + sid + ']" id="send[' + sid + ']" class="button" value="Use this Attachment">');
                        } else {
                            var $submit = $container.find('input[type="submit"]');
                            sid = $submit.attr('name');
                            if (typeof sid != "undefined") {
                                sid = sid.replace(/send\[/gi, "");
                                sid = sid.replace(/\]/gi, "");
                                $container.html('<input type="submit" name="send[' + sid + ']" id="send[' + sid + ']" class="button" value="Use this Attachment">');
                            }
                        }
                    });

                    $container.find('input[type="submit"]').click(function () {
                        $my_submit = jQuery(this);
                        sid = $my_submit.attr('name');
                        if (typeof sid != "undefined") {
                            sid = sid.replace(/send\[/gi, "");
                            sid = sid.replace(/\]/gi, "");
                        } else {
                            sid = 0;
                        }
                        var html = $my_submit.parent('td').parent('tr').parent('tbody').parent('table').html();

                        window.send_to_editor = function () {
                            var attach_url = jQuery('input[name="attachments[' + sid + '][url]"]', html).val();

                            /*the following 4-5 rows will try to add the attachement ID to ahidden input that has the same ID+_id 
                            as the input for the URL, if such and input exists
                            
                            for example if the input for URL has ID 'row_bg_image_5816' then 
                            we are looking for a hidden input that has ID 'row_bg_image_5816_id', and if it exists we will store the ID in it*/  
                            var input_id = jQuery(selector).parent().find(selector+'_id');

                            if(input_id.length){
                                jQuery(input_id).val(sid);   
                            }
                            
                            jQuery(selector).val(attach_url);
                            tb_remove();
                        }
                    });
                });

            }
        })();

        formfield = jQuery(selector).attr('name');
        tb_show('', 'media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true');
        return false;

    });
};

act.post_relation = function (post_id, meta_label, field_id) {
    jQuery(document).ready(function () {
        jQuery.post(MyAjax.ajaxurl, {"action":'post_relation', "post_id":post_id, "meta_label":meta_label, "field_id":field_id}, function (result) {
            jQuery('span#' + field_id).html(result);
            jQuery('div.' + field_id).show();
        });
    });
};

act.preview = function (family, size, weight, text, selector) {
    jQuery(document).ready(function () {
        jQuery.post(MyAjax.ajaxurl, {"action":"text_preview", "family":family, "size":size, "weight":weight, "text":text}, function (result) {
            jQuery(selector).html(result);
        });
    });
};

act.is_array = function (obj) {
    return obj.constructor.toString().indexOf("Array") != -1;
};

act.send_mail = function (action, form, container) {
    jQuery('#contact_name').removeClass('invalid'); 
    jQuery('#contact_email').removeClass('invalid'); 
    jQuery('#contact_message').removeClass('invalid');

    jQuery('#name').removeClass('invalid'); 
    jQuery('#email').removeClass('invalid'); 
    jQuery('#comment_widget').removeClass('invalid');
    

    jQuery('.container_msg').html('');

    jQuery(document).ready(function () {

        var name = jQuery(form).find("input[name=\"name\"]").val();
        var email = jQuery(form).find("input[name=\"email\"]").val();
        var contact_email = jQuery(form).find("input[name=\"contact_email\"]").val();
        var phone = jQuery(form).find("input[name=\"phone\"]").val();
        var mssg = jQuery(form).find("textarea[name=\"message\"]").val();


        jQuery.post(MyAjax.ajaxurl,
            {
                "action":action,
                "name":name,
                "email":email,
                "contact_email":contact_email,
                "phone":phone,
                "message":mssg,
                "btn_send":"btn_send"
            },
            function (data) {
                json = eval("(" + data + ")");
            
                if(json['message']){
                    jQuery('.container_msg').html(json['message']);

                    jQuery('#name').val('');
                    jQuery('#email').val('');
                    jQuery('#comment').val('');
                    jQuery('#contact_name').val('');
                    jQuery('#contact_email').val('');
                    jQuery('#contact_phone').val('');
                    jQuery('#contact_message').val('');
                }else{ /*if there are some invalid fields */
                    if(json['contact_name'] && json['contact_name'] != ''){ jQuery('#contact_name').addClass('invalid'); jQuery('#name').addClass('invalid'); }
                    if(json['contact_email'] && json['contact_email'] != ''){ jQuery('#contact_email').addClass('invalid'); jQuery('#email').addClass('invalid'); }
                    if(json['contact_message'] && json['contact_message'] != ''){ jQuery('#contact_message').addClass('invalid'); jQuery('#comment_widget').addClass('invalid'); }
                }
            });
    });
};

act.radio_icon = function (group, topic, index) {

    jQuery(function () {
        jQuery('.generic-field-' + group + ' .generic-input-radio-icon input.' + group + '-' + topic + '-' + index).removeAttr("checked");
        jQuery('.generic-field-' + group + ' img.pattern-texture.' + group + '-' + topic).removeClass('selected');

        jQuery('.generic-field-' + group + ' .generic-input-radio-icon.' + index + ' input.' + group + '-' + topic + '-' + index).attr('checked', 'checked');
        jQuery('.generic-field-' + group + ' img.pattern-texture.' + group + '-' + topic + '-' + index).addClass('selected');
    });
};

act.accept_digits = function (objtextbox) {
    var exp = /[^\d]/g;
    objtextbox.value = objtextbox.value.replace(exp, '');
};

act.like = function (post_id, selector, action) {

    var lk = 0;
    jQuery(function () {
        jQuery('.top_love_' + post_id).show();


        act.like_ajax(post_id, action, selector);

    });
};

act.go_random = function () {
    jQuery(function () {
        jQuery.post(MyAjax.ajaxurl, {"action":"go_random"}, function (result) {
            document.location.href = result;
        });
    });
};

act.like_ajax = function (post_id, action, selector) {
    jQuery(function () {
        jQuery.post(
            MyAjax.ajaxurl, {"action":'like',
                "post_id":post_id,
                "meta_type":action
            },
            function (result) {

                jQuery('i.like-' + post_id).html(result);

                if (jQuery(selector).parents('span.voteaction').hasClass('voted')) {
                    jQuery(selector).parents('span.voteaction').removeClass('voted');
                } else {
                    jQuery(selector).parents('span.voteaction').addClass('voted');
                }

            })
    });
};

function flip(obj) {
    obj.prev().find("em").animate({
        top: '-=42'
    }, 200);
    obj.toggleClass("voted",true);
}
function init_color_pickers( selector ){
    /* color piker */
    jQuery('.generic-field input.settings-color-field').each(function() {
        jQuery('.settings-color-field').wpColorPicker();
    });
}

jQuery(document).ready(function() {

	/* digit input */
	jQuery('input[type="text"].digit').bind('keyup', function(){
		act.accept_digits( this );
	});
    
    /* color piker */
    jQuery('.generic-field input.settings-color-field').each(function() {
        jQuery('.settings-color-field').wpColorPicker();
    });

    /*code for front end submittion form*/
    jQuery('.front_post_input').focus(function() {
    	  jQuery(this).removeClass('invalid');
    	  
    	  var obj_id = jQuery(this).attr('id');
    	  jQuery('#'+obj_id+'_info').show();
    });
    
});

function use_url(){
	jQuery('#image_type').val('url_img'); /*URL image will be used*/	
	jQuery('#image_type_upload').hide();
	jQuery('#image_type_url').show();
}

function use_img_upload(){
	jQuery('#image_type').val('upload_img'); /*Uploaded image will be used*/
	jQuery('#image_type_url').hide();
	jQuery('#image_type_upload').show();
	
}



function closeCosmoMsg(msg_id){
	
	jQuery.ajax({
		url: MyAjax.ajaxurl,
		data: '&action=set_cosmo_news&msg_id='+msg_id,
		type: 'POST',
		cache: false,
		success: function (data) { 
			//json = eval("(" + data + ")");
    		jQuery('#cosmo_news').hide();
			
		},
		error: function (xhr) {
			
			
		}
	});
  
}


jQuery( function(){
    var menu_color = jQuery( '#pick_menu_color' ).val();
    var header_text_color = jQuery( '#pick_header_text_color' ).val();
    jQuery( '.generic-header_type' ).change( function(){
        var val = jQuery( this ).val();
        if( val == 'centered' ){
            jQuery( '.header-preview .header-slider' ).animate( { left: 0 } );
            jQuery( '#menu_type_centered, #menu_type_description, #menu_type_buttons,  #menu_type_text' ).parent().show();
            jQuery( '#menu_type_colored, #menu_type_vertical' ).parent().hide();
        }else if( val == 'searchbar' ){
            jQuery( '.header-preview .header-slider' ).animate( { left: -700 } );
            jQuery( '#menu_type_colored, #menu_type_centered, #menu_type_description, #menu_type_buttons,  #menu_type_text' ).parent().show();
            jQuery( '#menu_type_vertical' ).parent().hide();
        }else if( val == 'menu' ){
            jQuery( '#menu_type_description, #menu_type_text' ).parent().show();
            jQuery( '#menu_type_colored, #menu_type_vertical, #menu_type_centered, #menu_type_buttons' ).parent().hide();
            jQuery( '.header-preview .header-slider' ).animate( {left: -1400});
        }else if( val == 'social' ){
            jQuery( '.header-preview .header-slider' ).animate( { left: -2100 } );
            jQuery( '#menu_type_vertical' ).parent().show();
            jQuery( '#menu_type_centered, #menu_type_description, #menu_type_buttons, #menu_type_colored_full, #menu_type_centered, #menu_type_tabs, #menu_type_text, #menu_type_colored, #menu_type_dashed' ).parent().hide();
        }

        jQuery( '.generic-field-image-select label' ).removeClass( 'selected' );
        jQuery( '.generic-field-image-select label input:checked' ).parent().addClass( 'selected' );
        jQuery( '.header-preview nav.colored, .nav-container .container, .cosmo-icons.colored' ).css( 'background-color' , menu_color );
        jQuery( '.header-preview nav.colored, .nav-container .container, .cosmo-icons.colored' ).find( 'a' ).css( 'color' , header_text_color );

        if( !jQuery( '.menu-thumbs label.selected:visible').length ){
            jQuery( '.menu-thumbs label:visible input').first().click().trigger( 'change');
        }
    });

    jQuery( '.generic-menu_type' ).change( function(){
        var val = jQuery( this ).val();
        var old = jQuery( '.header-preview header nav' );
        var _new = false;
        if( val.indexOf( 'colored' ) > -1 || ( jQuery( 'input.generic-enb_top_bar:checked' ).val() == 'yes' ) ){
            jQuery( '#pick_menu_color' ).parent().parent().slideDown();
            jQuery( '#pick_header_text_color' ).parent().parent().slideDown();

        }else{
            jQuery( '#pick_menu_color' ).parent().parent().slideUp();
            jQuery( '#pick_header_text_color' ).parent().parent().slideUp();
        }

        if( val == 'colored' && !old.find( 'div.cosmo-icons' ).hasClass( 'colored' ) ){
            _new = jQuery( '.header-preview .menus-container div.cosmo-icons.colored' ).parent( 'nav' );
        }else if( val == 'buttons' && !old.hasClass( 'buttons-menu' ) ){
            _new = jQuery( '.header-preview .menus-container nav.buttons-menu' );
        }else if( val =='dashed' && !old.hasClass( 'dashed-menu' ) ){
            _new = jQuery( '.header-preview .menus-container nav.dashed-menu' );
        }else if( val =='tabs' && !old.hasClass( 'tabs-menu' ) ){
            _new = jQuery( '.header-preview .menus-container nav.tabs-menu' );
        }else if( val == 'centered' && !old.hasClass( 'centered-menu' ) ){
            _new = jQuery( '.header-preview .menus-container nav.centered-menu' );
        }else if( val == 'text' && !old.hasClass( 'text-menu' ) ){
            _new = jQuery( '.header-preview .menus-container nav.text-menu' );
        }else if( val == 'description' &&!old.hasClass( 'description-menu' ) ){
            _new = jQuery( '.header-preview .menus-container nav.description-menu' );
        }else if( val == 'colored_full' ){
            _new = jQuery( '.header-preview .menus-container div.nav-container' );
        }else if( val == 'vertical' ){
            _new = jQuery( '.header-preview .menus-container nav.list-menu' );
        }
        if( _new !== false ){
            if( jQuery( '.header-preview header div.nav-container' ).length ){
                jQuery( '.header-preview header nav' ).unwrap().unwrap();
                jQuery( '.header-preview header div.mobile-menu' ).remove();
            }
            old.fadeOut( 'fast' , function(){
                old.each( function(index, elem){
                    var clone = _new.clone();
                    jQuery( elem ).replaceWith( clone );
                    clone.css( 'opacity' , 0 ).animate({ opacity:1 }, 'fast' );
                });
            });
        }

        jQuery( '.generic-field-image-select label' ).removeClass( 'selected' );
        jQuery( '.generic-field-image-select input:checked' ).parent().addClass( 'selected' );
        jQuery( '.header-preview nav.colored, .nav-container .container, .cosmo-icons.colored' ).css( 'background-color' , menu_color );
        jQuery( '.header-preview nav.colored, .nav-container .container, .cosmo-icons.colored' ).find( 'a' ).css( 'color' , header_text_color );
    });

    jQuery( 'input.generic-enb_top_bar' ).change( function(){
        var val = jQuery( '.generic-menu_type:checked').val();
        if( val.indexOf( 'colored' ) > -1 || ( jQuery( 'input.generic-enb_top_bar:checked' ).val() == 'yes' ) ){
            jQuery( '#pick_menu_color' ).parent().parent().slideDown();
            jQuery( '#pick_header_text_color' ).parent().parent().slideDown();

        }else{
            jQuery( '#pick_menu_color' ).parent().parent().slideUp();
            jQuery( '#pick_header_text_color' ).parent().parent().slideUp();
        }
    });

    jQuery( '#link_pick_menu_color' ).click( function(){
        jQuery( '#colorPickerDiv_menu_color div.farbtastic' ).unbind( 'mouseout mousemove' ).on( 'mouseout mousemove', function(){
            menu_color = jQuery( '#link_pick_menu_color' ).css( 'background-color' );
            jQuery( '.header-preview nav.colored, .nav-container .container, .cosmo-icons.colored' ).css( 'background-color' , menu_color );
        });
    });

    jQuery( '#link_pick_header_text_color' ).click( function(){
        jQuery( '#colorPickerDiv_header_text_color div.farbtastic' ).unbind( 'mouseout mousemove' ).on( 'mouseout mousemove', function(){
            header_text_color = jQuery( '#link_pick_header_text_color' ).css( 'background-color' );
            jQuery( '.header-preview nav.colored, .nav-container .container, .cosmo-icons.colored' ).find( 'a' ).css( 'color' , header_text_color );
        });
    });
    jQuery( '.generic-field-image-select input:checked' ).trigger( 'change' );
});

function load_more(obj, view, type, id, row_id, template_id){

   
    var current_page = jQuery(obj).data('current_page');
    var container_id = jQuery(obj).data('container_id');
    var postID = jQuery( '#postID').val();

    jQuery('.ajax-'+container_id).show();
    jQuery(obj).hide();

    
    
    jQuery.ajax({
        url: MyAjax.ajaxurl,
        data: '&action=load_more&current_page='+current_page+'&getMoreNonce='+MyAjax.getMoreNonce+'&view='+view+'&type='+type+'&id='+id+'&row_id='+row_id+'&template_id='+template_id+'&postID=' + postID + '&' + jQuery.param( MyAjax.wpargs ),
        type: 'POST',
        cache: false,
        success: function (data) { 
            json = eval("(" + data + ")");
            if(json['content'] && json['content'] != ''){
                jQuery(obj).data('current_page',json['current_page']);

                if( jQuery('#'+container_id).hasClass('masonry') ){
                    var the_content_obj = jQuery(json['content']);
                        
                    if( jQuery(window).width() > 767 ){
                        setTimeout(function(){ jQuery('#'+container_id).isotope( 'insert', the_content_obj ) },600);
                    }else{
                        jQuery('#'+container_id).append( the_content_obj );
                    }
                }else{
                    jQuery('#'+container_id).append(json['content']).find( '.hidden').waitForImages( {
                        finished: function(){
                             

                            jQuery('#'+container_id).find( '.hidden').each( function( index, element ){
                                jQuery( element).delay( 200 * ( index ) ).fadeIn( 'slow', function(){
                                    jQuery( this).removeClass( 'hidden' );
                                });
                            });
                            
                        },
                        waitForAll: true
                    });    
                }
                

                if (prettyPhoto_enb.enb_lightbox) { 
                    jQuery(document).ready(function(){
                        // reinit the ilight box after load more
                        jQuery("a[id^='ilightbox-ajax']").each(function(){
                            jQuery(this).iLightBox({
                                attr: 'data-href',
                                overlay: {
                                    opacity: .6
                                },
                                skin: 'mac',
                                minScale: 1
                            });
                        });
                    });
                };

            }

            if( !json[ 'need_load_more' ] ){
                //hide load more
                if( jQuery( obj ).parent().next().length ){
                    var $delimiter = jQuery( '<div></div>' ).addClass( 'delimiter' );
                    jQuery(obj).replaceWith( $delimiter );
                }else{
                    jQuery(obj).remove();
                }
            }
            
            jQuery('.ajax-'+container_id).hide();
            jQuery(obj).show();
            jQuery(window).trigger('resize');
        },
        error: function (xhr) {
            alert(xhr);
            
        }
    });

}