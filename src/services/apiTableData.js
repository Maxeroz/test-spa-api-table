import apiClient from "./apiClient";

// Функция для получения данных таблицы
export const getTableData = async () => {
  try {
    // Выполняем GET запрос с использованием apiClient
    const response = await apiClient.get(
      "/ru/data/v3/testmethods/docs/userdocs/get"
    );

    // Получаем данные из ответа
    const { data } = response.data;

    const formattedData = data.map((item) => ({
      id: item.id,
      companySigDate: item.companySigDate,
      companySignatureName: item.companySignatureName,
      documentName: item.documentName,
      documentStatus: item.documentStatus,
      documentType: item.documentType,
      employeeNumber: item.employeeNumber,
      employeeSigDate: item.employeeSigDate,
      employeeSignatureName: item.employeeSignatureName,
    }));

    return formattedData;
  } catch (error) {
    // Обрабатываем ошибки (например, ошибка авторизации или проблема с сетью)
    throw new Error(
      `Failed to fetch table data: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};

// Функция для добавления новой записи
export async function createRow(newRow) {
  try {
    // Отправляем POST-запрос с данными
    const response = await apiClient.post(
      "/ru/data/v3/testmethods/docs/userdocs/create",
      newRow
    );

    // Проверяем успешность запроса (HTTP статус 200)
    if (response.status === 200) {
      console.log("Record created successfully:", response.data);
      return response.data; // Возвращаем данные созданной записи
    } else {
      console.error("Failed to create record:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error creating record:", error);
    throw error; // Выбрасываем ошибку для дальнейшей обработки
  }
}

export async function updateRow(id, updatedRow) {
  try {
    // Отправляем POST-запрос с данными для обновления
    const response = await apiClient.post(
      `/ru/data/v3/testmethods/docs/userdocs/set/${id}`, // URL для обновления записи
      updatedRow // Передаем обновленные данные в формате JSON
    );

    // Проверяем успешность запроса (HTTP статус 200)
    if (response.status === 200) {
      // Проверяем, что в ответе error_code = 0
      if (response.data.error_code === 0) {
        console.log("Record updated successfully:", response.data.data);
        return response.data.data; // Возвращаем измененный объект
      } else {
        console.error(
          "Failed to update record:",
          response.data.error_message || "Unknown error"
        );
        return null;
      }
    } else {
      console.error("Failed to update record:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error updating record:", error);
    throw error; // Выбрасываем ошибку для дальнейшей обработки
  }
}

export async function deteleRow(id) {
  try {
    // Формируем URL для запроса
    const url = `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`;

    // Отправляем POST запрос
    const response = await apiClient.post(url);

    // Проверяем, что запрос прошел успешно
    if (response.data.error_code === 0) {
      console.log("Запись успешно удалена");
    } else {
      console.error("Не удалось удалить запись:", response.data);
    }
  } catch (error) {
    console.error("Ошибка при удалении записи:", error);
  }
}
