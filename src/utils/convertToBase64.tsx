export const convertToBase64 = (file: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const read = new FileReader();
    read.readAsDataURL(file);
    read.onload = () => resolve(read.result?.toString() || '');
    read.onerror = (error) => reject(error);
  });
};

export const validateFile = (file: File, name: string) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  const maxSize = 1024 * 1024;
  const errors = {} as Record<string, string>;

  if (file.size > maxSize) {
    errors[name] = 'Файл слишком большой';
  }

  if (!allowedTypes.includes(file.type)) {
    errors[name] = 'Недопустимый тип файла';
  }

  return errors;
};
