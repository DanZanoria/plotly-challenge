// build the function 


function GetId (id) {
d3.json(sampe.json).then((sampleD) => {
    console.log(sampleD)

    // Get the Washing frequency
    var frequency = data.metadata.map( md => md.wfreq)
    // Console log to see if it work
    console.log(`Washing: ${frequency}`)
}
)
    
//     data.names.forEach((name => {
//     var option = idSelect.append("option");
//     option.text(name);

// }
}
