export default function useAmountInWords() {
  function convertAmountToWords(amount: number) {
    // Function to convert a number less than 100 to words
    function convertLessThanHundred(number: number) {
      const units = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
      ];
      const teens = [
        "",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
      ];
      const tens = [
        "",
        "Ten",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
      ];

      if (number < 10) {
        return units[number];
      } else if (number < 20) {
        return teens[number - 10];
      } else {
        return tens[Math.floor(number / 10)] + " " + units[number % 10];
      }
    }

    // Function to convert a number to words
    function convertNumberToWords(number: number) {
      if (number === 0) {
        return "Zero";
      }

      const billion = Math.floor(number / 1000000000);
      const million = Math.floor((number % 1000000000) / 1000000);
      const thousand = Math.floor((number % 1000000) / 1000);
      const remainder = number % 1000;

      let result = "";

      if (billion > 0) {
        result += convertLessThanHundred(billion) + " Billion ";
      }

      if (million > 0) {
        result += convertLessThanHundred(million) + " Million ";
      }

      if (thousand > 0) {
        result += convertLessThanHundred(thousand) + " Thousand ";
      }

      if (remainder > 0) {
        result += convertLessThanHundred(remainder);
      }

      return result.trim();
    }

    const rupees = Math.floor(amount);
    const paise = Math.round((amount - rupees) * 100);

    // Convert rupees and paise to words
    const rupeesInWords = convertNumberToWords(rupees);
    const paiseInWords = convertLessThanHundred(paise);

    let result = rupeesInWords + " Rupees";
    if (paise > 0) {
      result += " and " + paiseInWords + " Paise";
    }

    return result;
  }
  return { convertAmountToWords };
}
