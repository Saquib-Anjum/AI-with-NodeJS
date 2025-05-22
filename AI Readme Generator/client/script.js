const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const input = document.getElementById("projectInput");
const output = document.getElementById("readmeOutput");

generateBtn.addEventListener("click", async () => {
  const projectInput = input.value.trim();
  if (!projectInput) {
    alert("Please describe your project.");
    return;
  }

  output.value = "Generating README...";

  const res = await fetch("http://localhost:5000/generate-readme", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectInput }),
  });

  const data = await res.json();
  output.value = data.readme || "Failed to generate README.";
});

copyBtn.addEventListener("click", () => {
  output.select();
  document.execCommand("copy");
  alert("Copied!");
});
