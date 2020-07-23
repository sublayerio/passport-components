export default name => {
    const url = new URL(window.location.href)
    return url.searchParams.get(name)
}