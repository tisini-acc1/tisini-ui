// Function to strip HTML tags from a string

export const stripHtmlTags = (str: string) => {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(/<[^>]*>/g, "");
};
