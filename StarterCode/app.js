function init() { };

// Create constant variable to refer the json
const sdata = "samples.json"


// capture the names of te metadata to get the dropdown menu
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


// Create a horizantabl bar chart

function optionChanged(changeId){
    HBarChart(changeId)

};

buildPlot();
d3.selectAll("#selDataset").on("change", buildPlot);

function HBarChart(metaId){
    d3.json(sdata).then((data) => {
    // Grab values from the json to build the plots. Using the "samples" key
    var datasamples = data.samples;
    var sid = datasamples.map(row=>row.id).indexOf(metaId)
    // Get the values of the sample and their otu_id
    var Samplevalues = datasamples.map(row =>row.sample_values)
    var OtuId =  datasamples.map(row=>row.otu_ids)
    // Slice them All values to get the top  10
    var top10values = Samplevalues[sid].slice(0,10)
    var top10Id = OtuId[sid].slice(0,10)


// Create the trace to make the bar chart

var Htrace = {
    // Putting the top10 values in the x axis. And reversing
    x: top10values.reverse(),
    // Puttting the top 10 id
    y: top10Id.map(z => `UTO ${z}` ),
    // I wanted a red bar chart instead of the default blue
    marker: {color: "red"},
    type: "bar",
    orientation: "h"

}

// Create a layout for the bar chart

var hlayout = {
    title: "Top 10 UTO ID",
    xaxis: { title: 'OTU Values'},
    yaxis: { title: 'OTU IDs'},
  


}

// Plot the chart
Plotly.newPlot("bar", [Htrace], hlayout)


});
};