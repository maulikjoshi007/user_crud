const parseQueryString = async (query: string): Promise<Record<string, string>> => {
    
    console.log("---------------------");
    console.log(query);

    const arr = query.split("&");
    const result: Record<string, string> = {};
    for (let i = 0; i < arr.length; i++) {
        const k = arr[i].split('=');
        result[k[0]] = decodeURIComponent(k[1] || '');
    }
    return result;
}

export { parseQueryString };
