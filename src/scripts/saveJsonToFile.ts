export function saveJsonToFile(element: HTMLAnchorElement, filename: string, data: any) {
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    element.download = `${filename}.json`;
    element.href = url;
}