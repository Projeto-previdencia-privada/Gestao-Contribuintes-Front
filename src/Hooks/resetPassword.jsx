export const resetPassword = (email, newPassword) => {
    const storedUsers = JSON.parse(localStorage.getItem("users_db")) || [];
    const userIndex = storedUsers.findIndex((user) => user.email === email);
  
    if (userIndex === -1) {
      return "Email não encontrado";
    }
  
    storedUsers[userIndex].password = newPassword;
    localStorage.setItem("users_db", JSON.stringify(storedUsers));
    return null;
  };
  