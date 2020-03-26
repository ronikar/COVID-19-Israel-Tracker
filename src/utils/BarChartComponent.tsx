
import "./BarChartComponent.css";

import React from "react";
import { XAxis, YAxis, Tooltip, Legend, CartesianGrid, BarChart, Bar } from "recharts";

interface DataKeyItem {
    id: string;
    color: string;
}

interface ChartProps {
    title: string;
    data: any;
    barDataKeys: DataKeyItem[];
    xAxizDataKeys?: string;
}

export function BarChartComponent({ title, data, xAxizDataKeys = "id", barDataKeys }: ChartProps) {
    return <div className="bar-chart">
        <h3>{title}</h3>
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxizDataKeys} />
            <YAxis />
            <Tooltip />
            <Legend />
            {barDataKeys.map(item => <Bar dataKey={item.id} fill={item.color} />)}
        </BarChart>
    </div>;
}