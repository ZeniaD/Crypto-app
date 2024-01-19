const convertDateFormat = (inputDate: string): string => {
    const dateArray = inputDate.split("-");
    return dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
}

export default convertDateFormat;