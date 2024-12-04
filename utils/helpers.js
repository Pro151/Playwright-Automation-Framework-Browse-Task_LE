// Utility function to generate a random ID
function generateRandomId(max = 10000) {
  return Math.floor(Math.random() * max);
}

// Utility function to generate a random name of 250 characters divided by underscores
function generateRandomName(length = 250, partLength = 10) {
  if (partLength <= 0 || length <= 0) {
    throw new Error('Both length and partLength must be greater than zero.');
  }

  const totalParts = Math.floor(length / (partLength + 1)); // Number of segments, considering underscores
  const randomNameParts = Array.from({ length: totalParts }, () =>
    Math.random().toString(36).substring(2, 2 + partLength)
  );

  return randomNameParts.join('_'); // Join all parts with underscores
}

// Example usage
try {
  const randomId = generateRandomId();
  const randomName = generateRandomName();

  console.log('Generated Random ID:', randomId);
  console.log('Generated Random Name:', randomName);
} catch (error) {
  console.error('Error generating random name:', error.message);
}

// Export functions for reuse
module.exports = { generateRandomId, generateRandomName };
