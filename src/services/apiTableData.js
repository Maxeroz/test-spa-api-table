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

    console.log(response);

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
