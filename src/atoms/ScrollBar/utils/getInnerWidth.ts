export const getInnerWidth = (el:Element):number => {
    const { clientWidth } = el;
    const { paddingLeft, paddingRight } = getComputedStyle(el);
    return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
};
