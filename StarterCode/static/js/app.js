function bellydata(){
    // selecting the dropdown box
    var dropDownMenu = d3.select("#selDataset");
    
    d3.json("samples.json").then(function(data) {
        
        var sampleIds = data.names;

        sampleIds.forEach((sample)=>{
           
            dropDownMenu
            .append("option")
            .text(sample)
            .property("value", sample)
        });
    });
};
bellydata();