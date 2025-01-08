export const fetchSectionListData = async () => {
  try {
    const response = await fetch("./public/mock/sectionListData.json");
    const data = await response.json();
    return data?.sectionInfoList || [];
    // null undefined || defaultValue
  } catch (error) {
    console.log(error);
  }
};
