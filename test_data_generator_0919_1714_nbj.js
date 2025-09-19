// 代码生成时间: 2025-09-19 17:14:18
// Import required modules from Ionic framework
const { randomUUID } = require('crypto');

// Define a function to generate random email
function generateRandomEmail() {
  return `user_${randomUUID()}@example.com`;
}

// Define a function to generate random name
function generateRandomName() {
  // List of names to choose from
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
  // Return a random name from the list
  return names[Math.floor(Math.random() * names.length)];
}

// Define a function to generate random age
function generateRandomAge() {
  // Age range
  const minAge = 18;
  const maxAge = 100;
  // Return a random age within the range
  return Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
}

// Define a function to generate a random user object
function generateRandomUser() {
  try {
    // Generate random values for user properties
    const userEmail = generateRandomEmail();
    const userName = generateRandomName();
    const userAge = generateRandomAge();
    
    // Create and return the user object
    return {
      id: randomUUID(),
      name: userName,
      email: userEmail,
      age: userAge
    };
  } catch (error) {
    // Handle any errors that occur during user generation
    console.error('Error generating random user:', error);
    throw error;
  }
}

// Define a function to generate multiple users
function generateUsers(count) {
  try {
    // Check if count is a positive integer
    if (!Number.isInteger(count) || count <= 0) {
      throw new Error('Count must be a positive integer.');
    }

    // Generate and return an array of random users
    return new Array(count).fill(null).map(() => generateRandomUser());
  } catch (error) {
    // Handle any errors that occur during users generation
    console.error('Error generating users:', error);
    throw error;
  }
}

// Export the functions for use in other parts of the application
module.exports = {
  generateRandomUser,
  generateUsers
};

// Example usage:
// const users = generateUsers(10);
// console.log(users);
