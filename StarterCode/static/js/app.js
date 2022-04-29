function bellydata(sampleNum) {
    // use d3 to get sample data and set it to a variable
    d3.json("samples.json").then((data)=>{
       
        // storing the metadata in a variable
        var metadata = data.metadata;
        // filter the meta data and store results
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sampleNum);
        // get the 1st index of resultArray
        var result = resultArray[0];
        // use d3 to select meta data id and save to a variable
        var PANEL = d3.select("#sample-metadata");

        PANEL.html("");

        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h3").text(`${key}: ${value}`);
        });
    });

    
}


// create a function to build graphs
function charts(sampleNum){
    // use d3 to get data and set to variables
    d3.json("samples.json").then(function(data){
       
        var samples = data.samples;
        var filteredsamples = samples.filter(sampleObj=> sampleObj.id == sampleNum);
        var results = filteredsamples[0];
        //  console.log(results)

        var otu_ids = results.otu_ids;
        var otu_labels = results.otu_labels;
        var sample_values = results.sample_values;
        var y_ticks = otu_ids.slice(0,10).map(otu_id=>`OTU ${otu_id}`).reverse();
         
        let trace1 = {
            x: sample_values.slice(0,10).reverse(),
            y: y_ticks,
            text: otu_labels.slice(0,10).reverse(),
            
            type: "bar",
            orientation: "h"
        };

        let layout = {
            title: "Top 10 bacteria",
            margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 100
            }
        };

        Plotly.newPlot("bar", [trace1], layout);

        var trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        var layout2 = {
                
            title: "Bacteria Of Each Sample",
            xaxis:{ title: "OTU ID"}
            
        };

        Plotly.newPlot("bubble", [trace2], layout2);

        
    });


}
function init(){
        
    // selecting the dropdown box
        var dropDownMenu = d3.select("#selDataset");
        // Use sample names to fill in the drop down box
        d3.json("samples.json").then(function(data) {
            
            var sampleIds = data.names;
    
            sampleIds.forEach((sample)=>{
               dropDownMenu
                .append("option")
                .text(sample)
                .property("value", sample)
            });
            
            // Use the selected sample to create plots
            var firstSample = sampleIds[0];            
            charts(firstSample);
            bellydata(firstSample);
            bellydata(firstSample);
        });
}
function optionChanged(sampleNum){
    charts(sampleNum);
    bellydata(sampleNum);
   

}
init();




