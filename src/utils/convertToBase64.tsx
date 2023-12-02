export const convertToBase64 = (file: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const read = new FileReader();
    read.readAsDataURL(file);
    read.onload = () => resolve(read.result?.toString() || '');
    read.onerror = (error) => reject(error);
  });
};
