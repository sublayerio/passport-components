export default (key) => {

    try {
        return localStorage.removeItem(key)
    } catch (e) {
        //
    }
}