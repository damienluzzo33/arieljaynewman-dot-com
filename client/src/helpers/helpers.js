export const sortBagItems = (bagItems) => {
    let current = bagItems;
    current.sort((a, b) => {
        if ((b.price - a.price) === 0) {
            return a.medium.charCodeAt(0) - b.medium.charCodeAt(0);
        }
        return b.price - a.price;
    });
    return current;
}