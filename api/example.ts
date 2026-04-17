/**
 * Fichier d'exemple pour montrer comment utiliser les fonctions d'API
 * À SUPPRIMER avant le rendu final
 */

import { fetchStock, getAvailableSymbols, getStockInfo, clearCache } from "./fetch";

/**
 * Exemple 1: Récupérer les données d'une action pour 1 mois
 */
async function example1() {
  try {
    console.log("Récupération des données AAPL sur 1 mois...");
    const data = await fetchStock("AAPL", "1M");
    console.log(` ${data.length} points de données reçus`);
    console.log("Premiers points:", data.slice(0, 3));
  } catch (error) {
    console.error(" Erreur:", error instanceof Error ? error.message : error);
  }
}

/**
 * Exemple 2: Lister toutes les actions disponibles
 * Utile pour remplir les dropdowns en UI
 */
async function example2() {
  try {
    console.log("Récupération de la liste des actions...");
    const symbols = await getAvailableSymbols();
    console.log(` ${symbols.length} actions disponibles:`, symbols);
  } catch (error) {
    console.error(" Erreur:", error instanceof Error ? error.message : error);
  }
}

/**
 * Exemple 3: Récupérer les infos d'une action
 * Utile pour afficher le nom complet, secteur, prix courant
 */
async function example3() {
  try {
    console.log(" Récupération des infos TSLA...");
    const info = await getStockInfo("TSLA");
    console.log(" Infos reçues:", {
      symbol: info.symbol,
      name: info.name,
      sector: info.sector,
      price: info.currentPrice,
      currency: info.currency,
    });
  } catch (error) {
    console.error(" Erreur:", error instanceof Error ? error.message : error);
  }
}

/**
 * Exemple 4: Comparaison de 2 actions (cas d'usage pour Personne 2)
 */
async function example4() {
  try {
    console.log(" Récupération de 2 actions pour comparaison...");
    const [data1, data2] = await Promise.all([
      fetchStock("AAPL", "1M"),
      fetchStock("MSFT", "1M"),
    ]);
    console.log(` AAPL: ${data1.length} points, MSFT: ${data2.length} points`);
  } catch (error) {
    console.error(" Erreur:", error instanceof Error ? error.message : error);
  }
}

/**
 * Exemple 5: Gestion des erreurs - symbole invalide
 */
async function example5() {
  try {
    console.log("Test avec un symbole invalide...");
    await fetchStock("INVALID", "1W");
  } catch (error) {
    console.log(
      " Erreur capturée correctement:",
      error instanceof Error ? error.message : error
    );
  }
}

/**
 * Lance tous les exemples
 */
async function runAllExamples() {
  console.log("=== EXEMPLES D'UTILISATION DE L'API STOCKS ===\n");

  await example1();
  console.log("\n---\n");

  await example2();
  console.log("\n---\n");

  await example3();
  console.log("\n---\n");

  await example4();
  console.log("\n---\n");

  await example5();
  console.log("\n---\n");

  console.log("=== FIN DES EXEMPLES ===");
}

// Décommentez pour exécuter les exemples:
// runAllExamples();
