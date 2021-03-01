// Call updatePlotly() when a change takes place to the DOM

function init(bacteria) {
  
      // Build the plot with the new stock
 
    };

const sdata = "samples.json"

function buildPlot() {
    d3.json("samples.json").then(function(sampledata){
        var mDataset = d3.select("#selDataset");
        var sample_names = sampledata.names;
    
        sample_names.forEach((sample) => {
                mDataset
                    .append("option")
                    .text(sample)
                    .property("value", sample)
        });
})};

buildPlot();
// d3.selectAll("#selDataset").on("change", buildPlot);