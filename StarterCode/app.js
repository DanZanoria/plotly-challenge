function init(bacteria) { };

// Create constant variable to refer the json
const sdata = "samples.json"


// capture the names of te metadata
function buildPlot() {
    d3.json(sdata).then(function(sampledata){
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