import { useEffect,useState } from "react";
import React from "react";
import Chart from "./Chart"

async function data (){
        
          const response=await fetch("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json")
          const data1 = await response.json()


        return await data1
        }
    


export default function App(){
    const [data1,setData]=useState(0)
    useEffect(() => {
        (async () => {
          setData(await data());
        })();
      }, []);
      if (data1!=0){
        return  <Chart data={data1} />
      } else {
        return (
            <div>
              <h1>Hello, World!</h1>
            </div>
          );
      }
      
        
      
}