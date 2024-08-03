module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  ifBudget: (priceRange) => {
    return priceRange === "budget"
  },
  ifMidRange: (priceRange) => {
    return priceRange === "mid-range"
  },
  ifHighEnd: (priceRange) => {
    return priceRange === "high-end"
  }
};
