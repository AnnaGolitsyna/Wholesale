const filterSelectedItems = (dataList, selectedRowKeys) => {
  return dataList?.filter((item) => selectedRowKeys.includes(item.key));
};

export { filterSelectedItems };
