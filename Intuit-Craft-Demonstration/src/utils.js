const filteredContent = (arr, groupByKey) => {
    const groupBy = (value) => {
      return arr.reduce((acc, cur) => {
        let key = cur[value];
        const existingVal = acc[key] ? acc[key] : [];
        return { ...acc, [key]: [...existingVal, cur] };
      }, {'All' : arr});
    };
    return groupBy(groupByKey);
  };

  export {
    filteredContent
  }