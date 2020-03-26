
import "./LineChartComponent.css";

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

interface DataKeyItem {
    id: string;
    color: string;
}

interface ChartProps {
    title: string;
    data: any;
    lineDataKeys: DataKeyItem[];
    xAxizDataKeys?: string;
}

export function LineChartComponent({ title, data, xAxizDataKeys = "id", lineDataKeys }: ChartProps) {
    return <div className="line-chart">
        <h3>{title}</h3>
        <LineChart
            width={500}
            height={300}
            data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxizDataKeys} />
            <YAxis />
            <Tooltip />
            <Legend />
            {lineDataKeys.map(item => <Line type="monotone" dataKey={item.id} stroke={item.color} strokeWidth={3} dot={false} />)}
        </LineChart>
    </div>;
}