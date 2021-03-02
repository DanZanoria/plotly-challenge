function init() { };

// Create constant variable to refer the json. I dont want to type sample.json repeatedly
const sdata = "samples.json"


// capture the names of te metadata to get the dropdown menu
function buildPlot() {
    // Use d3 to connect to the json. There will be many variation or copy and pating this specific line of code
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

// Create a function that will capture the data found in the metadata 
function Meta(metaId) {
    // Use d3 to connect to the json
    d3.json(sdata).then((data) => {
        MetaHuman = data.metadata
        var fdata = MetaHuman.filter(object => object.id == metaId)[0];
        // Connect to the sample-metadata id on the html through a variable
        var metapanel = d3.select("#sample-metadata")

        // Append each key value pair the object.entries code
        Object.entries(fdata).forEach(([key, value]) => {
            metapanel.append("metapanel").text(`${key}: ${value}`)
        });
    });
};


// Create a horizantabl bar chart
function HBarChart(metaId){
    d3.json(sdata).then((data) => {
    // Grab values from the json to build the plots. Using the "samples" key
    var datasamples = data.samples;
    // I like having the letter z in my for statements as an excuse to use the first letter in my last name. 
    // Get the id in the samples key
    var sid = datasamples.map(z=>z.id).indexOf(metaId)
    // Get the values of the sample and their otu_id
    var Samplevalues = datasamples.map(z =>z.sample_values)
    var OtuId =  datasamples.map(z=>z.otu_ids)
    // Slice them All values to get the top  10
    var top10values = Samplevalues[sid].slice(0,10)
    var top10Id = OtuId[sid].slice(0,10)
    // The readme wants otulabels.  So im ignoring that. While I understand why it wants it. But i cant seem to figure it out.
    // The code im using is this
    // var Otulabels = datasamples.map(z => z.otu_labels)


// Create the trace to make the bar chart

var Htrace = {
    // Putting the top10 values in the x axis. And reversing
    x: top10values.reverse(),
    // Puttting the top 10 id
    y: top10Id.map(z => `UTO ${z}` ),
    // text: Otulabels,
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
    // Everyth variable is a copy a paste from the Horizantal Bar chart
    var datasamples = data.samples
    var sid = datasamples.map(z=>z.id).indexOf(metaId)
    var OtuId =  datasamples.map(z=>z.otu_ids)[sid];
    var Samplevalues = datasamples.map(z =>z.sample_values)[sid]
    var Otulabels = datasamples.map(z => z.otu_labels)

    // Create the Bubble Chart
    var Htrace = {
        // Get the X and Y axis
        x: OtuId,
        y: Samplevalues,
        // text: Otulabels,
        // Create the Bubble chart through mode
        mode: `markers`,

        // Make the size of the bubbles relative to their values. Without it it just by tiny dots
        // I wanted pink this time
        // I would love to know how to change the colors into a rainbow. 
        // The readme says to make the color the same otu_ids which in my case is OtuId but all i see is blue. And i want a new color.
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
    Meta(changeId)
};

// Builds the plot. Initializes the first function
buildPlot();
d3.selectAll("#selDataset").on("change", buildPlot);

// Note. I dont understand the reason why this data exist. As of this writing Im half tempted to change the photo to the cover photo American Beuty Movie