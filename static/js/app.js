// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    var metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    var result = metadata.filter(sampleObj => sampleObj.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    var resultData = result[0];

    // Use `.html("") to clear any existing metadata
    var panel = d3.select("#sample-metadata");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    panel.html("");

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    var samples = data.samples;

    // Filter the samples for the object with the desired sample number
    var result = samples.filter(sampleObj => sampleObj.id == sample);

    // Get the otu_ids, otu_labels, and sample_values
    var resultData = result[0];

    // Build a Bubble Chart
    var otu_ids = resultData.otu_ids;
    var otu_labels = resultData.otu_labels;
    var sample_values = resultData.sample_values;

    // Render the Bubble Chart
    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Value" },
      hovermode: "closest",
    };

    var bubbleTrace = {
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
    var bubbleData = [bubbleTrace];

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    var barData = {
      x: sample_values.slice(0, 10).reverse(),  
      y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),  
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };

    var barLayout = {
      title: "Top 10 Bacteria Found",
      xaxis: { title: "Sample Value" },
      yaxis: { title: "OTU ID" }
    };

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    var barData = [barData];

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    var sampleNames = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    var dropdown = d3.select("#selDataset");


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    sampleNames.forEach((sample) => {
      dropdown.append("option").text(sample).property("value", sample);
    });

    // Get the first sample from the list
    var firstSample = sampleNames[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);

  });
}

function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the metadata field
    var metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    var result = metadata.filter(sampleObj => sampleObj.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    var resultData = result[0];

    // Use `.html("") to clear any existing metadata
    var panel = d3.select("#sample-metadata");
    panel.html(""); // Clear existing metadata

    // Loop through the key-value pairs in the metadata and append them to the panel
    Object.entries(resultData).forEach(([key, value]) => {
      panel.append("p").text(`${key}: ${value}`);
    });
  });
}


// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
