function bellydata(sample){
    
    d3.json("samples.json").then(function(data){
       
        var samples = data.samples;
       
    });
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
        
    });
    
}
bellydata();


function charts(sampleNum){
   
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
function optionChanged(sampleNum){
    charts(sampleNum);
}
// function metadata(sampleNum) {
//     d3.json("samples.json").then((function(data){
//         var metadata = data.metadata;
//         var metadatafiltered = metadata.filter(sampleObj => sampleObj.id == sampleNum);
//         var D_info = metadatafiltered[0];
//         var chart = d3.selct("sample-metadata");
//         chart.html("");
//         Object.entries(D_info).forEach(([key, value]) =>{

//             chart.appemd("h3").text(`${key}: ${value}`);
//         });
//     })
//     );
// }


// function bellydata(sample){

//     function charts(selectedSample){
//         d3.json("sample.json").then(function(data){
           
//             var samples = data.samples;
           
//         });
//     }
    
//     // Call updatePlotly() when a change takes place to the DOM 
//     var dropDownMenu = d3.selectAll("selDataset")
//                      .on("change",updatePlotly);

//     // This function is called when a dropdown menu item is selected
//     function updatePlotly(){
    
//         var sampleIds = data.names;
//         // Use d3 to select the dropdown menu 
//         var dropDownMenu = d3.select("selDatset");
//     }
// }

