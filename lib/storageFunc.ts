const saveStorage = (key: string, data: any[]) => {
  const serializedData = JSON.stringify(data);
  localStorage.setItem(key, serializedData);
};

const getStorage = (key: string): any[] => {
  // Check if the code is running in a browser environment
  if (typeof window !== "undefined") {
    const serializedData = localStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : [];
  } else {
    return [];
  }
};

export { saveStorage, getStorage };
