
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

var messageBlock = new Vue({
  el: '#messageBlock', 
  data: {
      message: ""
  },
  methods: {
      info: function(msg){
          messageBlock.message = msg;
          $("#messageBlock").show()
          setTimeout(function(){
              $("#messageBlock").slideUp()
          }, 2500);
      }
  }
});

var copyToClipboard = new Vue({
  el: '#delegateAddressForm', 
  methods: {
      copyToClipboard: function(event){
          var delegateAddress = document.getElementById("delegateAddress");
          delegateAddress.select();
          document.execCommand("Copy");
          messageBlock.info("Address copied.")
      }
  }
});




var summry = new Vue({
    el: "#summry",
    data: {
        stakeTotal: null,
        supplyTotal: null,
        reliabilityRecent_block: null,
        reliabilityRecent_slot: null,
        reliabilityTotal_block: null,
        reliabilityTotal_slot: null,
        stakeHolders: null,
        issuance: null,
        blocks: null
        
    }, 
    created: function(){
        var request = {"name": "summary"};
        dataUtils.fetch(request).then(function(result){
            for(var key in result) {
                summry[key] = result[key];
            }
        });
    }
});
