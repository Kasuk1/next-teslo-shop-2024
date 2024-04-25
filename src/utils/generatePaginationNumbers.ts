export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  // If page total number is 7 or less, will show the pages without dots
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If current page is bettwen fhe first three pages, show the first 3, dots, and the last 2
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If current page is between the last 3 pages, show the first 2, dots, and the last 3
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If current page is in the middle, show the first page, dots, current page and rest
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
