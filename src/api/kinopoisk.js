async function searchIds(query) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "Q217WMM-3HHMV0M-KM5H9WF-VST8V0K",
      },
    };
  
    try {
      const response = await fetch(
        `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${query}`,
        options
      );
      const data = await response.json();
      return data.docs; // Теперь searchIds возвращает массив фильмов
    } catch (err) {
      console.error(err);
      return []; // Возвращаем пустой массив в случае ошибки
    }
  }
  
  export { searchIds };
  