function updatePortfolio() {
    var pv = document.getElementById("presentValue").value;
    var iv = document.getElementById("investmentValue").value;
    var yr = document.getElementById("horizon").value;
    //CheckDecimal(pv)

    var sampleData = "/portfolio?pv=" + pv + "&iv=" + iv + "&yr=" + yr;
    X = ['Very_Conservative', 'Conservative', 'Moderate', 'Aggressive', 'Very_Aggressive']
    Y1 = []
    Y2 = []
    d3.json(sampleData).then((data) => {
        console.log(data.High_Value)
        console.log(data.Low_Value)

        X.forEach((p) => {
            console.log(data.High_Value[p])
            console.log(data.Low_Value[p])

            Y1.push(data.High_Value[p])
            Y2.push(data.Low_Value[p])
        })

        var trace1 = {
          x: X,
          y: Y1,
          name: 'High Value',
          type: 'bar'
        };

        var trace2 = {
          x: X,
          y: Y2,
          name: 'Low Value',
          type: 'bar'
        };

        var data = [trace1, trace2];
        var layout = {
          barmode: 'group',
          bargap: 0.25,
          bargroupgap: 0.1,
          barnorm: 'value'
        };

        Plotly.newPlot('bubble', data, layout, {responsive: true});
    })
}