export const update = (array, action) =>
  array.map((item, index) => {
    if (item._id !== action._id) {
      return item;
    }
    return {
      ...item,
      ...action
    };
  });

export const remove = (array, action) =>
  array.filter((item, index) => item._id !== action._id);
