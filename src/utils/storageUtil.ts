class StorageUtil {
  // Save data to localStorage
  static save<T>(key: string, data: T): void {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
    } catch (error) {
      console.error(`Error saving data to localStorage: ${error}`);
    }
  }

  // Retrieve data from localStorage
  static get<T>(key: string): T | null {
    try {
      const jsonData = localStorage.getItem(key);
      if (!jsonData) {
        return null;
      }
      return JSON.parse(jsonData) as T;
    } catch (error) {
      console.error(`Error retrieving data from localStorage: ${error}`);
      return null;
    }
  }

  // Remove data from localStorage
  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data from localStorage: ${error}`);
    }
  }

  // Clear all data in localStorage
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
    }
  }
}

export default StorageUtil;
