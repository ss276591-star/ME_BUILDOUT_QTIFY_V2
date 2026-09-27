export function truncate(text, maxLength = 40) {
    const value = String(text ?? "");
  
    if (value.length <= maxLength) {
      return value;
    }
  
    return value.slice(0, Math.max(0, maxLength - 3)) + "...";
  }