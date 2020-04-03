import React, { useRef, useEffect } from "react";
import { saveJsonToFile } from "../scripts/saveJsonToFile";

interface Props {
    filename: string;
    data: any
}

export function DownloadComponent({ data, filename }: Props) {
    const ref = useRef(null as unknown as HTMLAnchorElement);
    useEffect(() => saveJsonToFile(ref.current, filename, data), [data]);
    
    return <a ref={ref}>לחץ להורדה</a>;
}