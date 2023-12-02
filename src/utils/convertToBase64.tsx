export const convertToBase64 = async (file: File) => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const saveImageToRedux = createAsyncThunk(
  'form/saveImageToRedux',
  async (file: File, { getState, dispatch }) => {
    try {
      const convertToBase64 = (file: File) => {
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };

      const base64Image = await convertToBase64(file);

      if (base64Image) {
        const dataTransfer = new DataTransfer();
        const newFile = new File([base64Image], file.name, {
          type: file.type,
        });
        dataTransfer.items.add(newFile);

        const updatedFormData = { ...getState().form.formData };
        updatedFormData.image = dataTransfer.files;

        dispatch(updateFormData({ formData: updatedFormData }));
      } else {
        console.error('Ошибка при чтении файла в Base64');
      }
    } catch (error) {
      console.error('Ошибка при конвертации файла в Base64:', error);
    }
  }
);
