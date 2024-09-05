import axios from "axios";

const HOST = "https://test.v5.pryaniky.com";

// Функция для авторизации
export const login = async (username, password) => {
  try {
    // Отправляем POST запрос на сервер для авторизации
    const response = await axios.post(
      `${HOST}/ru/data/v3/testmethods/docs/login`,
      {
        username,
        password,
      }
    );

    // Получаем токен из ответа
    const { token } = response.data.data;

    // Возвращаем токен
    return token;
  } catch (error) {
    // Обрабатываем ошибки (например, неверные данные для авторизации)
    throw new Error(
      `Authorization failed: ${error.response?.data?.message || error.message}`
    );
  }
};

export const logout = () => {
  // Удаляем токен из localStorage
  localStorage.removeItem("authToken");
};
