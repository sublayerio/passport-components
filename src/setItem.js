export default (key, value) => {

    try {
        return localStorage.setItem(key, value)
    } catch (e) {
        //
    }
}