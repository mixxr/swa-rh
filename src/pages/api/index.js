
// micser: file added

export async function getData( url , fieldName ){
    console.log("fectching from...", url) 
    const resp = await fetch(url)
    const data = await resp.json()
    return data[fieldName] || []
}

export async function searchData( url , fieldName, paramName, paramValue ){
    console.log("searchData",fieldName, paramName, paramValue)
    const data = await getData(url, fieldName)
    const elements = data.filter( (el) => el[paramName] === paramValue )
    return elements
}