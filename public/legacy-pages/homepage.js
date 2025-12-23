// Function to generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to change background  
function changeBackground() {
  let color1 = getRandomColor();
  let color2 = getRandomColor();
  document.body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
}

// Change background every 5 seconds
setInterval(changeBackground, 5000);
