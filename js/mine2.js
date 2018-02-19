
var initIcon = new Vue({
    el: "img.social-link",
    created: function(){
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

    }
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

var summaryChart = new Vue({
    el: "#summaryChart",
    created: function(){
        var request = {"name": "summaryChart"};
        var config = createConfig();
        dataUtils.fetch(request).then(function(result){
            result.forEach(function(item){
                config.data.labels.push(moment(item.time).format());
                config.data.datasets[0].data.push( parseInt(item.block/item.slot*10000)/100 );
                config.data.datasets[1].data.push(item.block);
            });
            setTimeout(function(){
                var ctx = document.getElementById("summaryChart").getContext("2d");
                new Chart(ctx, config);
            })
                
        });
        
        
        
        function randomScalingFactor () {
            return Math.round(Math.random()*100);
        };
		function newDate(days) {
			return moment().add(days, 'd').toDate();
		}

		function newDateString(days) {
			return moment().add(days, 'd').format();
		}

        
        function createConfig() {
            var chartColors = ['#37a062', '#337ab7'];
            var config = {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        type: 'line',
                        label: "Reliability",
                        backgroundColor: Chart.helpers.color(chartColors[0]).alpha(0.5).rgbString(),
                        borderColor: chartColors[0],
                        borderWidth: 1,
                        fill: false,
                        pointRadius: 1.2,
                        yAxisID: 'A',
                        data: [],
                    }, {
                        type: 'bar',
                        label: "Blocks Produced",
                        backgroundColor: Chart.helpers.color(chartColors[1]).alpha(0.5).rgbString(),
                        borderColor: chartColors[1],
                        //fill: false,
                        yAxisID: 'B',
                        data: []
                    }]
                },
                options: {
                    responsive: true,
                    title:{
                        display: false,
                        text:"Chart.js Time Point Data"
                    },
                    scales: {
                        xAxes: [{
                            type: "time",
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: 'Date'
                            },
                            ticks: {
                                major: {
                                    fontStyle: "bold",
                                    fontColor: "#FF0000"
                                }
                            }
                        }],
                        yAxes: [{
                            id: 'A',
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: 'Reliability (%)'
                            },
                            ticks: {
                              min: 0,
                              fontColor: chartColors[0]
                            }
                        },{
                            id: 'B',
                            position: 'right',
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: 'Blocks Produced'
                            },
                            ticks: {
                              min: 0,
                              fontColor: chartColors[1]
                            }
                        }]
                    },
                    tooltips: {
						position: 'nearest',
						mode: 'index',
						intersect: false,
					}

                }
            };
            return config;
        }
		
    }
});
