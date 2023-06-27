let defaultStyle = {
  container: "xl:max-w-[1200px] w-full",
  heading1:
    "font-poppins font-normal xs:text-[48px] text-[30px] text-black  w-full",
  heading2: "font-poppins font-semibold text-[18px] text-black w-full",
  paragraph: "font-poppins font-normal text-black text-[16px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",
  pageBackground: "bg-brown-gradient",
  primaryColor: "bg-brown-gradient",
  secondaryColor: "",
  brandColor: "",
};
export const editStyle = (
  styles,
  { brandColor = "", primaryColor = "", secondaryColor = "", textColor1 = "" }
) => {
  return {
    ...styles,
    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    brandColor: brandColor,
    textColor1: textColor1,
  };
};
export default defaultStyle;
