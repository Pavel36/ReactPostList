export const getPageCont = (totalCount, limit) => {
    return Math.ceil(totalCount/ limit)
}