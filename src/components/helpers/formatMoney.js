//https://gist.github.com/hengkiardo/3760884
//I took this function from ^this gist but changed the j declaration
//we will see if it breaks
export const formatMoney = (number) => {
    if (number === "not enough data") {
        return "N/A"
    } else {
        number = number || 0;
        let places = 2;
        let thousand = ",";
        let decimal = ".";
        let negative = number < 0 ? "-" : "";
        let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "";
        let j = i.length > 3 ? i.length % 3 : 0;
        return negative + "$" + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (decimal + Math.abs(number - i).toFixed(places).slice(2));
    }
  }