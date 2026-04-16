// ============================================================
// Punto de entrada del servidor AEHA Backend
// ============================================================
const app = require("./src/app");
const { PORT } = require("./src/config/env");

app.listen(PORT, () => {
  console.log("");
  console.log("  🏛️  ═══════════════════════════════════════════");
  console.log("  🏛️  AEHA Backend — El Código del Equilibrista");
  console.log(`  🏛️  Servidor corriendo en http://localhost:${PORT}`);
  console.log("  🏛️  ═══════════════════════════════════════════");
  console.log("");
});
