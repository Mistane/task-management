module.exports = (data) => {
  const { currentPage, limitItems, totalItems } = data;
  let itemsSkip = (currentPage - 1) * limitItems;
  return {
    currentPage,
    limitItems,
    itemsSkip,
    totalItems,
  };
};
