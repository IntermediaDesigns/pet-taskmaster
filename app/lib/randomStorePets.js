// Function to generate a random boolean with a 50% chance to be true
function generateRandomBoolean() {
  // return Math.random() < 0.5;
  //1-50 instead
  return Math.floor(Math.random() * 10) === 0;
}

// Function to generate an array of objects with a number and its corresponding boolean
function generateRandomData() {
  const randomData = [];

  while (randomData.length < 5) {
    const randomNumber = Math.floor(Math.random() * 151) + 1; // Random number between 1 and 151
    const randomBoolean = generateRandomBoolean();

    // Check if the number is not already in the array
    if (!randomData.some((data) => data.number === randomNumber)) {
      randomData.push({ number: randomNumber, boolean: randomBoolean });
    }
  }

  return randomData;
}

// Export the generated data
export const randomDataArray = generateRandomData();
