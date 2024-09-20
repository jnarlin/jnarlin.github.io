// Function to calculate the sum of two numbers
function calculateSum() {
    // Get the values from the input fields
    const num1 = parseFloat(document.getElementById('number1').value);
    const num2 = parseFloat(document.getElementById('number2').value);
    
    // Check if the inputs are numbers
    if (isNaN(num1) || isNaN(num2)) {
        alert("Please enter valid numbers.");
        return;
    }
    
    // Calculate the sum
    const sum = num1 + num2;
    
    // Display the result in the paragraph
    document.getElementById('result').innerText = `The sum is: ${sum}`;
}

