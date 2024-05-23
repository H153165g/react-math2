import React from "react";
import { useEffect, useState } from "react";
import * as d3 from "d3";

const COLO = (col, item, color) => {
    for (let i = 0; i < col.length; i++) {
        if (item == col[i]) {
            return color[i];
        }
    }

}

export default function Chart(data1) {

    const [data, setData] = useState(data1["data"])
    const types = Object.getOwnPropertyNames(data[0])
    types.pop()
    const [typex, setTypeX] = useState(types[0])
    const [typey, setTypeY] = useState(types[1])


    const handleChangex = (e) => {
        setTypeX(e.target.value)
    }

    const handleChangey = (e) => {
        setTypeY(e.target.value)
    }

    function handleClick(i, count) {
        setCount(() => count.map((item, j) => {
            if (i == j) {
                if (item) {
                    return false;
                } else {

                    return true;
                }
            } else {
                return count[j]
            }

        }))

    }


    const width = 500
    const height = 500

    const colormod = d3.scaleOrdinal(d3.schemeCategory10)
    const colors = new Set(data.map(({ species }) => species))
    const col = Array.from(colors)

    const [dataM, setData1] = useState(Array.from({ length: col.length }).map((_,i) => data.filter((item) =>{
        
        return item.species == col[i]})))
    const [count, setCount] = useState(Array.from({ length: col.length }).map(() => true))



    const color = Array.from({ length: col.length }).map((_, i) => {
        return colormod(i)
    })

    const x=typex.split("l");
    const y=typey.split("l")

    const [x1,setx]=useState(1)
    const [y1,sety]=useState(1)
    
    useEffect(() => {
        (async () => {
            if(x[1]=="Width"){
                setx(5)
            } else if(x[1]=="Length"){
                setx(2)
            }
            if(y[1]=="Width"){
                sety(5)
            } else if(y[1]=="Length"){
                sety(2)
            }
        })();
      }, [typex,typey]);
    const xmin = d3.min(data.map((data) => {
        return (data[typex])
    }))
    const ymin = d3.min(data.map((data) => {
        return (data[typey])
    }))
    const xmax = d3.max(data.map((data) => {
        return (data[typex])
    }))
    const ymax = d3.max(data.map((data) => {
        return (data[typey])
    }))

    
  

    const X = Array.from({ length: (Math.floor(xmax*10)/10  - Math.floor(xmin)) * x1 + 2}).map((_, i) => {
        return i / x1 + Math.floor(xmin);
    })
    const Y = Array.from({ length: (Math.floor(ymax*10)/10  - Math.floor(ymin)) * y1 + 2}).map((_, i) => {
        return i / y1 + Math.floor(ymin);
    })
    console.log(X[X.length-1],Y[Y.length-1])
    const xScale = d3.scaleLinear()
        .domain([X[0],X[X.length-1] ])
        .range([0, width - 40])
        .nice()
    const yScale = d3.scaleLinear()
        .domain([Y[0],Y[Y.length-1]])
        .range([0, height - 40])
        .nice()






    return (
        <>
            <select onChange={handleChangex} value={typex}>
                {types.map((item) => {
                    return (<option key={item} >{item}</option>)
                })}

            </select>
            <select onChange={handleChangey} value={typey}>
                {types.map((item) => {
                    return (<option key={item}>{item}</option>)
                })}

            </select>
            <svg width={width + 100} height={height + 40}>
                {X.map((item) => {
                    return (
                        <>
                            <line x1={xScale(item) + 40} y1={height} x2={xScale(item) + 40} y2={height + 10} stroke="black" />
                            <text
                                x={xScale(item) + 40}
                                y={height + 20}
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
                            <line x1={30} y1={height - yScale(item)} x2={40} y2={height - yScale(item)} stroke="black" />
                            <text
                                x="10"
                                y={height - yScale(item)}
                                fontSize="10"
                                textAnchor="left"
                                fill="black"
                                strokeWidth="3">{item}</text>
                        </>
                    )
                })}
                <line x1="40" y1={40} x2="40" y2={height} stroke="black" />
                <line x1="40" y1={height} x2={width} y2={height} stroke="black" />

                {dataM.map((item, i) => {
                    if (count[i]) {
                        return (item.map((items)=>
                            <circle cx={xScale(items[typex]) + 40} cy={height - yScale(items[typey])} r="5" fill={COLO(col, items.species, color)} />
                        ))
                    } else {
                        return;
                    }
                })}

                {col.map((item, i) => {
                    return (
                        <g onClick={() => handleClick(i, count)}>
                            <rect key={item} x={width + 1} y={40 + i * 15} width="10" height="10" fill={color[i]} />
                            <text x={width + 15} y={40 + i * 15 + 10} fontSize="13" textAnchor="left" fill="black" strokeWidth="3" >{item}</text>

                        </g>)
                })}
            </svg>
        </>
    )

}
