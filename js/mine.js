
 /*
     * Replace all SVG images with inline SVG
     */
        jQuery('img.svg').each(function(){
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);
				
				
				$("#logo").show();
            }, 'xml');

        });
		
		
		var n=0;
		function resend() {
			if(++n%3==0) {
				$(".thxmsg").slideToggle(true);
				
				setTimeout(function(){
					$(".thxmsg").slideToggle(false);
				}, 2500);
				return;
			}
			setTimeout(function(){
				$("#emailForm").submit();
			}, 1000);
		}
		function subbmit() {
			resend();
			return true;
		}