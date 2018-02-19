var DataUtils = function() {
    this.setDataHandler = function(dataHandler){
        this.dataHandler = dataHandler;
    }
    
    this.fetch = function(request) {
        this.checkHandler();
        return this.dataHandler.sendRequest_(request);
    }
    
    this.checkHandler = function() {
        if(this.dataHandler==null) {
            throw "Please call setDataHandler(dataHandler) before use it.";
        }
    }
    
}

var DataHandler = function() {
    this.sendRequest_ = function(request) {
        if(this.sendRequest==null || typeof this.sendRequest !== "function") {
            throw "sendRequest(request) not implemented!!";
        }
        return this.sendRequest(request);
    }
        
}
const dataHandler = new DataHandler();


var DummyDataHandler = function() {
    this.sendRequest = function(request) {
        var response = dummyResponse(request);
        console.log("request data for ["+request.name+"]: ", response);
        
        
        var deferred = $.Deferred();
        deferred.resolve(response);
        return deferred.promise();
    }
    
}
const dummyDataHandler = new DummyDataHandler();
$.extend(dummyDataHandler, dataHandler);

const dataUtils = new DataUtils();
dataUtils.setDataHandler(dummyDataHandler);


function dummyResponse(request) {
    if(request.name=="summary") {
        return {
            stakeTotal: 3257500.87,
            supplyTotal: 25927070538,
            reliabilityRecent_block: 12,
            reliabilityRecent_slot: 12,
            reliabilityTotal_block: 97,
            reliabilityTotal_slot: 111,
            stakeHolders: 125,
            issuance: 325.223,
            blocks: 4255
        }
    }
    if(request.name=="summaryChart") {
        var data = [];
        for(var i=0; i<50; i++) {
            var value = 100+ parseInt(Math.random()*100);
            data.push({
                time: moment().add(-i*5, 'm').valueOf(),
                block: value,
                slot: Math.random()*2>1? value+2 : value
            })
        }
        return data;
    }
}
