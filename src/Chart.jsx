import React from "react";
import * as d3 from "d3";

const COLO=(col,item,color)=>{
    for(let i=0;i<col.length;i++){
        if(item==col[i]){
            console.log(col[i],color(i))
            return color(i);
        }
    }
        
}
export default function Chart (data1) {


    const data=data1["data"]
    console.log(data)

    const width = 500
    const height = 500
    
    const color = d3.scaleOrdinal(d3.schemeCategory10)
    const colors=new Set(data.map(({species})=>species))
    const col=Array.from(colors)
    const xmin = d3.min(data.map((data) => {
        return (data["sepalLength"])
    }))
    const ymin = d3.min(data.map((data) => {
        return (data["sepalWidth"])
    }))
    const xmax = d3.max(data.map((data) => {
        return (data["sepalLength"])
    }))
    const ymax = d3.max(data.map((data) => {
        return (data["sepalWidth"])
    }))

    const xScale = d3.scaleLinear()
        .domain([Math.floor(xmin),  Math.floor(xmax)+1])
        .range([0, width-40])
        .nice()
    const yScale = d3.scaleLinear()
        .domain([Math.floor(ymin), Math.floor(ymax)+1])
        .range([0, height-40])
        .nice()
    const X=Array.from({length: (Math.floor(xmax)+1-Math.floor(xmin))*2+1}).map((_,i)=>{
        return i/2+Math.floor(xmin);
    })  
    const Y=Array.from({length: (Math.floor(ymax)+1-Math.floor(ymin))*5+1}).map((_,i)=>{
        return i/5+Math.floor(ymin);
    })  
    
    console.log((Math.floor(xmax)+1-Math.floor(xmin))*2)    

   

    console.log(X)

    
    
    return (<svg width={width+5} height={height+5}>
        {X.map((item) => {
            console.log("A")
            return (
                <>
                    <line x1={xScale(item)+40} y1={height-40} x2={xScale(item)+40} y2={height - 30} stroke="black" />
                    <text
                        x={xScale(item)+40}
                        y={height - 20}
                        fontSize="10"
                        textAnchor="middle"
                        fill="black"
                        strokeWidth="3">{item}</text>
                </>
            )
        })}
        {Y.map((item) => {
            return (
                <>
                    <line x1={30} y1={height-yScale(item)-40} x2={40} y2={height-yScale(item)-40} stroke="black" />
                    <text
                        x="10"
                        y={height-yScale(item)-40}
                        fontSize="10"
                        textAnchor="middle"
                        fill="black"
                        strokeWidth="3">{item}</text>
                </>
            )
        })}
        <line x1="40" y1={0} x2="40" y2={height-40} stroke="black" />
        <line x1="40" y1={height-40} x2={width} y2={height-40} stroke="black" />

        {data.map((item,i)=>{
            return (
                <circle cx={xScale(item["sepalLength"])+40} cy={height-40-yScale(item["sepalWidth"])} r="5" fill={COLO(col,item.species,color) } />
            )
        })}
        

    </svg>
    )

}
