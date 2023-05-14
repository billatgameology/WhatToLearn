d3.csv("sample-data.csv").then(function(data) {
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    const x = d3.scaleBand()
      .domain(data.map(d => d.skill))
      .range([0, width])
      .padding(0.1);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => +d.value)])
      .range([height, 0]);
  
    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.skill))
      .attr("width", x.bandwidth())
      .attr("y", d => y(+d.value))
      .attr("height", d => height - y(+d.value))
      .attr("fill", "steelblue");
  
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
    svg.append("g")
      .call(d3.axisLeft(y));
  });
  