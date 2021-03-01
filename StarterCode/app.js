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

};

// Create a layout for the bar chart

var hlayout = {
    title: "Top 10 UTO ID",
    xaxis: { title: 'OTU Values'},
    yaxis: { title: 'OTU IDs'},

};

// Plot the chart
Plotly.newPlot("bar", [Htrace], hlayout)

});
};

// This is mostly a copy and paste from the horizantable bar chart with a few minor changes
// Create a Bubble Chart

function BubblesC (metaId) {
    d3.json(sdata).then((data) => {
    var datasamples = data.samples
    var sid = datasamples.map(row=>row.id).indexOf(metaId)
    var OtuId =  datasamples.map(row=>row.otu_ids)[sid];
    var Samplevalues = datasamples.map(row =>row.sample_values)[sid]

    // Create the Bubble Chart
    var Htrace = {
        // Get the X and Y axis
        x: OtuId,
        y: Samplevalues,
        // Create the Bubble chart through mode
        mode: `markers`,

        // Make the size of the bubbles relative to their values. Without it it just by tiny dots
        // I wanted pink this time
        // I would love to know how to change the colors into a rainbow 
        marker: {
            size: Samplevalues,
            color:  "pink"
        }
    
    };
    var hlayout = {
        title: "UTO ID",
    };
    
    // Plot the chart
    Plotly.newPlot("bubble", [Htrace], hlayout)
    });
};

// function that will trigger the javascript whenever an ID is Selected
// This is needed for the entire thing to work
function optionChanged(changeId){
    HBarChart(changeId)
    BubblesC(changeId)
};

// Builds the plot. Initializes the first function
buildPlot();
d3.selectAll("#selDataset").on("change", buildPlot);

// Note. I dont understand the reason why this data exist. As of this writing Im half tempted to change the photo to the cover photo American Beuty Movie