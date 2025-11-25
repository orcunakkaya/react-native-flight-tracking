
const dateParse = (dateString) => {
    const dateParts = dateString.split('.');
      let flightDate;
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const year = parseInt(dateParts[2]);
        flightDate = new Date(year, month, day);
      } else {
        flightDate = new Date(dateString.date);
      }
      flightDate.setHours(23, 59, 59, 999);

      return flightDate;
};

export default dateParse;