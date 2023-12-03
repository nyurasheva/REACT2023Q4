const fields = [
  { label: 'Имя:', name: 'firstName', type: 'text' },
  { label: 'Возраст:', name: 'age', type: 'number' },
  { label: 'Email:', name: 'email', type: 'text' },
  { label: 'Пароль:', name: 'password', type: 'password' },
  {
    label: 'Подтверждение пароля:',
    name: 'confirmPassword',
    type: 'password',
  },
  {
    label: 'Пол:',
    name: 'gender',
    type: 'radio',
    options: ['Мужской', 'Женский', 'Другой'],
  },
  { label: 'Страна:', name: 'country', type: 'text' },
  {
    label: 'Изображение:',
    name: 'image',
    type: 'file',
  },
  {
    label: 'Принять условия и положения:',
    name: 'terms',
    type: 'checkbox',
  },
];

export { fields };
