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
// This is a late edit, but I am going to stick to metid as my method. Too lazy to change it. That name will only be relevant for this portion of the code.
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
            // I could probably
        });
    });
};


// Create a horizantabl bar chart
function HBarChart(metaId){
    d3.json(sdata).then((data) => {
    // Grab values from the json to build the plots. Using the "samples" key
    var datasamples = data.samples;
    // I like having the letter z in my for statements as an excuse to use the first letter in my last name. 
    // Capture the id. 
    var sid = datasamples.map(z=>z.id).indexOf(metaId);
    // Get the values of the sample and their otu_id
    var Samplevalues = datasamples.map(z =>z.sample_values);
    var OtuId =  datasamples.map(z=>z.otu_ids);
    // Slice the above values to get the top  10
    var top10values = Samplevalues[sid].slice(0,10);
    var top10Id = OtuId[sid].slice(0,10).map(z => `UTO ${z}` );


// Create the trace to make the bar chart

var Htrace = {
    // Putting the top10 values in the x axis. And reversing
    x: top10values.reverse(),
    // Puttting the top 10 id
    y: top10Id,
    // I wanted a red bar chart instead of the default blue
    marker: {color: "red"},
    type: "bar",
    // Without orientation it will only be a regular bar chart
    orientation: "h"

};

// Create a layout for the bar chart

var hlayout = {
    title: "Top 10 UTO ID",
    xaxis: { title: 'OTU Values'},
    yaxis: { title: 'OTU IDs'},

};

// Plot the chart
Plotly.newPlot("bar", [Htrace], hlayout);

});
};

// This is mostly a copy and paste from the horizantable bar chart with a few minor changes
// Create a Bubble Chart
// I wanted to put everything in one function. But I got lost and confuse with all these { () }

function BubblesC (metaId) {
    d3.json(sdata).then((data) => {
    var datasamples = data.samples
    var sid = datasamples.map(z=>z.id).indexOf(metaId)
    var OtuId =  datasamples.map(z=>z.otu_ids)[sid];
    var Samplevalues = datasamples.map(z =>z.sample_values)[sid]


    // Create the Bubble Chart
    var Htrace = {
        // Get the X and Y axis
        x: OtuId,
        y: Samplevalues,
        // Create the Bubble chart through mode
        mode: `markers`,

        // Make the size of the bubbles relative to their values. Without it it's just by tiny dots
        // Colors will be based the values found their id
        marker: {
            size: Samplevalues,
            color:  OtuId
        }
    
    };
    var hlayout = {
        title: "UTO ID",
    };
    
    // Plot the chart
    Plotly.newPlot("bubble", [Htrace], hlayout)
    });
};

// // Starting the guage chart
// function GaugeChart (metaId) {
//     d3.json(sdata).then((data) => {

//     // I only need the the washing frequency
//     var MetaHuman = data.metadata
//     var WFreqency = MetaHuman.map(z =>z.wfreq)

// // Creat the guage
//     var gaugedata = [
//         {
//         domain: { x: [0, 10], y: [0, 10] },
//         value: WFreqency,
//         title: { text: "Washing Frequency", font: {size: 36} },
//         delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
//         gauge: {
//             bar: { color: "blue"},
//             bgcolor: "gray",
//             borderwidth: 3,
//             bordercolor: "black",
//             steps: [
//                 { range: [0, 3],  color:"yellow"},
//                 { range: [3, 7],  color:"pink"},
//                 { range: [7, 10],  color:"orange"}
//             ],
//             threshold: {
//                 line: { color: "purple", width: 4},
//                 thickness: 0.75
//             }
//         },
//         type: "indicator",
//         mode: "gauge+number"
//         } ];
    
//     // Createe the layout
//     var glayout = {
//         width: 500,
//         height: 400,
//         font: { color: "darkblue", family: "Arialbold"}
//     }
//     Plotly.newPlot('gauge', gaugedata, glayout)

//     });
// };


// function that will trigger the javascript whenever an ID is Selected
// This is needed for the entire thing to work
function optionChanged(henshin){
    HBarChart(henshin)
    BubblesC(henshin)
    Meta(henshin)
    // henshin is the japanese word for transform. And thats what this function is doing. Without this  it wont transform the charts corressponding to their ID.
    // GaugeChart(changeId)
};

// Builds the plot. Initializes the first function
buildPlot();
d3.selectAll("#selDataset").on("change", buildPlot);

// Note. I dont understand the reason why this data exist. As of this writing Im half tempted to change the photo to the cover photo American Beuty Movie