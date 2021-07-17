/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

// Define function that will run on page load
function init() {

    let path = "samples.json";
    data = d3.json(path);
    console.log(data);

    let dropdown = d3.select("#selDataset");

    // Read json data
    d3.json("samples.json").then((data) =>{
        let name = data.names;

        name.forEach((person) =>{
            dropdown.append("option").text(person).property("value", person);
        })
        let sample = name[0];
       // let sample = name[20];

        buildMetadata(sample);
        buildCharts(sample);

    })
        // Parse and filter data to get sample names

        // Add dropdown option for each sample

    // Call functions below using the first sample to build metadata and initial plots

}

// Define a function that will create metadata for given sample
function buildMetadata(sample) {
    
    let path = "samples.json"
    // Read the json data
    d3.json(path).then(data => {
        let meta = data.metadata;
        //console.log(meta);
        
        let idInfo = meta.filter(obj => obj.id == sample);
        //console.log(idInfo);
       // console.log(idInfo[0]);
       let result = idInfo[0];
    //   let result = idInfo[20];


       let panel = d3.select("#sample-metadata");

       Object.entries(result).forEach(([key,detail]) => {
           panel.append("p").text(`${key}: ${detail}`);
       })
    })

        // Parse and filter the data to get the sample's metadata
    

        // Specify the location of the metadata and update it
};

// Define a function that will create charts for given sample
function buildCharts(sample) {
    let path = "samples.json"
    d3.json(path).then(data =>{
        let samp = data.samples;
        let idInfo = samp.filter(obj => obj.id == sample);
        let result = idInfo[0];

        let samp_vals = result.sample_values;
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;

        //convert to strings
        let ydata = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xdata = samp_vals.slice(0,10).reverse();

        let bar = [{
            x:xdata,
            y:ydata,
            type: "bar",
            orientation: "h",
        }
        ]
        Plotly.newPlot("bar", bar);

        let bubbles = [
        {
            x:otu_ids,
            y:samp_vals,
            mode: "markers",
            marker: {
                size:samp_vals,
                color: samp_vals,
                colorscale:"Electric"
            }

        }
        ]
        Plotly.newPlot("bubble", bubbles);

    })
    // Read the json data

        // Parse and filter the data to get the sample's OTU data
        // Pay attention to what data is required for each chart

        // Create bar chart in correct location

        // Create bubble chart in correct location
    
}


function optionChanged(sample){
    // The parameter being passed in this function is new sample id from dropdown menu
    buildMetadata(sample);
    buildCharts(sample);
    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();