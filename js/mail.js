jQuery(document).ready(function() {
	 jQuery("form").submit(function() {
        var form = jQuery(this);
        var error = false;
        form.find('input, textarea').each( function(){
            var val = jQuery(this).val();
            if (val == '' && jQuery(this).hasClass('required')) {
                jQuery(this).addClass('red-border');
                error = true;
            }
        });
        if(!error) {
            var form_data = jQuery(this).serialize();
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: form_data,
                success: function(msg) {
                    if(msg == "ok"){
                        jQuery('.p-mes').fadeIn().delay('1500').fadeOut();
                    }
                }
            });
        }
        return false;
    });
});